(function () {
"use strict";

angular
  .module("app")
  .directive("signupForm", SignupForm);

SignupForm.$inject = [];
function SignupForm () {
  return {
    restrict: 'E',
    scope: {},
    controller: SignupFormController,
    templateUrl: "static/states/signup/signup-form/signup-form.html"
  };
}

SignupFormController.$inject = ['$scope', '$state', '$stateParams', '$djoser'];
function SignupFormController ($scope, $state, $stateParams, $djoser) {
  var ct = $scope;

  ct.loading = false;
  ct.signup = _signup;
  
  _reset_errors();


  function _reset_errors () {
    ct.errors = {
      email: null,
      username: null,
      password: null,
      password2: null
    };
  }

  function _login (username, password) {
    _reset_errors();
    $djoser.login(username, password).$promise.then(
      function (data) {
        $state.transitionTo('root.dashboard', $stateParams, { reload: true });
      },
      function (error) {
        ct.loading = false;
        ct.error = error.data;
      }
    )
  }

  function _signup (username, email, password, confirmPassword) {
    _reset_errors();
    ct.loading = true;
    
    if (password != confirmPassword) {
      ct.errors.password2 = "This does not match your password.";
      ct.loading = false;
      return; 
    }

    $djoser.register(username, email, password).$promise.then(
      function (data) {
        _login(username, password);
      },
      function (error) {
        ct.loading = false;
        if (error.data.username != null)
          ct.errors.username = error.data.username[0];
        if (error.data.password != null)
          ct.errors.password = error.data.password[0];
        if (error.data.email != null)
          ct.errors.email = error.data.email[0];
      }
    );
  }
}

})();