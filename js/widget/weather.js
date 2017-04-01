/**
 * Created by sydpy on 3/13/17.
 */

var cities = [];

function weatherUpdate(widget_id) {

    $("#weather" + widget_id).load("js/widget/layout/weather.html", function () {
        $(this).attr("onclick", "addCity(" + widget_id + ");");
    });

//    if(localStorage.getItem('cities_weather' + widget_id))
//        cities = localStorage.getItem('cities_weather' + widget_id);

//    else
    loadCityInfos(widget_id, "Bordeaux");
}

function addCity(widget_id) {

    var weather = $("#weather" + widget_id);
    var city = weather.find("#weather-city-search").val();
    weather.find("#weather-city-search").val("");

    loadCityInfos(widget_id, city);
    //localStorage.setItem('cities_weather' + widget_id, cities);
}

function loadCityInfos(widget_id, city) {

    var weather = $("#weather" + widget_id);

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
                weather.find("#weather-icon").attr("id", "weather-icon" + cities.length).attr("src", imageUrl);
                weather.find("#city").attr("id", "city" + cities.length).text(city + ", " + country);
                weather.find("#temp").attr("id", "temp" + cities.length).text(temp + "°C");
                saveWidgets();
            }).attr("class", "list-group-item");

            item.appendTo(weather.find("#city-list"));
        }
    });
}