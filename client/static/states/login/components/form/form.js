(function () {
"use strict";

angular
  .module("app")
  .directive("loginForm", LoginForm);

LoginForm.$inject = [];

function LoginForm () {
  controller.$inject = ['$scope', '$state', '$stateParams', 'Auth'];

  function controller ($scope, $state, $stateParams, Auth) {
    var ct = $scope;
    ct.loading = false;
    ct.error = null;

    ct.login = function (username, password) {
      ct.loading = true;
      Auth.login(username, password).$promise.then(
        function (data) {
          // Don't stop "loading" until the new state is loaded.
          $state.transitionTo($state.current, $stateParams, { reload: true });
        },
        function (error) {
          ct.loading = false;
          ct.error = error.data;
        }
      );
    };
  }

  return {
    restrict: 'E',
    scope: {},
    controller: controller,
    templateUrl: "/static/states/login/components/form/form.html"
  };
}

})();