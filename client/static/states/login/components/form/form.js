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

    ct.login = function (username, password) {
      ct.loading = true;
      Auth.login(username, password).$promise.then(
        function (data) {
          ct.loading = false;
          $state.transitionTo($state.current, $stateParams, { reload: true });
        }
      )
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