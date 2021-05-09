function loadPage(page) {
  self.location.href = page;
}

//DATE//

function detectIEorSafari() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older
    return true;
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11
    return true;
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+)
    return true;
  }

  var safari = ua.indexOf("Safari/");
  var chrome = ua.indexOf("Chrome/");
  if (safari > 0 && chrome == -1) {
    // Safari
    return true;
  }

  // other browser
  return false;
}

function convertDate(sDate) {
  var aOfDates = sDate.split("-");
  return aOfDates[2] + "/" + aOfDates[1] + "/" + aOfDates[0];
}

/**
 * Convert date jj/mm/aaaa into aaaa-mm-jj
 */
function inverseDate(sDate) {
  var aOfDates = sDate.split("/");
  return aOfDates[2] + "-" + aOfDates[1] + "-" + aOfDates[0];
}

//IDEES RECETTES
function switchRecette1() {
  var x = document.getElementById("recette_cachee1");
  var y = document.getElementById("recette_visible1");
  var z = document.getElementById("bouton_recette1");
  if (x.style.display === "block") {
    x.style.display = "none";
    y.style.display = "block";
    z.innerText = "Voir plus !";
  } else {
    x.style.display = "block";
    y.style.display = "none";
    z.innerText = "Revenir !";
  }
}

function switchRecette2() {
  var x = document.getElementById("recette_cachee2");
  var y = document.getElementById("recette_visible2");
  var z = document.getElementById("bouton_recette2");
  if (x.style.display === "block") {
    x.style.display = "none";
    y.style.display = "block";
    z.innerText = "Voir plus !";
  } else {
    x.style.display = "block";
    y.style.display = "none";
    z.innerText = "Revenir !";
  }
}
