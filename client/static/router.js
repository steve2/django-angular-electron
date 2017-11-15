(function () {
"use strict";

angular
  .module("app")
  .config(Router);

Router.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state("root", {
      abstract: true
    })
    .state("root.home", {
      url: "/"
    });
}

})();