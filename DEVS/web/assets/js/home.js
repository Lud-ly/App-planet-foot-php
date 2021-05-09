// fonction qui modifie le contenue de la page en fonction du panier
var aOfBasket= [];

/**
 * Get basket from database
 *
 */
function homeFormatPanier() {
        // Load with ajax
        var datas = {
            page:"home_basket_list", 
            bJSON : 1,
        };

        $.ajax({
            type:"POST",
            url:"route.php",
            async:true,
            data:datas,
            dataType:"json",
            cache:false,
        })
        .done(function(result) {
            console.log(result);
            var iBasket= 0;
            for (var ligne in result)	{
                aOfBasket[iBasket]= [];
                aOfBasket[iBasket]["id_offer"]= result[ligne]["id_offer"];
                aOfBasket[iBasket]["img_offer"]= result[ligne]["img_offer"];
                aOfBasket[iBasket]["weight_offer_detail"]= Math.round((result[ligne]["weight_offer_detail"])*100)/100;
                aOfBasket[iBasket]["date_start_booking_offer"]= result[ligne]["date_start_booking_offer"];
                aOfBasket[iBasket]["price_offer_detail"]= result[ligne]["price_offer_detail"];
                aOfBasket[iBasket]["label_offer"]= result[ligne]["label_offer"];
                aOfBasket[iBasket]["type_measure"]= result[ligne]["type_measure"];
                aOfBasket[iBasket]["id_offer_detail"]= result[ligne]["id_offer_detail"];
                aOfBasket[iBasket]["details"]= result[ligne]["details"];

                iBasket++;
            }
            constructCardBasket();
            // initCalendar();
            
            console.log(result);
            
        }).fail(function(err){
            console.log("Err" + err);
        })
    
}

// Construis une nouvelle card panier 
function constructCardBasket(){
    var i;
    var kHTML="";
    
    for (i=0; i<aOfBasket.length; i++)	{      
        kHTML += '<div class="offre_1 border-offre mt-2 text-center mx-auto">';
        kHTML += '<div class="title_offer border-offre-detail d-flex justify-content-center font-command" id="date_panier">';
        kHTML += '<p class="text-center ">'+ aOfBasket[i]["label_offer"] +'</p>';
        kHTML += '</div>';
        kHTML += '<div class="img_panier border-panier d-flex justify-content-center ">';
        kHTML += '<a href="offers/'+ aOfBasket[i]['id_offer'] + ' ">'
        kHTML += '<img class="home_img home_img1" id="home_img'+ i +'" src=" assets/img/' + aOfBasket[i]["img_offer"]+'"' + 'alt="Image panier"'+'">';
        kHTML += '</a>'
        kHTML += '</div>';
        kHTML += '<div class="offre_detail d-flex justify-content-center">';
        kHTML += '<div class="taille_panier mt-1 p-2 " id="taille_panier">';
        kHTML += ' <p class="d-flex justify-content-center">TAILLE DU PANIER</p>';
        kHTML += ' <select class="selectMain listepanier" data-index="'+i+'" id="listepanier'+ i +'" name="listepanier">';
        aOfBasket[i]['details'].map(function(basket_details){
            kHTML+= "<option value=\"" + basket_details.price_offer_detail + "\">" + basket_details.label_offer + " : " + basket_details.weight_offer_detail + " " + " Kg" + " - " + basket_details.price_offer_detail + " €" + "</option>";   
        })
        kHTML += '</select>';
        kHTML += '</form>';
        kHTML += '</div>';
        kHTML += '<div class="Quantite ml-2 mt-1 p-2 panier1" >';
        kHTML += '<p class="d-flex justify-content-center">QUANTITÉ</p>';
        kHTML += '<select name="qtePanier" data-index="'+i+'" id="qtePanier'+ i +'" class="selectMain">';
        kHTML += '<option value="1">1</option>';
        kHTML += '<option value="2">2</option>';
        kHTML += '<option value="3">3</option>';
        kHTML += '<option value="4">4</option>';
        kHTML += '<option value="5">5</option>';
        kHTML += '</select>';
        kHTML += '</div>';
        kHTML += '</div>';
        kHTML += '<div class="ml-5 panier1">';
        kHTML += '<div class="prix d-flex justify-content-center mr-5">';
        kHTML += '<p>Prix Total :  </p> ';          
        kHTML += '<div id="home_prix_panier'+ i +'" >';
        kHTML += '<p id="price_ht'+ i +'">'+ aOfBasket[i]['details'][0]['price_offer_detail']+ ' €'+ '</p>';
        kHTML += '</div>';
        kHTML += '</div>';
        kHTML += ' <div class="d-flex justify-content-center mr-5">';
        kHTML += '<button type="button" class="valider" onClick="offerCommander(), insertInOrder()">AJOUTER AU PANIER</button>';
        kHTML += '</div>';
        kHTML += '<div class="d-flex justify-content-center mr-5 mt-2">';
        kHTML += '<a href="offers/'+ aOfBasket[i]['id_offer']  +'">PLUS DE DÉTAILS</a>';
        kHTML += '</div>';
        kHTML += '</div>';
        kHTML += '</div>';
    }

    document.getElementById('basket_card').innerHTML=kHTML;
    
// Boucle qui permet de récupéré l'id de chaque offre en detail 
    for (i=0; i<aOfBasket.length; i++){
        document.getElementById(`listepanier${i}`).addEventListener("change", function(){
            var index = this.dataset.index;
            var price = document.getElementById(`qtePanier${this.dataset.index}`).value;
            var prix_total = parseFloat(price)*parseInt(this.value);
            document.getElementById(`price_ht${index}`).innerHTML=prix_total + ' €';

        })
        // calcul quantité * prix detail panier 
        document.getElementById(`qtePanier${i}`).addEventListener("change", function(){
            var index = this.dataset.index;
            var price = document.getElementById(`listepanier${this.dataset.index}`).value;
            var prix_total = parseFloat(price)*parseInt(this.value);

            document.getElementById(`price_ht${index}`).innerHTML=prix_total.toFixed(2) + ' €';

        })
    }
    
}


