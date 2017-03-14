/**
 * Created by sydpy on 3/14/17.
 */

function picsUpdate() {

    $("#pics").empty();
    $("#pics").load("js/widgets/layout/pics.html");
}

function newPic() {
    var  search = $("#pics-search").val();

    $.ajax({
        url: 'https://api.flickr.com/services/feeds/photos_public.gne',
        dataType: 'jsonp',
        data: { "tags": search , "format": "json" }
    });
}

function jsonFlickrFeed(json) {
    if(json.items !== "undefined"
        && json.items.length > 0 ){

        $("#image").removeAttr("src").attr("src",json.items[0].media.m);

    } else {
        alert("No picture were found !");
    }

};