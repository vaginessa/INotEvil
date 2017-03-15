/**
 * Created by shellcode on 3/15/17.
 */

var api_token = '041cf92994244e7482554634a459deb9';

function footballUpdate() {

    $("#football").load("js/widget/layout/football.html", function (){


        $('#football-search').typeahead({
            source: function (query, process) {

                $.ajax({
                    headers: { 'X-Auth-Token': api_token },
                    url: 'http://api.football-data.org/v1/teams?name=' + $("#football-search").val(),
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
    });

    loadFixturesOfTeam(526); //Bordeaux
}

function showFixtures() {

    $("#fixtures-list").empty();

    $.ajax({
        headers: { 'X-Auth-Token': api_token },
        url: 'http://api.football-data.org/v1/teams?name=' + $("#football-search").val(),
        dataType: 'json',
        type: 'GET'
    }).done(function(response) {
        loadFixturesOfTeam(response.teams[0].id);
    });
}

function loadFixturesOfTeam(id) {

    $.ajax({
        headers: { 'X-Auth-Token': api_token },
        url: 'http://api.football-data.org/v1/teams/' + id + "/fixtures",
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
                        });
                    });

                    $(this).find("#score").text(fixtures[key].result.goalsHomeTeam + " - " + fixtures[key].result.goalsAwayTeam);
                    $(this).find("#date-fixture").text(fixtures[key].date.split("T")[0]);
                    $(this).appendTo("#fixtures-list");
                }).attr("class", "list-group-item");

                return finished_fixtures_count < 10; //Permet de n'avoir que 10 éléments au maximum
            }
        });
    });
}