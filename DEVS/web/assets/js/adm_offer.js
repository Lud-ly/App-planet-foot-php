var new_checkbox = "";
var precedent_checkbox = "";
var sHTML = "";
var i;
var j;
var k;
// compte le nombre de checkbox différentes
var m = 0;
var tables;
var z = 0;
var iIndiceDivAjout;
var copieNb = 0;
var cfHTML = "";
var adm_offer_mainbasket_list = "";
var adm_offer_supplier_list = "";

var bNewCat = false;

/***************************/
/*	       ARRAY           */
/***************************/

var aOfBasket = [];
var aOfCategories = [];
var aOfProducts = [];
var aOfMeasureUnit = [];
var aOfcodePromo = [];
var aOfSupplier = [];
var aOfMainBasket = []


// liste tous les producteurs et leurs paniers associés
function LoadOffer() {

    let datas = {
        page: 'adm_offer_list',
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
        aOfBasket = result[0]["adm_offer_supplier_list"];
        aOfSupplier = result[0]["adm_offer_suppliers_list"];
        aOfMainBasket = result[0]["adm_offer_mainbasket_list"];
        aOfCategories = result[0]["adm_offer_category_list"];
        aOfProducts = result[0]["adm_offer_product_list"];
        aOfMeasureUnit = result[0]["adm_offer_measureUnit_list"];
        aOfcodePromo = result[0]["adm_offer_codePromo_list"];
        adm_purchase_constructTable();
    })

    .fail(function(err) {

    })
}

/***************************/
/*	    MAKE DATATABLE     */
/***************************/

function adm_purchase_constructTable() {

    var i;

    var sHTML = '';
    sHTML += '<thead>';
    sHTML += '<tr>';
    sHTML += '<th>Producteur</th>';
    sHTML += '<th>Famille</th>';
    sHTML += '<th>Nom</th>';
    sHTML += '<th>image</th>';
    sHTML += '<th>Descritpion</th>';
    sHTML += '<th>Nombre de panier(s)</th>';
    sHTML += '<th>Prix</th>';
    sHTML += '<th>Action</th>';
    sHTML += '</tr>';
    sHTML += '</thead>';
    sHTML += '<tbody>';
    sHTML += '<tr>';

    for (i = 0; i < aOfBasket.length; i++) {
        sHTML += '<td data-label="supplier">' + aOfBasket[i]["supplier_name"] + " " + aOfBasket[i]["supplier_firstname"] + '</td>';
        sHTML += '<td data-label="mainBasket">' + aOfBasket[i]["mainBasket_name"] + '</td>';
        sHTML += '<td data-label="name">' + aOfBasket[i]["basket_name"] + '</td>';
        sHTML += '<td data-label="image">' + aOfBasket[i]["basket_image"] + '</td>';
        sHTML += '<td data-label="description">' + htmlspecialchars_decode(aOfBasket[i]["basket_description"]) + '</td>';
        sHTML += '<td data-label="ref">' + aOfBasket[i]["basket_number"] + " / " + aOfBasket[i]['basket_quantity'] + '</td>';
        sHTML += '<td data-label="price">' + aOfBasket[i]["basket_price"] + '</td>';
        sHTML += '<td>';
        sHTML += '<a class="edit" data-toggle="modal" data-toggle="modal" data-target="#editModal" onclick="editBasket(' + i + ')"><i class="material-icons edit" data-toggle="tooltip" title="Éditer">&#xE254;</i></a>';
        sHTML += '<a class="delete" data-toggle="modal" data-toggle="modal" data-target="#deleteModal" onClick="valueBasket(' + i + ')"><i class="material-icons delete" data-toggle="tooltip" title="Éffacer">&#xE872;</i></a></td>';
        // sHTML += '<a class="delete" data-toggle="modal" data-toggle="modal" data-target="#deleteModal" onClick="deleteBasket(' + i + ')"><i class="material-icons delete" data-toggle="tooltip" title="Delete">&#xE872;</i></a>';
        sHTML += '</td>';
        sHTML += "</tr>";
    }
    sHTML += "</tbody>";
    $('#table_basket').html(sHTML);

    var new_list;

    // liste des fournisseurs dans la modal ajout
    adm_offer_supplier_list += '<option value="-">-- Sélectionnez --</option>';
    for (var n = 0; n < aOfSupplier.length; n++) {
        new_list = aOfSupplier[n]["supplier_name"] + " " + aOfSupplier[n]["supplier_firstname"];
        adm_offer_supplier_list += '<option value="' + aOfSupplier[n]["id_supplier"] + '">' + new_list + '</option>';
    }
    $('#offer_supplier').html(adm_offer_supplier_list);
    adm_offer_supplier_list = "";

    tables = $('#table_basket').DataTable(configuration);
}

// décode les caractères spéciaux pour un affichage correct
function htmlspecialchars_decode(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&amp;/g, "&"); /* must do &amp; first */
        str = str.replace(/&quot;/g, '"');
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/&lt;/g, "<");
        str = str.replace(/&gt;/g, ">");
    }
    return str;
}

// ************************************** */
//         CHOIX DU PRODUCTEUR
// ************************************** */

// function Select_Supplier() {
//     if ($('#offer_supplier').val() != "-") {
//         $('#offer_mainBasket').removeAttr('disabled');
//         $('#bouton_ajout_mainbasket').css("pointer-events", "visible");
//         $('#bouton_ajout_mainbasket').css("color", "black");

//         adm_offer_mainbasket_list="<option value='-'>--- Sélectionnez ---</option>";

//         // liste de familles des paniers dans la modal ajout en fonction du producteur choisi
//         for (var m=0; m< aOfBasket.length; m++) {
//             new_checkbox= aOfBasket[m]["mainBasket_name"];
//             if($('#offer_supplier').val()== aOfBasket[m]['id_supplier'] && new_checkbox==precedent_checkbox) {
//                 adm_offer_mainbasket_list += '<option value="' + aOfBasket[m]["id_mainBasket"] + '">' + aOfBasket[m]["mainBasket_name"] + '</option>';
//             }
//             precedent_checkbox= new_checkbox;
//         }

//         // si aucune correspondance n'a été trouvée, affiche "Aucune entrée présente" dans le choix des familles de panier
//         if (adm_offer_mainbasket_list== "<option value='-'>--- Sélectionnez ---</option>") {
//             adm_offer_mainbasket_list = '<option value="-"> Aucune entrée présente </option>';
//         }
//         $('#offer_mainBasket').html(adm_offer_mainbasket_list);
//     } else {
//         // inactive la selection de mainbasket exitant ainsi que le bouton ajouter
//         $('#offer_mainBasket').attr('disabled', 'disabled');
//         $('#bouton_ajout_mainbasket').css("pointer-events", "none");
//         $('#bouton_ajout_mainbasket').css("color", "#dddddd");
//     }
// }

/***************************/
/*       ADD BASKET        */
/***************************/

function addBasket(copieNb) {

    var adm_offer_list_quantity = [];
    var adm_offer_list_Price = [];
    var adm_offer_list_basket_name = [];
    var adm_offer_list_basket_description = [];
    var adm_offerReference = [];
    var adm_offer_list_basket_image = [];
    var fieldset_compo = [];
    var adm_offer_Baskets_CodePromo = [];

    var selectElmt = $("#offer_supplier").val();

    // récupération des dates de mise en place de la vente du panier et transformation de ces dates en format enregistrable en BDD
    var dateDebutPanier = $('#addStartBasket').val();
    dateDebutPanier = dateDebutPanier.replace("T", " ");
    dateDebutPanier = dateDebutPanier + ":00";
    var dateFinPanier = $('#addEndBasket').val()
    dateFinPanier = dateFinPanier.replace("T", " ");
    dateFinPanier = dateFinPanier + ":00";

    // récupération des dates de mise en place de la vente du panier et transformation de ces dates en format enregistrable en BDD
    var dateDebutValidationPanier = $('#addStartValidationBasket').val();
    dateDebutValidationPanier = dateDebutValidationPanier.replace("T", " ");
    dateDebutValidationPanier = dateDebutValidationPanier + ":00";
    var dateFinValidationPanier = $('#addEndValidationBasket').val()
    dateFinValidationPanier = dateFinValidationPanier.replace("T", " ");
    dateFinValidationPanier = dateFinValidationPanier + ":00";

    // récupération des dates de mise en place du paiement du panier et transformation de ces dates en format enregistrable en BDD
    var dateDebutPaiement = $('#addBeginPayment').val()
    dateDebutPaiement = dateDebutPaiement.replace("T", " ");
    dateDebutPaiement = dateDebutPaiement + ":00";
    var dateFinPaiement = $('#addEndPayment').val()
    dateFinPaiement = dateFinPaiement.replace(" ", "T");
    dateFinPaiement = dateFinPaiement + ":00";

    // récupération des dates de mise en place du retrait du panier et transformation de ces dates en format enregistrable en BDD
    var dateDebutRetrait = $('#addBeginWithdrawal').val()
    dateDebutRetrait = dateDebutRetrait.replace("T", " ");
    dateDebutRetrait = dateDebutRetrait + ":00";
    var dateFinRetrait = $('#addEndWithdrawal').val()
    dateFinRetrait = dateFinRetrait.replace("T", " ");
    dateFinRetrait = dateFinRetrait + ":00";

    // boucle sur la liste des informations des différents paniers
    for (i = 0; i <= copieNb; i++) {
        //  tableaux des prix des différents formats de panier nouvellement créés
        adm_offer_list_Price[i] = parseFloat($('#addPrice' + i).val(), 2);
        //  tableaux des quantité à vendre des différents formats de panier nouvellement créés
        adm_offer_list_quantity[i] = parseInt($('#addNbOffer' + i).val());
        //  tableaux des noms des différents formats de panier nouvellement créés
        adm_offer_list_basket_name[i] = $('#BasketName' + i).val();
        adm_offer_list_basket_description[i] = $('#addDesc' + i).val();
        adm_offer_list_basket_image[i] = $('#adm_offer_newFormatDate' + i).val();
        adm_offerReference[i] = ((Math.random().toString(36).substring(2, 6) + "_" + Math.random().toString(36).substring(2, 6))).toUpperCase();

        if ($('#chkYes' + copieNb).is(":checked")) {
            for (var r = 0; r < aOfcodePromo.length; r++) {
                if ($('#codePromo_' + r + "_" + i).is(':checked')) {
                    adm_offer_Baskets_CodePromo[i] = aOfcodePromo[r]['id_promo'];
                    r = (aOfcodePromo.length - 1);
                }
            }
        }

        //  tableaux des différentes liste d'ingrédients des différents formats de panier nouvellement créés
        fieldset_compo[i] = $('#add_list_ingredient' + i).html().toString();
        fieldset_compo[i] = fieldset_compo[i].replaceAll("</li><li>", ",");
        fieldset_compo[i] = fieldset_compo[i].replaceAll("<li>", "");
        fieldset_compo[i] = fieldset_compo[i].replaceAll("</li>", "");
        fieldset_compo[i] = fieldset_compo[i].split(",");
    }

    // transforme les infos précedentes en chaines de caractères pour l'envoi en AJAX
    adm_offer_list_Price = adm_offer_list_Price.toString();
    adm_offer_list_quantity = adm_offer_list_quantity.toString();
    adm_offer_list_basket_name = adm_offer_list_basket_name.toString();
    adm_offer_list_basket_description = adm_offer_list_basket_description.toString();
    adm_offer_list_basket_image = adm_offer_list_basket_image.toString();
    adm_offer_Baskets_CodePromo = adm_offer_Baskets_CodePromo.toString();
    adm_offerReference = adm_offerReference.toString();

    // boucle sur les différents formats de panier
    for (var n = 0; n < fieldset_compo.length; n++) {
        // boucle sur la liste des ingrédients du panier sélectionnée
        for (var p = 0; p < fieldset_compo[n].length; p++) {

            // recupère 1 à 1 les elements de la liste des ingredients du panier
            var compo1 = fieldset_compo[n][p];

            // modification du nom de l'unité de measure vers l'id associé
            for (r = 0; r < aOfMeasureUnit.length; r++) {
                var Measureunit = aOfMeasureUnit[r]["measureUnit_name"].replaceAll('"', '');
                if (compo1.indexOf(" " + Measureunit) != -1) {
                    // change la valeur du nom du produit et de l'unité de mesure associée (si présente) des listes d'ingrédients par leur id correspondant
                    fieldset_compo[n][p] = compo1.replace(Measureunit, aOfMeasureUnit[r]['id_measureUnit'])
                    compo1 = fieldset_compo[n][p];
                }
            }

            // modification du nom du produit vers l'id associé
            for (var s = 0; s < aOfProducts.length; s++) {
                var ProductName = aOfProducts[s]["product_name"].replaceAll('"', '');
                if (compo1.indexOf(ProductName) != -1) {
                    fieldset_compo[n][p] = compo1.replace(ProductName, aOfProducts[s]['id_product']);
                    compo1 = fieldset_compo[n][p];
                }
            }
        }
    }

    var fieldset_compo_string = "";

    // tranforme les infos précedentes en chaines de caractères en supprimant les crochets pour l'envoi en AJAX
    for (var a = 0; a < fieldset_compo.length; a++) {
        if (a == (fieldset_compo.length - 1)) {
            fieldset_compo_string += fieldset_compo[a].toString();
        } else {
            fieldset_compo_string += fieldset_compo[a].toString() + ";";
        }
    }
    fieldset_compo_string = fieldset_compo_string.toString();

    // Requêtes AJAX
    let datas = {
        page: 'adm_offer_save',
        bJSON: 1,
        mainBasket_name: $('#addMainBasket').val(),
        mainBasket_image: $('#adm_offer_newFormatDate').val(),
        mainBasket_description: $('#addDesc').val(),
        id_supplier: selectElmt,
        basket_name: adm_offer_list_basket_name,
        basket_number: adm_offer_list_quantity,
        basket_quantity: adm_offer_list_quantity,
        basket_price: adm_offer_list_Price,
        basket_image: adm_offer_list_basket_image,
        basket_reference: adm_offerReference,
        basket_description: adm_offer_list_basket_description,
        basket_begin_date: dateDebutPanier,
        basket_end_date: dateFinPanier,
        basket_begin_validation_date: dateDebutValidationPanier,
        basket_end_validation_date: dateFinValidationPanier,
        basket_payment_begin_date: dateDebutPaiement,
        basket_payment_end_date: dateFinPaiement,
        basket_withdrawal_begin_date: dateDebutRetrait,
        basket_withdrawal_end_date: dateFinRetrait,
        code_promo: adm_offer_Baskets_CodePromo,
        ingredient: fieldset_compo_string
    }

    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: true,
        data: datas,
        dataType: 'json',
        cache: false
    })

    .always(function() {
        $('#modal_save').hide();
        console.log('reçu', [arguments]);
    })

    .done(function(data) {
        if (isEmpty(data.error)) {
            toastr.success('Nouveau(x) panier(s) ajouté(s) avec succès', 'Succès');
            tables.clear();
            tables.destroy();
            LoadOffer();
            annuler_panier();
        } else {
            toastr.error(ERROR_MESSAGE, ERROR_TITLE)
        }
    })

    .fail(function(error) {
        showError(error)
        toastr.error(ERROR_MESSAGE, ERROR_TITLE)
    })
};

