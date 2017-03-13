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

    //TODO

    cities.push(city);
    $("<li></li>").html(city).appendTo("#meteo-city-list");
}