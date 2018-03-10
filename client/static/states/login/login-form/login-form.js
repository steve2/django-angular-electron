(function () {
"use strict";

angular
  .module("app")
  .directive("loginForm", LoginForm);

LoginForm.$inject = [];
function LoginForm () {
  return {
    restrict: 'E',
    scope: { login: '=', error: '=' },
    controller: LoginFormController,
    templateUrl: "static/states/login/login-form/login-form.html"
  };
}

LoginFormController.$inject = ['$scope'];  
function LoginFormController ($scope) {
  var ct = $scope;
  
  // ct.username = null;
  // ct.password = null;
  
}

})();