// liste l'ensemble des ingrédients en fonction des checkbox choisies
function checklist_ingredient(copieNb) {

    aOfCategories.sort((a, b) => (a.category_name > b.category_name) ? 1 : -1);
    // On récupère la valeur de la checkbox
    var ElementList = document.getElementById('adm_offer_list_category' + copieNb).getAttribute('data-value');

    var aOfIndice = [];

    // boucle permettant de déteminer le nombre de checkbox présentes ainsi que leur ID associé
    for (j = 0; j < aOfCategories.length; j++) {
        var o = (aOfCategories.length - 1)
        new_checkbox = aOfCategories[j]["category_name"];
        if ((j == 0) || (precedent_checkbox != new_checkbox)) {
            aOfIndice[m] = j;
            m++;
        }
        // booléen vérifie si on cherche à ajouter une nouvelle catégorie en bas de liste
        // if ((j == o) && (bNewCat == true)) {
        //     var NewCategorieToList = '<input class="checkCard mb-2" onchange="checklist_ingredient(' + copieNb + ')" type="checkbox" name="categories_' + j + '" id="categories_' + j + "_" + copieNb + '" value="' + aOfCategories[j]["category_name"] + '" checked>&nbsp;' + aOfCategories[j]["category_name"] + '<br>';
        //     $('#adm_offer_list_category' + copieNb).append(NewCategorieToList)
        // }
        precedent_checkbox = new_checkbox;
    }

    // le booléen est réinitialisé à faux 
    bNewCat = false;

    // On vide le champs du select
    $('.select_ingredients' + copieNb).html('');

    $('.select_ingredients' + copieNb).append('<option value="-">--- Sélectionnez ---</option>');

    // On choisit les ingrédients en fonctions du formats de panier
    if (ElementList == (copieNb)) {

        $('.select_ingredients' + copieNb).html('');

        // On boucle sur la liste des checkbox pour savoir si elles sont sélectionnées ou non
        for (m = 0; m < aOfIndice.length; m++) {

            // si la checkbox est validée, la liste des ingrédient sélectionnables est modifiée selon la catégorie choisie
            if ($('#categories_' + aOfIndice[m] + "_" + copieNb).is(":checked")) {
                let Ligne = aOfIndice[m];
                $('.select_ingredients' + copieNb).append('<option value="-">--- ' + aOfCategories[Ligne]['category_name'] + ' ---</option>');
                for (p = 0; p < aOfProducts.length; p++) {
                    aOfProducts.sort((a, b) => (a.product_name > b.product_name) ? 1 : -1)
                    if (aOfProducts[p]['id_category'] == $('#categories_' + aOfIndice[m] + "_" + copieNb).val()) {
                        $('.select_ingredients' + copieNb).append('<option value="' + aOfProducts[p]['id_product'] + '" data-value="' + aOfProducts[p]['product_name'] + '">' + aOfProducts[p]['product_name'] + '</option>')
                    }
                }
            }
            // sinon, les ingrédients n'apparaissent pas dans la liste
            else {
                for (p = 0; p < aOfCategories.length; p++) {
                    if (aOfProducts[p]['id_category'] == $('#categories_' + aOfIndice[m] + "_" + copieNb).val()) {
                        var optElement = document.querySelector('option[data-value="' + aOfProducts[p]['product_name'] + '"]');
                        if (optElement) {
                            optElement.parentNode.removeChild(optElement);
                        }
                    }
                }
            }
        }
    }

    // si toutes les checkbox sont décochées
    if ($('.select_ingredients' + copieNb).html() == "") {
        $('.select_ingredients' + copieNb).append('<option value="-">--- Sélectionnez ---</option>')
    }

    if (($('#Ajout' + copieNb).html() != "") && ($('#Ajout' + copieNb).html() != 'erreur dans l\'entrée des données')) {
        AddIngredient(copieNb)
    }
}

// fonction qui ajoute un ingédient, voire sa quantité et son untité de mesure, à la liste dans le fieldset "composition du panier"
function add_ingredient_lists(copieNb) {
    // si le champs quantité contient une valeur >0 ET les champs de selection d'unité et d'ingrédient sont bien positionnés
    if (($('#select_ingredients' + copieNb).val() != "-") && (($('#addQuantity' + copieNb).val() == "") && (($('#Unit_select' + copieNb).val() == " ")) || (($('#addQuantity' + copieNb).val() != "") && ($('#Unit_select' + copieNb).val() != " ")))) {
        $("#add_list_ingredient" + copieNb).append("<li>" + $(".select_ingredients" + copieNb).find(":selected").text() + " " + $("#addQuantity" + copieNb).val() + " " + $("#Unit_select" + copieNb).val() + "</li>");
        $('#Ajout' + copieNb).html('');
        $('#Ajout' + copieNb).css({ "color": "black", "font-weight": "400"})

        // Réinitialise les champs quantité et unité
        $('#addQuantity' + copieNb).val("");
        $('#Unit_select' + copieNb).val(" ");
    } else {
        $('#Ajout' + copieNb).html('erreur dans l\'entrée des données');
        $('#Ajout' + copieNb).css({ "color": "red", "font-weight": "bold" })
    }
};

// reinitialisation de la composition du panier
function reinitialize(copieNb) {
    $('#add_list_ingredient' + copieNb).html('')
}

var element;

// gère la possibilité d'ajouter de nouveaux ingrédients
function AddIngredient(copieNb) {
    sHTML = '';

    $('#Ajout' + copieNb).css({"color": "black", "font-weight": "200"});

    // Ajoute les champs d'info pour ajouter un nouvel ingrédient
    sHTML += "<div>Vous ne trouvez pas votre catégorie de produit dans la liste ? Cliquez sur \"+ Ajouter une catégorie\"</div>";
    sHTML += "<div class='d-flex col-12 justify-content-center bouton_new_infos mb-4'>";
    sHTML += "<div id='AddElementLi" + copieNb + "'>";
    sHTML += "<select class='format_select' id='AddIngredient_select" + copieNb + "'>";
    for (j = 0; j < aOfCategories.length; j++) {
        new_checkbox = aOfCategories[j]["category_name"];
        if ($('#categories_' + j + "_" + copieNb).is(":checked")) {
            sHTML += '<option value="' + aOfCategories[j]["id_category"] + '">' + aOfCategories[j]["category_name"] + '</option>';
        }
        precedent_checkbox = new_checkbox;
    }
    sHTML += "</select>";
    sHTML += "</div>&nbsp;&nbsp;&nbsp;";
    sHTML += "<div class='d-flex'><input placeholder=\"Nom de l'ingrédient\" id='NewIngredient" + copieNb + "'></div>&nbsp;&nbsp;";
    sHTML += "<div class='d-flex div_button_new' onclick='AddNewIngredient(" + copieNb + ")' required><i class='fas fa-plus-circle'></i></div>";
    sHTML += "<div class='d-flex' onclick='AnnulerAjout(" + copieNb + ")'><i class='fas fa-ban'></i></div>";
    sHTML += "</div>";

    $('#Ajout' + copieNb).html(sHTML);

    // Si aucune catégorie n'a été sélectionnée dans la liste
    if ($('#AddIngredient_select' + copieNb).html() == "") {
        $('#AddIngredient_select' + copieNb).html("<option value='-'>Aucune catégorie sélectionnée</option>")
    }
}

// ajoute un nouvel ingredient au tableau de résultat aofProducts
function AddNewIngredient(copieNb) {

    let bNewIngredient= false;

    let NewIngredientToAdd = $('#NewIngredient' + copieNb).val().charAt(0).toUpperCase() + $('#NewIngredient' + copieNb).val().substring(1).toLowerCase();

    for (i= 0; i<aOfProducts.length; i++) {
        
        if (NewIngredientToAdd == aOfProducts[i]["product_name"].charAt(0).toUpperCase() + aOfProducts[i]["product_name"].substring(1).toLowerCase()) {
            bNewIngredient= true;
        } else if (NewIngredientToAdd.endsWith("s") || NewIngredientToAdd.endsWith("S") || NewIngredientToAdd.endsWith("x") || NewIngredientToAdd.endsWith("X")) {
            NewIngredientToAdd= NewIngredientToAdd.slice(0,-1);
            if (NewIngredientToAdd == aOfProducts[i]["product_name"].charAt(0).toUpperCase() + aOfProducts[i]["product_name"].substring(1).toLowerCase()) {
                bNewIngredient= true;
            }
        }
    }

    if ($('#AddIngredient_select' + copieNb).val() != "" && bNewIngredient== false) {
        aOfProducts.sort((a, b) => (parseInt(a.id_product) > parseInt(b.id_product)) ? 1 : -1);
        var last_id_product = parseInt(aOfProducts[aOfProducts.length - 1]["id_product"]);

        aOfProducts.push({ "id_category": $('#AddIngredient_select' + copieNb).val(), "id_product": (last_id_product + 1), "category_name": $('#AddIngredient_select' + copieNb).find(':selected').text(), "product_name": (NewIngredientToAdd.charAt(0).toUpperCase() + NewIngredientToAdd.substring(1).toLowerCase()) })
        addNewIngredientAJAX(copieNb);
        checklist_ingredient(copieNb);
        $('#Ajout' + copieNb).html('');
        $("#select_ingredients" + copieNb + " option[value=" + (last_id_product + 1) + "]").prop("selected",true);
    } else {
        $('#Ajout' + copieNb).html('Ce produit fait déjà partie de la liste répertoriée');
        $('#Ajout' + copieNb).css({"color": "red", "font-weight": "bold"});
    }
}