var aOfNewsHome= [];

/**
 * Get news from database
 *
 */
function homeFormatNews() {
        // Load with ajax
        var datas = {
            page:"home_news", 
            bJSON : 1,
        };

        $.ajax({
            type:"POST",
            url:"route.php",
            async:true,
            data:datas,
            dataType:"json",
            cache:false,
        })
        .done(function(result) {
            console.log(result);
            var iNews= 0;
            for (var ligne in result)	{
                aOfNewsHome[iNews]= [];
                aOfNewsHome[iNews]["id_news"]= result[ligne]["id_news"];
                aOfNewsHome[iNews]["label_news"]= result[ligne]["label_news"];
                aOfNewsHome[iNews]["content_news"]= result[ligne]["content_news"];
                aOfNewsHome[iNews]["date_creation_news"]= result[ligne]["date_creation_news"];

                iNews++;
                console.log(result);
            }
            constructNewsHome();


        }).fail(function(err){
            console.log("Err" + err);
        })

}


// Construis les news sur la page d'accueil
function constructNewsHome(){
    var i;
    var uHTML="";

    for (i=0; i<aOfNewsHome.length; i++) {
        uHTML += '<p class="text-center actu-date" id="actu-date'+ i +' "> '+ aOfNewsHome[i]["date_creation_news"] + '</p>';
        uHTML += '<p class="text-center" id="actu-label'+ i +'">'+ aOfNewsHome[i]["label_news"] + '</p>';
        uHTML += '<p class="text-center actu-content" id="actu-content'+ i +'">'+ aOfNewsHome[i]["content_news"] + '</p>';

    }
    document.getElementById('news_card').innerHTML=uHTML;
}


