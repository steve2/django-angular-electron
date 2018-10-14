(function () {
"use strict";

angular
  .module("app")
  .directive("userInfo", UserInfo);

UserInfo.$inject = [];
function UserInfo () {
  return {
    restrict: 'E',
    scope: { user: '=' },
    controller: UserInfoController,
    templateUrl: "static/states/dashboard/user-info/user-info.html"
  };
}

UserInfoController.$inject = ['$scope'];
function UserInfoController ($scope) {
  var ct = $scope;

  ct.timeFromNow = function (date) {
    return moment(date).fromNow();
  };

  ct.formatDate = function (date) {
    return moment(date).format('LL');
  };
}

})();