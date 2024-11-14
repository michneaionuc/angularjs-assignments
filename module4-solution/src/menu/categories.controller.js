(function() {
    'use strict';

    angular.module("MenuApp")
    .controller("MenuCategoriesController", MenuCategoriesController);

    MenuCategoriesController.$inject = ["categories"]
    function MenuCategoriesController(categories) {
        const categoriesCtrl = this;
        categoriesCtrl.categories = categories;
    }
})();
