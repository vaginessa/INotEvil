$(".sortable").sortable({
    items: '.panel:not(.unsortable)',
    revert: true,
    dropOnEmpty: true,
    connectWith: "div.col_custom"
});

$(".sortable").disableSelection();
$(".panel-custom").resizable();