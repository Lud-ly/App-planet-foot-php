var result = [];
var resultat = [];
var compo = "<br><span class='titre_composition'>Composition du panier :</span> ";
var soustotal = 0.00;
var prix_unitaire = [];
var total_offer = [];
var total_offers = 0;
var offer_AllBasket = [];
var aOfOffer_Basket = [];
var last_id = "";
var a = 0;

// compte uniquement les formats choisis
var t;

// AJAX FUNCTIONS TO GET INGREDIENTS
function getIngredientDatas() {

    var datas = {

        page: "offers_ingredients_list",
        bJSON: 1,
        id_offer_detail: $("#liste").find("option:selected").val(),
    }

    $.ajax({

        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false

    })

    .done(function(result) {

        // On récupère l'id_mainbasket dans l'URL
        var words = window.location.toString()
        words = words.split("/");
        last_id = words[words.length - 1];

        aOfOffer_Basket = result[0]['offer_list_basket'];
        resultat = result[0]['offer_list_ingredients'];

        compo = "<br><span class='titre_format'>Composition du panier :</span>";

        for (i = 0; i < aOfOffer_Basket.length; i++) {
            compo += '<div>' + aOfOffer_Basket[i]["product_name"] + ' : ' + aOfOffer_Basket[i]["product_quantity"] + aOfOffer_Basket[i]["measureUnit_name"] + '</div>';
        }

        $(".composition_" + $("#liste").find("option:selected").val()).html(compo);
        $(".paniers").hide();
        $("#panier" + aOfOffer_Basket[0]["index_list_basket"]).show();

        let imagePanier = "";
        let imageProducteur = "";
        let format = "";
        let offerPaniers = "";

        for (i = 0; i < aOfOffer_Basket.length; i++) {


            var p = 0;
            if (aOfOffer_Basket[i]["id_mainBasket"] == last_id) {

                // if (i == 0) {
                //     format += '<option value="' + (i + 1) + '" selected contenteditable="false">Format ' + aOfOffer_Basket[i]["weight_offer_detail"] + ' Kg</option>';
                // } else {
                //     format += '<option value="' + (i + 1) + '" contenteditable="false">Format ' + result[i]["weight_offer_detail"] + ' Kg</option>';
                // }

                if (p == 0) {
                    imagePanier = '<img class="img-fluid" id="image_panier" src="assets/img/' + aOfOffer_Basket[i]['mainBasket_image'] + '" alt="Panier"><br>';

                    imageProducteur = '<img class="img-fluid" src="assets/img/' + aOfOffer_Basket[i]['supplier_img'] + '" alt="Producteur"><br>';

                    imagePanierModal = '<img class="img-fluid w-50" src="assets/img/' + aOfOffer_Basket[i]['mainBasket_image'] + '" alt="PanierModal"><br>';

                    $("#img-fluid").html(imagePanier);
                    $("#titre_panier").html(aOfOffer_Basket[i]["mainBasket_name"]);
                    $("#date").html("du " + aOfOffer_Basket[i]["date_de_debut"] + " au " + aOfOffer_Basket[i]["date_de_fin"]);
                    $('#desc').html(aOfOffer_Basket[i]["mainBasket_description"])
                    $("#liste").html(format);
                    $('#nom_producteur').html(aOfOffer_Basket[i]["supplier_storeName"]);
                    // $('#description_producteur').html(result[i]["desc_supplier"]);
                    $('#image_producteur').html(imageProducteur);
                    $('#adresse_producteur').html(aOfOffer_Basket[i]["supplier_address"] + " " + aOfOffer_Basket[i]["supplier_complement_address"]);
                    $('#mail_producteur').html(aOfOffer_Basket[i]["supplier_mail"]);
                    $('#tel_producteur').html(aOfOffer_Basket[i]["supplier_phoneNumber"]);
                    $("#titre_panier_modal").html(aOfOffer_Basket[i]["mainBasket_name"]);
                    $("#photomodal").html(imagePanierModal);

                }
                p++;

                // on reinitialise les Id des champs sous-total et quantité pour pouvoir faire les différents calculs
                // tout en gardant les bons id_offer
                t = 0;

                for (i = 0; i < aOfOffer_Basket.length; i++) {

                    var j = 0;
                    if (aOfOffer_Basket[i]['id_mainBasket'] == last_id) {

                        // on stocke les prix unitaires dans un tableau pour le calcul des sous-totaux
                        prix_unitaire[t] = aOfOffer_Basket[i]['basket_price'];

                        // construction du détail des formats de paniers
                        offerPaniers += '<div id="panier' + (i + 1) + '" class="paniers mb-4">';
                        offerPaniers += '<div class="offer_titre_panier"><span class="titre_format">Format: <span style="color:var(--fourth)">' + aOfOffer_Basket[i]["basket_name"] + '</span></span><span class="prix">A l\'unité : <span id="prixseul">' + aOfOffer_Basket[i]["basket_price"] + '€</span></span></div>';
                        offerPaniers += '<div class="texte">' + aOfOffer_Basket[i]["basket_description"] + '</div>';
                        offerPaniers += '<div class="row mx-0 px-0 col-sm-12">';
                        offerPaniers += '<div class="px-0 offer_compo col-lg-5 col-12">Il se compose de :</div>';
                        offerPaniers += '<div class="px-0 offer_compo_content col-lg-7 col-12">';
                        offerPaniers += '<ul class="mb-0 offer_list_ingredients">';
                        for (var y = 0; y < resultat.length; y++) {
                            if (aOfOffer_Basket[i]["basket_name"] == resultat[y]["basket_name"]) {
                                offerPaniers += '<li>';
                                offerPaniers += resultat[y]["product_name"] + " " + resultat[y]["product_quantity"] + " " + resultat[y]["measureUnit_name"];
                                offerPaniers += '</li>';
                            }
                        }
                        offerPaniers += '</ul>';
                        offerPaniers += '</div>';
                        offerPaniers += '</div>';
                        offerPaniers += '<div class="d-flex">';
                        offerPaniers += '<div class="col-6 px-0 mt-2">J\'en prends : ';
                        offerPaniers += '<select onchange="calcul_sous_total(' + t + '), removeDisabled()" class="offer_quantite" id="Quantite' + t + '">';

                        let offer_nb_offer = parseInt(aOfOffer_Basket[i]['basket_number']);

                        // jusqu'à 10 paniers achetables par format tant que le nombre de paniers à vendre restants est suffisant
                        // sinon ne permet de sélectionner que jusqu'au nombre de panier restant à vendre
                        while (j <= offer_nb_offer) {
                            if (offer_nb_offer == 0) {
                                offerPaniers += '<option value="-">Stock épuisé</option>';
                                $('#panier' + (i + 1)).css("background-image", "url('../../assets/img/epuise.png')")
                            } else {
                                offerPaniers += '<option value=' + j + '>' + j + '&nbsp;</option>';
                            }
                            j++;
                            if (j == 11) {
                                break;
                            }
                        }

                        offerPaniers += "</select>"
                        offerPaniers += '</div>';

                        // sous-totaux
                        offerPaniers += '<div class="composition_' + (i + 1) + '"></div>';
                        offerPaniers += '<div class="col-6 px-0 text-right mt-2" id="calcul_sout_total' + t + '">';
                        offerPaniers += '<div id="sous_total' + t + '" value="' + soustotal + '">Sous-total = 0.00 €';
                        offerPaniers += '</div>';
                        offerPaniers += '</div>';
                        offerPaniers += '</div>';
                        offerPaniers += '</div>';

                        t++;
                    }
                }
            }
            $("#affichepaniers").html(offerPaniers);

        }
    })

    .fail(function(err) {

        console.log('ERROR ? INGREDIENT', err);

    })

};