//************************************************************************************************************** */
//                                              GESTION CATEGORIES
// ************************************************************************************************************* */

// gère les champs pour ajouter une nouvelles catégorie
function addCategories() {

    // vide le champs d'ajout de nouvelle catégorie
    $('#AjoutCategorie' + copieNb).html('');

    sHTML = "";
    sHTML += "<div class='d-flex col-12 justify-content-center bouton_new_infos mb-4'>";
    sHTML += '<div><input placeholder="Nom de la catégorie" class="" id="NewCategorie' + copieNb + '"></div>';
    sHTML += "<div class='d-flex div_button_new' onclick='AddNewCategorie(" + copieNb + ")'><i class='fas fa-plus-circle '></i></div>";
    sHTML += "<div class='d-flex' onclick='AnnulerAjout(" + copieNb + ")'><i class='fas fa-ban'></i></div>";
    sHTML += "</div>";

    $('#AjoutCategorie' + copieNb).append(sHTML);

    bNewCat = true;
}

// permet l'ajout d'une nouvelle categorie d'ingrédient
function AddNewCategorie(copieNb) {
    var Category = "";
    if ($('#NewCategorie' + copieNb).val() != "") {

        let bNewCategory= false;

        let NewCategoryToAdd = $('#NewCategorie' + copieNb).val().charAt(0).toUpperCase() + $('#NewCategorie' + copieNb).val().substring(1).toLowerCase();
    
        // boucle pour comparer les noms des catégories existantes avec celle que l'on veut ajouter
        for (i= 0; i<aOfCategories.length; i++) {
            if (NewCategoryToAdd == aOfCategories[i]["category_name"].charAt(0).toUpperCase() + aOfCategories[i]["category_name"].substring(1).toLowerCase()) {
                bNewCategory= true;
            } else if (NewCategoryToAdd.endsWith("s") || NewCategoryToAdd.endsWith("S") || NewCategoryToAdd.endsWith("x") || NewCategoryToAdd.endsWith("X")) {
                NewCategoryToAdd= NewCategoryToAdd.slice(0,-1);
                if (NewCategoryToAdd == aOfCategories[i]["category_name"].charAt(0).toUpperCase() + aOfCategories[i]["category_name"].substring(1).toLowerCase()) {
                    bNewCategory= true;
                }
            }
        }

        // Si cette catégorie n'existe pas encore, on l'ajoute à la liste
        if (bNewCategory == false) {
            $('#adm_offer_list_category' + copieNb).html('');

            // Réordonnancement du tableau aOfCategory par id de category
            aOfCategories.sort((a, b) => (parseInt(a.id_category) > parseInt(b.id_category)) ? 1 : -1);
            var last_id_category = parseInt(aOfCategories[aOfCategories.length - 1]["id_category"]);

            aOfCategories.push({ "id_category": (last_id_category + 1), "category_name": (NewCategoryToAdd.charAt(0).toUpperCase() + NewCategoryToAdd.substring(1).toLowerCase()), "category_status": 1 });

            // Réordonnancement du tableau aOfCategories par nom de category
            aOfCategories.sort((a, b) => (a.category_name > b.category_name) ? 1 : -1);
            for (j = 0; j < aOfCategories.length; j++) {
                new_checkbox = aOfCategories[j]["category_name"];
                if ((j == 0) || (precedent_checkbox != new_checkbox)) {
                    if (new_checkbox == ($('#NewCategorie' + copieNb).val().charAt(0).toUpperCase() + $('#NewCategorie' + copieNb).val().substring(1).toLowerCase())) {
                        Category += '<input class="checkCard mb-2" onchange="checklist_ingredient(' + copieNb + ')" type="checkbox" name="categories_' + j + '" id="categories_' + j + "_" + copieNb + '" value="' + aOfCategories[j]["id_category"] + '" checked>&nbsp;' + aOfCategories[j]["category_name"] + '<br>';
                    } else {
                        Category += '<input class="checkCard mb-2" onchange="checklist_ingredient(' + copieNb + ')" type="checkbox" name="categories_' + j + '" id="categories_' + j + "_" + copieNb + '" value="' + aOfCategories[j]["id_category"] + '">&nbsp;' + aOfCategories[j]["category_name"] + '<br>';
                    }
                }
                precedent_checkbox = new_checkbox;
            }

            $('#adm_offer_list_category' + copieNb).html(Category);
            addNewCategoryAJAX(copieNb);
            checklist_ingredient(copieNb);
            $('#AjoutCategorie' + copieNb).html('');
        }
        // Sinon on indique à l'utilisateur qu'elle est déjà présente
        else {
            $('#AjoutCategorie' + copieNb).html('Cette catégorie fait déjà partie de la liste répertoriée');
            $('#AjoutCategorie' + copieNb).css({"color": "red", "font-weight": "bold"});
        }
    }
}

// ********************************************************************************************************* */
//                                          GESTION CODE PROMO
// ********************************************************************************************************* */

function AddCodePromo(copieNb) {
    sHTML = "";

    // champs de renseignements de la référence et de la description du code promo à ajouter
    sHTML += "<div class='d-flex col-12 ReseignementNouveauCode'>"
    sHTML += '<div class="form-group col-lg-6 col-sm-12">'
    sHTML += '<label for="PromoReference" id="labelReference">Reference: </label>';
    sHTML += '<input type="text" class="form-control" name="PromoReference" placeholder="Ex: Reduc_Eloce5" id="NewCodePromoRef' + copieNb + '">'
    sHTML += '</div>';
    sHTML += '<div class="form-group col-lg-6 col-sm-12">';
    sHTML += '<label for="PromoDescription" id="labelDescription">Description succinte :</label>'
    sHTML += '<input type="text" class="form-control" name="PromoDescription" placeholder="Ex: Réduction de 5€, Ajout d\'un fruit" id="NewCodePromoLabel' + copieNb + '">';
    sHTML += '</div>';
    sHTML += "</div>";

    // champs de renseignements de la valeur et du type de valeur du code promo à ajouter
    sHTML += "<div class='d-flex col-12 ReseignementNouveauCode'>";
    sHTML += '<div class="form-group col-lg-6 col-sm-12">'
    sHTML += '<label for="PromoValeur" id="labelReference">Valeur: </label>';
    sHTML += '<input type="number" class="form-control" name="PromoValeur" placeholder="Ex: 5" id="NewCodePromoValue' + copieNb + '">'
    sHTML += '</div>';
    sHTML += '<div class="form-group col-lg-6 col-sm-12">';
    sHTML += '<label for="PromoType" id="labelDescription">type de remise:</label>'
    sHTML += '<input type="text" class="form-control" name="PromoType" placeholder="Ex: €, tomates, % etc..." id="NewCodePromoType' + copieNb + '">';
    sHTML += '</div>';
    sHTML += "</div>";

    // champs de renseignements de date et heure de début du code promo à ajouter
    sHTML += "<div class='d-flex col-12 ReseignementNouveauCode'>";
    sHTML += '<div class="form-group col-lg-6 col-sm-12">'
    sHTML += '<label for="PromoDateDebut" id="labelDateDebut">Date de début: </label>';
    sHTML += '<input type="datetime-local" class="form-control" name="PromoDateDebut" id="PromoDateDebut' + copieNb + '">'
    sHTML += '</div>';
    sHTML += '<div class="form-group col-lg-6 col-sm-12">'
    sHTML += '<label for="PromoNb" id="labelNb">Nombre d\'exemplaires: </label>';
    sHTML += '<input type="number" class="form-control" name="PromoNb" placeholder="Ex: 5" id="NewCodePromoNb' + copieNb + '">'
    sHTML += '</div>';
    sHTML += "</div>";

    // checkbox pour déterminer ou non une date et une heure de fin du code promo à ajouter
    sHTML += '<div class="d-flex col-12" id="CodePromoAddEndDate">'
    sHTML += '<input type="checkbox" name="check_codePromo_fin' + copieNb + '" id="PromoEndDate_Yes' + copieNb + '" onclick="ShowHideDiv_EndDatePromo(' + copieNb + ')">&nbsp;&nbsp;';
    sHTML += '<span font-size: larger; width:100%" id="CodePromo' + copieNb + '">Cette offre est limitée dans le temps.</span>'
    sHTML += '</div>';

    // si elle existe, champs de renseignements de date et heure de fin du code promo à ajouter
    sHTML += "<div class='col-12 ReseignementNouveauCode' style='display:none' id='Div_HeureFinPromo"+copieNb+"'>";
    sHTML += '<div class="form-group col-lg-6 col-sm-12">'
    sHTML += '<label for="PromoDateFin" id="labelDateDebut">Date de fin: </label>';
    sHTML += '<input type="datetime-local" class="form-control" name="PromoDateFin" id="PromoDateFin' + copieNb + '">'
    sHTML += '</div>';
    sHTML += "</div>";

    // Bouton ajouter et annuler
    sHTML += "<div class='d-flex col-12 justify-content-center my-3'>";
    sHTML += '<button type="button" class="btn btn-green col-2" onclick="AddNewCodePromo(' + copieNb + ')">Valider</button>';
    sHTML += '<div class="col-1"></div>';
    sHTML += '<button type="button" class="btn btn-cancel col-2" onclick="AnnulerAjout(' + copieNb + ')">Annuler</button>';
    sHTML += '</div>';
    sHTML += "</div>";

    $('#AjoutCodePromo' + copieNb).append(sHTML);
    ShowHideDiv_EndDatePromo(copieNb)
}

// affiche la possibilité de mettre une date de fin au code promo
function ShowHideDiv_EndDatePromo() {
    if ($('#PromoEndDate_Yes' + copieNb).is(':checked')) {
        $("#Div_HeureFinPromo"+copieNb).show();
        $("#Div_HeureFinPromo"+copieNb).css("display", "flex");
    } else {
        $("#Div_HeureFinPromo"+copieNb).hide();
        $('#PromoDateFin' + copieNb).val("")
        $('#PromoHeureFin' + copieNb).val("")
    }
}

