"""
Runs the application server and client modules.
    Requirements:
        - python34
        - npm
"""

from threading import Thread
from argparse import RawTextHelpFormatter
import argparse
import os

# The directory of this file should be the root directory of the project.
ROOT_DIR = os.path.dirname(os.path.realpath(__file__))

# Path to virtualenv binaries for setup.
PYTHON = os.path.join('env', 'Scripts', 'python.exe')
PIP = os.path.join('env', 'Scripts', 'pip.exe')


def _set_directory(subdir):
    working_dir = os.path.join(ROOT_DIR, subdir)
    os.chdir(working_dir)
    print('Current directory: %s' % working_dir)


def _run_command(command):
    out = os.system(command)
    print('%s [%d]' % (command, out))
    if out is not 0:  # Raise an exception if the command fails.
        raise Exception('Command failed: %s' % command)


def _main():
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

    # Install dependencies.
    _run_command('pip install virtualenv')
    _run_command('npm install -g bower')
    _run_command('npm install -g less')

    try:
        # Server setup.
        if not args.skip_server:
            _set_directory('server')

            # Initialize virtual environment.
            if not args.skip_venv:
                _run_command('virtualenv env')
            else:
                print('Skipping virtual environment setup.')

            # Update pip to latest version.
            if not args.skip_pip:
                _run_command('%s -m pip install --upgrade pip' % PYTHON)
            else:
                print('Skipping pip update.')
            _run_command('%s install -r requirements.txt' % PIP)

            # Django migrations.
            if not args.skip_migrate:
                _run_command('%s manage.py migrate' % PYTHON)
            else:
                print('Skipping Django migrations.')

            # Create Django superuser.
            if not args.skip_superuser:
                _run_command('%s manage.py createsuperuser' % PYTHON)
            else:
                print('Skipping Django Admin superuser creation.')
        else:
            print('Skipping server setup.')

        # Client setup.
        if not args.skip_client:
            _set_directory('client')
            _run_command('npm install')
            _set_directory(os.path.join('client', 'static'))
            _run_command('bower install')
        else:
            print('Skipping client setup.')

    except Exception as exception:
        print('Setup failed due to:\n\t%s' % str(exception))


if __name__ == '__main__':
    _main()
