/**
 * Created by sydpy on 3/13/17.
 */

var cities = [];

function meteoUpdate() {

    $("#meteo").empty();
    $("#meteo").load("js/widgets/layout/meteo.html");

    cities.forEach(function (c) {
        loadCityInfos(c);
    });
}

function addCity() {

    var city = $("#meteo-city-search").val();
    $("#meteo-city-search").val("");

    loadCityInfos(city);
}

function loadCityInfos(city) {

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?appid=9b45f2f2f37d5dbbf9b99aefc602204f&units=metric&q=" + city, function (result) {

        if (result.cod !== "undefined"
            && result.cod == 200
            && result.weather !== "undefined"
            && result.weather.length > 0
            && result.main !== "undefined") {

            cities.push(city);

            var imageUrl = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
            var temp = result.main.temp;

            var country = result.sys.country;

            var item = $("<li></li>").load("js/widgets/layout/meteo-item.html", function () {
                $("#weather-icon").attr("id", "weather-icon" + cities.length).attr("src", imageUrl);
                $("#city").attr("id", "city" + cities.length).text(city + ", " + country);
                $("#temp").attr("id", "temp" + cities.length).text(temp + "°C");
            }).attr("class", "list-group-item");

            item.appendTo("#city-list");
        }
    });
}