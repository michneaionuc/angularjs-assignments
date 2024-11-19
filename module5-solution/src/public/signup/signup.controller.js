(function () {
  'use strict';

  angular.module('public').controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService', 'UserService'];
  function SignupController(MenuService, UserService) {
    var signupCtrl = this;

    signupCtrl.submit = function () {
      MenuService.getFavouriteItem(signupCtrl.user.favouriteDish)
        .then(function (response) {
          if (response === null) {
            signupCtrl.noDish = true;
          } else {
            signupCtrl.user.favoriteItem = response;
            UserService.saveUser(signupCtrl.user);
            signupCtrl.noDish = false;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  }
})();
