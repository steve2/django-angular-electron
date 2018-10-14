(function () {
  "use strict";
  
  angular
    .module("app")
    .directive("inputV", InputValidated);
  
  InputValidated.$inject = [];
  function InputValidated () {
    return {
      restrict: 'E',
      scope: {},
      controller: InputValidatedController,
      templateUrl: "static/widgets/input-v/input-v.html"
    };
  }
  
  InputValidatedController.$inject = ['$scope'];
  function InputValidatedController ($scope) {
    var ct = $scope;
  
    ct.loading = false;
    ct.error = null;
    ct.signup = _signup;
  }
  
  })();