/**
 * Created by sydpy on 3/13/17.
 */

function youtubeUpdate(){

    $("#youtube").empty();

    var search = $("<input/>").attr("type","text").attr("id","youtube-video-search");
    var button = $("<button></button>").attr("type","button").attr("onclick", "videoSearch();").text("Chercher");

    var form = $("<form></form>").append(search).append(button);

    form.appendTo("#youtube");
}

function videoSearch(){

    var search = $("#youtube-video-search").val();
    $("#youtube-video-search").val("");

    //TODO
}
