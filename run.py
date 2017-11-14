"""
Runs the application server and client modules.
"""

from threading import Thread
import os

DEBUG_PORT = 8080

def RunServer():
    os.system('server\\env\\Scripts\\python.exe server\\manage.py runserver %s' % DEBUG_PORT)

def RunElectron():
    os.system('client\\node_modules\\electron-prebuilt\\dist\\electron.exe client')

def Main():
    serverThread = Thread(target=RunServer)
    serverThread.start()
    electronThread = Thread(target=RunElectron)
    electronThread.start()
    serverThread.join()
    electronThread.join()

if __name__ == '__main__':
    Main()
