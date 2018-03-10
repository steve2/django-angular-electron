(function () {
"use strict";

angular
  .module("app")
  .directive("dashboardHeader", DashboardHeader);

DashboardAddFriendsController.$inject = ['$scope', '$mdDialog'];
function DashboardAddFriendsController ($scope, $mdDialog) {
  var ct = $scope;

  ct.members = {
    getItemAtIndex: function (index) {
      return ct.membersList[index];
    },
    getLength: function () {
      return ct.membersList.length;
    }
  };

  ct.membersList = [
    { 'name': 'steve', 'role': 'Administrator' },
    { 'name': 'Evelyn', 'role': 'Member' },
    { 'name': 'Nathaniel', 'role': 'Member' },
    { 'name': 'Amelia', 'role': 'Member' },
    { 'name': 'Jonah', 'role': 'Member' },
    { 'name': 'Roman', 'role': 'Member' },
    { 'name': 'Arthur', 'role': 'Member' },
    { 'name': 'Olivia', 'role': 'Member' },
    { 'name': 'Jasper', 'role': 'Member' }
  ];
}

DashboardHeader.$inject = [];
function DashboardHeader () {
  return {
    restrict: 'E',
    scope: { user: '=', controls: '=' },
    controller: DashboardHeaderController,
    templateUrl: "static/states/dashboard/header/header.html"
  };
}

DashboardHeaderController.$inject = ['$scope', '$mdDialog'];
function DashboardHeaderController ($scope, $mdDialog) {
  var ct = $scope;

  ct.timeFromNow = function (date) {
    return moment(date).fromNow();
  };

  ct.formatDate = function (date) {
    return moment(date).format('LL');
  };

  ct.addFriends = function (event) {
    var dialog = $mdDialog.show({

      // Not really sure how to organize these.
      controller: DashboardAddFriendsController,
      templateUrl: 'static/states/dashboard/header/header.addfriends.html',

      // The dialog will only appear within its parent element, so its
      // best to use `document.body` unless its appropriate to do otherwise.
      parent: angular.element(document.body),

      targetEvent: event, // Probably used for animations.
      clickOutsideToClose: true // Not sure of behavior without `document.body` parent.
    });
    dialog.then(
      function (result) {
      },
      function (errors) {});
  };
}

})();