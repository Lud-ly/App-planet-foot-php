var order_AllResult = [];
var iIndice = "";
var iIndiceModal = "";
var purchase_status_info = "";

// fonction permettant d'afficher l'historique des commande de l'utilisateur dans l'ordre decroissant des date de commande
function purchase_list() {
    let datas = {
        page: 'purchase_list',
        bJSON: 1
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
        order_AllResult = result;

        // Creation de la premiere boucle qui boucle sur les elements "commande"

        let stringHTML_commande = '';
        let stringHTML_panier = '';
        var i = "";
        let j = result.length - 1;
        var sOrder_purchase_reference = "";
        var sOrder_last_purchase_reference = "";
        var sStatus = [];
        var sOrder_delete = [];

        // variable nécessaires à la traduction des dates anglaises en dates françaises
        var options = { year: 'numeric', month: 'short', day: '2-digit' };
        var purchase_date_fr = "";
        var date_fr = "";
        var purchase_total = 0;
        var purchase_iSousTotal = 0;

        for (i = 0; i < result.length; i++) {

            iIndice = i;

            // gestion des 6 statuts possibles des commandes
            if (result[i]["purchase_status"] == 1) {
                sStatus[iIndice] = "<div class=\"purchase_info_position\" onMouseOver=\"purchase_infoModal(" + i + ")\" data-toggle=\"modal\" data-target=\"#purchase_infoModal\"><i class=\"fas fa-exclamation-triangle order_i\"></i>&nbsp;<span class=\"purchase_toValidate\">Commande à valider</span></div><i class=\"fas fa-info-circle\" onMouseOver=\"purchase_infoModal(" + i + ")\" data-toggle=\"modal\" data-target=\"#purchase_infoModal\"></i>"
                    // possibilité de supprimer une commande pas encore validée.
                sOrder_delete[iIndice] = '<td class=" order_champs purchase_td_suppr" data-toggle="modal" data-target="#purchase_SupprModal" title="Supprimer cet article"><i onClick="purchase_createModal(' + iIndice + ')" class="fas fa-trash-alt cart_icon cart_icon_remove"></i></td>'
            } else if (result[i]["purchase_status"] == 2) {
                sStatus[iIndice] = "<div class=\"purchase_info_position\" onMouseOver=\"purchase_infoModal(" + i + ")\" data-toggle=\"modal\" data-target=\"#purchase_infoModal\"><i class=\"fas fa-money-bill-wave order_i\"></i>&nbsp;<span class=\"\" data-toggle=\"tooltip\" title=\"Merci de régler votre commande\">A payer</span></div><i class=\"fas fa-info-circle\" onMouseOver=\"purchase_infoModal(" + i + ")\" data-toggle=\"modal\" data-target=\"#purchase_infoModal\"></i>";
                sOrder_delete[iIndice] = '<td class=" order_champs purchase_td_suppr">/</td>';
            } else if (result[i]["purchase_status"] == 3) {
                sStatus[iIndice] = "<div class=\"purchase_info_position\" onMouseOver=\"purchase_infoModal(" + i + ")\" data-toggle=\"modal\" data-target=\"#purchase_infoModal\"><i class=\"fas fa-box-open order_i\"></i>&nbsp;<span class=\"\" data-toggle=\"tooltip\" title=\"Votre commande est à retirer\">A retirer</span></div><i class=\"fas fa-info-circle\" onMouseOver=\"purchase_infoModal(" + i + ")\" data-toggle=\"modal\" data-target=\"#purchase_infoModal\"></i>";
                sOrder_delete[iIndice] = '<td class=" order_champs purchase_td_suppr">/</td>';
            } else if ((result[i]["purchase_status"] == 4) || (result[i]["purchase_status"] == 5)) {
                sStatus[iIndice] = "<i class=\"fas order_i fa-check-circle fa-lg\"></i>&nbsp;<span class=\"purchase_status_content\" data-toggle=\"tooltip\" title=\"Cette commande est terminée\">Terminée</span>";
                sOrder_delete[iIndice] = '<td class="order_champs purchase_td_suppr">/</td>';
            } else if (result[i]["purchase_status"] == 6) {
                sStatus[iIndice] = "<div class=\"purchase_info_position\" onMouseOver=\"purchase_infoModal(" + i + ")\" data-toggle=\"modal\" data-target=\"#purchase_infoModal\"><i class=\"fas fa-ban fa-lg\"></i>&nbsp;<span class=\"purchase_status_content\" data-toggle=\"tooltip\" title=\"Cette commande a été annulée\">Annulée</span></div><i class=\"fas fa-info-circle\" onMouseOver=\"purchase_infoModal(" + i + ")\" data-toggle=\"modal\" data-target=\"#purchase_infoModal\"></i>";
                sOrder_delete[iIndice] = '<td class="order_champs purchase_td_suppr">/</td>';
            }

            // recupération de la réference de la commande
            sOrder_purchase_reference = result[i]["purchase_reference"];


            // initialisation de la premiere ligne de commande
            //  ou creation d'une nouvelle ligne lors d'un changement de reference de commande
            if ((i == 0) || (sOrder_purchase_reference != sOrder_last_purchase_reference)) {


                if ((i != 0) && (sOrder_purchase_reference != sOrder_last_purchase_reference)) {

                    purchase_total = purchase_total.toFixed(2);

                    // construction de la derniere ligne du tableau imbriqué
                    stringHTML_panier += '<tr class="purchase_tr_details collapse child' + result[i - 1].id_purchase + '">';
                    stringHTML_panier += '<td class="purchase_td_image"></td>';
                    stringHTML_panier += '<td class="purchase_td_price"></td>';
                    stringHTML_panier += '<td class="purchase_td_price"></td>';
                    stringHTML_panier += '<td class="purchase_td_quantity text-right font-weight-bold">Prix total:</td>';
                    stringHTML_panier += '<td class="purchase_total_title text-center">' + purchase_total + ' €</td>';
                    stringHTML_panier += '</tr>';
                    stringHTML_panier += '</tbody></table>';

                    // traduction des date anglaises en dates françaises pour la dernière commande
                    date_fr = new Date(result[i - 1]["purchase_date"]);
                    purchase_date_fr = date_fr.toLocaleDateString('fr-FR', options);

                    // construction d'une ligne de commande sauf la derniere

                    stringHTML_commande += '<tr data-toggle="collapse" data-target=".child' + result[i - 1].id_purchase + '" class="purchase_tr_MainTable mb-2" id="id_commande_' + result[i - 1].id_purchase + '" onclick="openContainer(this)">';
                    stringHTML_commande += '<td class="purchase_toggle"><i class="fas fa-angle-right fa-2x"></i></td>';
                    stringHTML_commande += '<td class="purchase_reference_td">' + result[i - 1].purchase_reference + '</td>';
                    stringHTML_commande += '<td class="purchase_date">Commandée le ' + purchase_date_fr + '</td>';
                    stringHTML_commande += '<td>' + sStatus[i - 1] + '</td>' + sOrder_delete[i - 1];
                    stringHTML_commande += '</tr>';
                    stringHTML_commande += '<tr class="purchase_tr_details collapse child' + result[i - 1].id_purchase + '">';
                    stringHTML_commande += '<td class="purchase_row_td" colspan="5">' + stringHTML_panier + '</td>';
                    stringHTML_commande += '<td class="hide"></td>';
                    stringHTML_commande += '<td class="hide"></td>';
                    stringHTML_commande += '<td class="hide"></td>';
                    stringHTML_commande += '<td class="hide"></td>';
                    stringHTML_commande += '</tr>';

                    // on vide la variable permettant de reconstruire un nouveau fieldset pour un nouvel ensemble de paniers
                    //  liés à une nouvelle commande à afficher

                    stringHTML_panier = '';
                    purchase_total = 0;
                }

                // construction de la ligne des "en-têtes" de chaque nouveau fieldset
                stringHTML_panier += '<table class="table-striped purchase_table table-responsive mb-4">';
                stringHTML_panier += '<thead class="purchase_thead row" id="order_panier_' + iIndice + '">';
                stringHTML_panier += '<tr class="row purchase_row_title">';
                stringHTML_panier += '<th class="purchase_td_image text-center"></th>';
                stringHTML_panier += '<th class="purchase_td_produit text-center">Produit</th>';
                stringHTML_panier += '<th class="purchase_td_price text-center" data-toggle=\"tooltip\" title=\"Prix Unitaire\">Prix Unitaire</th>';
                stringHTML_panier += '<th class="purchase_td_quantity purchase_quantite_title text-center">Quantité</th>';
                stringHTML_panier += '<th class="purchase_soustotal_title text-center">Sous-total</th>';
                stringHTML_panier += '</tr>';
                stringHTML_panier += '</thead>';
                stringHTML_panier += '<tbody class="">';
            }

            // construction de la premiere ligne de commande ou de toutes celles à l'interieur du même fieldset
            if ((i == 0) || (sOrder_purchase_reference == result[i]["purchase_reference"])) {

                purchase_iSousTotal = (result[i].ordered_quantity * result[i].basket_price);
                purchase_iSousTotal = purchase_iSousTotal.toFixed(2);

                stringHTML_panier += '<tr class="purchase_row">';
                stringHTML_panier += '<td class="purchase_td_image"><img class="purchase_img" src="assets/img/' + result[i].basket_image + '" alt="Image du panier de l\'offre numéro une" /></td>';
                stringHTML_panier += '<td class="purchase_td_produit col-4" data-toggle="tooltip" title="' + result[i]["basket_description"] + '">' + result[i].basket_name + '</td>';
                stringHTML_panier += '<td class="purchase_td_price">' + result[i].basket_price + ' €</td>';
                stringHTML_panier += '<td class="purchase_td_quantity">' + result[i].ordered_quantity + '</td>';
                stringHTML_panier += '<td class="purchase_soustotal_title">' + purchase_iSousTotal + ' €</td>';
                stringHTML_panier += '</tr>';

                purchase_total += parseFloat(purchase_iSousTotal);

            }

            // cas particulier: la derniere ligne de commande
            // 
            // affichage de la ligne de la dernière commande de l'utilisateur
            if (i == j) {

                purchase_total = purchase_total.toFixed(2);

                stringHTML_panier += '<tr class="purchase_tr_details collapse child' + result[i].id_purchase + '">';
                stringHTML_panier += '<td class="purchase_td_image"></td>';
                stringHTML_panier += '<td class="purchase_td_price"></td>';
                stringHTML_panier += '<td class="purchase_td_price"></td>';
                stringHTML_panier += '<td class="purchase_td_quantity text-right font-weight-bold">Prix total:</td>';
                stringHTML_panier += '<td class="purchase_total_title text-center">' + purchase_total + ' €</td>';
                stringHTML_panier += '</tr>';

                // construction de la colonne de "statut de la commande" dans le dernier fieldset de la page
                stringHTML_panier += '</tr></tbody></table>';

                // traduction des date anglaises en dates françaises
                date_fr = new Date(result[i]["purchase_date"]);
                purchase_date_fr = date_fr.toLocaleDateString('fr-FR', options);

                // construction de la dernière ligne de commande

                stringHTML_commande += '<tr data-toggle="collapse" data-target=".child' + result[i].id_purchase + '" class="purchase_tr_MainTable mt-2" id="id_commande_' + result[i]["id_purchase"] + '" onclick="openContainer(this)">';
                stringHTML_commande += '<td class="purchase_toggle"><i class="fas fa-angle-right fa-2x"></i></td>';
                stringHTML_commande += '<td class="purchase_reference_td">' + result[i]["purchase_reference"] + '</td>';
                stringHTML_commande += '<td class="purchase_date">Commandée le ' + purchase_date_fr + '</td>';
                stringHTML_commande += '<td>' + sStatus[i] + '</td>' + sOrder_delete[i];
                stringHTML_commande += '</tr>';
                stringHTML_commande += '<tr class="purchase_tr_details collapse child' + result[i].id_purchase + '">';
                stringHTML_commande += '<td class="purchase_row_td" colspan="5">' + stringHTML_panier + '</td>';
                stringHTML_commande += '<td class="hide"></td>';
                stringHTML_commande += '<td class="hide"></td>';
                stringHTML_commande += '<td class="hide"></td>';
                stringHTML_commande += '<td class="hide"></td>';
                stringHTML_commande += '</tr>';

                purchase_total = 0;
            }

            // permet de vérifier si la boucle suivante appartient ou non à la même commande
            sOrder_last_purchase_reference = sOrder_purchase_reference;
        }

        // affichage de l'ensemble des commandes faites par l'utilisateur
        if (order_AllResult == "") {
            $('#order_panier_detail').html("<tr><td colspan='5'>Aucune commande</td><td class='hide'></td><td class='hide'></td><td class='hide'></td></td><td class='hide'></td></tr>")
            $('#order_panier_detail').css({ "text-align": "center", "font-size": "18px", "font-style": "italic", "text-decoration": "underline" });
        } else {
            $('#order_panier_detail').html(stringHTML_commande);
        }
    })

    .fail(function(err) {
        err = 'raté';
        console.log(err)
    })
}

