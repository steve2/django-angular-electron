# Django/AngularJS/Electron Application

### Setup

Prior to developing, you may need to run `setup.py`.

This requires:
  * Python 3.4
  * Node.js (for `npm`)
  
The setup script installs:
  * `virtualenv`
  * `bower`
  * `lessc`

For the server, this will:
  * initialize a virtual environment
  * update the environment PIP to the latest version,
  * perform Django migrations
  * create a Django super user

For the client, this will:
  * initialize NPM and `node_modules/`.
  * initialize Bower and `bower_components/`.

### Running

Once the development environment is setup, the application can be started by running `run.py`. This should start a Django server and an Electron app. The Django server can be reached in a browser at the address `http://localhost:8080/`.

### Packaging Electron App

The packaging of an Electron app into a binary (such as `.exe` on Windows) can be done by using the `electron-packager` tool. This can be installed for CLI usage.

```
npm install electron-packager -g
```

This tool creates a directory such as `django-angular-electron-win32-x64/` in the current working directory. As an example, if we had an application named `django-angular-electron`, we would see a `django-angular-electron.exe` file within the created directory.

```
electron-packager .\client "django-angular-electron" --platform=win32 --arch=x64
```

* The `--platform` option can be one or more of `darwin`, `linux`, `mas`, `win32` (comma-delimited if multiple). It defaults to the host platform.
* The `--arch` option can be one or more of `ia32`, `x64`, `armv7l`, `arm64`, `mips64el` (comma-delimited if multiple). Defaults to the host architecture.

