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

  // Initialize application session.
  $rootScope.user = Session.current();
  $rootScope.user.$promise.then(
    function (data) {
      if ($state.current.registration)
        $state.go("root.profile");
      WatchTransitions();
    },
    function (errors) {
      $rootScope.user = null;
      let targetState = $state.get().filter(state => (state.url == $location.url()))[0];
      if (targetState === undefined || targetState.protected)
        $state.go("root.login");
      WatchTransitions();
    }
  );

  // Control access to specific states.
  function WatchTransitions() {
    $transitions.onBefore({ to: "**" }, function ($state) {
      if ($state.to().protected && !$rootScope.user) {
        $state.router.stateService.target("root.login");
        return false;
      }
      else if ($rootScope.user && $state.to().registration) {
        $state.router.stateService.target("root.home");
        return false;
      }
    });
  }

}

})();