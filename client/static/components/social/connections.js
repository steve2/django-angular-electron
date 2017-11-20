(function () {
"use strict";
  
angular
  .module("app")
  .directive("socialConnections", SocialConnections);

SocialConnections.$inject = [];

function SocialConnections () {
  SocialConnectionsController.$inject = ['$rootScope', '$scope', 'User',];

  function SocialConnectionsController ($rootScope, $scope, User) {
    var ct = $scope;
    ct.cache = {};

    ct.connected = function (provider) {
      if (ct.cache[provider] === undefined)
        ct.cache[provider] = User.socialAccount($rootScope.user, provider);
      console.log(ct.cache[provider]);
      return ct.cache[provider];
    };
  }

  return {
    restrict: 'E',
    scope: { user: '=' },
    controller: SocialConnectionsController,
    templateUrl: "/static/components/social/connections.html"
  };
}
  
  })();