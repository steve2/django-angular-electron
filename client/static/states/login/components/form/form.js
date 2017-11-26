(function () {
"use strict";

angular
  .module("app")
  .directive("loginForm", LoginForm);

LoginForm.$inject = [];

function LoginForm () {
  LoginFormController.$inject = ['$scope', '$state', '$stateParams', 'Auth'];

  function LoginFormController ($scope, $state, $stateParams, Auth) {
    var ct = $scope;
    ct.loading = false;
    ct.error = null;

    ct.login = function (username, password) {
      ct.loading = true;
      Auth.login(username, password).$promise.then(
        function (data) {
          $state.transitionTo($state.current, $stateParams, { reload: true });
        },
        function (error) {
          ct.loading = false;
          ct.error = error.data;
        }
      );
    };

    ct.twitchLogin = function () {
      ct.loading = true;
      location.assign("http://localhost:8080/accounts/twitch/login/?next=/");
    };

  }

  return {
    restrict: 'E',
    scope: {},
    controller: LoginFormController,
    templateUrl: "/static/states/login/components/form/form.html"
  };
}

})();