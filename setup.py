#!/usr/bin/env python3
from argparse import RawTextHelpFormatter
import logging
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
        skip_server (bool) - Skip the server setup.
        skip_client (bool) - Skip the client setup.
        skip_venv (bool) - Skip Python virtual environment setup.
        skip_pip (bool) - Skip "pip" upgrade.
        skip_migrate (bool) - Skip Django migration step.
        skip_superuser (bool) - Skip Django superuser creation.
    Raises:
        RuntimeError - A setup command failed (see console).
    TODO: 
        - Make steps idempotent and remove function arguments.
    """
    # The `virtualenv` tools create a virtual environment for the server.
    # This environment contains 3rd party dependencies that are needed.
    # If it is already installed `pip` returns successful and we continue.
    run_command('pip install virtualenv')

    # The `bower` tool is used as a package manager for the client application.
    # If it is already installed it will be updated and continue.
    run_command('npm install -g bower')

    # The `less` compiler is used when building client style definitions.
    # If it is already installed it will be updated and continue.
    run_command('npm install -g less')

    # The `electron-packager` tool builds the Electron client for distribution.
    # If it is already installed it will be updated and continue.
    run_command('npm install -g electron-packager')

    try:
        if skip_server:
            logging.info('Skipping server setup.')
        else:
            set_directory('server')

            # Initialize virtual environment.
            if not skip_venv:
                init_virtual_env('env')
            else:
                logging.info('Skipping virtual environment setup.')

            # Update pip to latest version.
            if not skip_pip:
                upgrade_pip_version()
            else:
                logging.info('Skipping pip update.')

            # Install Python packages to server virtual environment.
            run_command('%s install -r requirements.txt' % PIP)

            # Django migrations.
            if not skip_migrate:
                django_migrations()
            else:
                logging.info('Skipping Django migrations.')

            # Create Django superuser.
            if not skip_superuser:
                create_django_superuser()
            else:
                logging.info('Skipping Django Admin superuser creation.')

        # Client setup.
        if skip_client:
            logging.info('Skipping client setup.')
        else:
            set_directory('client')
            run_command('npm install')
            set_directory(os.path.join('client', 'static'))
            run_command('bower install')

    except (RuntimeError, OSError) as exception:
        logging.error('Setup failed due to:\n\t%s' % str(exception))


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.INFO,
        format='%(levelname)s:%(message)s'
    )
    description = 'Setup development environment.\n\n' \
        'If you have already run this script, it may be necessary to \n' \
        'skip virtual environment and superuser setup. This can be \n' \
        'done with options `--skip-venv` and `--skip-superuser`.'
    parser = argparse.ArgumentParser(description=description,
                                     formatter_class=RawTextHelpFormatter)
    parser.add_argument('--skip-venv', action='store_true', default=False)
    parser.add_argument('--skip-pip', action='store_true', default=False)
    parser.add_argument('--skip-migrate', action='store_true', default=False)
    parser.add_argument('--skip-superuser', action='store_true', default=False)
    parser.add_argument('--skip-server', action='store_true', default=False)
    parser.add_argument('--skip-client', action='store_true', default=False)
    args = parser.parse_args()
    main(
        skip_server=args.skip_server,
        skip_client=args.skip_client,
        skip_venv=args.skip_venv,
        skip_pip=args.skip_pip,
        skip_migrate=args.skip_migrate,
        skip_superuser=args.skip_superuser
    )
