(function () {
"use strict";

angular
  .module("app")
  .controller("LoginController", LoginController);

  LoginController.$inject = ["$timeout", "$element", "$state", "$stateParams", "Session"];

function LoginController ($timeout, $element, $state, $stateParams, Session) {
  var ct = this;

  ct.login = function (username, password) {
    Session.login(username, password).$promise.then(
      function (data) {
        $state.transitionTo($state.current, $stateParams, { reload: true });
      }
    )
  };

}

})();