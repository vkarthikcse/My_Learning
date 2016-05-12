//Controllers

weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {
    $scope.city = cityService.city;

    $scope.submit = function () {
        $location.path("/forecast");
    };

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', 'weatherService'function ($scope, $routeParams, cityService, weatherService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';

    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);

    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    };

    $scope.convertToFarenheit = function (tempK) {
        return Math.round(tempK - 273.15);
    };

    console.log($scope.weatherResult);
    $scope.$watch('city', function () {
        cityService.city = $scope.city;

    });

}]);