// calcul des différents sous-totaux
function calcul_sous_total(t) {
    soustotal = ($('#Quantite' + t).val() * prix_unitaire[t]).toFixed(2);
    $('#sous_total' + t).val(soustotal);
    $('#sous_total' + t).html("Sous-total = " + soustotal + " €");
    calcul_total();
}

// calcul du total de l'ensemble des prix des paniers commandés
function calcul_total() {
    var k;

    // reinitialise le calcul du prix total à 0
    total_offer = 0;

    for (k = 0; k < prix_unitaire.length; k++) {
        if ($('#sous_total' + k).val() == "") {
            $('#sous_total' + k).val(0);
        }
        total_offer += parseFloat($('#sous_total' + k).val(), 2);
    };

    total_offer = parseFloat(total_offer, 2).toFixed(2);

    $('#total_offer').html(total_offer + ' €');
    $('#total_offer').val(total_offer);
}

// retire le status disabled du bouton commander si le total est différent de 0
function removeDisabled() {
    if ($('#total_offer').val() != 0) {
        $('.commander').removeAttr('disabled', "disabled")
    } else {
        $('.commander').attr('disabled', "disabled")
    }
}

// FUNCTION TO CREATE THE ORDER REFERENCE 
var orderReference = "REF";

function offerCreateOrder() {

    var offerRandomChar = "0123456789"

    for (i = 0; i < 4; i++) {
        orderReference += offerRandomChar.charAt(Math.floor(Math.random() * offerRandomChar.length));
    }

}

