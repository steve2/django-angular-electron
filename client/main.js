var electron = require('electron')
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var window = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() { 
  window = new BrowserWindow({width: 800, height: 600}); 
  window.loadURL('file://' + __dirname + '/index.electron.html'); 
  window.on('closed', function() {
    window = null;
  }); 
});