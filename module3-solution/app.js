(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItemsDirective)
    .constant("BaseAPI", "https://coursera-jhu-default-rtdb.firebaseio.com");

  function FoundItemsDirective() {
    const ddo = {
      templateUrl: "foundItems.html",
      scope: {
        items: "<",
        onRemove: "&",
      },
    };
    return ddo;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    const ctrl = this;

    ctrl.searchTerm = "";

    ctrl.foundItems;

    ctrl.getMenuItems = function () {
      if (ctrl.searchTerm === "") {
        ctrl.foundItems = [];
        return;
      }

      const promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
      promise
        .then(function (response) {
          ctrl.foundItems = response;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    ctrl.removeItem = function (index) {
      ctrl.foundItems.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ["$http", "BaseAPI"];
  function MenuSearchService($http, BaseAPI) {
    const service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: `${BaseAPI}/menu_items.json`,
      }).then(function (response) {
        let foundItems = [];
        for (const [key, value] of Object.entries(response.data)) {
          for (const item of value.menu_items) {
            if (item.description.includes(searchTerm)) {
              foundItems.push(item);
            }
          }
        }
        return foundItems;
      });
    };
  }
})();