// CONFIGURATION DU DATATABLE
const purchase_configuration = {
    "stateSave": false,
    "order": [
        [1, "asc"]
    ],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "Tous"]
    ],
    "language": {
        "info": "Commandes _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucune Commande",
        "lengthMenu": "_MENU_ Commandes par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Commandes 0 à 0 sur 0 sélectionnée",
    },
    "columns": [{
            "orderable": false,
        },
        {
            "orderable": true,
        },
        {
            "orderable": true,
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
}


//**************** FIRST TIME INITIALIZATION *******************
var tables
$(document).ready(function() {
    purchase_list();
});


// fonction permet de retirer un article d'une commande qui n'est pas encore validée
function purchase_suppr_article(iIndice) {

    let datas = {
        page: 'purchase_delete',
        bJSON: 1,
        id_purchase: order_AllResult[iIndice]["id_purchase"],
        purchase_status: order_AllResult[iIndice]["purchase_status"],
        iIndice: iIndice,
        iIndiceModal: iIndiceModal
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
        // refresh la page pour réinitialiser result[]
        // location.reload()
        purchase_list()
    })

    .fail(function(err) {
        err = 'raté';
        console.log(err)
    })
}

// fonction permet de retirer un article d'une commande qui n'est pas encore validée
function purchase_infoModal(iIndice) {

    purchase_status_info = order_AllResult[iIndice]["purchase_status"];

    let datas = {
        page: 'purchase_info',
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
        // modal affichant le numéro de téléphone du centre à contacter pour valider la commande

        if (purchase_status_info == 1) {
            if (result[0]['parameter_status'] == 1) {
                $('.purchase_modal_body').html("<p class=\"text-center\">Veuillez appeler le service Conseiller relation client à distance au <strong>" +
                    result[0]["center_phoneNumber"] + "</strong>.<br><br>Un conseiller validera votre commande.</p>")
            }
            // la modal affiche un message indiquant que l'utilisateur a reçu un mail de validation de commande
            else {
                $('.purchase_modal_body').html('<p class=\"text-center\">Un e-mail vous a été transmis au moment de la validation de votre panier.' +
                    '<br>Merci de cliquer sur <strong>le lien</strong> contenu dans cet email pour valider votre commande.</p>');
            }
        }

        // message pour le statut "A payer"
        if (purchase_status_info == 2) {
            $('.purchase_modal_body').html("<p class=\"text-center\">Le paiement des commandes s'effectue:<br>"+ result[0]['order_date_topay'] +"</p>" +
                "<p class=\"text-center\">Ce paiement s'effectue en :<br>" + result[0]['center_place_topay']+ "</p>");
        }

        // message pour le statut "A retirer"
        if (purchase_status_info == 3) {
            $('.purchase_modal_body').html("<p class=\"text-center\">Le retrait des commandes s'effectue:<br>" + result[0]["center_withdrawall_schedule"] + ":</strong>" +
                "<p class=\"text-center\">Ce retrait se fait:<br><strong>" + result[0]["center_withdrawall_place"] + "</strong>.</p>");
        }

        // message pour le statut "Annulée"
        if (purchase_status_info == 6) {
            $('.purchase_modal_body').html("<p class=\"text-center\">En raison de la non-validation de la commande, ou de l'absence d'un paiement, nous sommes au regret de vous annoncer que celle-ci a dû être <strong style=\"color: red \">annulée</strong>.</p>")
        }
        $('#purchase_modal_body').show()
    })

    .fail(function(err) {
        err = 'Erreur provenant de la BDD';
        $('.purchase_modal_body').html(err)
    })
}

