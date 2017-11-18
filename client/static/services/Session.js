(function () {
"use strict";

angular
  .module("app")
  .factory("Session", Session);

Session.$inject = ['$rootScope', '$resource', '$cookies'];

function Session ($rootScope, $resource, $cookies) {

  var AUTH_TOKEN_COOKIE = 'AuthToken';
  var token = $cookies.get(AUTH_TOKEN_COOKIE);

  var resources = { // API Endpoints.
    login: $resource("/api/auth/login/", {}, { headers: { 'Authentication': 'Token ' + token } }),
    logout: $resource("/api/auth/logout/", {}, { headers: { 'Authentication': 'Token ' + token } }),
    current: $resource("/api/auth/user/", {}, { headers: { 'Authentication': 'Token ' + token } })
  };

  return {
    current: function () {
      return resources.current.get();
    },
    login: function (username, password) {
      var response = resources.login.save({ username: username, password: password });
      response.$promise.then(
        function (data) {
          token = data.key;
          $cookies.put(AUTH_TOKEN_COOKIE, token);
        },
        function (error) {}
      );
    },
    logout: function () {
      var response = resources.logout.save();
      response.$promise.then(
        function (data) {
          token = null;
          $cookies.remove(AUTH_TOKEN_COOKIE);
        },
        function (errors) {}
      );
    }
  };

}

})();