/**
 * Created by sydpy on 3/14/17.
 */

var map;
var geocoder;

function mapsUpdate() {
    $("#maps").load("js/widget/layout/maps.html", function () {
        geocoder = new google.maps.Geocoder();
        initialize();
    });
}

function initialize() {

    var gradignus = new google.maps.LatLng(44.791388, -0.605713);
    var mapOptions = {
        zoom: 10,
        center: gradignus
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function newLocation() {

    var search = $("#maps-location").val();

    geocoder.geocode({'address': search}, function (results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

}