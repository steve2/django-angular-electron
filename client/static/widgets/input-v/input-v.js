(function () {
"use strict";

angular
  .module("app")
  .directive("inputV", InputValidated);

InputValidated.$inject = [];
function InputValidated () {
  return {
    restrict: 'E',
    scope: { 
      'text': '@',
      'type': '@',
      'error': '=',
      'model': '='
    },
    controller: InputValidatedController,
    templateUrl: "static/widgets/input-v/input-v.html"
  };
}

InputValidatedController.$inject = ['$scope'];
function InputValidatedController ($scope) {
  var ct = $scope;

}

})();