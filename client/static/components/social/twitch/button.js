(function () {
"use strict";
  
angular
  .module("app")
  .directive("twitchButton", TwitchButton);

TwitchButton.$inject = [];

function TwitchButton () {
  TwitchButtonController.$inject = ['$scope'];

  function TwitchButtonController ($scope) {
    var ct = $scope;
    
  }

  return {
    restrict: 'E',
    scope: { click: '=', disabled: '=' },
    controller: TwitchButtonController,
    templateUrl: "/static/components/social/twitch/button.html"
  };
}
  
  })();