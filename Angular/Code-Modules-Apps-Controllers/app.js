// MODULE
var angularApp = angular.module('angularApp', ['ngMessages']);

// CONTROLLERS
angularApp.controller('mainController', ["$scope", "$filter", function (a, b) {
    a.name = "";

    a.lowercaseName = function () {
        return b('lowercase')(a.name);
    }

    a.characters = 5;

    a.rules = [
        {
            rulename: "Must be 5 characters"
        },
        {
            rulename: "No special characters allowed"
        },
        {
            rulename: "Nothing can stop you from learning"
        }

    ]
}]);
