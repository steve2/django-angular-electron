(function () {
"use strict";

angular
  .module("app")
  .controller("DashboardController", DashboardController);

DashboardController.$inject = ["$timeout", "$http", "$state", "$stateParams", "$djoser"];
function DashboardController ($timeout, $http, $state, $stateParams, $djoser) {
  var ct = this;

  ct.loading = null;
  ct.logout = _logout;
  ct.controls = { logout: _logout };

  function _logout() {
    ct.loading = {};
    ct.loading.logout = true;
    $djoser.logout().$promise.then(
      function (data) {
        $state.transitionTo($state.current, $stateParams, { reload: true });
      },
      function (error) {
        ct.loading.logout = false;
      }
    );
  }
}

})();