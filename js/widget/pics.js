/**
 * Created by sydpy on 3/14/17.
 */

var last_id_used;

function picsUpdate(id_widget) {
    $("#pics" + id_widget).load("js/widget/layout/pics.html", function () {
        $(this).find("button").attr("onclick", "newPic(" + id_widget + ");");
    });
}

function newPic(id_widget) {
    var  search = $("#pics" + id_widget).find("#pics-search").val();
    last_id_used = id_widget;

    $.ajax({
        url: 'https://api.flickr.com/services/feeds/photos_public.gne',
        dataType: 'jsonp',
        data: { "tags": search , "format": "json" }
    });
}

function jsonFlickrFeed(json) {
    if(json.items !== "undefined"
        && json.items.length > 0 ){

        $("#pics" + last_id_used).find("#image").removeAttr("src").attr("src",json.items[0].media.m);
        saveWidgets();

    } else {
        alert("No picture were found !");
    }

};