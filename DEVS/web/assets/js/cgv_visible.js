//page js des cgv visibles//
var aOfConditions = [];
aOfConditions[0] = [];
aOfConditions[0]["Conditions"] = "Acces au site"; 
aOfConditions[0]["infoSupplementaire"] = "Le client peut accéder à notre centre de formation AFPA qui se situe au : 12, rue Jean Mermoz, Saint-Jean-de-Védas. Nos horaires : du lundi au jeudi de 8h00 à 16h30 et le vendredi de 8h30 à midi.";

aOfConditions[1] = [];
aOfConditions[1]["Conditions"] = "Les conditions de vente";
aOfConditions[1]["infoSupplementaire"] = "Les produits demeurent la propriété du vendeur jusqu'au complet encaissement du prix. Cela permet au vendeur de ne pas livrer un produit s'il n'a pas été payé. Toutes les réservations et/ou commande quelle que soit leur origine sont payables en euros.";

aOfConditions[2] = [];
aOfConditions[2]["Conditions"] = "Les conditions de règlement";
aOfConditions[2]["infoSupplementaire"] = "Le client peut régler sa commande de deux différentes façons : par chèque ou espèces.";

aOfConditions[3] = [];
aOfConditions[3]["Conditions"] = "Les produits";
aOfConditions[3]["infoSupplementaire"] = "Les produits sont décrits et présentés avec leurs caractéristiques essentielles. Le client qui le souhaite, peut obtenir des informations supplémentaires par e-mail ou par téléphone sur un produit de son choix. Les caractéristiques essentielles des articles sont présentées sur le site dans chacune des fiches articles, étant précisé que les images, photos et les couleurs des articles proposés à la vente peuvent cependant ne pas correspondre aux couleurs réelles sous l'effet du navigateur Internet et de l'écran utilisé. Les offres de produits s’entendent dans la limite des stocks disponibles, les indications sur la disponibilité des produits étant fournies au moment de la passation de la commande.";


function constructConditions() {
    var i;

    var sHTML = "";
    

    for (i = 0; i < aOfConditions.length; i++) {
        sHTML += "<div>";
        sHTML += "<div class='flip' onclick='toggleCondition("+i+")'>" + aOfConditions[i]["Conditions"] + "</div>";
        sHTML += "<div class='panel' id='panel_" +i+"'>" + aOfConditions[i]["infoSupplementaire"] + "</div>";
        sHTML += "</div>";
        sHTML += "</div>";
        sHTML += "<br>";
        $('#table_Conditions').html(sHTML);
    }

    
}

function toggleCondition(index) {
    $("#panel_" + index).slideToggle("slow");
}

//la fonction qui permet d'avoir les 10 premiers résultats
$(document).ready(function() {
    constructConditions();
});


// $(document).ready(function () {
//     $("#flip").click(function () {
//         $("#panel").slideToggle("slow");
//     });
// });