// champs ajout d'un code promo
function AddNewCodePromo(copieNb) {
    var bNewCodePromo = true;
    var NewCodePromoToAdd= $('#NewCodePromoRef' + copieNb).val().charAt(0).toUpperCase() + $('#NewCodePromoRef' + copieNb).val().substring(1).toLowerCase();
    var CodePromo= "";

    // Vérifie si le champs Description succinte n'est pas vide et inférieur à 255 caractères
    if ($('#NewCodePromoLabel' + copieNb).val() == "" || $('#NewCodePromoLabel' + copieNb).val().length > 255) {
        bNewCodePromo= false;

    }
    // vérifie si le champs Référence n'est pas vide et inférieur ou égal à 15 caractères 
    if ($('#NewCodePromoRef' + copieNb).val() == "" || $('#NewCodePromoRef' + copieNb).val().length >15) {
        bNewCodePromo= false;
    }
    // vérifie si le champs valeur est rempli et est un nombre
    if ($('#NewCodePromoValue' + copieNb).val() == "" || isNaN($('#NewCodePromoValue' + copieNb).val())== true || $('#NewCodePromoValue' + copieNb).val() <=0) {
        bNewCodePromo= false;
    }
    // vérifie si le champs Type de promo est complété
    if ($('#NewCodePromoType' + copieNb).val() == "") {
        bNewCodePromo= false;
    }
    if ($('#PromoDateDebut'+copieNb).val() == "" || $('#PromoHeureDebut'+copieNb).val() == "") {
        bNewCodePromo= false;
    }
    if ($('#NewCodePromoNb' + copieNb).val() == "" || isNaN($('#NewCodePromoNb' + copieNb).val())== true || $('#NewCodePromoValue' + copieNb).val() <=0) {
        bNewCodePromo= false;
    }

    // Recherche si le code promo existe déjà au niveau de sa référence
    for (i= 0; i< aOfcodePromo.length; i++) {
        if (NewCodePromoToAdd == aOfcodePromo[i]["promo_reference"].charAt(0).toUpperCase() + aOfcodePromo[i]["promo_reference"].substring(1).toLowerCase()) {
            bNewCodePromo= false;
        }
    }

    // Si les conditions citées au dessus sont correctes
    if (bNewCodePromo== true) {

        $('#adm_offer_CodePromo' + copieNb).html('');

        // Réordonnancement du tableau aOfCategory par id de category
        aOfcodePromo.sort((a, b) => (parseInt(a.id_promo) > parseInt(b.id_promo)) ? 1 : -1);
        var last_id_codePromo = parseInt(aOfcodePromo[aOfcodePromo.length - 1]["id_promo"]);

        aOfcodePromo.push({ "id_promo": (last_id_codePromo + 1), "promo_label": $('#NewCodePromoLabel'+copieNb).val(), "promo_reference": NewCodePromoToAdd });

        // Réordonnancement du tableau aOfCategories par nom de category
        aOfcodePromo.sort((a, b) => (a.promo_reference > b.promo_reference) ? 1 : -1);
        for (j = 0; j < aOfcodePromo.length; j++) {
            if (NewCodePromoToAdd == aOfcodePromo[j]['promo_reference'].charAt(0).toUpperCase() + aOfcodePromo[j]['promo_reference'].substring(1).toLowerCase()) {
                CodePromo += '<input type="radio" class="checkCard mb-2" name="codepromo' + copieNb + '" id="codepromo_' + j + "_" + copieNb + '" value="' + aOfcodePromo[j]["id_promo"] + '" checked>&nbsp;' + aOfcodePromo[j]["promo_reference"] + '<br>';
            } else {
                CodePromo += '<input type="radio" class="checkCard mb-2" name="codepromo' + copieNb + '" id="codepromo_' + j + "_" + copieNb + '" value="' + aOfcodePromo[j]["id_promo"] + '">&nbsp;' + aOfcodePromo[j]["promo_reference"] + '<br>';
            }
        }

        $('#adm_offer_CodePromo' + copieNb).html(CodePromo);
        addNewCodePromoAJAX(copieNb);
        $('#AjoutCodePromo' + copieNb).html('');
    } else {
        $('#AjoutCodePromo' + copieNb).html('Ce code promotionnel fait déjà partie de la liste répertoriée');
        $('#AjoutCodePromo' + copieNb).css({"color": "red", "font-weight": "bold"});

    }
}

// Annule et cache la demande d'ajout de nouvelles entrées
function AnnulerAjout(copieNb) {
    if ($('#Ajout' + copieNb).html() != "") {
        $('#Ajout' + copieNb).html('');
    }
    if ($('#AjoutCategorie' + copieNb).html() != "") {
        $('#AjoutCategorie' + copieNb).html('');
    }
    if ($('#AjoutCodePromo' + copieNb).html != "") {
        $('#AjoutCodePromo' + copieNb).html('');
    }
}

// gère la possibilité d'ajouté une unité de mesure
function AddMeasureUnit(copieNb) {

    $('#Ajout' + copieNb).html('');
    sHTML = "";

    sHTML += "<div class='d-flex col-12 justify-content-center bouton_new_infos mb-4' id=''>";
    sHTML += '<div><input placeholder="Nom de l\'unité Ex: cm, L" class="" id="NewMeasureUnit' + copieNb + '" required></div>';
    sHTML += "<div class='d-flex div_button_new' onclick='AddNewMeasureUnit(" + copieNb + ")'><i class='fas fa-plus-circle '></i></div>";
    sHTML += "<div class='d-flex' onclick='AnnulerAjout(" + copieNb + ")'><i class='fas fa-ban '></i></div>";
    sHTML += "</div>";

    $('#Ajout' + copieNb).append(sHTML);
}

// Ajoute une unité de mesure 
function AddNewMeasureUnit(copieNb) {
    var MeasureUnitList = "";

    var bMeasureExistante= false;

    // Recherche si l'unité de mesure existe déjà
    for (i = 0; i < aOfMeasureUnit.length; i++) {
        if ($('#NewMeasureUnit' + copieNb).val().charAt(0).toUpperCase() + $('#NewMeasureUnit' + copieNb).val().substring(1).toLowerCase() == aOfMeasureUnit[i]["measureUnit_name"].charAt(0).toUpperCase() + aOfMeasureUnit[i]["measureUnit_name"].substring(1).toLowerCase()) {
            bMeasureExistante= true;
        } 
    }

    if ($('#NewMeasureUnit' + copieNb).val() != "" && bMeasureExistante== false) {

        // Réordonnancement du tableau aOfCategory par id de category
        aOfMeasureUnit.sort((a, b) => (parseInt(a.id_measureUnit) > parseInt(b.id_measureUnit)) ? 1 : -1);
        var last_id_measure_unit = parseInt(aOfMeasureUnit[aOfMeasureUnit.length - 1]["id_measureUnit"]);

        aOfMeasureUnit.push({ "id_measureUnit": (last_id_measure_unit + 1), "measureUnit_name": ($("#NewMeasureUnit" + copieNb).val().charAt(0).toUpperCase() + $('#NewMeasureUnit' + copieNb).val().substring(1).toLowerCase()), "measureUnit_status": 1 });

        // Réordonnancement du tableau aOfCategory par nom de category
        MeasureUnitList += '<select id="Unit_select' + copieNb + '" class="All_unit_select format_select">';
        MeasureUnitList += '<option value=" ">Aucune unité</option>';
        for (k = 0; k < aOfMeasureUnit.length; k++) {
            if ($('#NewMeasureUnit' + copieNb).val().charAt(0).toUpperCase() + $('#NewMeasureUnit' + copieNb).val().substring(1).toLowerCase() == aOfMeasureUnit[k]["measureUnit_name"]) {
            MeasureUnitList += '<option class="checkCard mb-2" name="measureUnit_' + copieNb + '" id="measureUnit_' + copieNb + '" value="' + aOfMeasureUnit[k]["measureUnit_name"] + '" selected>' + aOfMeasureUnit[k]["measureUnit_name"] + '</option>';
            } else {
                MeasureUnitList += '<option class="checkCard mb-2" name="measureUnit_' + copieNb + '" id="measureUnit_' + copieNb + '" value="' + aOfMeasureUnit[k]["measureUnit_name"] + '">' + aOfMeasureUnit[k]["measureUnit_name"] + '</option>';
            }
        }
        MeasureUnitList += '</select>';
        $('#Unit_select' + copieNb).html('');
        $('#Unit_select' + copieNb).html(MeasureUnitList);

        // lance la fonction qui enregistre ces données dans la BDD
        addNewMeasureUnitAJAX(copieNb);

        // on vide la div du champs de saisie de la nouvelle entrée
        $('#Ajout' + copieNb).html('');
    } else {
        $('#Ajout' + copieNb).html('L\'unité de mesure existe déjà');
        $('#Ajout' + copieNb).css({'color': 'red', "font-weight":'bold'});
    }
}

// copie les statuts "checked" pour les ingrédients et relance la fonctions permettant de faire apparaitre les différentes listes d'ingrédients
function adm_offer_isChecked_ingredient(copieNb) {
    for (j = 0; j < aOfCategories.length; j++) {
        if ($('#categories_' + j + "_" + (copieNb - 1)).is(":checked")) {
            $('#categories_' + j + "_" + copieNb).attr('checked', 'checked');
        }
    }
    checklist_ingredient(copieNb);
}

// copie les statuts "checked" pour les code promo
function adm_offer_isChecked_CodePromo(copieNb) {
    for (j = 0; j < aOfcodePromo.length; j++) {
        if ($('#codePromo_' + j + "_" + (copieNb - 1)).is(":checked")) {
            $('#codePromo_' + j + "_" + copieNb).attr('checked', 'checked');
        }
    }
    if ($('#chkYes' + (copieNb - 1)).is(":checked")) {
        $('#chkYes' + copieNb).attr('checked', 'checked');
    }
    ShowHideDiv(copieNb);
}


// cache ou non la div de la liste des codes promos existants
function ShowHideDiv(copieNb) {
    var chkYes = document.getElementById("chkYes" + copieNb);
    var CodePromo_list = document.getElementById("CodePromo_list" + copieNb);
    CodePromo_list.style.display = chkYes.checked ? "block" : "none";
    if ($('#chkNo' + copieNb).is(":checked")) {
        for (var a = 0; a < aOfcodePromo.length; a++) {
            $('#codePromo_' + a + "_" + copieNb).prop("checked", false);
        }
    }
}

