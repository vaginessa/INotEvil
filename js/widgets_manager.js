/**
 * Created by shellcode on 3/14/17.
 */

Widgets = {
    CLOCK: 0,
    WEATHER: 1,
    YOUTUBE: 2,
    TWITTER: 3,
    FOOTBALL: 4,
    FLICKR: 5,
    MAPS: 6
};

function manage() {

    $(".sortable").sortable({
        items: '.panel:not(.unsortable)',
        handle : '.panel-heading',
        revert: true,
        dropOnEmpty: true,
        connectWith: "div.col_custom",
        stop: function (event, ui) {
            var twitter = ui.item.children("#twitter");

            //Si twitter a été trouvé, c'est qu'il a été drag&drop et donc on le reload (pour fix le bug de la page blanche)
            if (twitter.length > 0) {
                console.log("Reload twitter");
                reload_twitter();
            }
        }
    });

    $(".sortable").disableSelection();

    $(".panel-custom").resizable({
        minHeight: 200,
        maxHeight: 500,
        handles: 's, n',
        containment: "#widgets-container",
        resize: function (event, ui) {
            var currentHeight = ui.size.height;

            // this accounts for padding in the panels +
            // borders, you could calculate this using jQuery
            var padding = 80;

            // this accounts for some lag in the ui.size value, if you take this away
            // you'll get some instable behaviour
            $(this).height(currentHeight);

            // set the content panel width
            $(this).children(".widget").height(currentHeight - padding);
        }
    });
}

function addWidget(widgetType) {

    var column_destination = 1; //colonnes 1, 2, ou 3

    //On prend la colonne avec le moins de widgets
    if ($("#column1").children().length > $("#column2").children().length)
        column_destination = 2;

    if ($("#column" + column_destination).children().length > $("#column3").children().length)
        column_destination = 3;

    $("#column" + column_destination).load("js/widget/layout/panel_widget.html", function () {

        switch (widgetType) {
            case Widgets.CLOCK:
                $(this).children().children(".panel-heading").children(".title").text("Clock");
                $(this).children().children(".widget").attr("id", "clock");
                clockUpdate();
                break;

            case Widgets.WEATHER:
                $(this).children().children(".panel-heading").children(".title").text("Weather");
                $(this).children().children(".widget").attr("id", "weather");
                weatherUpdate();
                break;

            case Widgets.YOUTUBE:
                $(this).children().children(".panel-heading").children(".title").text("Youtube");
                $(this).children().children(".widget").attr("id", "youtube");
                youtubeUpdate();
                break;

            case Widgets.TWITTER:
                $(this).children().children(".panel-heading").children(".title").text("Twitter");
                $(this).children().children(".widget").attr("id", "twitter");
                twitterUpdate();
                break;

            case Widgets.FOOTBALL:
                $(this).children().children(".panel-heading").children(".title").text("Football");
                $(this).children().children(".widget").attr("id", "football");
                footballUpdate();
                break;

            case Widgets.FLICKR:
                $(this).children().children(".panel-heading").children(".title").text("Flickr");
                $(this).children().children(".widget").attr("id", "pics");
                picsUpdate();
                break;

            case Widgets.MAPS:
                $(this).children().children(".panel-heading").children(".title").text("Map");
                $(this).children().children(".widget").attr("id", "maps");
                mapsUpdate();
                break;
        }
    });
}

