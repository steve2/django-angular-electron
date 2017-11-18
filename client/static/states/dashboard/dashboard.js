(function () {
"use strict";

angular
  .module("app")
  .controller("DashboardController", DashboardController);

DashboardController.$inject = ["$timeout", "$element", "$state", "$stateParams", "Auth"];

function DashboardController ($timeout, $element, $state, $stateParams, Auth) {
  var ct = this;

  ct.logout = function () {
    Auth.logout().$promise.then(
      function (data) {
        $state.transitionTo($state.current, $stateParams, { reload: true });
      }
    );
  };
}

})();