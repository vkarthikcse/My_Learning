//Controller for restaurant application

restaurantApp.controller('restaurantController', ['$scope', 'dishListService', function ($scope, dishListService) {

    $scope.dishes = dishListService.dishes;

}]);
