(function () {
"use strict";

angular
  .module("app", [
    "ui.router",
    "ngResource",
    "ngCookies",
    "ngMaterial",
    "djoser"
  ])
  .config(Config)
  .run(Run);

Config.$inject = ["$httpProvider", "$resourceProvider", "$locationProvider", "$mdThemingProvider"];
Run.$inject = ["$rootScope", "$state", "$location", "$transitions", "$q", "$djoser"];

function Config ($httpProvider, $resourceProvider, $locationProvider, $mdThemingProvider) {
  $httpProvider.defaults.xsrfCookieName = "csrftoken";
  $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $locationProvider.html5Mode({ enabled: true, requireBase: false });
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    // .accentPalette('indigo')
    // .accentPalette('red')
    // .accentPalette('light-green')
    // .accentPalette('light-blue')
    // .accentPalette('purple')
    // .accentPalette('teal')
    // .accentPalette('cyan')
    // .accentPalette('yellow')
    // .accentPalette('amber')
    // .accentPalette('light-green')
    // .accentPalette('deep-purple')
    .accentPalette('orange')
    // .accentPalette('brown')
    // .accentPalette('blue-grey')
    .warnPalette('red')
    .dark();
}

function Run ($rootScope, $state, $location, $transitions, $q, $djoser) {  
  // These functions can be used by any AngularJS templates.
  $rootScope.moment = moment;
  $rootScope.link = $state.go;
  $rootScope.isElectron = isElectron; // Returns true if Electron is running.
  $rootScope.formatDate = function (str) { return moment(str).format('LL'); };
  $rootScope.formatDateTime = function (str) { return moment(str).format('LLL'); };

  var initialLoading = $q.defer();
  $rootScope.user = null;
  // Load current session (if it exists).
  $djoser.current().$promise.then(
    function (data) {
      $rootScope.user = data;
      initialLoading.resolve();
    },
    function (error) {
      initialLoading.resolve();
    }
  );
  
  $transitions.onBefore({ to: "**" }, function ($state) {
    return $q(function (resolve, reject) {
      // Wait for the initial load, only needs to be done once.
      initialLoading.promise.then(function() {
        if ($state.to().protected && !$rootScope.user)
          // Prevent protected states without registered user.
          resolve($state.router.stateService.target("root.login"));
        else if ($rootScope.user && $state.to().registration)
          // Prevent registration states when registered.
          resolve($state.router.stateService.target("root.dashboard"));
        else
          // Proceed normally.
          resolve();
      });
    });
  });
}

})();