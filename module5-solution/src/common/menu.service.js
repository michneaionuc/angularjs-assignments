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
    service.getMenuItems = function () {
      return $http.get(ApiPath + '/menu_items.json').then(function (response) {
        return response.data;
      });
    };

    service.getMenuItemsByCategory = function (category) {
      return $http
        .get(ApiPath + '/menu_items/' + category + '.json')
        .then(function (response) {
          return response.data;
        });
    };

    service.getFavouriteItem = function (category, number) {
      return $http
        .get(`${ApiPath}/menu_items/${category}/menu_items/${number}.json`)
        .then(function (response) {
          return response.data;
        });
    };
  }
})();
