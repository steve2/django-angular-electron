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
Run.$inject = ["$rootScope", "$state", "$location", "$transitions", "$q", "Session"];

function Config ($httpProvider, $resourceProvider, $locationProvider) {
  $httpProvider.defaults.xsrfCookieName = "csrftoken";
  $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $locationProvider.html5Mode({ enabled: true, requireBase: false });
}

function Run ($rootScope, $state, $location, $transitions, $q, Session) {  
  // These functions can be used by any AngularJS templates.
  $rootScope.moment = moment;
  $rootScope.link = $state.go;
  $rootScope.isElectron = isElectron; // Returns true if Electron is running.
  $rootScope.formatDate = function (str) { return moment(str).format('LL'); };
  $rootScope.formatDateTime = function (str) { return moment(str).format('LLL'); };

  var sessionLoading = $q.defer();
  $rootScope.user = null;
  // Load current session (if it exists).
  Session.current().$promise.then(
    function (data) {
      $rootScope.user = data;
      sessionLoading.resolve();
    },
    function (error) {
      sessionLoading.resolve();
    }
  );
  
  $transitions.onBefore({ to: "**" }, function ($state) {
    return $q(function (resolve, reject) {
      // Wait for the session to load, only needs to be done once.
      sessionLoading.promise.then(function() {
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