// Fonction permettant d'afficher ou cacher le détail de la commande sélectionnée
function openContainer(td) {
    // $(container).next().slideToggle(200)
    $(td).find('i').toggleClass('fa-angle-right fa-angle-down');
}

// Fonction qui permet de faire apparaitre une fenetre modal
function purchase_createModal(iIndice) {
    $('#purchase_SupprModal').show();
    iIndiceModal = iIndice;
    $(".order_delete_indice").attr("onclick", "purchase_suppr_article(" + iIndiceModal + ")");
}

// fonction permettant de rendre le tableau de détail des commandes responsive
$(window).resize(function() {

    // change Quantité en Qté ainsi qu ele statut terminée en en OK sur téléphone
    if (window.innerWidth > 600) {
        $('.purchase_quantite_title').html("Quantité");
        $('.purchase_status_content').html("Terminée");
        $('.purchase_toValidate').html("Commande à valider");
    }
    if (window.innerWidth <= 600) {
        $('.purchase_quantite_title').html("Qté");
        $('.purchase_status_content').html("OK");
        $('.purchase_toValidate').html("A valider");
    }
    if (window.innerWidth > 410) {

        $('.purchase_td_status').addClass('col-3');
        $('.purchase_td_status').removeClass('col-2');
    }
    if (window.innerWidth <= 410) {
        $('.purchase_td_status').addClass('col-2');
        $('.purchase_td_status').removeClass('col-3');
    }
})