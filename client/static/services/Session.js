(function () {
"use strict";

angular
  .module("app")
  .factory("Session", Session);

Session.$inject = ['$rootScope', '$resource', '$cookies'];

function Session ($rootScope, $resource, $cookies) {

  var resources = { // API Endpoints.
    login: $resource("/api/auth/login/", {}, {}),
    logout: $resource("/api/auth/logout/", {}, {}),
    current: $resource("/api/auth/user/", {}, {})
  };

  return {
    current: function () {
      return resources.current.get();
    },
    login: function (username, password) {
      var response = resources.login.save(
        { username: username, password: password });
      response.$promise.then(
        function (data) { // Retrieve User data object.
          this.current().$promise.then(
            function (data) { $rootScope.user = data; }
          );
        },
        function (error) {}
      );
    },
    logout: function () {
      var response = resources.logout.save();
      response.$promise.then(
        function (data) {
          $rootScope.user = null;
        },
        function (errors) {}
      );
    }
  };

}

})();