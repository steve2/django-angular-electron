"""
Runs the application server and client modules.
"""

from threading import Thread
import argparse
import sys
import os

cwd = os.path.dirname(os.path.realpath(__file__))


def _setup_venv():
    workingDirectory = '%s\\server' % cwd
    os.chdir(workingDirectory)
    print('Set working directory to %s' % workingDirectory)
    path = "virtualenv env"
    out = os.system(path)
    print(path + ' [' + str(out) + ']')
    path = '%s\\server\\env\\Scripts\\python.exe -m pip install --upgrade pip' % cwd
    out = os.system(path)
    print(path + ' [' + str(out) + ']')
    path = '%s\\server\\env\\Scripts\\pip.exe install -r requirements.txt' % cwd
    out = os.system(path)
    print(path + ' [' + str(out) + ']')


def _setup_node():
    workingDirectory = '%s\\client' % cwd
    os.chdir(workingDirectory)
    print('Set working directory to %s' % workingDirectory)
    path = "npm install"
    out = os.system(path)
    print(path + ' [' + str(out) + ']')


def _main():
    _setup_venv()
    _setup_node()



if __name__ == '__main__':
    _main()
