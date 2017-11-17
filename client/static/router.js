(function () {
"use strict";

angular
  .module("app")
  .config(Router);

Router.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

function Router ($stateProvider, $urlRouterProvider, $locationProvider) {

  // Default state.
  $urlRouterProvider.otherwise("/");

  // State definitions.
  $stateProvider
    .state("root", {
      abstract: true,
      url: "/",
      templateUrl: "static/states/Root.html",
      controller: "Root as Root"
    })
    .state("root.home", {
      url: "",
      templateUrl: "static/states/Home/Home.html",
      controller: "Home as Home"
    })
    .state("root.login", {
      url: "login/",
      templateUrl: "static/states/Login/Login.html",
      controller: "Login as Login"
    })
    .state("root.profile", {
      url: "profile/",
      templateUrl: "static/states/Profile/Profile.html",
      controller: "Profile as Profile"
    })
    .state("root.signup", {
      url: "signup/",
      templateUrl: "static/states/Signup/Signup.html",
      controller: "Signup as Signup"
    });
}

})();