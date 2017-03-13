/**
 * Created by sydpy on 3/13/17.
 */

function twitterUpdate(){

    $("#twitter").empty();

    var search = $("<input/>").attr("type","text").attr("id","twitter-feed-search");
    var button = $("<button></button>").attr("type","button").attr("onclick", "twitterSearch();").text("Chercher");

    var form = $("<form></form>").append(search).append(button);

    form.appendTo("#twitter");
}

function videoSearch(){

    var search = $("#twitter-feed-search").val();
    $("#youtube-video-search").val("");

    //TODO
}
