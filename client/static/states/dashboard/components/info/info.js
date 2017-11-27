(function () {
"use strict";

angular
  .module("app")
  .directive("userInformation", UserInformation);

UserInformation.$inject = [];
function UserInformation () {
  return {
    restrict: 'E',
    scope: { user: '=' },
    controller: UserInformationController,
    templateUrl: "/static/states/dashboard/components/info/info.html"
  };
}

UserInformationController.$inject = ['$scope'];
function UserInformationController ($scope) {
  var ct = $scope;

  ct.timeFromNow = function (date) {
    return moment(date).fromNow();
  };

  ct.formatDate = function (date) {
    return moment(date).format('LL');
  };
}

})();