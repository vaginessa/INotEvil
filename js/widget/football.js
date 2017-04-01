/**
 * Created by shellcode on 3/15/17.
 */

var api_token = '041cf92994244e7482554634a459deb9';

function footballUpdate(widget_id) {

    var football = $("#football" + widget_id);

    football.load("js/widget/layout/football.html", function (){

        var search_foot = football.find('#football-search');

        search_foot.typeahead({
            source: function (query, process) {

                $.ajax({
                    headers: { 'X-Auth-Token': api_token },
                    url: 'http://api.football-data.org/v1/teams?name=' + search_foot.val(),
                    dataType: 'json',
                    type: 'GET'
                }).done(function(response) {
                    var teams = response.teams;

                    if(teams && teams.length !== 0)
                        process(teams);
                });
            },
            autoSelect: true,
            minLength: 3
        });

        football.find(".btn").attr("onclick", "showFixtures(" + widget_id + ");");

        if(localStorage.getItem('current_team_id' + widget_id))
            loadFixturesOfTeam(widget_id, localStorage.getItem('current_team_id' + widget_id))
        else
            loadFixturesOfTeam(widget_id, 526); //Bordeaux
    });
}

function showFixtures(widget_id) {

    var football = $("#football" + widget_id);

    football.children("#fixtures-list").empty();

    $.ajax({
        headers: { 'X-Auth-Token': api_token },
        url: 'http://api.football-data.org/v1/teams?name=' + football.find("#football-search").val(),
        dataType: 'json',
        type: 'GET'
    }).done(function(response) {
        loadFixturesOfTeam(widget_id, response.teams[0].id);
    });
}

function loadFixturesOfTeam(widget_id, team_id) {

    localStorage.setItem('current_team_id' + widget_id, team_id);

    $.ajax({
        headers: { 'X-Auth-Token': api_token },
        url: 'http://api.football-data.org/v1/teams/' + team_id + "/fixtures",
        dataType: 'json',
        type: 'GET'
    }).done(function(response) {

        var fixtures = response.fixtures.reverse(); //reverse pour avoir les derniers match en premier
        var finished_fixtures_count = 0;

        $.each(fixtures, function(key, value) {
            if(fixtures[key].status == "FINISHED") { //On affiche que les matchs terminés (pour afficher le score !)
                finished_fixtures_count++;

                $("<li></li>").load("js/widget/layout/football-item.html", function () {
                    var home_img = $(this).find("#home-img");
                    var away_img = $(this).find("#away-img");

                    $.ajax({
                        headers: { 'X-Auth-Token': api_token },
                        url: fixtures[key]._links.homeTeam.href,
                        dataType: 'json',
                        type: 'GET'
                    }).done(function(response) {

                        $.ajax({
                            url:response.crestUrl,
                            type:'HEAD',
                            error: function()
                            {
                                home_img.attr("src", "img/notfound.png");
                            },
                            success: function()
                            {
                                home_img.attr("src", response.crestUrl); //On récupère l'image du club away
                            }
                        }).done(function () {
                            saveWidgets();
                        });
                    });

                    $.ajax({
                        headers: { 'X-Auth-Token': api_token },
                        url: fixtures[key]._links.awayTeam.href,
                        dataType: 'json',
                        type: 'GET'
                    }).done(function(response) {

                        $.ajax({
                            url:response.crestUrl,
                            type:'HEAD',
                            error: function()
                            {
                                away_img.attr("src", "img/notfound.png");
                            },
                            success: function()
                            {
                                away_img.attr("src", response.crestUrl); //On récupère l'image du club away
                            }
                        }).done(function () {
                            saveWidgets();
                        });
                    });

                    $(this).find("#score").text(fixtures[key].result.goalsHomeTeam + " - " + fixtures[key].result.goalsAwayTeam);
                    $(this).find("#date-fixture").text(fixtures[key].date.split("T")[0]);
                    $(this).appendTo($("#football"+widget_id).find("#fixtures-list"));
                }).attr("class", "list-group-item");

                return finished_fixtures_count < 10; //Permet de n'avoir que 10 éléments au maximum
            }
        });
    });
}