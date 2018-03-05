(function () {
"use strict";

angular
  .module("djoser")
  .factory('$djoser', djoser);

djoser.$inject = ['$rootScope', '$resource', '$cookies', '$q', 'settings'];

function djoser ($rootScope, $resource, $cookies, $q, settings) {

  let endpoints = {
    login: $resource(_get_url("/api/auth/token/create/"), {}, {}),
    logout: $resource(_get_url("/api/auth/token/destroy/"), {}, {}),
    current: $resource(_get_url("/api/auth/me/"), {}, {}),
    create: $resource(_get_url("/api/auth/users/create/"), {}, {}),
    delete: $resource(_get_url("/api/auth/users/delete/"), {}, {}),
    activate: $resource(_get_url("/api/auth/users/activate/"), {}, {}),
    changePassword: $resource(_get_url("/api/auth/password/"), {}, {})
  };

  return {
    // User management.
    current: endpoints.current.get,
    register: _register,
    delete: endpoints.delete.save,
    activate: endpoints.activate.save,
    changePassword: endpoints.changePassword.save,

    // Token authentication.
    login: _login,
    logout: _logout
  };

  // ---------------------------------------------------------------------

  function _get_url(uri) {
    if (isElectron())
      return 'http://localhost:8080' + uri
    else
      return uri
  }

  function _login(username, password) {
    var response = endpoints.login.save(
      { username: username, password: password });
    var deferred = $q.defer();
    response.$promise.then(
      function (data) {
        $cookies.put(settings.tokenKey, data.auth_token);
        settings.token = data.auth_token;
        endpoints.current.get().$promise.then(
          function (data) {
            $rootScope.user = data;
            deferred.resolve(data);
          },
          function (error) {
            deferred.reject(error);
          });
      },
      function (error) {
        deferred.reject(error);
      });
    deferred.$promise = deferred.promise;
    return deferred;
  }

  function _logout() {
    var response = endpoints.logout.save();
    response.$promise.then(
      function (data) {
        $cookies.remove(settings.tokenKey);
        settings.token = null;
        $rootScope.user = null;
      },
      function (error) {});
    return response;
  }

  function _register(username, email, password) {
    var response = endpoints.create.save(
      { username: username, email: email, password: password });
    var deferred = $q.defer();
    response.$promise.then(
      function (data) {
        console.log(data);
        deferred.resolve(data);
      },
      function (error ){
        console.log(error);
        deferred.reject(error);
      });
    deferred.$promise = deferred.promise;
    return deferred;
  }
}

})();