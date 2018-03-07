(function () {
"use strict";

angular
  .module("app")
  .directive("signupForm", SignupForm);

SignupForm.$inject = [];
function SignupForm () {
  return {
    restrict: 'E',
    scope: { signup: '=', error: '=' },
    controller: SignupFormController,
    templateUrl: "static/states/signup/signup-form/signup-form.html"
  };
}

SignupFormController.$inject = ['$scope'];
function SignupFormController ($scope) {
  var ct = $scope;

  ct.email = null;
  ct.username = null;
  ct.password = null;
  
}

})();