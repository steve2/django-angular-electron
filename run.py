#!/usr/bin/env python3
from threading import Thread
from build import build
import os
import argparse
import logging

from shared import *


# The port the Django server listens on.
SERVER_PORT = 8080


"""
Starts a Django server (on {SERVER_PORT}) and the Electron-based client.

The web client can be viewed with a browser at `http://localhost:{SERVER_PORT}`.
"""


def run_server():
    """
    Starts the Django server.
    Raises:
        RuntimeError - Django server failed to start (see log).
    """
    python_path = os.path.join(
        ROOT_DIR, 'server', 'env', 'Scripts', 'python.exe')
    manage_path = os.path.join(ROOT_DIR, 'server', 'manage.py')
    run_command('%s %s runserver %s' % (python_path, manage_path, SERVER_PORT))


def run_electron():
    """
    Starts the Electron-based client.
    Raises:
        RuntimeError - Electron-based client failed to start.
    """
    electron_path = os.path.join(
        ROOT_DIR, 'client', 'node_modules', 'electron', 'dist', 'electron.exe')
    application_path = os.path.join(ROOT_DIR, 'client')
    run_command('%s %s' % (electron_path, application_path))


def main(server_only=False):
    """
    Builds the project and starts a Django server and Electron-based client.
    Keyword args:
        server_only (bool) - If true, only the Django server is started. The
            project is built regardless.
    Raises:
        RuntimeError - The build process failed, the server failed to start,
            or the Electron-based client application failed to start.
    """
    build()

    server_thread = Thread(target=run_server)
    server_thread.start()

    if not server_only:
        electron_thread = Thread(target=run_electron)
        electron_thread.start()


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.WARNING,
        format='%(levelname)s:%(message)s'
    )
    parser = argparse.ArgumentParser(
        description='Starts the Django server and the Electron-based client.')
    parser.add_argument(
        '--server-only', action='store_true', dest='server_only')
    args = parser.parse_args()
    main(args.server_only)
