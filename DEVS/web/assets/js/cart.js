// ◘ TODO ◘
// vérifier que la promo en pourcentage soit bien appliquée à l'avantage de l'utilisateur
// en arondissant vers une valeur supérieure (en utilisant Math.ceil)
//


//********* CHANGE FORMATION COMMERCIALE ***********
//********* true = telephone  /  false = physique *****

var type_formation = false;

var cart_list_basket = [];
var cart_list_quantity = [];

var cart_list_codePromo = [];
var cart_list_CRCD_training = [];


// CONFIGURATION DU DATATABLE

const cart_configuration = {
    "stateSave": false,
    "info": false,
    "searching": false,
    "sDom": "lfrti",
    "lengthMenu": [
        [-1],
        ["Tous"]
    ],
    "language": {
        "info": "Commandes _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucune Commande",
        "lengthMenu": "_MENU_ Commandes par page",
        "zeroRecords": "Aucun résultat de recherche",
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Commandes 0 à 0 sur 0 sélectionnée",
    },
    "columnDefs": [
        { "responsivePriority": 10001, targets: 1 },
    ],
    "ordering": false,
    'retrieve': true,
    // "responsive": true
}

//**************** FIRST TIME INITIALIZATION *******************
var tables

$(function() {
    cartlist();
    // apply an invalid pattern if the promo code input is empty
    checkIfEmptyPromoReference();
    $('#cart_promo').on('blur', function() {
        checkIfEmptyPromoReference();
    })
})

/**
 * If the promo code input is empty : apply an invalid pattern
 */
function checkIfEmptyPromoReference(input = $('#cart_promo')) {
    if ( isEmpty(input.val()) ) {
        setInvalidPattern(input);
    } else {
        input.removeAttr('pattern');
    }
}

// ***************** AJAX Build Array ***************

function cartlist() {

    var datas = {
        page: "cart_list",
        bJSON: 1
    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(result) {
        if (result[0]["offer_CRCD_Training"].length != 0) {
            type_formation = true;
        }
        cart_list_CRCD_training = result[0]["offer_CRCD_Training"];
        cart_list_codePromo = result[0]['offer_codePromo_list'];
        cart(cart_total);
    })

    .fail(function(err) {
        console.log("ERROR CART_LIST :" + err);
    })


    // cart_dl_listing[0] = {};
    // cart_dl_listing[0]["id"] = "12";
    // cart_dl_listing[0]["product"] = "Le panier Winter";
    // cart_dl_listing[0]["price"] = 12;
    // cart_dl_listing[0]["description"] = "4 Kgs";
    // cart_dl_listing[0]["quantity"] = 2;
    // cart_dl_listing[0]["id_offer"] = 17;

    // cart_promo();

}


//************** LOOP IN ARRAY AND HTML GENERATION *******************
// var results = [{ "id_basket": "4", "basket_price": "12.99", "basket_description": "assortiment de fruits et légumes d'hiver", "basket_name": "Mon beau panier", "ordered_quantity": "4" },
//     { "id_basket": "3", "basket_price": "13.50", "basket_description": "assortiment de fruits d'été", "basket_name": "Mon beau panier 2", "ordered_quantity": "6" },
//     { "id_basket": "1", "basket_price": "10.50", "basket_description": "assortiment de fruits et légumes d'été", "basket_name": "Mon beau panier 3", "ordered_quantity": "2" }
// ];
var results = [];

if (localStorage["articles"]) {
    results = JSON.parse(localStorage.getItem("articles"));
}

/**
 * @var {Array|null} codePromo Contient les infos sur le code promo qu'a voulu appliquer l'utilisateur'
 */
var codePromo = [{ "id_promo": "1", "promo_label": "Réduction de 5.00€", "promo_reference": "5", "promo_type": "€", "promo_number": "5", "promo_quantity": "10" }];
var iIndice = "";
var codePromo_valeur = "";
var cart_total = "";
var cart_soustotal = 0;
var codePromo_valeurRef = "";
var i = 0;

// prix apres promo
var cart_w_promo = "";
// 

