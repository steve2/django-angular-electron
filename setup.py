"""
Runs the application server and client modules.
    Requirements:
        - python34
        - virtualenv (pip install virtualenv)
        - npm
        - bower (npm install -g bower)
        - lessc (npm install -g lessc)
"""

from threading import Thread
import argparse
import sys
import os

# The directory of this file should be the root directory of the project.
rootDirectory = os.path.dirname(os.path.realpath(__file__))

# Path to virtualenv binaries for setup.
pythonPath = os.path.join('env', 'Scripts', 'python.exe') 
pipPath = os.path.join('env', 'Scripts', 'pip.exe')

def _set_directory(subdir):
    workingDirectory = os.path.join(rootDirectory, subdir)
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
        _run_command('%s -m pip install --upgrade pip' % pythonPath)
        _run_command('%s install -r requirements.txt' % pipPath)
        _run_command('%s manage.py migrate' % pythonPath)
        _run_command('%s manage.py createsuperuser' % pythonPath)
        # Client setup.
        _set_directory('client')
        _run_command('npm install')
        _set_directory(os.path.join('client', 'static'))
        _run_command('bower install')
    except Exception as exception:
        print('Setup failed due to:\n\t%s' % str(exception))


if __name__ == '__main__':
    _main()
