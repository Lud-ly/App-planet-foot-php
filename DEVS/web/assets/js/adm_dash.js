/***************************************************
   @author @AfpaLabTeam - Ludovic Mouly
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 ***************************************************/

/****************************LOAD STATISTIQUES LIST****************************/

var aOfStats = [];
function loadStats() {

    // J'affiche l'image GIF de la roue dentée qui tourne, indiquant le chargement
    showLoadingModal();
    // Ici je mets les paramètres pour appeler un autre PHP :
    // Je décide de l'appeler "adm_supplier_list"
    // Le paramètre bJSON à 1, me permet que ma page ne se recharge pas
    // Mais reste bien figée
    var datas = {
        page: "adm_dash_list",
        bJSON: 1
    }
    // J'exécute le POST
    // Dans le ".done", le retour du PHP "admin_dash_list", soit "admin_dash_list.html"
    // Si tout s'est bien passé
    // Dans le ".fail", si il y'a eu une erreur d'exécution côté serveur.
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false
    })
        .done(function (result) {
            // C'est dans result que je recevrais les données de la base de données
            // Je fais un console.log pour voir son contenu
            // Ici j'aurais à coder de parcourir le tableau "result"
            // Et qui me permettra de remplacer mes "fausses" données par les vraies
            // ............
            // ............
            aOfStats = result;
            aOfStats = aOfStats[0];
            makeStats();
            // Ensuite, ici, j'appellerai ma fonction qui met en place mes données dans la chart js
            console.log("____aOfStats___", aOfStats);


            var ctca = document.getElementById('myCaChart');
            var barColors = "rgba(0, 170, 255, 0.5)";
            var myclientChart = new Chart(ctca,
                {
                    type: 'bar',
                    data:
                    {
                        labels: month_purchase,
                        datasets: [
                            {
                                label: 'Chiffres en Euros',
                                data: total,
                                borderWidth: [1, 1, 1, 1, 1, 1],
                                borderColor: ['rgba(54, 162, 235, 0.45)'],
                                backgroundColor: barColors,
                            }]
                    },
                    options:
                    {
                        scales:
                        {
                            yAxes: [
                                {
                                    ticks:
                                    {
                                        beginAtZero: true
                                    }
                                }]
                        }
                    }
                });
            // Enfin, je cache l'image GIF de la roue dentée qui tourne
            hideLoadingModal();
        })
        .fail(function (err) {
            alert('error : ' + err.status);
            showError(err);
        })
        .always(function () {
            console.log('arguments stats list', arguments);
        })
}



/****************************LOAD STATISTIQUES BASKET****************************/

var aOfStatsBasket = [];
function loadStatsBasket() {

    // J'affiche l'image GIF de la roue dentée qui tourne, indiquant le chargement
    showLoadingModal();
    // Ici je mets les paramètres pour appeler un autre PHP :
    // Je décide de l'appeler "adm_dash_basket"
    // Qui va s'occuper d'aller chercher mes données dans la base
    // Dans le paramètre page, je vais mettre "adm_dash_basket"
    // Le paramètre bJSON à 1, me permet que ma page ne se recharge pas
    // Mais reste bien figée
    var datas = {
        page: "adm_dash_list",
        bJSON: 1
    }
    // J'exécute le POST
    // Dans le ".done", le retour du PHP "adm_client_liste", soit "adm_dash_basket.html"
    // Si tout s'est bien passé
    // Dans le ".fail", si il y'a eu une erreur d'exécution côté serveur.
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false
    })
        .done(function (result) {
            // C'est dans result que je recevrais les données de la base de données
            // Je fais un console.log pour voir son contenu
            // console.log("Supplier", result);
            // Ici j'aurais à coder de parcourir le tableau "result"
            // aOfStats = result;
            // Et qui me permettra de remplacer mes "fausses" données par les vraies
            // ............
            // ............
            aOfStatsBasket = result;
            aOfStatsBasket = aOfStatsBasket[0];
          
            var ctz = document.getElementById('myclientChart');
            var barColors = "rgba(227, 0, 126, 0.5)";
            var myclientChart = new Chart(ctz,
                {
                    type: 'bar',
                    data:
                    {
                        labels:month_purchase,
                        datasets: [
                            {
                                label: 'Nombre de clients',
                                data: nb_clients,
                                borderWidth: [1, 1, 1, 1, 1, 1],
                                borderColor: ['rgba(54, 162, 235, 0.45)'],
                                backgroundColor: barColors
                            }]
                    },
                    options:
                    {
                        scales:
                        {
                            yAxes: [
                                {
                                    ticks:
                                    {
                                        beginAtZero: true
                                    }
                                }]
                        }
                    }
                });
            // Ensuite, ici, j'appellerai ma fonction qui met en place mes données dans la datatable
            // console.log("___aOfStatsBasket___",aOfStatsBasket);
            // Enfin, je cache l'image GIF de la roue dentée qui tourne
            hideLoadingModal();
        })
        .fail(function (err) {
            alert('error : ' + err.status);
            showError(err);
        })
        .always(function () {
            console.log('arguments Basket stats list', arguments);
        })
}


