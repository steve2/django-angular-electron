(function () {
"use strict";

angular
  .module("app")
  .directive("loginForm", LoginForm);

LoginForm.$inject = [];
function LoginForm () {
  return {
    restrict: 'E',
    scope: {},
    controller: LoginFormController,
    templateUrl: "/static/states/login/components/form/form.html"
  };
}

LoginFormController.$inject = ['$scope', '$state', '$stateParams', '$djoser'];  
function LoginFormController ($scope, $state, $stateParams, $djoser) {
  var ct = $scope;

  ct.loading = false; 
  ct.error = null; 
  ct.login = _login;
  ct.twitchLogin = _twitchLogin;

  function _login(username, password) {
    ct.loading = true;
    $djoser.login(username, password).$promise.then(
      function (data) {
        $state.transitionTo($state.current, $stateParams, { reload: true });
      },
      function (error) {
        ct.loading = false;
        ct.error = error.data;
      }
    );
  }

  function _twitchLogin() {
    ct.loading = true;
    // location.assign("http://localhost:8080/accounts/twitch/login/?next=/");
  }

}

})();