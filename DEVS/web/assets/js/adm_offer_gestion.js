var aOfPaniers = [];
aOfPaniers[0] = [];
aOfPaniers[0]["num_panier"] = "00001";
aOfPaniers[0]["date_crea_panier"] = "10/04/2020";
aOfPaniers[0]["type_panier"] = "Légumes";
aOfPaniers[0]["poids_panier"] = "3 kg";
aOfPaniers[0]["fournisseur"] = "Le Palais du Légume";

aOfPaniers[1] = [];
aOfPaniers[1]["num_panier"] = "00002";
aOfPaniers[1]["date_crea_panier"] = "17/04/2020";
aOfPaniers[1]["type_panier"] = "Fruits";
aOfPaniers[1]["poids_panier"] = "6 kg";
aOfPaniers[1]["fournisseur"] = "Chez Paulette";

aOfPaniers[2] = [];
aOfPaniers[2]["num_panier"] = "00003";
aOfPaniers[2]["date_crea_panier"] = "24/04/2020";
aOfPaniers[2]["type_panier"] = "Mixte";
aOfPaniers[2]["poids_panier"] = "9 kg";
aOfPaniers[2]["fournisseur"] = "Lucien et Alphonse Frères";

aOfPaniers[3] = [];
aOfPaniers[3]["num_panier"] = "00004";
aOfPaniers[3]["date_crea_panier"] = "08/05/2020";
aOfPaniers[3]["type_panier"] = "Fruits";
aOfPaniers[3]["poids_panier"] = "3 kg";
aOfPaniers[3]["fournisseur"] = "Le Meilleur du Pote âgé";

aOfPaniers[4] = [];
aOfPaniers[4]["num_panier"] = "00005";
aOfPaniers[4]["date_crea_panier"] = "22/05/2020";
aOfPaniers[4]["type_panier"] = "Légumes";
aOfPaniers[4]["poids_panier"] = "15 kg";
aOfPaniers[4]["fournisseur"] = "Laurence Primeurs";

function constructTable() {
  var i;

  var sHTML = "";
  sHTML += "<thead>";
  sHTML += "<tr>";
  sHTML += "<td>Numéro du Panier</td>";
  sHTML += "<td>Date de création</td>";
  sHTML += "<td>Type de Panier</td>";
  sHTML += "<td>Poids du Panier</td>";
  sHTML += "<td>Fournisseur</td>";
  sHTML += "<td>Voir détails</td>";
  sHTML += "<td>Editer</td>";
  sHTML += "<td>Supprimer</td>";
  sHTML += "</tr>";
  sHTML += "</thead>";
  sHTML += "<tbody>";

  for (i = 0; i < aOfPaniers.length; i++) {
    sHTML += "<tr>";
    sHTML += "<td>" + aOfPaniers[i]["num_panier"] + "</td>";
    sHTML += "<td>" + aOfPaniers[i]["date_crea_panier"] + "</td>";
    sHTML += "<td>" + aOfPaniers[i]["type_panier"] + "</td>";
    sHTML += "<td>" + aOfPaniers[i]["poids_panier"] + "</td>";
    sHTML += "<td>" + aOfPaniers[i]["fournisseur"] + "</td>";
    sHTML += '<td onClick="detailsPanier(' + i + ')">Détails</td>';
    sHTML += '<td onClick="editPanier(' + i + ')">Editer</td>';
    sHTML += '<td onClick="supprimPanier(' + i + ')">Supprimer</td>';
    sHTML += "</tr>";
  }

  sHTML += "</tbody>";
  $("#table_paniers").html(sHTML);
  $("#num_panier").val("");
  $("#date_crea_panier").val("");
  $("#type_panier").val("");
  $("#poids_panier").val("");
  $("#fournisseur").val("");
}

