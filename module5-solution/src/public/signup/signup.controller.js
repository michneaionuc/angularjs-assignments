(function () {
  'use strict';

  angular.module('public').controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService', 'UserService'];
  function SignupController(MenuService, UserService) {
    const signupCtrl = this;

    signupCtrl.user = {
      favouriteItem: {
        shortName: {
          category: '',
          number: '',
        },
      },
    };

    MenuService.getMenuItems().then(function (response) {
      signupCtrl.menuItems = response;
    });

    signupCtrl.checkFavoriteItem = function () {
      let favDishCategory = signupCtrl.user.favDishShortName;
      if (!!favDishCategory) {
        favDishCategory = favDishCategory.toUpperCase();
        const { category, number } = splitCatgroyAndNumber(favDishCategory);
        signupCtrl.user.favouriteItem.shortName.category = category;
        signupCtrl.user.favouriteItem.shortName.number = number;

        if (category === undefined || number === undefined) {
          signupCtrl.invalidDish = true;
          return;
        } else {
          const categoryDishes = signupCtrl.menuItems[category];
          signupCtrl.invalidDish = !(
            !!categoryDishes && !!categoryDishes.menu_items[number]
          );
        }
      } else {
        signupCtrl.invalidDish = false;
      }
    };

    signupCtrl.submit = function () {
      MenuService.getFavouriteItem(
        signupCtrl.user.favouriteItem.shortName.category,
        signupCtrl.user.favouriteItem.shortName.number
      )
        .then(function (response) {
          if (response !== null) {
            signupCtrl.user.favouriteItem.name = response.name;
            signupCtrl.user.favouriteItem.description = response.description;
            UserService.saveUser(signupCtrl.user);
            signupCtrl.informationSaved = true;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    function splitCatgroyAndNumber(string) {
      const match = string.match(/^([A-Za-z]+)(\d+)$/);
      if (match) {
        return { category: match[1], number: match[2] };
      }
      return { category: string, number: undefined };
    }
  }
})();
