// MODULE
var angularApp = angular.module('angularApp', ['ngRoute']);
// Route for the app

angularApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })
        .when('/second', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        });

});



// CONTROLLERS
angularApp.controller('mainController', ["$scope", "$filter", function (a, b) {
    a.name = 'Main Page';

}]);
angularApp.controller('secondController', ["$scope", "$filter", function (a, b) {

    a.name = 'Second Page';

}]);
