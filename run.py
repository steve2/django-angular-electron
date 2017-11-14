"""
Runs the application server and client modules.
"""

from threading import Thread
import argparse
import sys
import os

DEBUG_PORT = 8080

cwd = os.path.dirname(os.path.realpath(__file__))
parser = argparse.ArgumentParser(description='Run the application.')
parser.add_argument('--server', action='store_true')
args = parser.parse_args()


def _run_server():
    path = '%s\\server\\env\\Scripts\\python.exe %s\\server\\manage.py runserver %s'
    os.system(path % (cwd, cwd, DEBUG_PORT))


def _run_electron():
    path = '%s\\client\\node_modules\\electron-prebuilt\\dist\\electron.exe client'
    os.system(path % cwd)


def _main():
    server_thread = Thread(target=_run_server)
    server_thread.start()
    if not args.server:
        electron_thread = Thread(target=_run_electron)
        electron_thread.start()


if __name__ == '__main__':
    _main()
