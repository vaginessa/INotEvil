/**
 * Created by sydpy on 3/13/17.
 */

function youtubeUpdate(id) {
    var youtube = $("#youtube" + id);
    youtube.load("js/widget/layout/youtube.html", function () {
        youtube.find("button").attr("onclick", "newVideo(" + id + ");");
    });
}

function newVideo(id) {

    var youtube = $("#youtube" + id);

    var search = youtube.find(".search:first").val();

    youtube.find(".player")
        .attr("src", "http://www.youtube.com/embed?listType=search&list=" + search);
}
