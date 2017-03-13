/**
 * Created by sydpy on 3/13/17.
 */

function dateTimeUpdate(){

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var t = setTimeout(dateTimeUpdate, 1000);

    $(".date-time").empty();

    $("<h1></h1>").text(h + ":" + m + ":" + s).appendTo(".date-time");
    $("<p></p>").text(today.toDateString()).appendTo(".date-time");
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}