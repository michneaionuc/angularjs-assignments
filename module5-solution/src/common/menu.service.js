(function () {
  'use strict';

  angular.module('common').service('MenuService', MenuService);

  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };

    service.getMenuItems = function (category) {
      return $http
        .get(ApiPath + '/menu_items/' + category + '.json')
        .then(function (response) {
          return response.data;
        });
    };

    service.getFavouriteItem = function (categoryShortName) {
      return $http
        .get(
          `${ApiPath}/menu_items/${categoryShortName[0]}/menu_items/${categoryShortName[1]}.json`
        )
        .then(function (response) {
          return response.data;
        });
    };
  }
})();
