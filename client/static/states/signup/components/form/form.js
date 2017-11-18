(function () {
"use strict";

angular
  .module("app")
  .directive("signupForm", SignupForm);

SignupForm.$inject = [];

function SignupForm () {
  controller.$inject = ['$scope', 'Auth'];

  function controller ($scope, Auth) {
    var ct = $scope;
    ct.loading = false;

    ct.signup = function () {
      ct.loading = true;
      console.log('Signup.');
      
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