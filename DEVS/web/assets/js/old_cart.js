//********* CHANGE FORMATION COMMERCIALE ***********
//********* true = telephone  /  false = physique *****

type_formation= true;
var totalPrice;
//type_formation= false;

var click_promo= false;

//************** ARRAY *******************

let cart_dl_listing = [];

if(localStorage.getItem("product") !== null) {
    let stringProducts = localStorage.getItem("product");
    let arrayProducts = JSON.parse(stringProducts);
    cart_dl_listing = arrayProducts;
}

//**************** FIRST TIME INITIALIZATION *******************

$(document).ready(function() {
    console.log(session);
    if(cart_dl_listing.length > 0) {
        cart();
    } else {
        $("#cart_tbody")
            .html("<td></td><td></td><td>Panier Vide</td><td></td><td></td>")
            .css("text-align","center");
        $("#cart_btn_valider").addClass("hide")
        $("#cart_divcodepromo").addClass("hide")
    }
    if(!session) {
        $("#cart_btn_valider")
            .attr("onclick","redirectToLogin()")
            .removeAttr("data-target");
    } else {
        $("#cart_btn_valider")
            .attr("onclick","cart_randomOrderNumber()")
            .attr("data-target","#cart_modal");
    }
    if(localStorage.getItem("orderWaiting") === "validate") {
        console.log("HEY YOU")
        document.getElementById("cart_btn_valider").click();
        localStorage.setItem("orderWaiting","inactive");
    }
});

function redirectToLogin() {
    localStorage.setItem("orderWaiting","active");
    window.location.href = "login";
}

//************** LOOP IN ARRAY AND HTML GENERATION *******************

function cart() {
    let stringHTML = "";
    let cart_total= 0;

    if (cart_dl_listing.length > 0) {
        cart_dl_listing.map((element, index) => {
            stringHTML += `
                <tr>
                    <td class="cart_product">${element.label_panier}</td>
                    <td class="cart_productDescription">${element.description}</td>
                    <td class="cart_productQuantity">
                        <i onclick="cart_changeQuantity(0,${index})" class="fas fa-minus-circle cart_icon cart_icon_decrease align-self-center"></i>
                        <input type="text" disabled="disabled"  class="cart_product_quantity" id="cart_product_quantity${index}" value="${element.quantity}"/> 
                        <i onclick="cart_changeQuantity(1,${index})" class="fas fa-plus-circle cart_icon cart_icon_increase align-self-center"></i>
                    </td>
                    <td class="cart_productPrice">${element.price}</td>
                    <td class="cart_price">${(element.price * element.quantity).toFixed(2)}</td>
                    <td><input type="image" onclick="cart_removeProduct(${index})" src="assets/img/trash.png"></td>
                </tr> 
    `;
            //************ CART TOTAL CALCULATION *********************
            cart_total += (element.price * element.quantity);
            $("#cart_total").html(cart_total.toFixed(2) + "€");
        });
        totalPrice = cart_total;
        $("#cart_tbody").html(stringHTML);
    } else {
        $("#cart_tbody").html("<td></td><td></td><td>Panier Vide</td><td></td><td></td>");
        $("#cart_total").html("0,00 €");
        $("#cart_btn_valider").addClass("hide")
        $("#cart_divcodepromo").addClass("hide")
    }
}

//******************* CODE PROMO ***************************

function cart_promo() {
    let cart_promo_dom= 0;
    let cart_total_dom= parseInt($("#cart_total").html())
    let cart_cP= $("#cart_promo").val();
    let cart_saisiePromo= cart_cP.toUpperCase();

    if ((cart_saisiePromo == "COLLABORATION") && (click_promo== false)) {
        cart_promo_dom= cart_total_dom - ((cart_total_dom / 100) * 10);
        $("#cart_total").html(cart_promo_dom.toFixed(2) + "€");
        click_promo= true;
        localStorage.setItem("promo",true);
        $("#cart_textPromo").html("Code promo permettant de bénéficier d'une remise de -10%");
        $("#cart_wrongPromo").html("");
        console.log("Prix avec Promo :" + cart_promo_dom, click_promo);
    } else if ((cart_saisiePromo == "COLLABORATION") && (click_promo== true)) {
        $("#cart_wrongPromo").html("Code promo déjà utilisé");
        $("#cart_textPromo").html("");
    } else {
        $("#cart_wrongPromo").html("Code promo non valide");
        $("#cart_textPromo").html("");
        console.log("Prix sans Promo :" + cart_total_dom, click_promo);
    }
}

