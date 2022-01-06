/****************************READY************************************* */

var matches = [];
var codeTeam;
var tables;


function barca() {
    codeTeam = "81";
    constructTableScore();
    console.log("barça", codeTeam);
};
function real() {
    codeTeam = "86";
    constructTableScore();
    console.log("real", codeTeam);
};

$(document).ready(function () {
    $('#divModalSaving').show();

});



function constructTableScore() {


    $.ajax({
        headers: { 'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85' },
        url: 'https://api.football-data.org/v2/teams/' + codeTeam + '/matches?',
        dataType: 'json',
        mode: 'no-cors',
        type: 'GET',
    }).done(function (response) {

        var result = response;
        matches = result.matches

        console.log("matches", matches);




        var sHTML = "";
        sHTML += `<thead>`;
        sHTML += `<tr>`;
        // sHTML += `<th>Classement</th>`;
        //sHTML += `<th>Club</th>`;
        //sHTML += `<th>logo</th>`;
        //sHTML += `<th>Matchs joués</th>`;
        sHTML += `<th></th>`;
        sHTML += `<th></th>`;
        sHTML += `<th></th>`;
        sHTML += `<th></th>`;
        sHTML += `</tr>`;
        sHTML += `</thead>`;
        sHTML += `<tbody>`;
        sHTML += `<tr>`;

        matches.forEach(function (match) {


            //sHTML += "<td style='color:red'>" + match.lastUpdated + "</td>";
            //sHTML += "<td>" + match.competition.name + "</td>";
            // sHTML += "<td>" + "<img class='teams_img' width='20%' src=" + match.competition.area.ensignUrl + ">" + "</td>";
            sHTML += "<td>" + match.homeTeam.name + "</td>";
            sHTML += "<td>" + match.score.fullTime.homeTeam + "</td>";
            sHTML += "<td>" + match.score.fullTime.awayTeam + "</td>";
            sHTML += "<td>" + match.awayTeam.name + "</td>";
            // sHTML += "<td>" + match.competition.area.code + "</td>";

            sHTML += `</tr>`;
        })
        sHTML += "</tbody>";
        $('#table_scores').html(sHTML);
        tables = $('#table_scores').DataTable(configurationteams);
    });
}





/******************************CONFIGURATION DATATABLE *******************/

const configurationteams = {
    "stateSave": false,
    "order": [
        [1, "asc"]
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
        "orderable": true /* hometeam */
    },
    {
        "orderable": false /* score */
    },
    {
        "orderable": false /* score */
    },
    {
        "orderable": true /* awayteam */
    },
    ],
    'retrieve': true,
    "responsive": true
};