// permet d'ajouter un nouveau format en recopiant les informations pré-remplies du format précédent
function RecopierFormat() {

    var copie = "";

    // clone la card de fabrication des formats de panier
    copie = $("#cardComplete" + copieNb)
        .clone(true, true)
        .attr("id", "cardComplete" + (copieNb + 1));

    // on crée une variable qui va permettre de modifier les ids, l'event liée au choix de la catégorie de produit

    cfHTML = "";
    cfHTML += '<div id="adm_offer_list_category' + (copieNb + 1) + '" class="adm_offer_list_category" data-value="' + (copieNb + 1) + '">';
    for (j = 0; j < aOfCategories.length; j++) {
        new_checkbox = aOfCategories[j]["category_name"];
        if ((j == 0) || (precedent_checkbox != new_checkbox)) {
            cfHTML += '<input class="checkCard mb-2" onchange="checklist_ingredient(' + (copieNb + 1) + ')" type="checkbox" name="categories_' + j + '" id="categories_' + j + "_" + (copieNb + 1) + '" value="' + aOfCategories[j]["id_category"] + '">&nbsp;' + aOfCategories[j]["category_name"] + '<br>';
        }
        precedent_checkbox = new_checkbox;
    }
    cfHTML += "</div>";

    // -------------------------------------------------------------------

    // -------------------------------------------------------------------
    // on crée une variable qui va permettre de modifier les ids, l'evenement liés au choix de la catégorie de produit
    var adm_offer_upload = "";
    adm_offer_upload += '<div class="form-group col-12 text-center" id="upload_image_basket' + (copieNb+1) + '">';
    adm_offer_upload += '<div class="d-flex col-12 mb-2 buttonUpload">';
    adm_offer_upload += '<form class="col-8 mb-0 h-100" method="post" action="route.php" target="frmUploadImage' + (copieNb+1) + '" name="uploadForm' + (copieNb+1) + '" id="uploadForm' + (copieNb+1) + '" enctype="multipart/form-data">';
    adm_offer_upload += '<input type="hidden" name="page" id="page" value="upload_files">';
    adm_offer_upload += '<input type="hidden" name="bJSON" id="bJSON" value="1">'
    adm_offer_upload += '<input type="hidden" name="copie" id="copie' + (copieNb+1) + '" value="' + (copieNb+1) + '">'
    adm_offer_upload += '<div class="h-100">';
    adm_offer_upload += '<span>Sélectionnez une photo stockée sur votre ordinateur :<br></span>';
    adm_offer_upload += '<label for="new_fichier' + (copieNb+1) + '" id="label_file' + (copieNb+1) + '" name="label_file' + (copieNb+1) + '" class="label_file button_main mt-2 mb-0">Charger une nouvelle image ou un document</label>';
    adm_offer_upload += '<input id="new_fichier' + (copieNb+1)  + '" accept=".jpeg,.jpg,.png,.gif" name="new_fichier' + (copieNb+1) + '" type="file" style="display: none;" onchange="doUploadBasket(' + (copieNb+1) + ')">';
    adm_offer_upload += '<p class="text-left mb-0 ImgProperties">Extensions acceptées: .jpeg, .jpg, .png, .gif</p>';
    adm_offer_upload += '<p class="text-left mb-0 ImgProperties">Taille maximale acceptée: 512Ko</p>'
    adm_offer_upload += '</div>';
    adm_offer_upload += '</form>';
    adm_offer_upload += '<div class="row justify_content-center col-4" style="position: relative; left: 40px;"><div class="px-0 adm_offer_ApercuImage" id="adm_offer_ApercuImage'+(copieNb+1)+'"><p id="adm_offer_ImgApercu">Aperçu...</p></div></div>'
    adm_offer_upload += '<iframe src="about:blank" id="frmUploadImage' + (copieNb+1) + '" name="frmUploadImage' + (copieNb+1) + '" style="width: 1px; height: 1px; border: 0px; margin: 0px; padding: 0px; display: none; pointer-events: auto;"></iframe>';
    adm_offer_upload += '</div>';
    adm_offer_upload += '<div id="adm_offer_newFormatDate' + (copieNb+1) + '" style="display:none"></div>';
    adm_offer_upload += '<span id="Div_Resultat_upload_Basket'+ (copieNb+1) +'"></span>';
    adm_offer_upload += '</div>';

    // -------------------------------------------------------------------

    var creation_unit_select = ""
    creation_unit_select += '<select id="Unit_select' + (copieNb + 1) + '" class="All_unit_select format_select">';
    creation_unit_select += '<option value=" ">Aucune unité</option>';
    for (k = 0; k < aOfMeasureUnit.length; k++) {
        creation_unit_select += '<option class="checkCard mb-2" type="checkbox" name="measureUnit_' + (copieNb + 1) + '" id="measureUnit_' + (copieNb + 1) + '" value="' + aOfMeasureUnit[k]["measureUnit_name"] + '">' + aOfMeasureUnit[k]["measureUnit_name"] + '</option>';
    }
    creation_unit_select += '<option value="AddMeasureUnit">+ Ajouter une unité</option>';
    // --------------------------------------------------------------------

    //---------------------------------------------------------------------
    // création d'une liste de l'ensemble des code promo pour les copies de formate de paniers
    var ListCodePromo = ""
    ListCodePromo += '<div id="adm_offer_CodePromo' + (copieNb + 1) + '" class="adm_offer_list_category" data-value="' + (copieNb + 1) + '">';
    for (z = 0; z < aOfcodePromo.length; z++) {
        ListCodePromo += '<input class="checkCard mb-2" type="radio" name="codepromo' + (copieNb + 1) + '" id="codePromo_' + z + "_" + (copieNb + 1) + '" value="' + aOfcodePromo[z]["id_promo"] + '">&nbsp;' + aOfcodePromo[z]["promo_reference"] + '<br>';
    }
    ListCodePromo += "</div>";

    // --------------------------------------------------------------------

    // Changement des boutons radios ---------------------------------------
    var bouton_radio = "";
    bouton_radio += '<div style="text-align: center; font-size: larger;width:100%" id="CodePromo' + (copieNb + 1) + '">Un code promo doit être associé à ce format?&nbsp;&nbsp;&nbsp'
    bouton_radio += '<input type="radio" name="check_codePromo' + (copieNb + 1) + '" value="oui" id="chkYes' + (copieNb + 1) + '" onclick="ShowHideDiv(' + (copieNb + 1) + ')">&nbsp;Oui</input>&nbsp;&nbsp;&nbsp';
    bouton_radio += '<input type="radio" name="check_codePromo' + (copieNb + 1) + '" value="non" id="chkNo' + (copieNb + 1) + '" onclick="ShowHideDiv(' + (copieNb + 1) + ')" checked>&nbsp;Non</input>';
    bouton_radio += '</div>';
    // --------------------------------------------------------------------

    // Gestion des boutons add et reinitialize ----------------------------
    var bouton_Mngt = ""
    bouton_Mngt += '<div class="d-flex mt-4 col-12 justify-content-around" id="Button_list_Mngt' + (copieNb + 1) + '"><button type="button" class="btn btn-green col-4" onclick="add_ingredient_lists(' + (copieNb + 1) + ')">+ Ajouter cet ingrédient</button>';
    bouton_Mngt += '<button type="button" class="btn btn-cancel col-4" onclick="reinitialize(' + (copieNb + 1) + ')">Réinitialiser la liste</button></div>';
    // ---------------------------------------------------

    // Change le bouton qui permet d'ajouter un ingredient dans la liste -------------------
    var AllBouton = ""
    AllBouton += '<div class="col-6 text-center" id="AllIngredient' + (copieNb + 1) + '">';
    AllBouton += "<p>Choisissez un ingrédient dans la liste parmi les catégories sélectionnées préalablement</p>";
    AllBouton += '<select class="select_ingredients' + (copieNb + 1) + ' All_select_ingredients format_select" id="select_ingredients' + (copieNb + 1) + '"><option value="-">--- Sélectionnez ---</option></select>';
    AllBouton += '<p>Ou <button class="button_main" onClick="AddIngredient(' + (copieNb + 1) + ')">Créer un ingrédient manquant ?</button></p>';
    AllBouton += '</div>';

    // --------------------------------------------------------------------------------------

    // Change le bouton qui permet d'ajouter un ingredient dans la liste -------------------
    var BoutonAddCodePromo = ""
    BoutonAddCodePromo += '<div class="d-flex justify-content-center mt-1" id="BoutonAddCodePromo' + (copieNb + 1) + '">';
    BoutonAddCodePromo += '<button type="button" class="btn btn-green btn_add_CodePromo mb-3" onClick="AddCodePromo(' + (copieNb + 1) + ')">+ Ajouter un code promo</button>';
    BoutonAddCodePromo += '</div>';
    // --------------------------------------------------------------------------------------

    // Bouton close ------------------------------------------------------------------------
    var bouton_close = "";
    bouton_close += '<button type="button" id="close_button' + (copieNb + 1) + '" class="close" onclick="remove_format(' + (copieNb + 1) + ')">&times;</button>';
    // -------------------------------------------------------------------------------------

    // Div Bouton Ajout Categorie ------------------------------------------------------------------------
    var bouton_add_category = "";
    bouton_add_category += '<div class="d-flex justify-content-center mt-1" id="DivAddCategory' + (copieNb + 1) + '">';
    bouton_add_category += '<button type="button" class="btn btn-green btn_add_category mb-3" onClick="addCategories(' + (copieNb + 1) + ')">+ Ajouter une categorie </button>';
    bouton_add_category += '</div>';
    // -------------------------------------------------------------------------------------


    // change tous les attributs ID et classe de la copie par un attribut (ID ou classe précédent(e) + 1)
    // replacewith() va permettre de mettre à jour les arguments des functions utilisées dans la nouvelle copie

    copie.find('#FormatTitle' + copieNb).attr("id", 'FormatTitle' + (copieNb + 1));
    copie.find('#FormatTitle' + (copieNb + 1)).replaceWith('<div class="ml-3 text-center FormatTitle py-2 w-100" id="FormatTitle' + (copieNb + 1) + '">Format n°' + (copieNb + 2) + '</div>');
    copie.find('#adm_offer_list_category' + copieNb).attr("id", 'adm_offer_list_category' + (copieNb + 1));
    copie.find('#adm_offer_list_category' + (copieNb + 1)).replaceWith(cfHTML);

    copie.find('#cardFormat' + copieNb).attr("id", 'cardFormat' + (copieNb + 1));
    copie.find('#cardFormat' + copieNb).attr("name", 'cardFormat' + (copieNb + 1));
    copie.find('#BasketName' + copieNb).attr("id", 'BasketName' + (copieNb + 1));
    copie.find('#addDesc' + copieNb).attr("id", 'addDesc' + (copieNb + 1));
    copie.find('#adm_offer_ingredient_choice' + copieNb).attr("id", 'adm_offer_ingredient_choice' + (copieNb + 1));
    copie.find('#AllIngredient' + (copieNb)).attr("id", 'AllIngredient' + (copieNb + 1));
    copie.find('#AllIngredient' + (copieNb + 1)).replaceWith(AllBouton);

    copie.find('#Ajout' + copieNb).attr("id", 'Ajout' + (copieNb + 1));
    copie.find('#AjoutCategorie' + copieNb).attr("id", 'AjoutCategorie' + (copieNb + 1));

    copie.find('#Unit_select' + copieNb).attr("id", 'Unit_select' + (copieNb + 1));
    copie.find('#Unit_select' + (copieNb + 1)).replaceWith(creation_unit_select);

    copie.find('#DivAddCategory' + copieNb).attr("id", 'DivAddCategory' + (copieNb + 1));
    copie.find('#DivAddCategory' + (copieNb + 1)).replaceWith(bouton_add_category);

    copie.find('#fieldset_compo' + copieNb).attr("id", 'fieldset_compo' + (copieNb + 1));

    copie.find('#add_img_Supplier' + copieNb).attr("id", 'add_img_Supplier' + (copieNb + 1));

    copie.find('#addPrice' + copieNb).attr("id", 'addPrice' + (copieNb + 1));
    copie.find('#Button_list_Mngt' + copieNb).attr("id", 'Button_list_Mngt' + (copieNb + 1));
    copie.find('#Button_list_Mngt' + (copieNb + 1)).replaceWith(bouton_Mngt);

    copie.find('#upload_image_basket' + copieNb).attr("id", 'upload_image_basket' + (copieNb + 1));
    copie.find('#upload_image_basket' + (copieNb + 1)).replaceWith(adm_offer_upload);

    copie.find('#addQuantity' + copieNb).attr("id", 'addQuantity' + (copieNb + 1));
    copie.find('#addQuantity' + (copieNb + 1)).replaceWith('<input type="number" placeholder="Qté" class="form-control" onfocusout="checkQuantity(' + (copieNb + 1) + ')" addInputCard addQuantity" id="addQuantity' + (copieNb + 1) + '" name="addQuantity" required>');
    copie.find('#addNbOffer' + copieNb).attr("id", 'addNbOffer' + (copieNb + 1));
    copie.find('#CodePromo' + copieNb).attr("id", 'CodePromo' + (copieNb + 1));
    copie.find('#CodePromo' + (copieNb + 1)).replaceWith(bouton_radio);

    copie.find('#close_button' + copieNb).attr("id", 'close_button' + (copieNb + 1));
    copie.find('#close_button' + (copieNb + 1)).replaceWith(bouton_close);

    copie.find('#CodePromo_list' + copieNb).attr("id", 'CodePromo_list' + (copieNb + 1));
    copie.find('#measureUnit_' + copieNb).attr("id", 'measureUnit_' + (copieNb + 1));

    copie.find('#adm_offer_CodePromo' + copieNb).attr("id", 'adm_offer_CodePromo' + (copieNb + 1));
    copie.find('#adm_offer_CodePromo' + (copieNb + 1)).replaceWith(ListCodePromo);

    copie.find('#categories_' + j + copieNb).attr("id", 'categories_' + j + (copieNb + 1));
    copie.find('.select_ingredients' + copieNb).attr("class", 'select_ingredients' + (copieNb + 1));
    copie.find('.select_ingredients' + (copieNb + 1)).addClass("All_select_ingredients");
    copie.find('.select_ingredients' + (copieNb + 1)).addClass("format_select");
    copie.find('#add_list_ingredient' + copieNb).attr("id", 'add_list_ingredient' + (copieNb + 1));

    copie.find('#AjoutCodePromo' + copieNb).attr("id", 'AjoutCodePromo' + (copieNb + 1));
    copie.find('#BoutonAddCodePromo' + copieNb).attr("id", 'BoutonAddCodePromo' + (copieNb + 1));
    copie.find('#BoutonAddCodePromo' + (copieNb + 1)).replaceWith(BoutonAddCodePromo);

    // Ajoute cette copie de format sous le format précédent
    copie.appendTo($("#card_format"));

    copieNb++;

    adm_offer_isChecked_ingredient(copieNb);
    adm_offer_isChecked_CodePromo(copieNb);
}

