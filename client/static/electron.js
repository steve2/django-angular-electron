"use strict";

if (typeof require === 'function')
  var remote = require('electron').remote;

function registerCloseControls(className) {
  // Registers the Window close control events.
  if (remote) {
    let elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++)
      elements[i].addEventListener('click', function (event) {
        var window = remote.getCurrentWindow();
        window.close();
      });
  }
}

function isElectron() {
  if (typeof require !== 'function') return false;
  if (typeof window !== 'object') return false;
  try {
    const electron = require('electron');
    if (typeof electron !== 'object') return false;
  } catch (e) {
    return false;
  }
  return true;
}