function ajoutPanier() {
  var iLongueur = aOfPaniers.length;
  aOfPaniers[iLongueur] = [];
  aOfPaniers[iLongueur]["num_panier"] = $("#num_panier").val();
  aOfPaniers[iLongueur]["date_crea_panier"] = $("#date_crea_panier").val();
  aOfPaniers[iLongueur]["type_panier"] = $("#type_panier").val();
  aOfPaniers[iLongueur]["poids_panier"] = $("#poids_panier").val();
  aOfPaniers[iLongueur]["fournisseur"] = $("#fournisseur").val();

  constructTable();
  refreshDataTables();

  $("#num_panier").val("");
  $("#date_crea_panier").val("");
  $("#type_panier").val("");
  $("#poids_panier").val("");
  $("#fournisseur").val("");
}

function majPanier() {
  aOfPaniers[iIndiceEditionEncours] = [];
  aOfPaniers[iIndiceEditionEncours]["num_panier"] = $("#num_panier").val();
  aOfPaniers[iIndiceEditionEncours]["date_crea_panier"] = $(
    "#date_crea_panier"
  ).val();
  aOfPaniers[iIndiceEditionEncours]["type_panier"] = $("#type_panier").val();
  aOfPaniers[iIndiceEditionEncours]["poids_panier"] = $("#poids_panier").val();
  aOfPaniers[iIndiceEditionEncours]["fournisseur"] = $("#fournisseur").val();

  constructTable();
  refreshDataTables();

  $("#num_panier").val("");
  $("#date_crea_panier").val("");
  $("#type_panier").val("");
  $("#poids_panier").val("");
  $("#fournisseur").val("");
  $("#btn_ajouter").show();
  $("#btn_modifier").hide();
  $("#btn_annuler").hide();
}

function annulPanier() {
  $("#num_panier").val("");
  $("#date_crea_panier").val("");
  $("#type_panier").val("");
  $("#poids_panier").val("");
  $("#fournisseur").val("");
  $("#btn_ajouter").show();
  $("#btn_modifier").hide();
  $("#btn_annuler").hide();
}

function supprimPanier(iIndiceSupprim) {
  aOfPaniers.splice(iIndiceSupprim, 1);

  constructTable();
  refreshDataTables();
}

var iIndiceEditionEncours;
function editPanier(iIndiceEdit) {
  alert("iIndiceEdit = " + iIndiceEdit);
  iIndiceEditionEncours = iIndiceEdit;
  $("#num_panier").val(aOfPaniers[iIndiceEdit]["capitale"]);
  $("#date_crea_panier").val(aOfPaniers[iIndiceEdit]["date_crea_panier"]);
  $("#type_panier").val(aOfPaniers[iIndiceEdit]["type_panier"]);
  $("#poids_panier").val(aOfPaniers[iIndiceEdit]["poids_panier"]);
  $("#fournisseur").val(aOfPaniers[iIndiceEdit]["fournisseur"]);
  $("#btn_ajouter").hide();
  $("#btn_modifier").show();
  $("#btn_annuler").show();
}

// CONFIGURATION DATATABLE
const configuration = {
  stateSave: false,
  order: [[0, "asc"]],
  pagingType: "simple_numbers",
  searching: true,
  lengthMenu: [
    [10, 50, 100, -1],
    [10, 50, 100, "Tous"],
  ],
  language: {
    info: "Paniers _START_ à _END_ sur _TOTAL_ renseignés",
    emptyTable: "Aucun Paniers",
    lengthMenu: "_MENU_ Paniers par page",
    search: "Rechercher : ",
    zeroRecords: "Aucun résultat de recherche",
    paginate: {
      previous: "Précédent",
      next: "Suivant",
    },
    sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
    sInfoEmpty: "Paniers 0 à 0 sur 0 renseignés",
  },
  columns: [
    {
      orderable: true,
    },
    {
      orderable: true,
    },
    {
      orderable: true,
    },
    {
      orderable: true,
    },
    {
      orderable: true,
    },
    {
      orderable: false,
    },
    {
      orderable: false,
    },
    {
      orderable: false,
    },
  ],
  retrieve: true,
};

var tables;
$(document).ready(function () {
  constructTable();
  // INIT DATATABLE
  tables = $("#table_paniers").DataTable(configuration);
});

function refreshDataTables() {
  tables.destroy();
  tables = $("#table_paniers").DataTable(configuration);
}
