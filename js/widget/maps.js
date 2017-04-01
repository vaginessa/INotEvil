/**
 * Created by sydpy on 3/14/17.
 */

var map = {};
var geocoder;

function mapsUpdate(id) {

    var maps = $("#maps" + id);

    maps.load("js/widget/layout/maps.html", function () {
        geocoder = new google.maps.Geocoder();
        maps.find("button").attr("onclick","newLocation(" + id + ");");
        maps.find(".map").attr("id","map" + id);
        initialize(id);
        saveWidgets();
    });
}

function initialize(id) {

    var gradignus = new google.maps.LatLng(44.791388, -0.605713);
    var mapOptions = {
        zoom: 10,
        center: gradignus
    };
    map["" + id] = new google.maps.Map(document.getElementById("map" + id), mapOptions);

    if(localStorage.getItem('location')) {
        var location = JSON.parse(localStorage.getItem('location'));

        map["" + id].setCenter(location);
        var marker = new google.maps.Marker({
            map: map["" + id],
            position: location
        });
    }
}

function newLocation(id) {

    var search = $("#maps" + id).find(".search:first").val();

    geocoder.geocode({'address': search}, function (results, status) {
        if (status == 'OK') {
            map["" + id].setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map["" + id],
                position: results[0].geometry.location
            });

            localStorage.setItem('location', JSON.stringify(results[0].geometry.location));
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

}