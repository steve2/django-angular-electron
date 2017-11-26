(function () {
"use strict";
  
angular
  .module("app")
  .directive("socialConnections", SocialConnections);

SocialConnections.$inject = [];

function SocialConnections () {
  SocialConnectionsController.$inject = ['$scope', 'User',];

  function SocialConnectionsController ($scope, User) {
    var ct = $scope;

    ct.connections = {
      twitch: User.socialAccount(ct.user, 'twitch')
    };

    ct.connect = {
      twitch: _connect_twitch
    };

    function _connect_twitch() {
      location.assign("/accounts/twitch/login/?process=connect&next=/");
    }
  }

  return {
    restrict: 'E',
    scope: { user: '=' },
    controller: SocialConnectionsController,
    templateUrl: "/static/components/social/connections.html"
  };
}

})();