/**
 * Created by sydpy on 3/13/17.
 */

function youtubeUpdate(){
    $("#youtube").empty();
    $("#youtube").load("js/widget/layout/youtube.html");
}

function newVideo(){

    var search = $("#youtube-video-search").val();

    $("#youtube-video-search").val("");

    $("#youtube-player")
        .attr("src","http://www.youtube.com/embed?listType=search&list=" + search);
}
