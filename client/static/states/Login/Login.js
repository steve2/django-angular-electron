(function () {
"use strict";

angular
  .module("app")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$timeout", "$element", "$state", "$stateParams", "$djoser"];

function LoginController ($timeout, $element, $state, $stateParams, $djoser) {
  var ct = this;

  ct.error = null;
  ct.loading = false;
  ct.authenticate = _authenticate;

  function _authenticate(username, password) {
    ct.loading = true;
    $djoser.login(username, password).$promise.then(
      function (data) {
        $state.transitionTo('root.dashboard', $stateParams, { reload: true });
      },
      function (error) {
        ct.loading = false;
        ct.error = error.data;
      }
    );
  }

  // function _twitchLogin() {
  //   ct.loading = true;
  //   location.assign("http://localhost:8080/accounts/twitch/login/?next=/");
  // }

}

})();