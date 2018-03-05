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