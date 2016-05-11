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

    a.people = [{
        name: "Karthik Vadivel",
        town: "Pollachi",
        city: "Coimbatore"
    }, {
        name: "Senthil Vadivel",
        town: "Pollachi",
        city: "Coimbatore"
    }, {
        name: "Meenachi Vadivel",
        town: "Pollachi",
        city: "Coimbatore"
    }, {
        name: "Karthik Vadivel",
        town: "Pollachi",
        city: "Coimbatore"
    }];

    a.format = function (person) {
        return person.town + ", " + person.city;
    }
}]);
angularApp.controller('secondController', ["$scope", "$log", "myService", function (a, b, myService) {

}]);


angularApp.directive('searchResult', function () {
    return {

        templateUrl: 'directives/searchresult.html',
        replace: true,
        scope: {
            personObject: "=",
            formattedAddress: "&"
        }
    };
});