// donne la possibilité d'enlever un format sauf le premier
// function remove_format(copieNb) {
//     if (copieNb != 0) {
//         $('#cardComplete' + copieNb).empty();
//         copieNb--
//     }
// }

// vérifie si la quantité est correcte
function checkQuantity(copieNb) {
    if ($('#addQuantity' + copieNb).val() == 0) {
        $('#addQuantity' + copieNb).val("")
    }
}


// met en place les différents formats de panier apres validation des dates
function cardNbFormat() {

    cfHTML = "";

    // numéro de la copie
    copieNb = 0;

    cfHTML += '<div class="cardFormat cardComplete" id="cardComplete' + copieNb + '">';
    cfHTML += '<div class="d-flex text-center w-100">'
    cfHTML += '<div class="ml-3 text-center FormatTitle py-2 w-100" id="FormatTitle' + copieNb + '">Format n°' + (copieNb + 1) + '</div>';
    // cfHTML += '<button type="button" id="close_button' + copieNb + '" class="close" onclick="remove_format(' + copieNb + ')">&times;</button>';
    cfHTML += "</div>";
    cfHTML += '<div class="ml-3 pt-2">';
    cfHTML += '<label class="mr-2">Nom du format :</label>';
    cfHTML += '<input id="BasketName' + copieNb + '" placeholder="Ex: Panier de 6 kgs">';
    cfHTML += "</div>";
    cfHTML += '<div class="desc col-12">';
    cfHTML += '<div class="form-group">'
    cfHTML += '<label>Description</label>';
    cfHTML += '<textarea class="form-control" id="addDesc' + copieNb + '" name="addDesc"></textarea>'
    cfHTML += '</div>';
    cfHTML += '</div>';
    cfHTML += '<div class="form-group col-12 text-center" id="upload_image_basket' + copieNb + '">';
    cfHTML += '<div class="d-flex col-12 mb-2 buttonUpload">';
    cfHTML += '<form class="col-8 mb-0 h-100" method="post" action="route.php" target="frmUploadImage' + copieNb + '" name="uploadForm' + copieNb + '" id="uploadForm' + copieNb + '" enctype="multipart/form-data">';
    cfHTML += '<input type="hidden" name="page" id="page" value="upload_files">';
    cfHTML += '<input type="hidden" name="bJSON" id="bJSON" value="1">'
    cfHTML += '<input type="hidden" name="copie" id="copie' + copieNb + '" value="' + copieNb + '">'
    cfHTML += '<div class="h-100">';
    cfHTML += '<span>Sélectionnez une photo stockée sur votre ordinateur :<br></span>';
    cfHTML += '<label for="new_fichier' + copieNb + '" id="label_file' + copieNb + '" name="label_file' + copieNb + '" class="label_file button_main mt-2 mb-0">Charger une nouvelle image ou un document</label>';
    cfHTML += '<input id="new_fichier' + copieNb  + '" accept=".jpeg,.jpg,.png,.gif" name="new_fichier' + copieNb + '" type="file" style="display: none;" onchange="doUploadBasket(' + copieNb + ')">';
    cfHTML += '<p class="text-left mb-0 ImgProperties">Extensions acceptées: .jpeg, .jpg, .png, .gif</p>';
    cfHTML += '<p class="text-left mb-0 ImgProperties">Taille maximale acceptée: 512Ko</p>'
    cfHTML += '</div>';
    cfHTML += '</form>';
    cfHTML += '<div class="row justify_content-center col-4" style="position: relative; left: 40px;"><div class="px-0 adm_offer_ApercuImage" id="adm_offer_ApercuImage'+copieNb+'"><p id="adm_offer_ImgApercu">Aperçu...</p></div></div>'
    cfHTML += '<iframe src="about:blank" id="frmUploadImage' + copieNb + '" name="frmUploadImage' + copieNb + '" style="width: 1px; height: 1px; border: 0px; margin: 0px; padding: 0px; display: none; pointer-events: auto;"></iframe>';
    cfHTML += '</div>';
    cfHTML += '<div id="adm_offer_newFormatDate' + copieNb + '" style="display:none"></div>';
    cfHTML += '<span id="Div_Resultat_upload_Basket'+ copieNb +'"></span>';
    cfHTML += '</div>';

    // ****** Composition du panier principal *****
    cfHTML += '<div style="text-align: center; font-size: x-larger; text-decoration:underline">Constitution du panier :</div>';
    cfHTML += '<div class="text-center mt-2">Choisissez la ou les <strong>catégorie(s)</strong> de produit présentes dans votre panier</div>';
    cfHTML += '<div class="cardFormat" id="cardFormat' + copieNb + '" name="cardFormat' + copieNb + '" >';

    // mise en place des checkbox (1 seule par nom de catégorie)
    cfHTML += '<div id="adm_offer_list_category' + copieNb + '" class="adm_offer_list_category" data-value="' + copieNb + '">';

    for (j = 0; j < aOfCategories.length; j++) {
        new_checkbox = aOfCategories[j]["category_name"];
        if ((j == 0) || (precedent_checkbox != new_checkbox)) {
            cfHTML += '<input class="checkCard mb-2" onchange="checklist_ingredient(' + copieNb + ')" type="checkbox" name="categories_' + j + '" id="categories_' + j + "_" + copieNb + '" value="' + aOfCategories[j]["id_category"] + '">&nbsp;' + aOfCategories[j]["category_name"] + '<br>';
        }
        precedent_checkbox = new_checkbox;
    }
    cfHTML += "</div>";

    // Bouton ajout possible de catégorie
    cfHTML += '<div class="d-flex justify-content-center mt-1" id="DivAddCategory' + copieNb + '">';
    cfHTML += '<button type="button" class="btn btn-green btn_add_category mb-3" onClick="addCategories(' + copieNb + ')">+ Ajouter une categorie </button>';
    cfHTML += '</div>';

    cfHTML += '<div id="AjoutCategorie' + copieNb + '" class="col-12 text-center justify-content-center">';
    cfHTML += '</div>';
    // *******************  FIN  ******************/


    // *********    mise en place de la liste du contenu du panier   ****

    // champs 'liste des ingrédients'
    cfHTML += '<div class="d-flex mb-3 mt-1" id="adm_offer_ingredient_choice' + copieNb + '">';
    cfHTML += '<div class="col-6 text-center" id="AllIngredient' + copieNb + '">';
    cfHTML += "<p>Choisissez un ingrédient dans la liste parmi les catégories sélectionnées préalablement</p>";
    cfHTML += '<select class="select_ingredients' + copieNb + ' All_select_ingredients format_select" id="select_ingredients' + copieNb + '"><option value="-">--- Sélectionnez ---</option></select>';
    cfHTML += '<p>Ou <button class="button_main" onClick="AddIngredient(' + copieNb + ')">Créer un ingrédient manquant ?</button></p>';
    cfHTML += '</div>';

    // champs unité de mesure
    cfHTML += '<div class="col-6 text-center">';
    cfHTML += '<div class="text-center">';
    cfHTML += "<p>Si nécessaire, définissez la quantité et l'unité de mesure</p>";
    cfHTML += '</div>';
    cfHTML += '<div class="d-flex col-12">';
    cfHTML += '<div class="col-6">';
    cfHTML += '<input type="number" placeholder="Qté" class="form-control" onfocusout="checkQuantity(' + copieNb + ')" addInputCard addQuantity" id="addQuantity' + copieNb + '" name="addQuantity" class="w-50">';
    cfHTML += '</div>';
    cfHTML += '<div class="col-6 px-0">';
    cfHTML += '<select id="Unit_select' + copieNb + '" class="All_unit_select format_select px-0">';
    cfHTML += '<option value=" ">Aucune unité</option>';

    for (k = 0; k < aOfMeasureUnit.length; k++) {
        cfHTML += '<option class="checkCard mb-2" name="measureUnit_' + copieNb + '" id="measureUnit_' + copieNb + '" value="' + aOfMeasureUnit[k]["measureUnit_name"] + '">' + aOfMeasureUnit[k]["measureUnit_name"] + '</option>';
    }

    cfHTML += '</select>';
    cfHTML += '</div>';
    cfHTML += '</div>';
    cfHTML += '<p>Ou <button class="button_main" onClick="AddMeasureUnit(' + copieNb + ')">Créer une unité manquante ?</button></p>';
    cfHTML += '</div>';
    cfHTML += '</div>';

    // Là où s'affiche les champs permettant d'ajouter soit un ingrédient soit une unité de mesure
    cfHTML += '<div id="Ajout' + copieNb + '" class="col-12 justify-content-center text-center">';
    cfHTML += '</div>';

    // les boutons permettant d'ajouter un article au format où d'effacer la liste
    cfHTML += '<div class="d-flex mt-4 col-12 justify-content-around" id="Button_list_Mngt' + copieNb + '">'
    cfHTML += '<button type="button" class="btn btn-green col-4" onclick="add_ingredient_lists(' + copieNb + ')">+ Ajouter cet ingrédient</button>';
    cfHTML += '<button type="button" class="btn btn-cancel col-4" onclick="reinitialize(' + copieNb + ')">Réinitialiser la liste</button>';
    cfHTML += '</div>';

    // Affichage de la liste des ingrédients que l'on souhaite ajouter au format
    cfHTML += '<div class="d-flex justify-content-center mb-3">';
    cfHTML += '<fieldset class="mt-2 adm_offer_fieldset fieldset_compo d-flex" id="fieldset_compo' + copieNb + '">';
    cfHTML += '<legend class="fieldset_legend px-3 text-left">Composition du format :</legend>';
    cfHTML += '<ul id="add_list_ingredient' + copieNb + '" class="pb-1" required></ul>';
    cfHTML += '</fieldset>';
    cfHTML += '</div>';
    // ********************************************************************

    // Prix et nombre de formats mis en vente
    cfHTML += '<div class="d-flex col-12">';
    cfHTML += '<div class="col-6">';
    cfHTML += '<label class="ml-2">Prix de ce format (€) :</label>';
    cfHTML += '<input type="text" placeholder="Ex: 10.99" class="form-control addInputCard mb-3" id="addPrice' + copieNb + '" name="addPrice"  required></input>';
    cfHTML += '</div>';
    cfHTML += '<div class="col-6">';
    cfHTML += '<label class="ml-2">Nombre de paniers de ce format :</label>';
    cfHTML += '<input type="number" placeholder="Ex: 10" class="form-control addInputCard mb-3" id="addNbOffer' + copieNb + '" name="addNbOffer"  required></input>';
    cfHTML += '</div>';
    cfHTML += '</div>';


    // Gestion des codes promos
    cfHTML += '<div class="col-12 d-flex pb-1">';
    cfHTML += '<div style="text-align: center; font-size: larger; width:100%" id="CodePromo' + copieNb + '">Un code promo doit être associé à ce format ?&nbsp;&nbsp;&nbsp'
    cfHTML += '<input type="radio" name="check_codePromo' + copieNb + '" value="oui" id="chkYes' + copieNb + '" onclick="ShowHideDiv(' + copieNb + ')">&nbsp;Oui</input>&nbsp;&nbsp;&nbsp';
    cfHTML += '<input type="radio" name="check_codePromo' + copieNb + '" value="non" id="chkNo' + copieNb + '" onclick="ShowHideDiv(' + copieNb + ')" checked>&nbsp;Non</input>';
    cfHTML += '</div>';
    cfHTML += '</div>';

    // mise en place des checkbox (1 seule par nom de Code promo)
    cfHTML += '<div class="codePromo_hide" id="CodePromo_list' + copieNb + '">';
    cfHTML += '<div id="adm_offer_CodePromo' + copieNb + '" class="adm_offer_list_category" data-value="' + copieNb + '">';

    for (z = 0; z < aOfcodePromo.length; z++) {
        cfHTML += '<input class="checkCard mb-2" type="radio" name="codepromo' + copieNb + '" id="codePromo_' + z + "_" + copieNb + '" value="' + aOfcodePromo[z]["id_reference"] + '">&nbsp;' + aOfcodePromo[z]["promo_reference"] + '<br>';
    }
    cfHTML += "</div>";
    cfHTML += '<div class="d-flex justify-content-center mt-1" id="BoutonAddCodePromo' + copieNb + '">';
    cfHTML += '<button type="button" class="btn btn-green btn_add_CodePromo mb-3" onClick="AddCodePromo(' + copieNb + ')">+ Ajouter un code promo</button>';
    cfHTML += '</div>';
    cfHTML += '<div id="AjoutCodePromo' + copieNb + '"></div>';
    cfHTML += '</div>';
    cfHTML += '</div>';
    cfHTML += '</div>';
    cfHTML += '</div>';

    // Affichage des formats
    $('#card_format').html(cfHTML);
};