//************* INCREASE DECREASE PRODUCT_QUANTITY *********************

function cart_changeQuantity(value, index) {
    let product_quantity = parseInt($("#cart_product_quantity"+index).val(), 10);
    //value === 0 ? product_quantity-- : product_quantity++;
    if (value === 0) {
        product_quantity--;
        cart_dl_listing[index].quantity= product_quantity;
        product_quantity < 1 && cart_removeProduct(index);
    } else {
        product_quantity++;
        cart_dl_listing[index].quantity= product_quantity;
    }
    cart();
    click_promo= false;
    cart_promo();
}

//*************** DELETE A PRODUCT *******************************

function cart_removeProduct(index) {
    $("#cart_total").html("0,00 €");
    cart_dl_listing.splice(index, 1);
    cart_removeStorage(index);
    cart();
    if(cart_dl_listing.length > 0) {
        $("#Qt-panier").html(cart_dl_listing.length);
    } else {
        $("#Qt-panier")
            .html("")
            .attr("class","panier_count_fade");
    }
    click_promo= false;
    cart_promo();
}

function cart_removeStorage(index) {
    let stringProducts = localStorage.getItem("product");
    let arrayProducts = JSON.parse(stringProducts);
    console.log("HEY",arrayProducts);
    arrayProducts.splice(index,1);


    const objstr = JSON.stringify(arrayProducts);
    localStorage.setItem("product", objstr);
}

//***************** RANDOM ORDER NUMBER AND RESET CART *********************

function cart_randomOrderNumber() {
    let cart_orderMessage= "";
    let cart_orderNumber= "";
    let characters= "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz23456789";
    let charactersLength= characters.length;

    for (let i = 0; i < 6; i++) {
        cart_orderNumber += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    $("#cart_orderNumber").html(cart_orderNumber);

    //**************** SAVE ORDER TO LOCALSTORAGE *************

    saveOrderToLocalStorage(cart_orderNumber);

    //**************** DISPLAY MODAL MESSAGE BASED ON FORMATION TYPE *************

    if (type_formation === true) {
        cart_orderMessage= "<p>Veuillez contacter le service commercial au <strong>04.67.12.13.14</strong></p>\n    <p>aux horaires d'ouverture suivantes :</p>\n    <p>Lundi / Mardi / Mercredi / Vendredi</p>\n    <p>9h - 12h / 14h - 16h</p>";
    } else {
        cart_orderMessage= "<p>Veuillez vous déplacer au bâtiment 3</p>\n    <p>aux horaires d'ouverture suivantes :</p>\n    <p>Lundi / Mardi / Mercredi / Vendredi</p>\n    <p>9h - 12h / 14h - 16h</p>";
    }
    $("#cart_modalMessage").html(cart_orderMessage);
}

function saveOrderToLocalStorage(cart_orderNumber) {
    let promo_commande = false;
    if(localStorage.getItem("promo")) {
        promo_commande = true;
        localStorage.removeItem("promo");
    }

    let arrayLength;
    const event = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const date_commande = event.toLocaleDateString("fr-FR",options);
    const order = {
        id_commande: null,
        nom_commande: 'Commande n°3',
        ref_commande: `${cart_orderNumber}`,
        date_commande,
        prix_commande: `${totalPrice.toFixed(2)}€`,
        promo_commande,
        paniers: []
    }

    order.paniers = cart_dl_listing;

    if(
        localStorage.getItem("order") === null ||
        localStorage.getItem("order") === undefined
    ) {
        order.id_commande = 1;
        order.nom_commande = `Commande n°${order.id_commande}`;
        let arrayOrders = [order];
        arrayLength = arrayOrders.length;
        const objstr = JSON.stringify(arrayOrders);
        localStorage.setItem("order", objstr);
    } else {
        let stringOrders = localStorage.getItem("order");
        const arrayOrders = JSON.parse(stringOrders);
       
        let lastElement = arrayOrders[arrayOrders.length-1];
        let num = lastElement.id_commande;
        order.id_commande = ++num;
        order.nom_commande = `Commande n°${order.id_commande}`;
        arrayOrders.push(order);

        arrayLength = arrayOrders.length;

        const objstr = JSON.stringify(arrayOrders);
        localStorage.setItem("order", objstr);
    }
    $("#Qt-order")
        .html(arrayLength)
        .attr("class","order_count");
    console.log(localStorage.getItem("order"));

    localStorage.removeItem("product");
    $("#Qt-panier")
        .html("")
        .attr("class","panier_count_fade");

    cart_dl_listing= [];
    cart();
}
