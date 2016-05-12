//Services

weatherApp.service('cityService', function () {
    this.city = "New York, NY";
});

weatherApp.service('weatherService', ['$resource', function ($resource) {
    this.getWeather = function (city, days) {

        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=f0f3f1d0722117257c8c032691eb65df", {
            callback: "JSON_CALLBACK"
        }, {
            get: {
                method: "JSONP"
            }
        });

        return $scope.weatherAPI.get({
            q: city,
            cnt: days
        });
    }
}]);
