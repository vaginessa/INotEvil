/**
 * Created by sydpy on 3/13/17.
 */

function clockUpdate(id) {

    $("#clock" + id).load("js/widget/layout/clock.html", function () {
        var today = new Date();

        var h = checkTime(today.getHours());
        var m = checkTime(today.getMinutes());
        var s = checkTime(today.getSeconds());

        $(this).children("#time").text(h + ":" + m + ":" + s);
        $(this).children("#date").text(today.toDateString());
    });

    setTimeout(function(){
        clockUpdate(id);
    }, 100);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}