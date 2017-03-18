/**
 * Created by shellcode on 3/14/17.
 */

Widgets = {
    CLOCK : 0,
    WEATHER : 1,
    YOUTUBE : 2,
    TWITTER : 3,
    FOOTBALL : 4,
    FLICKR : 5,
    MAPS : 6
};

function manage() {

    $(".sortable").sortable({
        items: '.panel:not(.unsortable)',
        revert: true,
        dropOnEmpty: true,
        connectWith: "div.col_custom",
        stop: function(event, ui) {
            var twitter = ui.item.children("#twitter");

            //Si twitter a été trouvé, c'est qu'il a été drag&drop et donc on le reload (pour fix le bug de la page blanche)
            if(twitter.length > 0) {
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

    console.log("" + $("#column1").children().length + " " + $("#column2").children().length + " " + $("#column3").children().length);

    //On prend la colonne avec le moins de widgets
    if($("#column1").children().length > $("#column2").children().length)
        column_destination = 2;

    if($("#column" + column_destination).children().length > $("#column3").children().length)
        column_destination = 3;

    var panel_widget = $("<div></div>") .attr("class", "panel panel-primary panel-custom")
                                        .append('<div class="panel-heading unsortable"></div>')
                                        .append('<div class="widget panel-body unsortable"></div>');

    $("#column" + column_destination).append(panel_widget);

    switch (widgetType) {
        case Widgets.CLOCK:
            panel_widget.children(".panel-heading").text("Clock");
            panel_widget.children(".widget").attr("id", "clock");
            clockUpdate();
            break;

        case Widgets.WEATHER:
            panel_widget.children(".panel-heading").text("Weather");
            panel_widget.children(".widget").attr("id", "weather");
            weatherUpdate();
            break;

        case Widgets.YOUTUBE:
            panel_widget.children(".panel-heading").text("Youtube");
            panel_widget.children(".widget").attr("id", "youtube");
            youtubeUpdate();
            break;

        case Widgets.TWITTER:
            panel_widget.children(".panel-heading").text("Twitter");
            panel_widget.children(".widget").attr("id", "twitter");
            twitterUpdate();
            break;

        case Widgets.FOOTBALL:
            panel_widget.children(".panel-heading").text("Football");
            panel_widget.children(".widget").attr("id", "football");
            footballUpdate();
            break;

        case Widgets.FLICKR:
            panel_widget.children(".panel-heading").text("Flickr");
            panel_widget.children(".widget").attr("id", "pics");
            picsUpdate();
            break;

        case Widgets.MAPS:
            panel_widget.children(".panel-heading").text("Map");
            panel_widget.children(".widget").attr("id", "maps").append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBn1D5NzOcdVR1r4PBqLYKJh5Gb6zdb9DA&callback=mapsUpdate"></script>');
            break;
    }
}
