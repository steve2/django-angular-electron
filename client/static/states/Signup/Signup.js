(function () {
"use strict";

angular
  .module("app")
  .controller("SignupController", SignupController);

SignupController.$inject = ['$timeout', '$element', '$state', '$stateParams', '$djoser'];
function SignupController ($timeout, $element, $state, $stateParams, $djoser) {
  var ct = this;

  ct.loading = false;
  ct.error = null;
  ct.authenticate = _authenticate;
  ct.register = _register;
  
  function _authenticate (username, password) {
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

  function _register (email, username, password, confirmPassword) {
    if (password != confirmPassword) {
      ct.error = { 'confirm': ['This must match your password.'] };
      return;
    }
    ct.loading = true;
    $djoser.register(username, email, password).$promise.then(
      function (data) {
        _authenticate(username, password);
      },
      function (error) {
        ct.loading = false;
        ct.error = error.data;
      }
    );
  }
}

})();