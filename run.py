"""
Runs the application server and client modules.
"""

from threading import Thread
import argparse
import os

DEBUG_PORT = 8080

ROOT_DIR = os.path.dirname(os.path.realpath(__file__))


def _run_command(command):
    out = os.system(command)
    print('%s [%d]' % (command, out))
    if out is not 0:  # Raise an exception if the command fails.
        raise Exception('Command failed: %s' % command)


def _run_server():
    python_path = os.path.join(
        ROOT_DIR, 'server', 'env', 'Scripts', 'python.exe')
    manage_path = os.path.join(ROOT_DIR, 'server', 'manage.py')
    _run_command('%s %s runserver %s' % (python_path, manage_path, DEBUG_PORT))


def _run_electron():
    electron_path = os.path.join(
        ROOT_DIR, 'client', 'node_modules', 'electron-prebuilt', 'dist', 'electron.exe')
    application_path = os.path.join(ROOT_DIR, 'client')
    _run_command('%s %s' % (electron_path, application_path))


def _build_client():
    _run_command('python %s' % os.path.join(ROOT_DIR, 'client', 'build.py'))


def _main():
    parser = argparse.ArgumentParser(description='Run the application.')
    parser.add_argument('--server', action='store_true')
    args = parser.parse_args()
    _build_client()
    server_thread = Thread(target=_run_server)
    server_thread.start()
    if not args.server:
        electron_thread = Thread(target=_run_electron)
        electron_thread.start()


if __name__ == '__main__':
    _main()