/***************************/
/*      EDIT ELEMENT       */
/***************************/

var iIndiceEditionEncours;

function editBasket(iIndiceEdit) {

    iIndiceEditionEncours = iIndiceEdit;

    /* on affiche les valeurs du tableau dans nos inputs */

    $('.Div_Resultat_upload_mainbasket').html("");

    $('#RecupIndice').val(iIndiceEdit)
    $('#editSupplier').val(aOfBasket[iIndiceEdit]["supplier_name"] + " " + aOfBasket[iIndiceEdit]["supplier_firstname"]);
    $('#editMainBasket').val(aOfBasket[iIndiceEdit]["mainBasket_name"]);
    $('#editName').val(aOfBasket[iIndiceEdit]["basket_name"]);
    $('#adm_offer_ApercuImageEdit').html("<img src='assets/img/" + aOfBasket[iIndiceEdit]["basket_image"] + "' alt='Image panier'>");
    $('#adm_offer_newFormatDateEdit').val(aOfBasket[iIndiceEdit]["basket_image"]);
    console.log($('#adm_offer_newFormatDateEdit').val())
    $('#editDesc').val(htmlspecialchars_decode(aOfBasket[iIndiceEdit]["basket_description"]));
    $('#editNumber').val(aOfBasket[iIndiceEdit]["basket_number"]);
    $('#editQuantity').val(aOfBasket[iIndiceEdit]["basket_quantity"]);
    $('#editPrice').val(aOfBasket[iIndiceEdit]["basket_price"]);

    // met à jour le nombre de paniers restants en fonction de la modification du nombre de paniers à vendre
    NbPanierAVendre();
}

function modifyBasket() {

    let datas = {
        page: 'adm_offer_update',
        bJSON: 1,
        id_basket: aOfBasket[iIndiceEditionEncours]["id_basket"],
        id_mainBasket: aOfBasket[iIndiceEditionEncours]["id_mainBasket"],
        mainBasket_name: $('#editMainBasket').val(),
        basket_name: $('#editName').val(),
        basket_image: $('#adm_offer_newFormatDateEdit').val(),
        basket_description: htmlspecialchars_decode($('#editDesc').val()),
        basket_number: $('#editNumber').val(),
        basket_quantity: $('#editQuantity').val(),
        basket_price: $('#editPrice').val()
    }

    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: true,
        data: datas,
        dataType: 'json',
        cache: false
    })

    .always(function() {
        $('#modal_save').hide();
        console.log('reçu', [arguments]);
    })

    .done(function(data) {
        if (isEmpty(data.error)) {
            toastr.success('Informations mis à jour avec succès', 'Succès');
            tables.clear();
            tables.destroy();
            LoadOffer();
        } else {
            toastr.error(ERROR_MESSAGE, ERROR_TITLE)
        }
    })

    .fail(function(error) {
        showError(error)
        toastr.error(ERROR_MESSAGE, ERROR_TITLE)
    })
}

//********************************************************* */
//*************** GESTION DU NOMBRE DE PANIER ************* */
//********************************************************* */

var NewCountBasket

function NbPanierAVendre() {
    NewCountBasket = $('#editQuantity').val()
}

var new_count_basket = "";

function changementNbPanier() {
    if (new_count_basket == "") {

        let NbBasket = parseInt($('#editNumber').val());
        let Nb2 = parseInt($('#editQuantity').val());
        let NewBasketTotal = Nb2 - NewCountBasket;

        let NbTotal = NbBasket + NewBasketTotal;
        $('#editNumber').val("");
        $('#editNumber').val(NbTotal);
        new_count_basket = $('#editQuantity').val();

    } else if (new_count_basket != "") {

        let NbBasket = parseInt($('#editNumber').val());
        let Nb2 = parseInt($('#editQuantity').val());
        let NewBasketTotal = Nb2 - new_count_basket;
        let NbTotal = NbBasket + NewBasketTotal;
        $('#editNumber').val("");
        $('#editNumber').val(NbTotal);
        new_count_basket = $('#editQuantity').val();
    }
}

/***************************/
/*     DELETE ELEMENT      */
/***************************/

function valueBasket(value) {
    iIndiceDelete = value;
};

function deleteBasket() {

    if (aOfBasket[iIndiceDelete]["basket_number"] == aOfBasket[iIndiceDelete]["basket_quantity"]) {
        let datas = {
            page: 'adm_offer_delete',
            bJSON: 1,
            id_basket: aOfBasket[iIndiceDelete]['id_basket'],
            basket_number: aOfBasket[iIndiceDelete]["basket_number"],
            basket_quantity: aOfBasket[iIndiceDelete]["basket_quantity"]
        }

        $.ajax({
            type: 'POST',
            url: 'route.php',
            async: true,
            data: datas,
            dataType: 'json',
            cache: false
        })

        .always(function() {
            $('#modal_save').hide();
            console.log('reçu', [arguments]);
        })

        .done(function(data) {
            if (isEmpty(data.error)) {
                toastr.success('Panier supprimé avec succès', 'Succès');
                tables.clear();
                tables.destroy();
                LoadOffer()
            } else {
                toastr.error(ERROR_MESSAGE, ERROR_TITLE)
            }
        })

        .fail(function(error) {
            showError(error)
            toastr.error(ERROR_MESSAGE, ERROR_TITLE)
        })
    } else {
        toastr.error('Des utilisateurs ont commandé ce panier, il ne peut pas être supprimé', 'Erreur');
    }
}

/***************************/
/*      DISPLAY TABLE      */
/***************************/

$(document).ready(function() {
    LoadOffer();
});

/***************************/
/* CONFIGURATION DATATABLE */
/***************************/

const configuration = {
    "responsive": true,
    "stateSave": true,
    "order": [
        [0, "asc"]
    ],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "Tous"]
    ],
    "language": {
        "info": "Résultats _START_ à _END_ sur _TOTAL_",
        "emptyTable": "Aucun utilisateur",
        "lengthMenu": "_MENU_ Utilisateurs par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Utilisateurs 0 à 0 sur 0 sélectionnée",
    },
    "columns": [{
            "orderable": true /* Supplier */
        },
        {
            "orderable": true /* MainBasket */
        },
        {
            "orderable": true /* Nom */
        },
        {
            "orderable": true /* Image */
        },
        {
            "orderable": true /* Description */ ,
            "width": "25%"
        },
        {
            "orderable": true /* Nombre de paniers */
        },
        {
            "orderable": true /* prix */
        },
        {
            "orderable": false /* Action */
        },
    ],
    'retrieve': true
};


/***************************/
/*       ADD CATEGORY      */
/***************************/

/***************************/
/*     ADD MEASUREUNIT     */
/***************************/

/******************************* */
/*       VALIDATION STEP         */
/* ***************************** */

// valide l'etape de selection du fournisseur
function afficher_infos() {
    $('#infos_descr_toggle').removeClass("disabledDiv");
    $('#infos_setup').addClass("show")
}


var error = 0;
var bCreerInfo=0;
// valide l'etape de nom de famille de panier et sa description et active l'etape suivante

function creer_infos() {
    $('#infos_descr_toggle').removeClass("disabledDiv");
    $('#infos_setup').addClass("show");

    $('#addMainBasket').keydown(function() {
        if (($('#addMainBasket').val().length > 0) && (($('#addMainBasket').val().length <= 255))) {
            $('#Div_addMainBasket_error').html('');
            $('#addMainBasket').css("border", "1px solid #dddddd");
            error = 0;
        } else if ($('#addMainBasket').val().length > 255) {
            $('#addMainBasket').css("border", "2px solid red");
            $('#Div_addMainBasket_error').html("Ce titre est trop long");
            error++;
        }
    })

    if (bCreerInfo== 1) {
        reinitialisation_modal()
    }

    bCreerInfo=1;
}

function reinitialisation_modal() {
    $('.cardFormat').html('');
    $('#format_descr_toggle').addClass("disabledDiv");
    $('#adm_order_format').removeClass("show");
    $('#date_setup').removeClass("show");
    $('#date_descr_toggle').addClass("disabledDiv");
    $('#addMainBasket').val('');
    $('#adm_offer_ApercuImage img').remove();
    $('#adm_offer_ApercuImage').html('<p id="adm_offer_ImgApercu">Aperçu...</p>');
    $('#adm_offer_newFormatDate').val("");
    $('#frmUploadImage').val("");
    $('#addDesc').val("");   
    $('#Div_Resultat_upload_mainbasket').html('');

    // vide les champs des dates
    $('[id^= "addStart"]').val('');
    $('[id^= "addEnd"]').val('');
    $('.adm_offer_dates').val('');
}


// ************************************************************************** */
//                               UPLOAD D'IMAGE
// ************************************************************************** */

function doUploadBasketEdit(iIndiceEditionEncours) {
    $('#divModalSaving').show();
    var str = $('#new_fichierEdit').val();
    var aOfDate = str.split(".");
    var extension = "." + aOfDate[aOfDate.length - 1];

    // modification du nom de l'image 
    Nom_fichier_image();
    date += "_" + iIndiceEditionEncours + extension;

    // recupération du nouveau nom de l'image pour l'enregistrement en BDD
    $('#adm_offer_newFormatDateEdit').val("basket_" + date);
    $('#uploadFormEdit').submit();
}

// fonction d'upload d'image de famille de paniers
function doUploadMainBasket() {
    // la fenêtre de chargement
    $('#divModalSaving').show();
    // je submit les données suivantes :
    // new_fichier = url local du fichier
    // page = upload_fichier
    // bJSON = 1
    var str = $('#new_fichier').val();
    var aOfDate = str.split(".");
    var extension = "." + aOfDate[aOfDate.length - 1];

    // change le nom du fichier
    Nom_fichier_image();

    date += extension;

    $('#adm_offer_newFormatDate').val("mainBasket_" + date);
    $('#uploadForm').submit();
}

// fonction d'upload d'image de format de paniers
function doUploadBasket(copieNb) {
    // la fenêtre de chargement
    $('#divModalSaving').show();
    // je submit les données suivantes :
    // new_fichier = url local du fichier
    // page = upload_fichier
    // bJSON = 1

    // recuperation du nom de l'image pour récupérer son extension
    var str = $('#new_fichier' + copieNb).val();
    var aOfDate = str.split(".");
    var extension = "." + aOfDate[aOfDate.length - 1];

    // modification du nom de l'image 
    Nom_fichier_image();
    date += "_" + copieNb + extension;

    // recupération du nouveau nom de l'image pour l'enregistrement en BDD
    $('#adm_offer_newFormatDate' + copieNb).val("basket_" + date);
    $('#uploadForm'+copieNb).submit();
}

var date = "";