function cart(cart_total) {

    let stringHTML = "";

    if (cart_total == "") {
        cart_total = 0
        cart_w_promo = (parseFloat(cart_total, 10)).toFixed(2);
    }

    stringHTML += "<thead>";
    stringHTML += "<tr>";
    stringHTML += "<th>Produit</th>";
    stringHTML += "<th class=\"cart_productDescription\">Description</th>";
    stringHTML += "<th>Quantité</th>";
    stringHTML += "<th class=\"cart_productPrice text-center\">Prix<br>Unitaire (€)</th>";
    stringHTML += "<th class='cart_price text-center'>Sous-Total (€)</th>";
    stringHTML += "<th class=\"text-center\">Action</th>"
    stringHTML += "</tr>";
    stringHTML += "</thead>";
    stringHTML += "<tbody id='cart_tbody'>";

    for (i = 0; i < results.length; i++) {

        iIndice = i;

        cart_soustotal = (results[i]["basket_price"] * results[i]["ordered_quantity"]).toFixed(2);
        cart_total += parseFloat((results[i]["basket_price"] * results[i]["ordered_quantity"]), 10);

        stringHTML += "<tr>";
        stringHTML += '<td class="cart_product">' + results[i]["basket_name"] + '</td>';
        stringHTML += '<td class="cart_productDescription">' + results[i]["basket_description"] + '</td>';
        stringHTML += '<td class="cart_productQuantity">';
        stringHTML += '<div class="cart_quantity_choice">';
        stringHTML += '<div><i onclick="cart_changeQuantity(0,' + iIndice + ', this)" class="fas fa-minus-circle cart_icon cart_icon_decrease align-self-center"></i></div>';
        stringHTML += '<input type="text" disabled="disabled" class="cart_product_quantity cart_product_quantity_' + iIndice + '" value="' + results[i]["ordered_quantity"] + '"/>';
        stringHTML += '<div><i onclick="cart_changeQuantity(1,' + iIndice + ', this)" class="fas fa-plus-circle cart_icon cart_icon_increase align-self-center"></i></div>';
        stringHTML += '</div>';
        stringHTML += '</td>';
        stringHTML += '<td class="cart_productPrice text-center">' + results[i]["basket_price"] + '</td>';
        stringHTML += '<td class="cart_price text-center">' + cart_soustotal + '</td>';
        stringHTML += '<td class="text-center"><i onclick="cart_removeProduct(' + iIndice + ')" class="fas fa-trash-alt cart_icon cart_icon_remove"></i></td>';
        stringHTML += '</tr>';

    }
    // Si le panier n'est pas vide
    if (cart_total != 0) {
        cart_total = (parseFloat(cart_total, 10)).toFixed(2);
        $("#cart_total").html(cart_total);
    }
    //sinon, change le bouton de validation par un lien de retour vers l'accueil
    else {
        stringHTML += "<tr><td class='text-center' id='cart_panier_vide' colspan='6'>Panier Vide</td><td class='hide'></td><td class='hide'></td><td class='hide'></td><td class='hide'></td><td class='hide'></td></tr>";
        $("#cart_tbody").html(stringHTML);
        $("#cart_btn_valider").addClass("hide");
        $('#cart_validation_commande').html('<a href="index" class="commander btn-cancel">Commander un panier</a>')
        $("#cart_total").html("0,00 ");
        $('#count_basket').hide();
    }

    // termine la table
    stringHTML += "</tbody>";

    //************ CART TOTAL CALCULATION *********************

    // cart_total += cart_total_panier.toFixed(2);
    // $("#cart_mssgPromo").html("");

    // if (total["results"] === false) {
    //     $("#cart_total").html(total["total"] + " €");
    // } else {
    //     $("#cart_total").html(total["totalp"] + " €");
    //     $("#cart_mssgPromo").html("Code promo valide pour : " + total["valuepromo"]);
    // }
    // });

    $("#table_cart").html(stringHTML);

    $('#count_basket').html((iIndice + 1));

    tables = $('#table_cart').DataTable(cart_configuration);
}


//************* INCREASE DECREASE PRODUCT_QUANTITY + AJAX *********************

function cart_changeQuantity(sens, iIndice, quantity) {

    let product_quantity = $(".cart_product_quantity_" + iIndice).val();

    // Si la quantité de paniers est amenée à 0, le panier est effacé
    if (sens == 0 && product_quantity == 1) {
        cart_removeProduct(iIndice);
    }

    // diminue la quantité
    else if (sens == 0) {
        product_quantity--;
        results[iIndice]['ordered_quantity'] = product_quantity;
    }

    // augmente la quantité
    else if (sens == 1) {
        product_quantity++;
        results[iIndice]['ordered_quantity'] = product_quantity;
    }

    // cache la partie reduction et prix final
    $('#cart_promo').val("");
    $('#cart_textPromo').hide();
    $('.cart_total_div').hide();
    $('#cart_msgPromo').hide();

    cart(cart_total);
}


