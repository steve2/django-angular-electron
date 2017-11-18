(function () {
"use strict";

angular
  .module("app")
  .controller("DashboardController", DashboardController);

DashboardController.$inject = ["$timeout", "$element", "$state", "$stateParams", "Session"];

function DashboardController ($timeout, $element, $state, $stateParams, Session) {
  var ct = this;

  ct.logout = function () {
    Session.logout().$promise.then(
      function (data) {
        $state.transitionTo($state.current, $stateParams, { reload: true });
      }
    );
  };
}

})();