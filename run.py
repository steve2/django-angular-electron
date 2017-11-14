from multiprocessing import Process
import sys
import os

DEBUG_PORT = 8080

def RunServer():
    os.system('server\\env\\Scripts\\python.exe server\\manage.py runserver %s' % DEBUG_PORT)

def RunElectron():
    os.system('client\\node_modules\\electron-prebuilt\\dist\\electron.exe client')

server = Process(target=RunServer)
electron = Process(target=RunElectron)
server.start()
electron.start()