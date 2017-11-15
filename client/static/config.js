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
function Config($httpProvider, $resourceProvider, $locationProvider) {
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
}

// Application initialization.
function Run($rootScope, $state, $location, $transitions, $q) {
    
}

})();