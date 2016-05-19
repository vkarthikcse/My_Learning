//Controller for restaurant application

restaurantApp.controller('dishController', ['$scope', 'dishListService', function ($scope, dishListService) {

    $scope.dishes = dishListService.dishes;

}]);
