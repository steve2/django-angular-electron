(function () {
"use strict";

angular
  .module("app")
  .factory("Auth", AuthService);

AuthService.$inject = ['$rootScope', '$resource', '$cookies', '$q'];

function AuthService ($rootScope, $resource, $cookies, $q) {

  var resources = { // API Endpoints.
    login: $resource("/api/auth/login/", {}, {}),
    logout: $resource("/api/auth/logout/", {}, {}),
    current: $resource("/api/auth/user/", {}, {}),
    register: $resource("/api/auth/register/", {}, {})
  };

  return {
    current: function () {
      return resources.current.get();
    },
    register: function (username, email, password, confirmPassword) {
      var response = resources.register.save({
        username: username, email: email, password1: password, password2: confirmPassword
      });
      var deferred = $q.defer();
      response.$promise.then(
        function (data) {
          resources.current.get().$promise.then(
            function (data) {
              $rootScope.user = data;
              deferred.resolve(data);
            },
            function (error) {
              deferred.reject(error);
            }
          );
        },
        function (error) {
          deferred.reject(error);
        }
      );
      deferred.$promise = deferred.promise;
      return deferred;
    },
    login: function (username, password) {
      var response = resources.login.save(
        { username: username, password: password });
      var deferred = $q.defer();
      response.$promise.then(
        function (data) { // Retrieve User data object.
          resources.current.get().$promise.then(
            function (data) { 
              $rootScope.user = data; 
              deferred.resolve(data);
            },
            function (error) {
              deferred.reject(error);
            }
          );
        },
        function (error) {
          deferred.reject(error);
        }
      );
      deferred.$promise = deferred.promise;
      return deferred;
    },
    logout: function () {
      var response = resources.logout.save();
      response.$promise.then(
        function (data) {
          $rootScope.user = null;
        },
        function (errors) {}
      );
      return response;
    }
  };

}

})();