/****************************LOAD STATISTIQUES WEIGHT BASKET****************************/

var aOfStatsWeightBasket = [];
function loadStatsWeightBasket() {

    // J'affiche l'image GIF de la roue dentée qui tourne, indiquant le chargement
    showLoadingModal();
    // Ici je mets les paramètres pour appeler un autre PHP :
    // Je décide de l'appeler "adm_dash_weight_basket"
    // Qui va s'occuper d'aller chercher mes données dans la base
    // Dans le paramètre page, je vais mettre "adm_dash_weight_basket"
    // Le paramètre bJSON à 1, me permet que ma page ne se recharge pas
    // Mais reste bien figée
    var datas = {
        page: "adm_dash_weight_basket",
        bJSON: 1
    }
    // J'exécute le POST
    // Dans le ".done", le retour du PHP "adm_dash_weight_basket", soit "adm_dash_weight_basket.html"
    // Si tout s'est bien passé
    // Dans le ".fail", si il y'a eu une erreur d'exécution côté serveur.
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false
    })
        .done(function (result) {
            // C'est dans result que je recevrais les données de la base de données
            // Je fais un console.log pour voir son contenu
            // Ici j'aurais à coder de parcourir le tableau "result"
            // Et qui me permettra de remplacer mes "fausses" données par les vraies
            // ............
            // ............
            aOfStatsWeightBasket = result;
            aOfStatsWeightBasket = aOfStatsWeightBasket[0];

            console.log("______________________________");
            console.log("____aOfStatsbasketweight___", aOfStatsWeightBasket);
            makeBasketStats();
            var ctx = document.getElementById('myChart');
            var barColors = "rgba(127, 194, 65, 0.5)";
            var myChart = new Chart(ctx,
                {
                    type: 'line',
                    data:
                    {
                        labels: month_purchase,
                        datasets: [
                            {
                                label: 'Panier moyen en €',
                                data: panier_moyen,
                                backgroundColor: barColors,
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 99, 132, 1)',

                                ],
                                borderWidth: 1
                            }]
                    },
                    options:
                    {
                        scales:
                        {
                            yAxes: [
                                {
                                    ticks:
                                    {
                                        beginAtZero: true
                                    }
                                }]
                        }
                    }
                });
            // Ensuite, ici, j'appellerai ma fonction qui met en place mes données dans la chart
            // Enfin, je cache l'image GIF de la roue dentée qui tourne
            hideLoadingModal();
        })
        .fail(function (err) {
            alert('error : ' + err.status);
            showError(err);
        })
        .always(function () {
            console.log('arguments WEIGHT Basket stats list', arguments);
        })
}


/****************************LOAD STATISTIQUES SORT BASKET****************************/

