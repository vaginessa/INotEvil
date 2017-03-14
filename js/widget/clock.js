/**
 * Created by sydpy on 3/13/17.
 */

function clockUpdate() {

    $("#clock").load("js/widget/layout/clock.html", function () {
        var today = new Date();

        var h = checkTime(today.getHours());
        var m = checkTime(today.getMinutes());
        var s = checkTime(today.getSeconds());

        $("#time").text(h + ":" + m + ":" + s);
        $("#date").text(today.toDateString());
    });

    setTimeout(clockUpdate, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}