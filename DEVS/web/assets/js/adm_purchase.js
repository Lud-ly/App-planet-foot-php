// CREATION DU TABLEAU


var iIndice = "";
var adm_purchase_result = [];
var sOrder_last_purchase_reference = "";
var result = [];
var resultat = [];
var nomPromo = "";
var promoLabel = "";
var basket_price = 0;
var codePromo = [];
var k = 0;

function adm_purchase_list() {
    let datas = {
        page: 'adm_purchase_list',
        bJSON: 1,
    }

    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: true,
        data: datas,
        dataType: 'json',
        cache: false
    })

    .done(function(result) {
        adm_purchase_constructTable(result)
    })

    .fail(function(err) {
        err = 'raté';
        console.log(err, result)
    })

}

// FONCTION QUI FAIT LE TABLEAU
function adm_purchase_constructTable(result) {

    // tableau des commandes

    var i;
    var k;
    var adm_order_sHTML = "";

    // option du select du statut
    var option = "";

    // en-tete du tableau de gestion de commande
    adm_order_sHTML += "<thead>";
    adm_order_sHTML += "<tr>";
    adm_order_sHTML += "<th data-priority='1'>Code commande</th>";
    adm_order_sHTML += "<th>Date commande</th>";
    adm_order_sHTML += "<th data-priority='1'>Nom client</th>";
    adm_order_sHTML += "<th data-priority='1'>Nom & Nombre Panier(s)</th>";
    adm_order_sHTML += "<th class=\"text-center\">Prix total (€)</th>";
    adm_order_sHTML += "<th data-priority='2' class=\"text-center\">Code Promo utilisé</th>";
    adm_order_sHTML += "<th data-filter-control='select'>Statut de la commande</th>";
    adm_order_sHTML += "</tr>";
    adm_order_sHTML += "</thead>";
    adm_order_sHTML += "<tbody>";


    adm_purchase_result = result[0]["adm_purchase_list"];
    resultat = result[0]["adm_purchase_list_ingredient"];
    codePromo = result[0]["adm_purchase_codePromo"];

    console.log(adm_purchase_result)

    for (i = 0; i < adm_purchase_result.length; i++) {


        // choix du statut pour les commande exceptée la derniere
        if (i != 0) {
            if (adm_purchase_result[i - 1]['purchase_status'] == 1) {
                option = '<option data-filter="Non confirmée" value="Non confirmée" selected>Non confirmée</option><option value="Validée">Validée</option><option value="Payée" id="A payer">Payée</option><option value="Retirée" id="regle">Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee">Terminée</option><option value="Annulée" id="Annulee">Annulée</option>';
            } else if (adm_purchase_result[i - 1]['purchase_status'] == 2) {
                option = '<option value="Non confirmée">Non confirmée</option><option data-filter="Validée" value="Validée" selected>Validée</option><option value="Payée" id="A payer">Payée</option><option value="Retirée" id="regle">Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee">Terminée</option><option value="Annulée" id="Annulee">Annulée</option>';
            } else if (adm_purchase_result[i - 1]['purchase_status'] == 3) {
                option = '<option value="Non confirmée">Non confirmée</option><option value="Validée">Validée</option><option data-filter="Payée" value="Payée" selected id="A payer">Payée</option><option  value="Retirée" id="regle">Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee">Terminée</option><option value="Annulée" id="Annulee">Annulée</option>';
            } else if (adm_purchase_result[i - 1]['purchase_status'] == 4) {
                option = '<option value="Non confirmée">Non confirmée</option><option value="Validée">Validée</option><option value="Payée" id="A payer">Payée</option><option data-filter="Retirée" value="Retirée" id="regle" selected>Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee">Terminée</option><option value="Annulée" id="Annulee">Annulée</option>';
            } else if (adm_purchase_result[i - 1]['purchase_status'] == 5) {
                option = '<option value="Non confirmée">Non confirmée</option><option value="Validée">Validée</option><option value="Payée" id="A payer">Payée</option><option value="Retirée" id="regle">Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee" selected>Terminée</option><option data-filter="Annulée" value="Annulée" id="Annulee">Annulée</option>';
            } else if (adm_purchase_result[i - 1]['purchase_status'] == 6) {
                option = '<option value="Non confirmée">Non confirmée</option><option value="Validée">Validée</option><option value="Payée" id="A payer">Payée</option><option value="Retirée" id="regle">Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee">Terminée</option><option data-filter="Annulée" value="Annulée" id="Annulee" selected>Annulée</option>';
            }
        }

        iIndice = i;

        var j = (adm_purchase_result.length - 1);

        date = (adm_purchase_result[i]["purchase_date"]) ? moment(new Date(adm_purchase_result[i]["purchase_date"]), "DD/MM/YYYY", 'fr').format("DD/MM/YYYY") : "Aucune date";

        var nomBasket = adm_purchase_result[i]["basket_name"].replace(/\s/g, '');
        var newPurchaseRef = adm_purchase_result[i]["purchase_reference"];


        if ((i != 0) && (sOrder_last_purchase_reference != newPurchaseRef)) {

            // recherche d'un code promo associé à la commande de l'utilisateur
            for (k = 0; k < codePromo.length; k++) {
                if (codePromo[k]["purchase_reference"] == adm_purchase_result[i - 1]["purchase_reference"]) {
                    nomPromo = codePromo[k]["promo_reference"];
                    promoLabel = codePromo[k]["promo_label"]
                }
            }
            if (nomPromo == "") {
                promoLabel = "/";
                nomPromo = "/";
            }

            adm_order_sHTML += "</td>"
            adm_order_sHTML += "<td  class=\"text-center\">" + parseFloat(basket_price, 2).toFixed(2) + "</td>";
            adm_order_sHTML += "<td data-toggle='collapse' data-target='#" + nomPromo + "_" + i + "' class=\"text-center adm_purchase_basket_descr\">" + nomPromo

            // si aucun code promo n'est associé la Div collapse ne se créée pas.
            if (promoLabel != "/") {
                adm_order_sHTML += "<div id='" + nomPromo + "_" + (i) + "' class='collapse adm_purchase_reduc_desc'>";
                adm_order_sHTML += promoLabel;
                adm_order_sHTML += "</div>";
            }


            adm_order_sHTML += "</td>";
            adm_order_sHTML += '<td class="">';
            adm_order_sHTML += '<select class="form-control adm_purchase_td_status font-weight-bold text-center" id="select_option' + iIndice + '" name="adm_purchase_sort" onchange="adm_order_newStatus(' + iIndice + ')">';
            adm_order_sHTML += option
            adm_order_sHTML += '</select>';
            adm_order_sHTML += '</td>';

            adm_order_sHTML += "</tr>";
            basket_price = 0;
            nomPromo = "";
        }

        if ((i == 0) || (sOrder_last_purchase_reference != newPurchaseRef)) {
            adm_order_sHTML += "<tr>";
            adm_order_sHTML += "<td data-value='" + adm_purchase_result[i]["purchase_reference"] + "'>" + adm_purchase_result[i]["purchase_reference"] + "</td>";
            adm_order_sHTML += "<td data-order='" + adm_purchase_result[i]["purchase_date"] + "'>" + date + "</td>";
            adm_order_sHTML += "<td>" + (adm_purchase_result[i]["user_name"]).toUpperCase() + " " + adm_purchase_result[i]["user_firstname"] + "</td>";
            adm_order_sHTML += "<td>";
            adm_order_sHTML += "<div class=\"adm_purchase_basket_descr\" data-toggle=\"collapse\" data-target='#" + nomBasket + "_" + i + "'><u>" + adm_purchase_result[i]["basket_name"] + "</u> <span class=\"badge badge-secondary\">x" + adm_purchase_result[i]['ordered_quantity'] + "</span></div>";
            adm_order_sHTML += "<div id='" + nomBasket + "_" + i + "' class='collapse'>";

            // liste des ingrédients par panier (premier panier de la commande)
            adm_order_sHTML += "<ul class=\"adm_purchase_ul_product\">"
            for (k = 0; k < resultat.length; k++) {
                if (adm_purchase_result[i]["basket_name"] == resultat[k]["basket_name"]) {
                    adm_order_sHTML += "<li>";
                    adm_order_sHTML += resultat[k]["product_name"];
                    adm_order_sHTML += "</li>";
                }
            }
            adm_order_sHTML += "</ul>"
            adm_order_sHTML += "</div>";

        }

        if ((i != 0) && (sOrder_last_purchase_reference == newPurchaseRef)) {

            adm_order_sHTML += "<Br>";
            adm_order_sHTML += "<div class=\"adm_purchase_basket_descr\" data-toggle=\"collapse\" data-target='#" + nomBasket + "_" + i + "'><u>" + adm_purchase_result[i]["basket_name"] + "</u> <span class=\"badge badge-secondary\">x" + adm_purchase_result[i]['ordered_quantity'] + "</span></div>";
            adm_order_sHTML += "<div id='" + nomBasket + "_" + i + "' class='collapse'>";
            adm_order_sHTML += "<ul class=\"adm_purchase_ul_product\">"

            // listes des ingrédients par paniers (si plusieurs paniers dans la commande)
            for (k = 0; k < resultat.length; k++) {
                if (adm_purchase_result[i]["basket_name"] == resultat[k]["basket_name"]) {
                    adm_order_sHTML += "<li>";
                    adm_order_sHTML += resultat[k]["product_name"];
                    adm_order_sHTML += "</li>";
                }
            }
            adm_order_sHTML += "</ul>"
            adm_order_sHTML += "</div>";
        }

        if (i == j) {

            basket_price += parseFloat(adm_purchase_result[i]["basket_price"], 2) * adm_purchase_result[i]["ordered_quantity"]

            // choix du statut pour la derniere commande
            if (adm_purchase_result[i]['purchase_status'] == 1) {
                option = '<option data-filter="Non confirmée" value="Non confirmée" selected>Non confirmée</option><option value="Validée">Validée</option><option value="Payée" id="A payer">Payée</option><option value="Retirée" id="regle">Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee">Terminée</option><option value="Annulée" id="Annulee">Annulée</option>';
            } else if (adm_purchase_result[i]['purchase_status'] == 2) {
                option = '<option value="Non confirmée">Non confirmée</option><option data-filter="Validée" value="Validée" selected>Validée</option><option value="Payée" id="A payer">Payée</option><option value="Retirée" id="regle">Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee">Terminée</option><option value="Annulée" id="Annulee">Annulée</option>';
            } else if (adm_purchase_result[i]['purchase_status'] == 3) {
                option = '<option value="Non confirmée">Non confirmée</option><option value="Validée">Validée</option><option data-filter="Payée" value="Payée" selected id="A payer">Payée</option><option  value="Retirée" id="regle">Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee">Terminée</option><option value="Annulée" id="Annulee">Annulée</option>';
            } else if (adm_purchase_result[i]['purchase_status'] == 4) {
                option = '<option value="Non confirmée">Non confirmée</option><option value="Validée">Validée</option><option value="Payée" id="A payer">Payée</option><option data-filter="Retirée" value="Retirée" id="regle" selected>Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee">Terminée</option><option value="Annulée" id="Annulee">Annulée</option>';
            } else if (adm_purchase_result[i]['purchase_status'] == 5) {
                option = '<option value="Non confirmée">Non confirmée</option><option value="Validée">Validée</option><option value="Payée" id="A payer">Payée</option><option value="Retirée" id="regle">Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee" selected>Terminée</option><option data-filter="Annulée" value="Annulée" id="Annulee">Annulée</option>';
            } else if (adm_purchase_result[i - 1]['purchase_status'] == 6) {
                option = '<option value="Non confirmée">Non confirmée</option><option value="Validée">Validée</option><option value="Payée" id="A payer">Payée</option><option value="Retirée" id="regle">Retirée</option><option data-filter="Terminée" value="Terminée" id="terminee">Terminée</option><option data-filter="Annulée" value="Annulée" id="Annulee" selected>Annulée</option>';
            }


            // recherche d'une promo associée à la commande de l'utilisateur
            for (k = 0; k < codePromo.length; k++) {
                if (codePromo[k]["purchase_reference"] == adm_purchase_result[i]["purchase_reference"]) {
                    nomPromo = codePromo[k]["promo_reference"];
                    promoLabel = codePromo[k]["promo_label"]
                }
            }
            if (nomPromo == "") {
                promoLabel = "/";
                nomPromo = "/";
            }

            // fin de la derniere ligne du tableau
            adm_order_sHTML += "</td>"
            adm_order_sHTML += "<td  class=\"text-center\">" + parseFloat(basket_price, 2).toFixed(2) + "</td>";
            adm_order_sHTML += "<td data-toggle='collapse' data-target='#" + nomPromo + "_" + i + "' class=\"text-center adm_purchase_basket_descr\">" + nomPromo;

            // Promotion
            if (promoLabel != "/") {
                adm_order_sHTML += "<div id='" + nomPromo + "_" + i + "' class='collapse adm_purchase_reduc_desc'>";
                adm_order_sHTML += promoLabel;
                adm_order_sHTML += "</div>";
            }


            adm_order_sHTML += "</td>";
            adm_order_sHTML += '<td class="">';
            adm_order_sHTML += '<select class="form-control adm_purchase_td_status font-weight-bold text-center" id="select_option' + iIndice + '" name="adm_purchase_sort" onchange="adm_order_newStatus(' + iIndice + ')">';
            adm_order_sHTML += option;
            adm_order_sHTML += '</select>';
            adm_order_sHTML += '</td>';

            adm_order_sHTML += "</tr>";
            basket_price = 0;
            nomPromo = "";
        }

        sOrder_last_purchase_reference = newPurchaseRef;
        basket_price += parseFloat(adm_purchase_result[i]["basket_price"], 2) * adm_purchase_result[i]["ordered_quantity"]
    }

    // fin du tableau
    adm_order_sHTML += "</tbody>";


    // 
    $('.table_commandes').html(adm_order_sHTML);
    admOrder_table = $('#table_adm_commandes').DataTable(adm_purchase_configuration);
}


