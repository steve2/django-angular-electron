(function () {
"use strict";

angular
  .module("app")
  .directive("signupForm", SignupForm);

SignupForm.$inject = [];

function SignupForm () {
  SignupFormController.$inject = ['$scope', '$state', '$stateParams', '$djoser'];

  function SignupFormController ($scope, $state, $stateParams, $djoser) {
    var ct = $scope;
    ct.loading = false;
    ct.error = null;

    ct.signup = _signup;
    
    function _login (username, password) {
      $djoser.login(username, password).$promise.then(
        function (data) {
          $state.transitionTo('root.dashboard', $stateParams, { reload: true });
        },
        function (error) {
          // Do nothing.
          ct.loading = false;
          ct.error = error.data;
        }
      )
    }

    function _signup (username, email, password, confirmPassword) {
      ct.loading = true;
      $djoser.register(username, email, password).$promise.then(
        function (data) {
          _login(username, password);
        },
        function (error) {
          ct.loading = false;
          ct.error = error.data;
        }
      );
    }


  }

  return {
    restrict: 'E',
    scope: {},
    controller: SignupFormController,
    templateUrl: "static/states/signup/components/form/form.html"
  };
}

})();