"""
Runs the application server and client modules.
"""

from threading import Thread
import os

DEBUG_PORT = 8080


def _run_server():
    os.system(
        'server\\env\\Scripts\\python.exe server\\manage.py runserver %s' % DEBUG_PORT)


def _run_electron():
    os.system('client\\node_modules\\electron-prebuilt\\dist\\electron.exe client')


def _main():
    server_thread = Thread(target=_run_server)
    server_thread.start()
    electron_thread = Thread(target=_run_electron)
    electron_thread.start()
    server_thread.join()
    electron_thread.join()


if __name__ == '__main__':
    _main()
