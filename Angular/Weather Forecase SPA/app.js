//Module

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//Routes

weatherApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        });

});

//Services

weatherApp.service('cityService', function () {
    this.city = "New York, NY";
});

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

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=f0f3f1d0722117257c8c032691eb65df", {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "JSONP"
        }
    });

    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: $scope.days
    });

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


//Directives

weatherApp.directive('weatherReport', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }

    };
});
