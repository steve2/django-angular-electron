(function () {
"use strict";

angular
  .module("app")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$timeout", "$element", "$state", "$stateParams", "Auth"];

function LoginController ($timeout, $element, $state, $stateParams, Auth) {
  var ct = this;



}

})();