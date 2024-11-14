(function() {
    'use strict';

    angular.module("MenuApp")
    .controller("MenuItemsController", MenuItemsController);

    MenuItemsController.$inject = ["items"]
    function MenuItemsController(items) {
        const itemsCtrl = this;
        itemsCtrl.items = items;
    }
})();
