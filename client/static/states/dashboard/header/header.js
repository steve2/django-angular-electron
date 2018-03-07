(function () {
"use strict";

angular
  .module("app")
  .directive("dashboardHeader", DashboardHeader);

DashboardHeader.$inject = [];
function DashboardHeader () {
  return {
    restrict: 'E',
    scope: { user: '=', controls: '=' },
    controller: DashboardHeaderController,
    templateUrl: "static/states/dashboard/header/header.html"
  };
}

DashboardHeaderController.$inject = ['$scope'];
function DashboardHeaderController ($scope) {
  var ct = $scope;

  ct.timeFromNow = function (date) {
    return moment(date).fromNow();
  };

  ct.formatDate = function (date) {
    return moment(date).format('LL');
  };
}

})();