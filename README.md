### Django/AngularJS/Electron Application

Prior to developing, you may need to run `setup.py`. 

For the server, this will:
  * initialize a virtual environment
  * update the environment PIP to the latest version,
  * perform Django migrations
  * create a Django super user

For the client, this will:
  * initialize NPM and `node_modules/`.
  * initialize Bower and `bower_components/`.

Once the development environment is setup, the application can be started by running `run.py`. This should start a Django server and an Electron app. The Django server can be reached in a browser at the address `http://localhost:8080/`.