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
      templateUrl: "static/states/Root.html",
      controller: "Root as Root"
    })
    .state("root.home", {
      url: "",
      templateUrl: "static/states/Home/Home.html",
      controller: "Home as Home"
    })
    .state("root.signup", {
      url: "signup/",
      templateUrl: "static/states/Signup/Signup.html",
      controller: "Signup as Signup",
      registration: true
    })
    .state("root.login", {
      url: "login/",
      templateUrl: "static/states/Login/Login.html",
      controller: "Login as Login",
      registration: true
    })
    .state("root.profile", {
      url: "profile/",
      templateUrl: "static/states/Profile/Profile.html",
      controller: "Profile as Profile",
      protected: true
    });
}

})();