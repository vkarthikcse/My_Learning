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

angularApp.service('myService', function () {
    var self = this;

    this.name = "Inside service";
    this.nameLength = function () {
        return self.name.length;
    };
});



// CONTROLLERS
angularApp.controller('mainController', ["$scope", "$log", "myService", function (a, b, myService) {

    a.name = myService.name;
    b.log(myService.name);
    b.log(myService.nameLength());
    a.$watch('name', function () {
        myService.name = a.name;
    });

}]);
angularApp.controller('secondController', ["$scope", "$log", "myService", function (a, b, myService) {
    a.name = myService.name;
    b.log(myService.name);
    b.log(myService.nameLength());
    a.$watch('name', function () {
        myService.name = a.name;
    });
}]);
