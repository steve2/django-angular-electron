(function () {
"use strict";

angular
  .module("app")
  .controller("DashboardController", DashboardController);

DashboardController.$inject = ["$timeout", "$http", "$state", "$stateParams", "Auth"];

function DashboardController ($timeout, $http, $state, $stateParams, Auth) {
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

  ct.output = "";
  ct.connections = function () {
    $http({
      method: 'POST',
      url: '/accounts/social/connections/',
      data: $.param({ account: 13 }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function (data, status, headers, config) {
      ct.output = data;
    }).error(function (data, status, headers, config) {
      ct.output = data;
    });
  };
}

})();