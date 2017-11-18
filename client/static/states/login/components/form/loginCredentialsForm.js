(function () {
"use strict";

angular
  .module("app")
  .directive("loginCredentialsForm", LoginCredentialsForm);

LoginCredentialsForm.$inject = [];

function LoginCredentialsForm () {
  controller.$inject = ['Auth'];

  function controller (Auth) {
    var ct = this;

    ct.login = function (username, password) {
      Auth.login(username, password).$promise.then(
        function (data) {
          $state.transitionTo($state.current, $stateParams, { reload: true });
        }
      )
    }
  }

  return {
    restrict: 'E',
    scope: {},
    controller: controller,
    templateUrl: "/static/states/login/components/loginCredentialsForm/loginCredentialsForm.html"
  };
}

})();