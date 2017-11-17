(function () {
"use strict";

angular
  .module("app", [
    "ui.router",
    "ngResource",
    "ngCookies"
  ])
  .config(Config)
  .run(Run);

Config.$inject = ["$httpProvider", "$resourceProvider", "$locationProvider"];
Run.$inject = ["$rootScope", "$state", "$location", "$transitions", "$q"];

// Application configuration.
function Config ($httpProvider, $resourceProvider, $locationProvider) {
  $httpProvider.defaults.xsrfCookieName = "csrftoken";
  $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $locationProvider.html5Mode({ enabled: true, requireBase: false });
}

// Application initialization.
function Run ($rootScope, $state, $location, $transitions, $q) {
  
  // Template utility functions.
  $rootScope.moment = moment;
  $rootScope.link = $state.go;
  $rootScope.isElectron = isElectron; // Returns true if Electron is running.
  $rootScope.formatDate = function (str) { return moment(str).format('LL'); };
  $rootScope.formatDateTime = function (str) { return moment(str).format('LLL'); };



}

})();