/**
 * Created by sydpy on 3/13/17.
 */

function twitterUpdate(id) {
    reload_twitter(id);
}

function reload_twitter(id) {
    $("#twitter" + id).load("js/widget/layout/twitter.html", function () {
        saveWidgets();
    });
}