(function () {
"use strict";

angular
  .module("app")
  .controller("DashboardController", DashboardController);

DashboardController.$inject = ["$timeout", "$element", "$state", "$stateParams", "Auth"];

function DashboardController ($timeout, $element, $state, $stateParams, Auth) {
  var ct = this;

  ct.loading = null;

  ct.logout = function () {
    ct.loading = {};
    ct.loading.logout = true;
    Auth.logout().$promise.then(
      function (data) {
        ct.loading = null;
        $state.transitionTo($state.current, $stateParams, { reload: true });
      },
      function (error) {
        ct.loading = null;
      }
    );
  };
}

})();