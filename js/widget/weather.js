/**
 * Created by sydpy on 3/13/17.
 */

var cities = [];

function weatherUpdate() {

    $("#weather").empty();
    $("#weather").load("js/widget/layout/weather.html");

    loadCityInfos("Bordeaux");
}

function addCity() {

    var city = $("#weather-city-search").val();
    $("#weather-city-search").val("");

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

            var item = $("<li></li>").load("js/widget/layout/weather-item.html", function () {
                $("#weather-icon").attr("id", "weather-icon" + cities.length).attr("src", imageUrl);
                $("#city").attr("id", "city" + cities.length).text(city + ", " + country);
                $("#temp").attr("id", "temp" + cities.length).text(temp + "°C");
            }).attr("class", "list-group-item");

            item.appendTo("#city-list");
        }
    });
}