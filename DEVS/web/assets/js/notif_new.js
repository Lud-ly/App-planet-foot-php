var aNotif = [];
aNotif[0] = [];
aNotif[0]["date"] = "2020-06-23";
aNotif[0]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut. Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[1] = [];
aNotif[1]["date"] = "2020-06-24";
aNotif[1]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[2] = [];
aNotif[2]["date"] = "2020-06-23";
aNotif[2]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut. Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[3] = [];
aNotif[3]["date"] = "2020-06-23";
aNotif[3]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[4] = [];
aNotif[4]["date"] = "2020-06-23";
aNotif[4]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[5] = [];
aNotif[5]["date"] = "2019-07-23";
aNotif[5]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[6] = [];
aNotif[6]["date"] = "2020-06-23";
aNotif[6]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut. Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[7] = [];
aNotif[7]["date"] = "2020-06-23";
aNotif[7]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[8] = [];
aNotif[8]["date"] = "2020-06-23";
aNotif[8]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut. Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[9] = [];
aNotif[9]["date"] = "2020-06-23";
aNotif[9]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[10] = [];
aNotif[10]["date"] = "2020-08-21";
aNotif[10]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

aNotif[11] = [];
aNotif[11]["date"] = "2020-06-30";
aNotif[11]["notification"] = "Et Caesaribus efferatarum permisit regenda gentium urbs sempiterna suis retinacula gentium et liberis Caesaribus velut.";

function constructTable() {
    var i;

    var sHTML = "";
    sHTML += "<thead>";
    sHTML += "<tr>";
    sHTML += "<th>Date</th>";
    sHTML += "<th>Notifications</th>";
    sHTML += "<th>Supprimer</th>";
    sHTML += "</tr>";
    sHTML += "</thead>";
    sHTML += "<tbody>";

    for (i = 0; i < aNotif.length; i++) {
        sHTML += "<tr>";
        sHTML += "<td class=\"date\">" + aNotif[i]["date"] + "</td>";
        sHTML += "<td class=\"notif\">" + aNotif[i]["notification"] + "</td>";
        sHTML += "<td class=\"sup\" onClick=\"supprimNotif(" + i + ")\">Supprimer</td>";
        sHTML += "</tr>";
    }

    sHTML += "</tbody>";
    $('#tableNotif').html(sHTML);
    $('#date').val("");
    $('#notification').val("");
}

// CONFIGURATION DATATABLE
const configuration = {
    "stateSave": false,
    "order": [
        [0, "desc"]
    ],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, "Tout"]
    ],
    "language": {
        "info": "Notifications _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucune notification",
        "lengthMenu": "_MENU_ Notifications par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Notification 0 à 0 sur 0 sélectionnée",
    },
    "columns": [{
            "orderable": true
        },
        {
            "orderable": false
        },
        {
            "orderable": false
        },
    ],
    'retrieve': true
};

var tables;
$(document).ready(function () {
    constructTable();
    // INIT DATATABLE
    tables = $("#tableNotif").DataTable(configuration);
});

function construct() {
    tables.destroy();
    constructTable();
    tables = $("#tableNotif").DataTable(configuration);
}

function supprimNotif(iIndiceEdit) {
    aNotif.splice(iIndiceEdit, 1);
    construct();
}