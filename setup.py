"""
Runs the application server and client modules.
"""

from threading import Thread
import argparse
import sys
import os

# The directory of this file should be the root directory of the project.
rootDirectory = os.path.dirname(os.path.realpath(__file__))


def _set_directory(subdir):
    workingDirectory = '%s\\%s' % (rootDirectory, subdir)
    os.chdir(workingDirectory)
    print('Current directory: %s' % workingDirectory)


def _run_command(command):
    out = os.system(command)
    print('%s [%d]' % (command, out))
    if out is not 0: # Raise an exception if the command fails.
        raise Exception('Command failed: %s' % command)


def _main():
    try:
        # Server setup.
        _set_directory('server')
        _run_command('virtualenv env')
        _run_command('env\\Scripts\\python.exe -m pip install --upgrade pip')
        _run_command('env\\Scripts\\pip.exe install -r requirements.txt')
        _run_command('env\\Scripts\\python.exe manage.py migrate')
        _run_command('env\\Scripts\\python.exe manage.py createsuperuser')
        # Client setup.
        _set_directory('client')
        _run_command('npm install')
    except Exception as exception:
        print('Setup failed due to:\n\t%s' % str(exception))


if __name__ == '__main__':
    _main()
