(function () {
"use strict";

angular
  .module("app")
  .config(Router);

Router.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

function Router ($stateProvider, $urlRouterProvider, $locationProvider) {

  // Default state.
  $urlRouterProvider.otherwise("/");

  // There are currently three types of states.
  //  1) States that logged in users shouldn't see (Login, Signup, etc.).
  //  2) States that only logged in users should see (Profile, etc.).
  //  3) States that are neither of the above.
  //
  // These are categorized by additional properties added to state objects.
  //  "registration": Corresponds with situation (1) above.
  //  "protected": Corresponds with situation (2) above.
  //  <no property>: Corresponds with situation (3) above.
  // 

  // State definitions.
  $stateProvider
    .state("root", {
      abstract: true,
      url: "/",
      templateUrl: "static/states/root.html",
      controller: "RootController as root"
    })
    .state("root.home", {
      url: "",
      templateUrl: "static/states/home/home.html",
      controller: "HomeController as home"
    })
    .state("root.signup", {
      url: "signup/",
      templateUrl: "static/states/signup/signup.html",
      controller: "SignupController",
      registration: true
    })
    .state("root.login", {
      url: "login/",
      templateUrl: "static/states/login/login.html",
      controller: "LoginController",
      registration: true
    })
    .state("root.profile", {
      url: "profile/",
      templateUrl: "static/states/profile/profile.html",
      controller: "ProfileController as profile",
      protected: true
    });
}

})();