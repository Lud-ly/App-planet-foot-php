/****************************READY************************************* */

var tables;
var equipes = [];
var codeApiOfLeagues = ["FL1", "PD", "SA", "BL1", "PL"];
var codeTeam = "FL1";
var result;
var standings;
var tables;
var teams;



function fl1() {
    codeTeam = "FL1";
    constructTableTeams();
    console.log("FL1", codeTeam);
};
function pd() {
    codeTeam = "PD";
    constructTableTeams();
    console.log("PD", codeTeam);
};
function sa() {
    codeTeam = "SA";
    constructTableTeams();
    console.log("SA", codeTeam);
};
function bl1() {
    codeTeam = "BL1";
    constructTableTeams();
    console.log("BL1", codeTeam);
};

function pl() {
    codeTeam = "PL";
    constructTableTeams();
    console.log("PL", codeTeam);
};

$(document).ready(function () {
    // $('#divModalSaving').show();
    // INIT DATATABLE
    // Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
    // tables.page.len(10).draw();
    //Loading supplier list

});



function constructTableTeams() {


    $.ajax({
        headers: { 'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85' },
        url: 'https://api.football-data.org/v2/competitions/' + codeTeam + '/standings?',
        dataType: 'json',
        mode: 'no-cors',
        type: 'GET',
    }).done(function (response) {

        result = response;
        standings = result.standings[0];
        tables = standings.table;
        teams = tables;

        console.log("teams", teams);
    });



    var sHTML = "";
    sHTML += `<thead>`;
    sHTML += `<tr>`;
    sHTML += `<th>Classement</th>`;
    sHTML += `<th>Club</th>`;
    sHTML += `<th>logo</th>`;
    sHTML += `<th>Matchs joués</th>`;
    sHTML += `<th>Victoire</th>`;
    sHTML += `<th>Défaite</th>`;
    sHTML += `<th>Nul</th>`;
    sHTML += `<th>buts marqués</th>`;
    sHTML += `<th>buts encaissés</th>`;
    sHTML += `<th>Diff</th>`;
    sHTML += `<th>Points</th>`;
    sHTML += `</tr>`;
    sHTML += `</thead>`;
    sHTML += `<tbody>`;
    sHTML += `<tr>`;

    teams.forEach(function (team) {


        sHTML += "<td style='color:red'>" + team.position + "</td>";
        sHTML += "<td>" + team.team.name + "</td>";
        sHTML += "<td>" + "<img class='teams_img' width='40%' src=" + team.team.crestUrl + ">" + "</td>";
        sHTML += "<td>" + team.playedGames + "</td>";
        sHTML += "<td>" + team.won + "</td>";
        sHTML += "<td>" + team.lost + "</td>";
        sHTML += "<td>" + team.draw + "</td>";
        sHTML += "<td>" + team.goalsFor + "</td>";
        sHTML += "<td>" + team.goalsAgainst + "</td>";
        sHTML += "<td>" + team.goalDifference + "</td>";
        sHTML += "<td style='background-color:rgb(214, 207, 207)'>" + team.points + "</td>";


        sHTML += `</tr>`;
    })
    sHTML += "</tbody>";
    $('#table_teams').html(sHTML);
    tables = $('#table_teams').DataTable(configuration);

}





/******************************CONFIGURATION DATATABLE *******************/

const configuration = {
    "stateSave": false,
    "aaSorting": [
        [0, "asc"]
    ],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, "Tous"]
    ],
    "language": {
        "info": "Equipes _START_ à _END_ sur _TOTAL_",
        "emptyTable": "Aucune Equipe",
        "lengthMenu": "_MENU_ Equipes par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Equipe 0 à 0 sur 0 sélectionnée",
    },
    "columns": [{
        "orderable": true /* image */
    },
    {
        "orderable": true /* Société */
    },
    {
        "orderable": true /* email */
    },
    {
        "orderable": true /* email */
    },
    {
        "orderable": true /* email */
    },
    {
        "orderable": true /* email */
    },
    {
        "orderable": true /* email */
    },
    {
        "orderable": true /* email */
    },
    {
        "orderable": true /* ville */
    },
    {
        "orderable": true /* Action */
    },
    {
        "orderable": true/* Map */
    },
    ],
    'retrieve': true,
    "responsive": true
};
