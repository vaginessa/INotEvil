/**
 * Created by sydpy on 3/13/17.
 */

function clockUpdate(){

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var t = setTimeout(clockUpdate, 1000);

    $("#clock").empty();

    $("<h1></h1>").text(h + ":" + m + ":" + s).appendTo("#clock");
    $("<p></p>").text(today.toDateString()).appendTo("#clock");
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}