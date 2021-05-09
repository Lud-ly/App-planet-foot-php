/*********************************/
/*     --- Fichier index ---     */
/*          Basket               */
/*          Producer             */
/*          News                 */
/*          how to work          */
/*     --- By Perez Guy ---      */
/*********************************/


/*************************/

/*    VARIABLE GLOBAL    */

/*************************/

var aOfBasket = [];
var aOfSupplier = [];
var user_role = "";


/*************************/

/*    SCRIPT AUTOLOAD    */

/*************************/

$(document).ready(function() {
    index_list_basket();
    index_list_supplier();
    /** START SWIPER **/
    var swiper_basket = new Swiper('.swiper-container', {
        speed: 600,
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function(index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    /* allows to retrieve the words "active" to compare it and in index_card_supplier */
    swiper_basket.on('transitionEnd', function() {
        for (var i = 0; i < aOfBasket.length; i++) {
            // console.log("TRANSITION id_basket = " + i + " | Class = " + $('#div_swiper_basket_'+aOfBasket[i]["id_basket"]).attr("class") + " | Contient = " + $('#div_swiper_basket_'+aOfBasket[i]["id_basket"]).attr("class").indexOf("active"));
            if ($('#div_swiper_basket_' + aOfBasket[i]["id_mainBasket"]).attr("class").indexOf("active") != -1) {
                index_card_supplier(i);
            }
        }
    });

    /** START NEWS SLICEBOX **/
    $(function() {

        var Page = (function() {

            var $navArrows = $('#nav-arrows').hide(),
                $navDots = $('#nav-dots').hide(),
                $nav = $navDots.children('span'),
                $shadow = $('#shadow').hide(),
                slicebox = $('#sb-slider').slicebox({
                    onReady: function() {

                        $navArrows.show();
                        $navDots.show();
                        $shadow.show();

                    },

                    orientation: 'r', // (v)ertical, (h)orizontal or (r)andom
                    cuboidsRandom: true, // needs to be an odd number 15 => number > 0
                    disperseFactor: 80, // move disperseFactor pixels
                    speed: 1200,
                    autoplay: true,
                    interval: 8000,

                    onBeforeChange: function(pos) {
                        $nav.removeClass('nav-dot-current');
                        $nav.eq(pos).addClass('nav-dot-current');
                    },
                }),

                init = function() {
                    initEvents();
                },
                initEvents = function() {

                    // add navigation events
                    $navArrows.children(':first').on('click', function() {
                        slicebox.next();
                        return false;
                    });

                    $navArrows.children(':last').on('click', function() {
                        slicebox.previous();
                        return false;
                    });

                    $nav.each(function(i) {
                        $(this).on('click', function(event) {
                            var $dot = $(this);

                            if (!slicebox.isActive()) {
                                $nav.removeClass('nav-dot-current');
                                $dot.addClass('nav-dot-current');
                            }

                            slicebox.jump(i + 1);
                            return false;
                        });
                    });
                };
            return { init: init };
        })();
        Page.init();
    }); /** end slicebox news **/

}); /** end of document ready function **/


/*************************/

/*      READ BASKET      */

/*************************/

function index_list_basket() {

    /** Load with ajax **/
    var datas = {
        page: "index_list_basket",
        bJSON: 1,
    };

    $.ajax({
        type: "POST",
        url: "route.php",
        async: false,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(resultAll) {

        var iBasket = 0;
        var result = resultAll[0]["index_list_basket"];

        user_role = resultAll[0]["user_role"];

        for (var i = 0; i < result.length; i++) {
            var new_mainBasket = result[i]["id_mainBasket"];

            if (i == 0 || new_mainBasket != prec_mainBasket) {

                aOfBasket[iBasket] = [];
                // aOfBasket[iBasket]["id_basket"] = result[ligne]["id_basket"];
                // aOfBasket[iBasket]["basket_name"] = result[ligne]["basket_name"];
                // aOfBasket[iBasket]["basket_image"] = result[ligne]["basket_image"];
                // aOfBasket[iBasket]["basket_description"] = result[ligne]["basket_description"];
                // aOfBasket[iBasket]["basket_reference"] = result[ligne]["basket_reference"];
                // aOfBasket[iBasket]["basket_begin_date"] = result[ligne]["basket_begin_date"];
                // aOfBasket[iBasket]["basket_end_date"] = result[ligne]["basket_end_date"];
                // aOfBasket[iBasket]["basket_payment_start_date"] = result[ligne]["basket_payment_start_date"];
                // aOfBasket[iBasket]["basket_payment_end_date"] = result[ligne]["basket_payment_end_date"];
                // aOfBasket[iBasket]["basket_withdrawal_begin_date"] = result[ligne]["basket_withdrawal_begin_date"];
                // aOfBasket[iBasket]["basket_withdrawal_end_date"] = result[ligne]["basket_withdrawal_end_date"];

                // aOfBasket[iBasket]["basket_status"] = result[ligne]["basket_status"];

                aOfBasket[iBasket]["id_supplier"] = result[i]["id_supplier"];
                aOfBasket[iBasket]["supplier_city"] = result[i]["supplier_city"];
                // aOfBasket[iBasket]["product_quantity"] = result[ligne]["product_quantity"];

                aOfBasket[iBasket]["id_mainBasket"] = result[i]["id_mainBasket"];
                aOfBasket[iBasket]["mainBasket_name"] = result[i]["mainBasket_name"];
                aOfBasket[iBasket]["mainBasket_image"] = result[i]["mainBasket_image"];
                aOfBasket[iBasket]["mainBasket_description"] = result[i]["mainBasket_description"];

                aOfBasket[iBasket]["supplier_name"] = result[i]["supplier_name"];

                iBasket++;

                // aOfBasket[iBasket]["category_name"] = result[ligne]["category_name"];

            }
            var prec_mainBasket = new_mainBasket;
        }
        index_card_basket();
    })

    .fail(function(err) {
        console.log("Err" + err);
    });
}

/*************************/

/*      CARD BASKET      */

/*************************/

function index_card_basket() {

    let j;
    var basketHTML = "";

    for (j = 0; j < aOfBasket.length; j++) {

        basketHTML += '<div class="swiper-slide" id="div_swiper_basket_' + aOfBasket[j]["id_mainBasket"] + '">';
        basketHTML += '<div class="card_basket">';
        basketHTML += '<div class="card_basket_image">';
        basketHTML += '<img class="mx-auto card_basket_img" src="assets/img/' + aOfBasket[j]["mainBasket_image"] + '" alt="Image du panier"/>';
        basketHTML += '</div>'
        basketHTML += '<h4 class="card_basket_name">' + aOfBasket[j]["mainBasket_name"] + '</h4>';
        basketHTML += '<div class="card_basket_description" id="id_basket' + j + '">' + aOfBasket[j]["mainBasket_description"] + '</div>';
        basketHTML += '<div class="col-md-12 p-0 mt-3 d-md-flex justify-content-around mb-2">';
        if (user_role == "0") {
            basketHTML += '<button class="btn button_green border-0 text-white px-4 " onClick=window.location.href="offers/' + aOfBasket[j]["id_mainBasket"] + '">Détails</button>';
            basketHTML += '<button class="btn button_green border-0 text-white" onClick=window.location.href="offers/' + aOfBasket[j]["id_mainBasket"] + '">Commander</button>';
        } else {
            basketHTML += `<button class="btn button_green border-0 text-white" onClick="$('.fa-user-alt').click()">Se connecter</button>`;
        }
        basketHTML += '</div>';
        basketHTML += '<div class="card_basket clearfix"></div>';
        basketHTML += '</div>';
        basketHTML += '</div>';
    }
    document.getElementById('basket_card').innerHTML = basketHTML;
}

/*************************/
/*     READ SUPPLIER     */
/*************************/

function index_list_supplier() {

    /** Load with ajax **/
    var datas = {
        page: "index_list_basket",
        bJSON: 1,
    };

    $.ajax({
        type: "POST",
        url: "route.php",
        async: false,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(resultAll) {

        result = resultAll[0]["index_list_basket"];

        var iSupplier = 0;
        var prec_supplier = "";

        for (var ligne in result) {

            var new_supplier = result[ligne]["id_supplier"];

            if (iSupplier == 0 || new_supplier != prec_supplier) {
                aOfSupplier[iSupplier] = [];
                aOfSupplier[iSupplier]["id_supplier"] = result[ligne]["id_supplier"];
                aOfSupplier[iSupplier]["supplier_name"] = result[ligne]["supplier_name"];
                aOfSupplier[iSupplier]["supplier_firstname"] = result[ligne]["supplier_firstname"];
                aOfSupplier[iSupplier]["supplier_img"] = result[ligne]["supplier_img"];
                aOfSupplier[iSupplier]["supplier_address"] = result[ligne]["supplier_address"];
                aOfSupplier[iSupplier]["supplier_zipCode"] = result[ligne]["supplier_zipCode"];
                aOfSupplier[iSupplier]["supplier_city"] = result[ligne]["supplier_city"];
                aOfSupplier[iSupplier]["supplier_storeName"] = result[ligne]["supplier_storeName"];
                aOfSupplier[iSupplier]["supplier_urlGoogleMap"] = result[ligne]["supplier_urlGoogleMap"];
                aOfSupplier[iSupplier]["supplier_status"] = result[ligne]["supplier_status"];

                iSupplier++;
            }
            prec_supplier = new_supplier;

        }
        index_card_supplier(0);
    })

    .fail(function(err) {
        console.log("Err" + err);
    });
}

/*************************/

/*     CARD SUPPLIER     */

/*************************/

function index_card_supplier(iIndiceBasket) {

    let j;
    var supplierHTML = "";

    for (j = 0; j < aOfSupplier.length; j++) {
        if (aOfBasket[iIndiceBasket]["id_supplier"] == aOfSupplier[j]["id_supplier"]) {
            supplierHTML += '<div class="row card_supplier">';
            supplierHTML += '<div class="col-lg-4 col-md-12">';
            supplierHTML += '<div class="supplier_text text-center">';
            supplierHTML += '<h3>Le Producteur</h3>';
            supplierHTML += '<img class="img-thumbnail img_supplier" src="assets/img/' + aOfSupplier[j]["supplier_img"] + '"' + 'alt="Image du Producteur"' + '"/>';
            supplierHTML += '<div class="mt-3" style="font-weight:bold; font-size:larger">' + aOfSupplier[j]["supplier_name"] + " " + aOfSupplier[j]["supplier_firstname"] + '</div>';
            supplierHTML += '<div class="storeName_supplier">' + aOfSupplier[j]["supplier_storeName"] + '</div>';
            supplierHTML += '</div>';
            supplierHTML += '</div>';
            supplierHTML += '<div class="col-lg-8 col-md-12">';
            supplierHTML += '<div class="map">';
            supplierHTML += aOfSupplier[j]["supplier_urlGoogleMap"];
            supplierHTML += '</div>';
            supplierHTML += '</div>';
            supplierHTML += '</div>';
        }
    }
    document.getElementById('supplier_card').innerHTML = supplierHTML;
}

/*************************/

/*      MODAL NEWS       */

/*************************/

function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active')
    var popup = document.getElementById('popup');
    popup.classList.toggle('active')
}