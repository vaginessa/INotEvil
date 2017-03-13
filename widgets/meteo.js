/**
 * Created by sydpy on 3/13/17.
 */

var cities = [];

function meteoUpdate(){

    $("#meteo").empty();

    var search = $("<input/>").attr("type","text").attr("id","meteo-city-search");
    var button = $("<button></button>").attr("type","button").attr("onclick", "addCity();").text("Ajouter");

    var form = $("<form></form>").append(search).append(button);

    form.appendTo("#meteo");

    var ul = $("<ul></ul>").attr("id","meteo-city-list");

    cities.forEach(function(c){
        $("<li></li>").html(c).appendTo(ul);
    });

    ul.appendTo("#meteo");
}

function addCity(){

    var city =  $("#meteo-city-search").val();
    $("#meteo-city-search").val("");

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?appid=9b45f2f2f37d5dbbf9b99aefc602204f&lang=fr&units=metric&q="+city, function(result){
        if(result.cod !== "undefined"
            && result.cod == 200
            && result.weather !== "undefined"
            && result.weather.length > 0
            && result.main !=="undefined"){

            var imageUrl = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
            var temp = result.main.temp;


            var li = $("<li></li>");

            var ul = $("<ul></ul>");

            $("<li></li>").text(city).appendTo(ul);
            $("<li></li>").text(temp + "°C").appendTo(ul);
            $("<img />").attr("src", imageUrl).appendTo("<li></li>").appendTo(ul);
            ul.appendTo(li);
            li.appendTo("#meteo-city-list");

            cities.push(city);
        }
    });

}