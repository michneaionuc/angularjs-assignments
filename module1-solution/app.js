(function() {
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.dishes="";
        $scope.message="";

        $scope.checkDishes = function() {
            const dishesArray = $scope.dishes.split(',').filter(item => item.trim() !== '');
            const numberOfDishes = dishesArray.length;
            
            if (numberOfDishes == 0) {
                $scope.message = "Please enter data first";
            } else if (numberOfDishes <= 3) {
                $scope.message = "Enjoy!";
            } else {
                $scope.message = "Too much!";
            }
        }
    }
})()
