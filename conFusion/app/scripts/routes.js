//Routes for the restaurant application

restaurantApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/dish.html',
            controller: 'restaurantController'
        });
});
