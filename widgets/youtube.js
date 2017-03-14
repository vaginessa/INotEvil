/**
 * Created by sydpy on 3/13/17.
 */

function youtubeUpdate(){

    $("#youtube").empty();
    var search = $("<input/>").attr("type","text").attr("id","youtube-video-search");

    var button = $("<button></button>").attr("type","button").attr("onclick", "newVideo();").text("Chercher");

    var form = $("<form></form>").append(search).append(button);

    form.appendTo("#youtube");

    $("<iframe />", {
        id : "youtube-player",
        src : "http://www.youtube.com/embed?listType=search&list=tchoin",
        type : "text/html",
        frameborder : 0
    }).appendTo("#youtube");
}

function newVideo(){

    var search = $("#youtube-video-search").val();

    $("#youtube-video-search").val("");

    $("#youtube-player")
        .attr("src","http://www.youtube.com/embed?listType=search&list=" + search);
}
