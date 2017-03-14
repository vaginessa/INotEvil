$(".sortable").sortable({
    items: 'div:not(.unsortable)',
    revert: true,
    dropOnEmpty: true,
    connectWith: "div.col_custom"
});

$(".sortable").disableSelection();
$(".panel-custom").resizable();