// function that creates dummy data for demonstration
function createDummyData() {
    var date = new Date();
    var data = {};
   
    for (var i = 0; i < 10; i++) {
        data[date.getFullYear() + i] = {};

        for (var j = 0; j < 12; j++) {
            data[date.getFullYear() + i][j + 1] = {};

            for (var k = 0; k < Math.ceil(Math.random() * 10); k++) {
                var l = Math.ceil(Math.random() * 28);

                try {
                    data[date.getFullYear() + i][j + 1][l].push({
                        startTime: "10:00",
                        endTime: "14:00",
                        text: "Panier de chocolat disponible"
                    });
                } catch (e) {
                    data[date.getFullYear() + i][j + 1][l] = [];
                    data[date.getFullYear() + i][j + 1][l].push({
                        startTime: "09:00",
                        endTime: "15:00",
                        text: "Panier Winter en vente !"
                    });
                }
            }
        }
    }
    

    return data;
}
let arrayYear= [];
let arrayMonth= [];
let arrayDay= [];
function createDateEvent() {
    let date;
    let data = {};
    let currentYear= new Intl.DateTimeFormat("fr-FR", {year: "numeric"}).format(new Date(aOfBasket[0]["date_start_booking_offer"]));
    let currentMonth= new Intl.DateTimeFormat("fr-FR", {month: "numeric"}).format(new Date(aOfBasket[0]["date_start_booking_offer"]));
    let currentDay= new Intl.DateTimeFormat("fr-FR", {day: "numeric"}).format(new Date(aOfBasket[0]["date_start_booking_offer"]));
    
    data[currentYear] = {}; 
    aOfBasket.map(function(basket) { // CONSTRUCT YEAR
        date = new Date(basket.date_start_booking_offer);
        var year = new Intl.DateTimeFormat("fr-FR", {year: "numeric"}).format(date);
        console.log(year)
        if(currentYear != "" && year != currentYear ) {
            currentYear = year;
            arrayYear.push(year);
            data[year] = {};        
        }
    });
    aOfBasket.map(function(basket) { // CONSTRUCT MONTH
        date = new Date(basket.date_start_booking_offer);
        var year = new Intl.DateTimeFormat("fr-FR", {year: "numeric"}).format(date);
        var month = new Intl.DateTimeFormat("fr-FR", {month: "numeric"}).format(date);
        console.log(month);
        data[year][month] = {};
    });
    aOfBasket.map(function(basket) { // CONSTRUCT DAY AND THEIR DATAS
        date = new Date(basket.date_start_booking_offer);
        var year = new Intl.DateTimeFormat("fr-FR", {year: "numeric"}).format(date);
        var month = new Intl.DateTimeFormat("fr-FR", {month: "numeric"}).format(date);
        var day = new Intl.DateTimeFormat("fr-FR", {day: "numeric"}).format(date);
        var time = new Intl.DateTimeFormat("fr-FR", {hour: "numeric",minute: "numeric"}).format(date);
        console.log(day);
        data[year][month][day] = [];
        data[year][month][day].push({
            startTime: time,
            endTime : time,
            text: `${basket.label_offer} en Vente !`
        });
    });
    return data;
}

function initCalendar() {
    // INSTEAD OF GRABBING THE DATA FROM AN AJAX REQUEST
    // I WILL BE DEMONSTRATING THE SAME EFFECT THROUGH MEMORY
    // THIS DEFEATS THE PURPOSE BUT IS SIMPLER TO UNDERSTAND
    var serverData = createDateEvent();
    
    // stating variables in order for them to be global
    var calendar, organizer;
    
    // initializing a new calendar object, that will use an html container to create itself
    calendar = new Calendar("calendarContainer", // id of html container for calendar
        "small", // size of calendar, can be small | medium | large
        [
            "Lundi", // left most day of calendar labels
            3 // maximum length of the calendar labels
        ],
        [
            "#7fc241", // primary color
            "#7fc241", // Secondary color
            "#ffffff", // text color
            "#ffffff" // text 2 color   
        ],
        {	days: [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi",  "Samedi" ],
            months: [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre" ],
            indicator: true,
            indicator_type: 0, // indicator type, can be 0 (not numeric) | 1 (numeric)
            indicator_pos: "top", // indicator position, can be top | bottom
            placeholder: "<span> Rien de particulier </span>"
        }
    );

    organizer = new Organizer("organizerContainer", // id of html container for calendar
                calendar, // defining the calendar that the organizer is related
                serverData // small part of the data of type object
            );
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


function insertInOrder()	{

    offerCreateOrder();

    var datas = {

        page : "offers_insert_order_datas",
        bJSON : 1,
        id_user : 2,
        ref_order : orderReference,
        status_order : 0,
        id_offer_detail : $("#listepanier0").val(),
        quantity : $("#qtePanier0").val(),

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
        orderReference = "REF";

    })

    .fail(function(err) {

        console.log('ERROR ?', err);

    })

};

// FONCTION QUI AJOUTE LES ARTICLES AU PANIER //
 
function offerAddArticles(indice) { 
    var offerCount;       
    offerCount = parseInt($(".click" + indice).val(), 10);  
    offerCount ++;
    $(".click"+ indice).val(offerCount);
}


// FONCTION QUI RECUPERE LE SELECTED ELEMENT //

function offerChoosePanier(element) {
    var offerGetValue;
    offerGetValue = $(element).find(':selected').val();
    $(".paniers").hide();
    $("#panier" + offerGetValue).show() ;  
} 


// FONCTION DU MODAL //

function offerCommander() { 
    $(".modal, .modal2").show(450);
}  

$( document ).ready(function() {
    homeFormatPanier();
    homeFormatNews();
    
    
});