/**
 * Created by shellcode on 3/14/17.
 */

function manage() {

    update();

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

function update() {
    clockUpdate();
    weatherUpdate();
    youtubeUpdate();
    twitterUpdate();
    footballUpdate();
    picsUpdate();
}
