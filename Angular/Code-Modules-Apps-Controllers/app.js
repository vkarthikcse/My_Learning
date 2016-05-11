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
    };
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
        },
        link: function (scope, elem, attr) {
            if (scope.personObject.name.indexOf("Karthik") !== -1) {
                elem.removeAttr("class");
            }
            elem[0].addEventListener('click', function () {
                console.log("the element is clicked and binded dynamically");
            });
            console.log(scope.personObject.name + scope.personObject.town);
        }
    };

});
