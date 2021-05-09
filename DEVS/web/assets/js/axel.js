
function offerShowPanier() {
    $(".nombre_paniers").toggle();
}

// FONCTION QUI AJOUTE LES ARTICLES AU PANIER //

 
function offerAddArticles(indice) { 
    var offerCount;       
    offerCount = parseInt($(".click" + indice).val(), 10);  
    offerCount ++;  
    if (offerCount <= 0) {
        offerCount = 0; 
    }          
    $(".click"+ indice).val(offerCount);
}

// FONCTION QUI RETIRE LES ARTICLES DU PANIER //

function offerRemoveArticles(indice) {   
    var offerCount; 
    offerCount = parseInt($(".click" + indice).val(), 10); 
    offerCount --; 
    if (offerCount <= 0) {
        offerCount = 0;
    }         
    $(".click" + indice).val(offerCount);  
}


function offerAjoutPanier() {
    var select, panier;
    e = $(".liste");
    strUser = select.options[select.selectedIndex].text;
    console.log(panier);
} 


// FONCTIONS A FAIRE 
// 
//  function offerChoosePanier() --> En fonction du format choisi, la description, la composition et le prix se modifie.
//   
 