function adm_order_newStatus(iIndice) {

    // on récupère la valeur du statut dans le select qui nous intéresse
    var select_option = $('#select_option' + iIndice).val();
    var id_purchase = "";

    // on retransforme les values du statut en chiffre pour l'enregistrement en BDD
    if (select_option == "Non confirmée") {
        select_option = 1;
    } else if (select_option == "Validée") {
        select_option = 2;
    } else if (select_option == "Payée") {
        select_option = 3;
    } else if (select_option == "Retirée") {
        select_option = 4;
    } else if (select_option == "Terminée") {
        select_option = 5;
    } else if (select_option == "Annulée") {
        select_option = 6;
    }

    // On prend l'id purchase précedent pour récupérer la bonne valeur de l'id_purchase à update en BDD
    if (iIndice == (adm_purchase_result.length - 1)) {
        var id_purchase = adm_purchase_result[iIndice]["id_purchase"];
    } else {
        var id_purchase = adm_purchase_result[iIndice - 1]["id_purchase"];
    }

    let datas = {
        page: 'adm_purchase_update_status',
        bJSON: 1,
        id_purchase: id_purchase,
        purchase_status: select_option,
        iIndice: iIndice,
    }

    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: true,
        data: datas,
        dataType: 'json',
        cache: false
    })

    .done(function(result) {

        admOrder_table.clear();
        admOrder_table.destroy();
        adm_purchase_list();

    })

    .fail(function(err) {
        err = 'raté';
        console.log(err)
    })
}

