function manage() {
    $(".sortable").sortable({
        items: '.panel:not(.unsortable)',
        revert: true,
        dropOnEmpty: true,
        connectWith: "div.col_custom"
    });

    $(".sortable").disableSelection();
    $(".panel-custom").resizable({
        handles: 's, n',
        containment: "#widgets-container",
        animate: true
    });

    //Empèche
    $(".panel").ready(function () {
        $(".panel").css("min-height", function () {
            return $(this).height();
        });

        $(".panel").css("min-width", function () {
            return $(this).width();
        });
    });
}