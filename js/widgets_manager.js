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

var created_widgets_count = {
    "clock" : 0,
    "weather" : 0,
    "youtube" : 0,
    "twitter" : 0,
    "football" : 0,
    "flickr" : 0,
    "maps" : 0
};

function manage() {

    if(!localStorage.getItem('first_launch')) {
        alert('Add widgets and refresh the page to see that great persistence ! ;)');
        localStorage.setItem('first_launch', 'n');
    }

    //restaure le widget container comme à sa précédente connexion
    if(localStorage.getItem('created_widgets_count')) {
        $("#widgets-container").html(JSON.parse(localStorage.getItem('widgets_storage')));
        created_widgets_count = JSON.parse(localStorage.getItem('created_widgets_count'));
        $("div[class^='ui-resizable']").remove(); //fix resize bug when retreiving from localStorage

        //On update tous les widgets (qui ont besoin d'être update) récupérés du localstorage
        for (var i = 1; i <= created_widgets_count["clock"]; i++) {
            clockUpdate(i);
        }

        for (var i = 1; i <= created_widgets_count["youtube"]; i++) {
            youtubeUpdate(i);
        }

        for (var i = 1; i <= created_widgets_count["twitter"]; i++) {
            twitterUpdate(i);
        }

        for (var i = 1; i <= created_widgets_count["football"]; i++) {
            footballUpdate(i);
        }

        for (var i = 1; i <= created_widgets_count["maps"]; i++) {
            mapsUpdate(i);
        }

        $(".sortable").sortable({
            items: '.panel:not(.unsortable)',
            handle : '.panel-heading',
            revert: true,
            dropOnEmpty: true,
            connectWith: "div.col_custom",
            stop: function (event, ui) {
                var twitter = ui.item.children("[id^=twitter]");

                //Si twitter a été trouvé, c'est qu'il a été drag&drop et donc on le reload (pour fix le bug de la page blanche)
                if (twitter.length > 0) {
                    var id = twitter.attr("id").match(/\d+$/); //get widget id from div id
                    console.log("Reload twitter" + id);
                    reload_twitter(id);
                }
            }
        });

        $(".no-selection").disableSelection();

        $(".panel-widget").resizable({
            minHeight: 200,
            maxHeight: 500,
            handles: 's',
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
                $(this).find(".widget").height(currentHeight - padding);
            }
        });
    }
}

function addWidget(widgetType) {

    var column_destination = 1; //colonnes 1, 2, ou 3

    //On prend la colonne avec le moins de widgets
    if ($("#column1").find(".panel").length > $("#column2").find(".panel").length)
        column_destination = 2;

    if ($("#column" + column_destination).find(".panel").length > $("#column3").find(".panel").length)
        column_destination = 3;

    var panel_widget = $("<div></div>").load("js/widget/layout/panel_widget.html", function () {

        switch (widgetType) {

            case Widgets.CLOCK:
                created_widgets_count["clock"]++;
                $(this).children().children(".panel-heading").children(".title").text("Clock");
                $(this).children().children(".widget").attr("id", "clock" + created_widgets_count["clock"]);
                $(this).find(".reduce").attr("data-target", "#clock" + created_widgets_count["clock"]);
                clockUpdate(created_widgets_count["clock"]);

                //Exceptionnellement on ne le fait pas dans le fichier js correspondant car le clockUpdate est appelé en boucle récursivement
                localStorage.setItem('widgets_storage', JSON.stringify($("#widgets-container").html()));
                localStorage.setItem('created_widgets_count', JSON.stringify(created_widgets_count));
                break;

            case Widgets.WEATHER:
                created_widgets_count["weather"]++;
                $(this).children().children(".panel-heading").children(".title").text("Weather");
                $(this).children().children(".widget").attr("id", "weather" + created_widgets_count["weather"]);
                $(this).find(".reduce").attr("data-target", "#weather" + created_widgets_count["weather"]);
                weatherUpdate(created_widgets_count["weather"]);
                break;

            case Widgets.YOUTUBE:
                created_widgets_count["youtube"]++;
                $(this).children().children(".panel-heading").children(".title").text("Youtube");
                $(this).children().children(".widget").attr("id", "youtube" + created_widgets_count["youtube"]);
                $(this).find(".reduce").attr("data-target", "#youtube" + created_widgets_count["youtube"]);
                youtubeUpdate(created_widgets_count["youtube"]);
                break;

            case Widgets.TWITTER:
                created_widgets_count["twitter"]++;
                $(this).children().children(".panel-heading").children(".title").text("Twitter");
                $(this).children().children(".widget").attr("id", "twitter" + created_widgets_count["twitter"]);
                $(this).find(".reduce").attr("data-target", "#twitter" + created_widgets_count["twitter"]);
                twitterUpdate(created_widgets_count["twitter"]);
                break;

            case Widgets.FOOTBALL:
                created_widgets_count["football"]++;
                $(this).children().children(".panel-heading").children(".title").text("Football");
                $(this).children().children(".widget").attr("id", "football" + created_widgets_count["football"]);
                $(this).find(".reduce").attr("data-target", "#football" + created_widgets_count["football"]);
                footballUpdate(created_widgets_count["football"]);
                break;

            case Widgets.FLICKR:
                created_widgets_count["flickr"]++;
                $(this).children().children(".panel-heading").children(".title").text("Flickr");
                $(this).children().children(".widget").attr("id", "pics" + created_widgets_count["flickr"]);
                $(this).find(".reduce").attr("data-target", "#pics" + created_widgets_count["flickr"]);
                picsUpdate(created_widgets_count["flickr"]);
                break;

            case Widgets.MAPS:
                created_widgets_count["maps"]++;
                $(this).children().children(".panel-heading").children(".title").text("Map");
                $(this).children().children(".widget").attr("id", "maps" + created_widgets_count["maps"]);
                $(this).find(".reduce").attr("data-target", "#maps" + created_widgets_count["maps"]);
                mapsUpdate(created_widgets_count["maps"]);
                break;

        }
        $(this).find(".remove").attr("onclick", 'removeWidget("' + $(this).find(".widget").attr("id") + '");');

        $(this).resizable({
            minHeight: 200,
            maxHeight: 500,
            handles: 's',
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
                $(this).find(".widget").height(currentHeight - padding);
            }
        });
    });

    panel_widget.attr('class', 'panel-widget');
    panel_widget.appendTo("#column" + column_destination);
}

function removeWidget(id) {
    console.log("removing : #" + id);
    $("#" + id).parentsUntil(".ui-resizable").parent().remove();
    saveWidgets();
}

function saveWidgets() {
    localStorage.setItem('widgets_storage', JSON.stringify($("#widgets-container").html()));
    localStorage.setItem('created_widgets_count', JSON.stringify(created_widgets_count));
}