// fonction permettant de modifier et harmoniser le nom des images de paniers uploadées
function Nom_fichier_image() {

    date = new Date();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : '' + month;

    var day = date.getDate();
    day = day < 10 ? '0' + day : '' + day;

    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : '' + minutes;

    var hours = date.getHours();
    hours = hours < 10 ? '0' + hours : '' + hours;

    date = day + "_" + month + "_" + hours + "_" +  minutes;

    return date;
}

function validate_descr() {
    if ($('#addMainBasket').val() == "") {
        $('#addMainBasket').css("border", "2px solid red");
        $('#Div_addMainBasket_error').html('');
        $('#Div_addMainBasket_error').html("Veuillez remplir ce champs");
        error++;
    }

    for (n=0; n<aOfMainBasket.length; n++) {
        console.log($('#addMainBasket').val());
        console.log(aOfMainBasket[n]["mainBasket_name"].toLowerCase());
        if ($('#addMainBasket').val().toLowerCase()== aOfMainBasket[n]["mainBasket_name"].toLowerCase()) {
            error++;
            $('#Div_addMainBasket_error').html("Ce nom de famille de panier existe déjà.");
        }
    }

    if (error == 0) {
        $('#date_descr_toggle').removeClass("disabledDiv");
        $('#date_setup').addClass("show");
        $('#infos_setup').removeClass("show")
    }

    $('#addStartBasket').focusout(function() {
        if (($("#addStartBasket").val() > $("#addEndBasket").val()) && $("#addStartBasket").val() != "") {
            $('#adm_offer_date_comparison').html("La date de début ne peut pas être supérieure à celle de fin")
            $('#adm_offer_date_comparison').css({ "color": "red", "font-weight": "bold" });
            error++;
        } else {
            $('#adm_offer_date_comparison').html('');
            error = 0
        }
    })
    $('#addEndBasket').focusout(function() {
        if (($("#addStartBasket").val() > $("#addEndBasket").val()) && $("#addStartBasket").val() != "") {
            $('#adm_offer_date_comparison').html("La date de début ne peut pas être supérieure à celle de fin");
            $('#adm_offer_date_comparison').css({ "color": "red", "font-weight": "bold" });
            error++;
        } else {
            $('#adm_offer_date_comparison').html('');
            error = 0;
        }
    })

    $('#addStartValidationBasket').focusout(function() {
        if (($("#addStartValidationBasket").val() > $("#addEndValidationBasket").val()) && $("#addStartValidationBasket").val() != "") {
            $('#adm_offer_validation_comparison').html("La date de début ne peut pas être supérieure à celle de fin")
            $('#adm_offer_validation_comparison').css({ "color": "red", "font-weight": "bold" });
            error;
        } else {
            $('#adm_offer_validation_comparison').html('');
            error = 0;
        }
    })
    $('#addEndValidationBasket').focusout(function() {
        if (($("#addStartValidationBasket").val() > $("#addEndValidationBasket").val()) && $("#addStartValidationBasket").val() != "") {
            $('#adm_offer_validation_comparison').html("La date de début ne peut pas être supérieure à celle de fin");
            $('#adm_offer_validation_comparison').css({ "color": "red", "font-weight": "bold" });
            error++;
        } else {
            $('#adm_offer_validation_comparison').html('');
            error = 0;
        }
    })

    $('#addBeginPayment').focusout(function() {
        if (($("#addBeginPayment").val() > $("#addEndPayment").val()) && $("#addEndPayment").val() != "") {
            $('#adm_offer_payment_comparison').html("La date de début ne peut pas être supérieure à celle de fin")
            $('#adm_offer_payment_comparison').css({ "color": "red", "font-weight": "bold" });
            error++;
        } else {
            $('#adm_offer_payment_comparison').html('');
            error = 0;
        }
    })
    $('#addEndPayment').focusout(function() {
        if (($("#addBeginPayment").val() > $("#addEndPayment").val()) && $("#addBeginPayment").val() != "") {
            $('#adm_offer_payment_comparison').html("La date de début ne peut pas être supérieure à celle de fin");
            $('#adm_offer_payment_comparison').css({ "color": "red", "font-weight": "bold" });
            error++;
        } else {
            $('#adm_offer_payment_comparison').html('');
            error = 0;
        }
    })

    $('#addBeginWithdrawal').focusout(function() {
        if (($("#addBeginWithdrawal").val() > $("#addEndWithdrawal").val()) && $("#addEndWithdrawal").val() != "") {
            $('#adm_offer_withdrawal_comparison').html("La date de début ne peut pas être supérieure à celle de fin")
            $('#adm_offer_withdrawal_comparison').css({ "color": "red", "font-weight": "bold" });
            error++;
        } else {
            $('#adm_offer_withdrawal_comparison').html('');
            error = 0;
        }
    })
    $('#addEndWithdrawal').focusout(function() {
        if (($("#addBeginWithdrawal").val() > $("#addEndWithdrawal").val()) && $("#addBeginWithdrawal").val() != "") {
            $('#adm_offer_withdrawal_comparison').html("La date de début ne peut pas être supérieure à celle de fin");
            $('#adm_offer_withdrawal_comparison').css({ "color": "red", "font-weight": "bold" });
            error++;
        } else {
            $('#adm_offer_withdrawal_comparison').html('');
            error = 0;
        }
    })

}

// valide l'etape des différentes dates et active l'etape suivante
function validate_date() {

    if (($("#addStartBasket").val() == "" || $("#addEndBasket").val() == "")) {
        $('#adm_offer_date_comparison').html("Ces champs doivent être renseignés");
        $('#adm_offer_date_comparison').css({ "color": "red", "font-weight": "bold" });
        error++;
    } else if ($("#addStartValidationBasket").val() == "" || $("#addEndValidationBasket").val() == "") {
        $('#adm_offer_validation_comparison').html("Ces champs doivent être renseignés");
        $('#adm_offer_validation_comparison').css({ "color": "red", "font-weight": "bold" });
        error++;
    } else if (($("#addBeginPayment").val() == "" || $("#addEndPayment").val() == "")) {
        $('#adm_offer_payment_comparison').html("Ces champs doivent être renseignés");
        $('#adm_offer_payment_comparison').css({ "color": "red", "font-weight": "bold" });
        error++;
    } else if (($("#addBeginWithdrawal").val() == "" || $("#addEndWithdrawal").val() == "")) {
        $('#adm_offer_withdrawal_comparison').html("Ces champs doivent être renseignés");
        $('#adm_offer_withdrawal_comparison').css({ "color": "red", "font-weight": "bold" });
        error++;
    } else if ($('#adm_offer_date_comparison').html() != "" || $('#adm_offer_validation_comparison').html() != "" || $('#adm_offer_payment_comparison').html() != "" || $('#adm_offer_withdrawal_comparison').html() != "") {
        error++;
    } else {
        error = 0;
    }

    if (error == 0) {
        if ($('#format_descr_toggle').hasClass("disabledDiv")) {
            cardNbFormat();
        }
        $('#format_descr_toggle').removeClass("disabledDiv");
        $('#adm_order_format').addClass("show");
        $('#date_setup').removeClass("show");
    }
}

// finalise l'etape de création des formats
function validate_format() {
    $('#adm_order_format').removeClass("show");
    $('#validation_creation_panier').addClass("show")
    $('#adm_offer_validate_baskets').removeAttr("disabled")
}

function annuler_panier() {
    reinitialisation_modal();
    $('#infos_descr_toggle').addClass("disabledDiv");
    $('#infos_setup').removeClass('show')  
    $('#offer_supplier').val('-')
}

// enregistrement du nouvel ingredient en Bdd par envoi AJAX
function addNewIngredientAJAX(copieNb) {

    var product_name = $('#NewIngredient' + copieNb).val().charAt(0).toUpperCase() + $('#NewIngredient' + copieNb).val().substring(1).toLowerCase();
    if (product_name.endsWith("s") || product_name.endsWith("S") || product_name.endsWith("x") || product_name.endsWith("X")) {
        product_name= product_name.slice(0,-1);
    }

    $('#divModalSaving').show();
    var datas = {
        page: "adm_offer_ingredient_add",
        bJSON: 1,
        product_name: product_name,
        id_category: $('#AddIngredient_select' + copieNb).val()
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(data) {
        if (isEmpty(data.error)) {
            toastr.success('Informations mis à jour avec succès', 'Succès');
            checklist_ingredient(copieNb)
            $('#divModalSaving').hide();
        } else {
            toastr.error('Erreur lors de l\'enregistrement', 'Erreur')
        }
    })

    .fail(function(err) {
        toastr.error('Erreur lors de l\'enregistrement', 'Erreur')
        // self.location.href= "route.php?page=logout"
    });
}

function addNewCategoryAJAX(copieNb) {

    var Category_name = $('#NewCategorie' + copieNb).val().charAt(0).toUpperCase() + $('#NewCategorie' + copieNb).val().substring(1).toLowerCase();
    if (Category_name.endsWith("s") || Category_name.endsWith("S") || Category_name.endsWith("x") || Category_name.endsWith("X")) {
        Category_name= Category_name.slice(0,-1);
    }

    $('#divModalSaving').show();
    var datas = {
        page: "adm_offer_category_add",
        bJSON: 1,
        category_name: Category_name,
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(data) {
        if (isEmpty(data.error)) {
            toastr.success('Informations mis à jour avec succès', 'Succès');
            $('#divModalSaving').hide();
        } else {
            toastr.error('Erreur lors de l\'enregistrement', 'Erreur')
        }
    })

    .fail(function(err) {
        toastr.error('Erreur lors de l\'enregistrement', 'Erreur')
        // self.location.href= "route.php?page=logout"
    });
}

function addNewMeasureUnitAJAX(copieNb) {

    var measure_name = $('#NewMeasureUnit' + copieNb).val();

    $('#divModalSaving').show();
    var datas = {
        page: "adm_offer_measureUnit_add",
        bJSON: 1,
        measureUnit_name: measure_name,
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(data) {
        if (isEmpty(data.error)) {
            toastr.success('Informations mises à jour avec succès', 'Succès');
            $('#divModalSaving').hide();
        } else {
            toastr.error('Erreur lors de l\'enregistrement', 'Erreur')
        }
    })

    .fail(function(error) {
        toastr.error('Erreur lors de l\'enregistrement', 'Erreur')
        // self.location.href= "route.php?page=logout"
    });
}

function addNewCodePromoAJAX(copieNb) {

    let CodePromo_reference = $('#NewCodePromoRef' + copieNb).val().charAt(0).toUpperCase() + $('#NewCodePromoRef' + copieNb).val().substring(1).toLowerCase();
    $('#divModalSaving').show();

    // récupération des dates de mise en place du retrait du panier et transformation de ces dates en format enregistrable en BDD
    var dateDebutCodePromo = $('#PromoDateDebut' + copieNb).val()
    dateDebutCodePromo = dateDebutCodePromo.replace("T", " ");

    var dateFinCodePromo = $('#PromoDateFin' +copieNb).val()
    dateFinCodePromo = dateFinCodePromo.replace("T", " ");

    var datas = {
        page: "adm_offer_codePromo_add",
        bJSON: 1,
        promo_reference: CodePromo_reference,
        promo_label: $('#NewCodePromoLabel' + copieNb).val(),
        promo_number:$('#NewCodePromoValue' +copieNb).val(),
        promo_type:$('#NewCodePromoType'+copieNb).val(),
        promo_begin_date: dateDebutCodePromo,
        promo_end_date: dateFinCodePromo,
        promo_quantity:$('#NewCodePromoNb'+copieNb).val(),
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(data) {
        if (isEmpty(data.error)) {
            toastr.success('Informations mises à jour avec succès', 'Succès');
            $('#divModalSaving').hide();
        } else {
            toastr.error('Erreur lors de l\'enregistrement', 'Erreur')
        }
    })

    .fail(function(err) {
        toastr.error('Erreur lors de l\'enregistrement', 'Erreur')
    });
}