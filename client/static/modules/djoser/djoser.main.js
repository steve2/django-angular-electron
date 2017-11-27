(function () {
"use strict";

angular
  .module("djoser", [])
  .config(Setup)
  .run(Initialization)
  .service('djoser.interceptor', Interceptor)
  .value('settings', { 
    token: null,
    tokenKey: 'auth_token' 
  });

Initialization.$inject = ['$cookies', 'settings'];
function Initialization ($cookies, settings) {
  settings.token = $cookies.get(settings.tokenKey);
}

Setup.$inject = ['$httpProvider'];
function Setup ($httpProvider) {
  $httpProvider.interceptors.push('djoser.interceptor');
}

Interceptor.$inject = ['$cookies', 'settings'];
function Interceptor ($cookies, settings) {
  var service = this;
  service.request = function (config) {
    if (settings.token !== undefined && settings.token != null)
      // Only append the header if the token is available.
      config.headers['Authorization'] = 'Token ' + settings.token;
    return config;
  };
}

})();

/**
 * 
 * (function () {
"use strict";

angular
  .module("app")
  .factory("Auth", AuthService);

AuthService.$inject = ['$rootScope', '$resource', '$cookies', '$q'];

function AuthService ($rootScope, $resource, $cookies, $q) {
  
  var _resources = { 
    login: $resource("/api/auth/token/create/", {}, {}),
    logout: $resource("/api/auth/token/destroy/", {}, {}),
    current: $resource("/api/auth/me/", {}, {})
    // register: $resource("/api/auth/register/", {}, {})
  };
  var _MyAuthToken = $cookies.get('auth_token'); // Initialize to saved value.

  return {
    /**
     * current();
     * 
     * Returns the currently authenticated user. This corresponds to a GET request
     * to the "_resources.current" AngularJS $resource. This endpoint requires an
     * authentication token. Here's some docs:
     *    
     *  http://djoser.readthedocs.io/en/latest/sample_usage.html
     * 
     * @returns Serialized user detail information.
     * 
    current: _get_current_user,
    // register: function (username, email, password, confirmPassword) {
    //   var response = resources.register.save({
    //     username: username, email: email, password1: password, password2: confirmPassword
    //   });
    //   var deferred = $q.defer();
    //   response.$promise.then(
    //     function (data) {
    //       resources.current.get().$promise.then(
    //         function (data) {
    //           $rootScope.user = data;
    //           deferred.resolve(data);
    //         },
    //         function (error) {
    //           deferred.reject(error);
    //         }
    //       );
    //     },
    //     function (error) {
    //       deferred.reject(error);
    //     }
    //   );
    //   deferred.$promise = deferred.promise;
    //   return deferred;
    // },
    login: function (username, password) {
      var response = _resources.login.save(
        { username: username, password: password });
      var deferred = $q.defer();
      response.$promise.then(
        function (data) { // Retrieve User data object.
          _MyAuthToken = data.auth_token;
          $cookies.put('auth_token', _MyAuthToken);
          _get_current_user().$promise.then(
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
      var response = _resources.logout.save();
      response.$promise.then(
        function (data) {
          $rootScope.user = null;
          _MyAuthToken = null;
          $cookies.remove('auth_token');
        },
        function (errors) {}
      );
      return response;
    }
  };

  function _get_current_user() {
    let authobj = (_MyAuthToken != null) ? { 'Authorization': 'Token ' + _MyAuthToken } : {};
    let response = _resources.current.get({}, authobj);
    response.$promise.then(
      function (data) {
        console.log(data);
      },
      function (errors) {
        console.log(errors);
      });
    return response;
  }

}

 * 
 */