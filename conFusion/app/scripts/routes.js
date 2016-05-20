//Routes for the restaurant application

restaurantApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/menu.html',
            controller: 'menuController'
        });
});