//*************** DELETE A PRODUCT + AJAX *******************************

function cart_removeProduct(iIndice) {

    if (localStorage["articles"]) {
        results = JSON.parse(localStorage.getItem("articles"));
        results.splice(iIndice, 1);
        localStorage.setItem("articles", JSON.stringify(results));
    }

    cart(cart_total);
}


//******************* AJAX CODE PROMO ***************************
/**
 * Vérifie si la promo existe et est disponible pour cet utilisateur,
 * et l'applique si c'est le cas. Sinon, indique l'erreur rencontrée.
 */
function cart_promo() {
    // var datas = {
    //     cart_promo: $("#cart_promo").val(),
    //     page: "cart_promo",
    //     bJSON: 1
    // }
    // $.ajax({
    //     type: "POST",
    //     url: "route.php",
    //     async: true,
    //     data: datas,
    //     dataType: "json",
    //     cache: false,
    // })

    // .done(function(results) {
    //     console.log("TOTAL avant promo : ", res["total"]);
    //     console.log("TOTAL apres promo : ", res["totalp"]);
    //     console.log("VALEUR de la promo : ", res["valuepromo"])
    //     cart(results);
    // })

    // .fail(function(err) {
    //     console.log("ERROR CART_PROMO :", err);
    // })

    // cart();

    var cart_prix_reduit = parseFloat($('#cart_total').html());
    var cart_prix_final = 0;
    codePromo_valeur = ($("#cart_promo").val()).toUpperCase();

    // if empty promo code : returns
    if (codePromo_valeur === '') {
        cart_setPromoErrorMessage('Code promo manquant');
        return;
    }

    $('#cart_textPromo').hide();
    $('#cart_Prix_final').html(
        $('#cart_total').html()
    );
    
    let oDonnees = {
        page: 'cart',
        action: 'check_promo_code',
        bJSON: 1,
        bLoadHtml: false,
        promo_code: codePromo_valeur
    }
    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: false,
        data: oDonnees,
        dataType: 'json',
        cache: false
    })
    .always(function() {
        hideLoadingModal();
        log('reçu', 'check_promo_code', [arguments]);
    })
    .done(function(data) {
        if (
            ( typeof(data) !== 'object' ) ||
            ( isEmpty(data) ) ||
            ( (data.result === 'error') && ((data.message == undefined) || isEmpty(data.message)) )
        ) {
            setInvalidPattern('#cart_promo');
            cart_setPromoErrorMessage('Une erreur a été rencontrée')
            return;
        }
        if ( (data.result === 'error') ) {
            cart_setPromoErrorMessage(data.message)
            setInvalidPattern('#cart_promo');
            return;
        }
        cart_setPromoErrorMessage('');
        // ok : usable promo code
        codePromo = data;
        setValidPattern('#cart_promo');
        codePromo_valeurRef = codePromo[0]['promoReference'].toUpperCase();
        // codePromo_valeur
        // cart_total = $("#cart_total").val()
        if (codePromo[0]["promoType"] == "€") {
            $('#cart_textPromo').html(' + ' + codePromo[0]["promoLabel"] + '&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt" onclick="cart_delete_promo()"></i>');
            $('#cart_textPromo').show();
            $('.cart_total_div').show();
            $('#cart_msgPromo').hide();
            cart_prix_final = (parseFloat(cart_prix_reduit - codePromo[0]["promoNumber"], 10)).toFixed(2)
            $('#cart_Prix_final').html(cart_prix_final + " €");
        } else if (codePromo[0]["promoType"] == "%") {
            $('#cart_msgPromo').html(' + ' + codePromo[0]["promoLabel"]);
            $('#cart_msgPromo').show();
            cart_total = parseFloat(cart_total + ((code_total * codePromo[0]["promoNumber"]) / 100), 10)
        } else {
            cart_setPromoErrorMessage('Ce code promo n\'existe pas!');
        }
    
        // vidage de l'input "code promo"
        // Actualisation du prix total
        cart(cart_total);
    })
    .fail(function(error) {
        showError(error)
        toastr.error('Une erreur a été rencontrée', ERROR_TITLE)
    });

}

