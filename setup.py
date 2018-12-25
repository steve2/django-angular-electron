#!/usr/bin/env python3
from argparse import RawTextHelpFormatter
import argparse
import os

from shared import *


# Path to virtualenv binaries for setup.
PYTHON = os.path.join('env', 'Scripts', 'python.exe')
PIP = os.path.join('env', 'Scripts', 'pip.exe')


""" 
Setup the development environment for the project.

Requirements:
    - python34
    - npm

"""


def set_directory(subdir):
    """
    Sets the working directory to {subdir}.
    Raises:
        OSError - Command to change directories is not available.
    """
    working_dir = os.path.join(ROOT_DIR, subdir)
    os.chdir(working_dir)
    print('Current directory: %s' % working_dir)


def init_virtual_env(subdir):
    """
    Initializes a Python virtual environment.
    @returns: True if successful, False if the directory already exists.
    Raises:
        RuntimeError - Command to initialize virtual environment fails.
    """
    if os.path.isdir(os.path.abspath(subdir)):
        return False
    run_command('virtualenv %s' % subdir)
    return True


def upgrade_pip_version():
    """
    Upgrades the version of Python {pip}.
    Raises:
        RuntimeError - A setup command has failed (see console).
    """
    run_command('%s -m pip install --upgrade pip' % PYTHON)


def django_migrations():
    """
    Perform Django database migrations.
    Raises:
        RuntimeError - The Django {migrate} command failed (see console).
    """
    run_command('%s manage.py migrate' % PYTHON)


def create_django_superuser():
    """
    Creates a Django superuser for the database.
    Raises:
        RuntimeError - The Django {createsuperuser} command failed (see console).
    """
    run_command('%s manage.py createsuperuser' % PYTHON)


def main(skip_server, skip_client, skip_venv,
         skip_pip, skip_migrate, skip_superuser):
    """
    Performs steps to setup the development environment.
    Args:
        skip_server - Skip the server setup.
        skip_client - Skip the client setup.
        skip_venv - Skip Python virtual environment setup.
        skip_pip - Skip "pip" upgrade.
        skip_migrate - Skip Django migration step.
        skip_superuser - Skip Django superuser creation.
    Raises:
        RuntimeError - A setup command failed (see console).
    TODO: 
        - Make steps idempotent and remove function arguments.
    """
    # Install dependencies.
    run_command('pip install virtualenv')
    run_command('npm install -g bower')
    run_command('npm install -g less')

    try:
        # Server setup.
        if not skip_server:
            set_directory('server')

            # Initialize virtual environment.
            if not 'skip_venv':
                init_virtual_env('env')
            else:
                print('Skipping virtual environment setup.')

            # Update pip to latest version.
            if not skip_pip:
                upgrade_pip_version()
            else:
                print('Skipping pip update.')

            # Install Python packages to server virtual environment.
            run_command('%s install -r requirements.txt' % PIP)

            # Django migrations.
            if not skip_migrate:
                django_migrations()
            else:
                print('Skipping Django migrations.')

            # Create Django superuser.
            if not skip_superuser:
                create_django_superuser()
            else:
                print('Skipping Django Admin superuser creation.')
        else:
            print('Skipping server setup.')

        # Client setup.
        if not skip_client:
            set_directory('client')
            run_command('npm install')
            set_directory(os.path.join('client', 'static'))
            run_command('bower install')
        else:
            print('Skipping client setup.')

    except (RuntimeError, OSError) as exception:
        print('Setup failed due to:\n\t%s' % str(exception))


if __name__ == '__main__':
    description = 'Setup development environment.\n\n' \
        'If you have already run this script, it may be necessary to \n' \
        'skip virtual environment and superuser setup. This can be \n' \
        'done with options `--skip-venv` and `--skip-superuser`.'
    parser = argparse.ArgumentParser(description=description,
                                     formatter_class=RawTextHelpFormatter)
    parser.add_argument('--skip-venv', action='store_true')
    parser.add_argument('--skip-pip', action='store_true')
    parser.add_argument('--skip-migrate', action='store_true')
    parser.add_argument('--skip-superuser', action='store_true')
    parser.add_argument('--skip-server', action='store_true')
    parser.add_argument('--skip-client', action='store_true')
    args = parser.parse_args()
    main(
        skip_server=args.skip_server,
        skip_client=args.skip_client,
        skip_venv=args.skip_venv,
        skip_pip=args.skip_pip,
        skip_migrate=args.skip_migrate,
        skip_superuser=args.skip_superuser
    )
