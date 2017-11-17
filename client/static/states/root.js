(function () {
"use strict";

angular
  .module("app")
  .controller("Root", RootController);

RootController.$inject = ["$timeout", "$element"];

function RootController ($timeout, $element) {
  var ct = this;

  // Reveal moment.js to templates.
  ct.moment = moment;

  // Reveal Electron functions.
  ct.isElectron = isElectron;

}

})();