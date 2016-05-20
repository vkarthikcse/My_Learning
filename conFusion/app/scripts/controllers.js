//Controller for restaurant application

restaurantApp.controller('menuController', ['$scope', 'menuListService', function ($scope, menuListService) {

    $scope.dishes = menuListService.dishes;
    $scope.tab = 1;
    $scope.select = function (setTab) {
        $scope.tab = setTab;
        if (setTab === 2) {
            $scope.filterText = 'appetizer';
        } else if (setTab === 3) {
            $scope.filterText = 'mains';
        } else if (setTab === 4) {
            $scope.filterText = 'dessert';
        } else {
            $scope.filterText = '';
        }
    };

    $scope.isSelected = function (checkTab) {
        return $scope.tab === checkTab;
    };

}]);