function adm_purchase_confirm() {
    if (confirm("Êtes-vous sûr que le client a bien réglé sa commande?")) {}
    select = document.getElementById('exampleFormControlSelect1');
    select = options[1].value;
}

// CONFIGURATION DE LA DATATABLE
const adm_purchase_configuration = {
    "stateSave": true,
    "order": [
        [1, "desc"]
    ],
    "pagingType": "simple_numbers",
    "filtering": true,
    "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "Tous"]
    ],
    "language": {
        "info": "Commandes _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucune Commande",
        "lengthMenu": "_MENU_ Commandes par page",
        "filter": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Commandes 0 à 0 sur 0 sélectionnée",
    },
    // filtre les données du select concernant le statut des commandes
    "columnDefs": [{
        "targets": [6],
        "type": 'string',
        "render": function(data, type, full, meta) {
            if (type === 'filter' || type === 'sort') {
                var api = new $.fn.dataTable.Api(meta.settings);
                var td = api.cell({ row: meta.row, column: meta.col }).node();
                data = $('select, input[type="text"]', td).val();
            }
            return data;
        }
    }],

    "columns": [

        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": false
        },
        {
            "orderable": false
        },
        {
            "orderable": true
        },
        {
            "orderable": false
        },

    ],
    'retrieve': true,
    "responsive": true

};

// LANCEMENT DU TABLEAU AU DEMARAGE DE LA PAGE

var admOrder_table
$(document).ready(function() {

    adm_purchase_list();


    $('#table_adm_commandes').on('change', 'tbody select, tbody input[type="text"]', function() {
        admOrder_table.cell($(this).closest('td')).invalidate();

        // Redraw table (optional)
        // table.draw(false);
    });
});