(function () {
"use strict";

angular
  .module("app")
  .config(Router);

Router.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {

  // Default state.
  $urlRouterProvider.otherwise("/");

  // State definitions.
  $stateProvider
    .state("root", {
      abstract: true,
      templateUrl: "static/states/root.html",
      controller: "Root as Root"
    })
    .state("root.home", {
      url: "/",
      templateUrl: "static/states/home/root.html",
      controller: "Home as Home"
    });
}

})();