/**
 * Display an error message concerning the promo code
 * 
 * @param {string} sMessage The message to display ('' by default)
 */
function cart_setPromoErrorMessage(sMessage = '') {
    // toastr.error(sMessage, 'ERREUR')
    $('#cart_msgPromo').html(`<span style='font-weight: bold; color:red '>${sMessage}</span>`);
    $('#cart_msgPromo').removeClass('show');
}

/**
 * Annule le code promo qui avait été saisi par l'utilisateur
 */
function cart_delete_promo() {
    const ERROR_TITLE = 'Erreur';
    let oDonnees = {
        page: 'cart',
        action: 'cancel_promo_code',
        bJSON: 1,
        bLoadHtml: false,
        promo_code: codePromo_valeur
    }
    console.log('envoyé', oDonnees);
    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: false,
        data: oDonnees,
        dataType: 'json',
        cache: false
    })
    .always(function() {
        log( 'cancel reçu', [arguments]);
        hideLoadingModal();
    })
    .done(function(data) {
        if (
            ( typeof(data) !== 'object' ) ||
            ( !isEmpty(data.error) )
        ) {
            toastr.error('Une erreur a été rencontrée', ERROR_TITLE)
            return;
        }
        $('#cart_promo').val("");
        $('#cart_textPromo').hide();
        $('.cart_total_div').hide();
        $('#cart_msgPromo').hide();
    })
    .fail(function(error) {
        showError(error)
        toastr.error('Une erreur a été rencontrée', ERROR_TITLE)
    });


}


//***************** CART VALIDATED AJAX *********************

function cart_validated() {

    for (i = 0; i < results.length; i++) {
        cart_list_basket[i] = parseInt(results[i]["id_basket"]);
        cart_list_quantity[i] = parseInt(results[i]["ordered_quantity"]);
    }

    console.log(cart_list_quantity);
    cart_list_basket = cart_list_basket.toString();
    cart_list_quantity = cart_list_quantity.toString();
    console.log(cart_list_quantity);

    // Variable of 10 random alphanumeric characters
    var cart_purchaseReference = ((Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7))).toUpperCase();

    var datas = {
        ordered_quantity: cart_list_quantity,
        // cart_validated: $("#cart_promo").val(),
        purchase_reference: cart_purchaseReference,
        id_basket: cart_list_basket,
        page: "cart_validation",
        bJSON: 1
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })


    .always(function() {
        $('#modal_save').hide();
    })

    .done(function(results) {

        //**************** DISPLAY MODAL MESSAGE BASED ON FORMATION TYPE *************
        var cart_orderMessage = "";
        if (type_formation == true) {
            cart_orderMessage += '<div class="text-center mb-2"><strong style="font-size: 22px; text-decoration: underline; font-style: italic">Pour valider votre commande:</strong></div>'
            cart_orderMessage += '<p class="text-center">Veuillez contacter le service Conseiller relation client à distance :<br>';
            cart_orderMessage += 'au <strong>' + cart_list_CRCD_training[0]['center_phoneNumber'] + '</strong></p>'
        } else {
            cart_orderMessage = "<p>Un mail de validation vous a été transmis.</p>\n    <p>Ce mail contient un lien vous permettant de valider votre commande.</p>";
        }
        $("#cart_modalMessage").html(cart_orderMessage);
        3
        $("#cart_orderNumber").html(cart_purchaseReference);
        localStorage.removeItem("articles");
        cart_total = 0;
        codePromo = [];
        cart(cart_total);
    })

    .fail(function(err) {
        console.log("ERROR CART_VALIDATED :", err);
    })
}

/*


    let cart_orderMessage= "";
    let cart_orderNumber= "";
    let characters= "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz23456789";
    let charactersLength= characters.length;
    cart_dl_listing= [];
    cart();
    $("#cart_tbody").html("Panier Vide");

    for (let i = 0; i < 6; i++) {
        cart_orderNumber += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
*/

// $(window).resize(function() {

//     // change Quantité en Qté ainsi qu ele statut terminée en en OK sur téléphone
//     if (window.innerWidth > 390) {
//         $('.cart_codePromo').addClass("text-right");
//         $('.cart_codePromo').removeClass("text-center");
//     }
//     if (window.innerWidth <= 390) {
//         $('.cart_codePromo').addClass('text-center')
//         $('.cart_codePromo').removeClass('text-right')
//     }
// })