// AJAX FUNCTION FOR INSERT IN ORDER TABLE
function insertInOrder() {

    offerCreateOrder();
    /*
    var datas = {

        page : "offers_insert_order_datas",
        bJSON : 1,
        ref_order : orderReference,
        status_order : 0,
        id_offer_detail : $("#liste").val(),
        quantity : $("#liste_quantite").val(),

    }

    $.ajax({

        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false

    })

    .done(function(result) {

        console.log("=============", datas);
        */
    orderReference = "REF";
    offerCommander();
    /*
                                })
    
                                .fail(function(err) {
    
                                    console.log('ERROR ?', err);
    
                                })
                            */
}

$(document).ready(function() {
    getIngredientDatas()
});

// FONCTION QUI MONTRE LES PANIERS //
function offerShowPanier() {
    var offerGetValue;
    offerGetValue = $("#liste").find(':selected').val();
    console.log(offerGetValue);
    $("#resultat" + offerGetValue).show();
}


// FONCTION QUI AJOUTE LES ARTICLES AU PANIER //
function offerAddArticles(indice) {
    var offerCount;
    offerCount = parseInt($(".click" + indice).val(), 10);
    offerCount++;
    $(".click" + indice).val(offerCount);
}


// FONCTION QUI RECUPERE LE SELECTED ELEMENT //
function offerChoosePanier(element) {
    var offerGetValue;
    offerGetValue = $(element).find(':selected').val();
    $(".paniers").hide();
    $("#panier" + offerGetValue).show();
}


// FONCTION DU MODAL //

function offerCommander() {
    $(".modal, .modal2").show(450);
}

// ajout au panier sur cart
function cart_creation() {

    // construction du localStorage pour stocker les panier que l'on souhaite ajouter dans la page "Mon panier"
    // si la clé "articles" n'existe pas encore
    if (!(localStorage["articles"])) {
        for (i = 0; i < aOfOffer_Basket.length; i++) {
            if (aOfOffer_Basket[i]["id_mainBasket"] == last_id) {
                for (a = 0; a < prix_unitaire.length; a++) {
                    if (($('#Quantite' + a).val() != 0) && ($('#Quantite' + a).val() != "-")) {
                        offer_AllBasket.push({ "id_basket": aOfOffer_Basket[a + i]["id_basket"], "basket_name": aOfOffer_Basket[a + i]["basket_name"], "basket_description": aOfOffer_Basket[a + i]["basket_description"], "basket_price": aOfOffer_Basket[a + i]['basket_price'], "ordered_quantity": $('#Quantite' + a).val() })
                        console.log(offer_AllBasket);
                    }
                }
                localStorage.setItem("articles", JSON.stringify(offer_AllBasket));
                return;
            }
        }
    }
    // si la clé "articles" existe déjà dans le localStorage, recupere les données stockées et ajoute les nouveaux paniers
    else {
        var retrievedOffer = localStorage.getItem("articles");
        var storedOffer = JSON.parse(retrievedOffer);

        for (i = 0; i < aOfOffer_Basket.length; i++) {
            if (aOfOffer_Basket[i]["id_mainBasket"] == last_id) {
                for (a = 0; a < prix_unitaire.length; a++) {
                    if (($('#Quantite' + a).val() != 0) && ($('#Quantite' + a).val() != "-")) {
                        storedOffer.push({ "id_basket": aOfOffer_Basket[a + i]["id_basket"], "basket_name": aOfOffer_Basket[a + i]["basket_name"], "basket_description": aOfOffer_Basket[a + i]["basket_description"], "basket_price": aOfOffer_Basket[a + i]['basket_price'], "ordered_quantity": $('#Quantite' + a).val() })
                        console.log(storedOffer);
                    }
                }
                localStorage.setItem("articles", JSON.stringify(storedOffer));
                return;
            }
        }
    }
}