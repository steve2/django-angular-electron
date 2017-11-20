(function () {
"use strict";

angular
  .module("app")
  .factory("User", UserService);

UserService.$inject = ['$rootScope', '$q'];

function UserService ($rootScope, $q) {

  return {
    socialAccount: _find_social_account,
  };

  function _find_social_account(userObject, provider) {
    if (!('socialaccount_set' in userObject))
      return null;
    for (let index in userObject['socialaccount_set'])
      if (userObject['socialaccount_set'][index].provider == provider)
        return userObject['socialaccount_set'][index];
    return null;
  }

}

})();