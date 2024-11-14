(function() {
    'use strict';

    angular.module("data")
    .service("MenuDataService", MenuDataService)
    .constant("BaseAPI", "https://coursera-jhu-default-rtdb.firebaseio.com")

    MenuDataService.$inject = ["$http", "BaseAPI"]
    function MenuDataService($http, BaseAPI) {
        const service = this;
        service.getAllCategories = function () {
            return $http({
                method: "GET", 
                url: `${BaseAPI}/categories.json`
            }).then(function(response) {
                return response.data;
            })
        }
        
        service.getItemsForCategory = function (categoryShortName) {
            return $http({
                method: "GET", 
                url: `${BaseAPI}/menu_items/${categoryShortName}.json`
            }).then(function(response) {
                return response.data;
            })
        }
    }
})();