var aOfStatsSortBasket = [];
function loadStatsSortBasket() {

    // J'affiche l'image GIF de la roue dentée qui tourne, indiquant le chargement
    showLoadingModal();
    // Ici je mets les paramètres pour appeler un autre PHP :
    // Je décide de l'appeler "adm_dash_weight_basket"
    // Qui va s'occuper d'aller chercher mes données dans la base
    // Dans le paramètre page, je vais mettre "adm_dash_weight_basket"
    // Le paramètre bJSON à 1, me permet que ma page ne se recharge pas
    // Mais reste bien figée
    var datas = {
        page: "adm_dash_sort_basket",
        bJSON: 1
    }
    // J'exécute le POST
    // Dans le ".done", le retour du PHP "adm_dash_Sort_basket", soit "adm_dash_Sort_basket.html"
    // Si tout s'est bien passé
    // Dans le ".fail", si il y'a eu une erreur d'exécution côté serveur.
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false
    })
        .done(function (result) {
            // C'est dans result que je recevrais les données de la base de données
            // Je fais un console.log pour voir son contenu
            // Ici j'aurais à coder de parcourir le tableau "result"
            // Et qui me permettra de remplacer mes "fausses" données par les vraies
            // ............
            // ............
            aOfStatsSortBasket = result;
            aOfStatsSortBasket = aOfStatsSortBasket[0];

            console.log("______________________________");
            console.log("____Sort of Basket___", aOfStatsSortBasket);
            makeBasketSortStats();

            var cty = document.getElementById('mypieChart');
            var barColors = ['rgba(127, 194, 65, 0.5)', 'rgba(227, 0, 126, 0.5)', 'rgba(0, 170, 255, 0.5)',];
            var myPieChart = new Chart(cty,
                {
                    type: 'pie',
                    data:
                    {
                        labels: ['3 Kg', '6 Kg', '9 Kg'],
                        datasets: [
                            {
                                data: nbSort_panier,
                                backgroundColor: barColors,
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                ],
                                borderWidth: 0.5
                            }]
                    },
                });
         
            // Ensuite, ici, j'appellerai ma fonction qui met en place mes données dans la chart
            // Enfin, je cache l'image GIF de la roue dentée qui tourne
            hideLoadingModal();
        })
        .fail(function (err) {
            alert('error : ' + err.status);
            showError(err);
        })
        .always(function () {
            console.log('arguments SORT Basket stats list', arguments);
        })
}



$(document).ready(function () {
    //Loader la liste des Stasistiques
    loadStats();
    loadStatsBasket();
    loadStatsWeightBasket();
    loadStatsSortBasket();
    /********************************** */


});


/**************************** MAKE STATS ****************************/
var i;
var nb_clients = [];
var year = [];
var month_purchase = [];
var total = [];

function makeStats() {
    for (i = 0; i < aOfStats.length; i++) {
        if (aOfStats[i]["numero_mois"] == 1) {
            aOfStats[i]["numero_mois"] = "Janvier";
        }
        if (aOfStats[i]["numero_mois"] == 2) {
            aOfStats[i]["numero_mois"] = "Fevrier";
        }
        if (aOfStats[i]["numero_mois"] == 3) {
            aOfStats[i]["numero_mois"] = "Mars";
        }
        if (aOfStats[i]["numero_mois"] == 4) {
            aOfStats[i]["numero_mois"] = "Avril";
        }
        if (aOfStats[i]["numero_mois"] == 5) {
            aOfStats[i]["numero_mois"] = "Mai";
        }
        if (aOfStats[i]["numero_mois"] == 6) {
            aOfStats[i]["numero_mois"] = "Juin";
        }
        var month = aOfStats[i]["numero_mois"];
        month_purchase.push(month);
        var year_stats = aOfStats[i]["annee"];
        year.push(year_stats);
        var clients = parseInt(aOfStats[i]["nb_clients"]);
        nb_clients.push(clients);
        var ca = parseInt(aOfStats[i]["total"]);
        total.push(ca);

    }
    console.log("nb_client", nb_clients);
    console.log("month_purchase", month_purchase);
    console.log("Chiffres d'affaires", total);
}

/**************************** MAKE BASKET STATS ****************************/
var j;
var panier_moyen = [];

function makeBasketStats() {
    for (j = 0; j < aOfStatsWeightBasket.length; j++) {
    
        var p_moyen = aOfStatsWeightBasket[j]["panier_moyen"];
        panier_moyen.push(p_moyen);

    }
    console.log("panier_moyen", panier_moyen);
}


/**************************** MAKE SORT BASKET STATS ****************************/
var k;
var nbSort_panier = [];

function makeBasketSortStats() {
    for (k = 0; k < aOfStatsSortBasket.length; k++) {
    
        var panier = aOfStatsSortBasket[k]["nb_panier"];
        nbSort_panier.push(panier);

    }
    console.log("panier_moyen", nbSort_panier);
}

