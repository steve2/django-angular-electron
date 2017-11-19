(function () {
"use strict";

angular
  .module("app")
  .directive("signupForm", SignupForm);

SignupForm.$inject = [];

function SignupForm () {
  controller.$inject = ['$scope', '$state', '$stateParams', 'Auth'];

  function controller ($scope, $state, $stateParams, Auth) {
    var ct = $scope;
    ct.loading = false;
    ct.error = null;

    ct.signup = function (username, email, password, confirmPassword) {
      ct.loading = true;
      Auth.register(username, email, password, confirmPassword).$promise.then(
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
    templateUrl: "/static/states/signup/components/form/form.html"
  };
}

})();