/***************************************************
   @author @AfpaLabTeam - Ludovic Mouly
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 ***************************************************/

/****************************LOAD CENTER LIST****************************/

var aOfSchedule = [];
var center_id_edit;
function loadCenterList() {

    // J'affiche l'image GIF de la roue dentée qui tourne, indiquant le chargement
    showLoadingModal();
    // Ici je mets les paramètres pour appeler un autre PHP :
    // Je décide de l'appeler "adm_contact_list"
    var datas = {
        page: "adm_contact_list",
        bJSON: 1
    }
    // J'exécute le POST
    // Dans le ".done", le retour du PHP "admin_client_liste", soit "admin_client_liste.html"
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
            console.log("Center", result);
            // Ici je rentre dans le tableau 
            aOfSchedule = result[0];
            //Je boucle sur aOfSchedule et je construis l'objet oCenter avec pour clé id, pour valeur le nom du centre
            var oCenter;
            var oResult = {};
            for (var i = 0; i < aOfSchedule.length; i++) {
                oCenter = aOfSchedule[i];
                oResult[oCenter.id_center] = oCenter.center_name;
            }
            console.log("Objet oResult", oResult);
            //J' appelle la function dans utils.js qui construit mon select et retourne tout dans sHtml
            //Je selectionne l'id 1 par default dans le select
            $("#adm_contact_center").html(getSelectOptionsHtml(oResult, false, '1'));
            //J'appelle la function qui remplie mes textareas
            editOrderSchedule();
            // ............
            // ............
            // Enfin, je cache l'image GIF de la roue dentée qui tourne
            hideLoadingModal();
        })
        .fail(function (err) {
            alert('error : ' + err.status);
            showError(err);
        })
        .always(function () {
            console.log('arguments', arguments);
        })
}

var oCenter;
//Je boucle sur aOfScheduleClient, je remplis 
// Si l'id de oCenter est égale à element center_id retourne l'objet oCenter 
function getCenter(center_id) {
    
    for (var i = 0; i < aOfSchedule.length; i++) {
        oCenter = aOfSchedule[i];
        if (oCenter.id_center == center_id) {
            return oCenter;
        }
    }
}
/**************************** EDIT LIST MESSAGE CENTER ****************************/
/**
 * 
 * @param {dom} element correspond au select qui contient les centres.
 */
function editOrderSchedule(element) {
    showLoadingModal();
    //J'initialize par default à 1 pour que le select soit sur svj
    let center_id = $(element).value() ?? 1;
    let oCenter = getCenter(center_id);
    toastr.success( oCenter.center_name, 'Bienvenue');
    console.log("oCenter", oCenter);
    //1 La phrase pour le formulaire dans l'encadré
    //Message pour indiquer à l'utilisateur de contacter le centre via le formulaire
    $("#center_contact_form_message").summernote("code",htmlspecialchars_decode(oCenter["center_contact_form_message"]));
    //2 Carte VALIDER une commande
    //Les horaires pour valider une commande
    textValid = "";
    textValid += htmlspecialchars_decode(oCenter["center_validate_schedule"]);
    $('#center_validate_schedule').summernote("code", textValid);
    //Telephone  
    $("#center_phoneNumber").summernote("code", htmlspecialchars_decode(oCenter["center_phoneNumber"]));
    //3 Carte PAYER une commande
    //Date de retrait de commande disponible,date de paiement d'une commande,lieu de paiement d'une commande
    textPay = "";
    textPay += htmlspecialchars_decode(oCenter["withdrawall_date_available"]);
    $("#withdrawall_date_available").summernote("code", textPay);
    $("#center_place_topay").summernote("code", htmlspecialchars_decode(oCenter["center_place_topay"]));
    //4 Carte RETIRER une commande
    // Le jour et l'heure du retrait d'une commande
    // Lieu du retrait d'une commande
    textRetir = "";
    textRetir += htmlspecialchars_decode(oCenter["center_withdrawall_schedule"]);
    $("#center_withdrawall_schedule").summernote("code", textRetir);
    $("#center_contact_mail").summernote("code", htmlspecialchars_decode(oCenter["center_contact_mail"]));
    //5 SUMMERNOTE + IFRAME Google map
    $("#center_urlGoogleMap").summernote("code", htmlspecialchars_decode(oCenter["center_urlGoogleMap"]));
    $("#ifr_urlGoogleMap").attr('src', oCenter["center_urlGoogleMap"]);
    console.log(oCenter["center_urlGoogleMap"]);
    hideLoadingModal();
}

/****************************UPDATE CENTER MESSAGE****************************/

var aOfSchedule = [];

function updateOrderSchedule() {

    var datas = {
        page: "adm_contact_update",
        id_center: $("#adm_contact_center").val(),
        center_contact_form_message: $("#center_contact_form_message").val(),
        center_validate_schedule: $("#center_validate_schedule").val(),
        center_validate_schedule_below: $("#center_validate_schedule_below").val(),
        center_phoneNumber: $("#center_phoneNumber").val(),
        withdrawall_date_available: $("#withdrawall_date_available").val(),
        center_place_topay: $("#center_place_topay").val(),
        center_withdrawall_schedule: $("#center_withdrawall_schedule").val(),
        center_contact_mail: $("#center_contact_mail").val(),
        center_urlGoogleMap: $("#center_urlGoogleMap").val(),
        bJSON: 1
    }
    // J'exécute le POST
    // Dans le ".done", le retour du PHP "adm_contact_update", soit "adm_contact_update.html"
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
            console.log("result", result);
            if (result["isValidEdit"]) {
                toggleModal();
                loadCenterList();
                toastr.success('Modification réussi !', 'Succès');
            }
            else {
                // Je boucle sur les champs et teste si c'est vide ou non-conforme et j'affiche sous les erreurs dans les span sous les textareas
                var sMessage;
                for (var iField = 0; iField < result.invalidFieldsSummernote.length; iField++) {

                    var sField = Object.keys(result.invalidFieldsSummernote[iField])[0];
                    sMessage = (result.invalidFieldsSummernote[iField][sField]);
                    $("#error_" + sField).html(sMessage);
                    $("#" + sField).next().css("border", "2px solid red");     
                }
                toastr.error('raté !', 'Erreur');
            }
        })
        .fail(function (err) {
            alert('error : ' + err.status);
        })
        .always(function () {
            console.log('arguments update message', arguments);
        })
}


$(document).ready(function () {
    $('.summernote').summernote(adm_contact_summernote);
    //Loader la liste des centres
    loadCenterList();
    $(".note-editable").on("keypress change click", function () {
        $('.adm_contact_btn_valider').removeAttr('disabled');
        $('.adm_contact_btn_valider').removeClass("valider");
        $('.adm_contact_btn_valider').addClass("btn btn-green");
    });

});



function toggleModal() {
    $('#contact_modal').modal('show')
    setTimeout(() => {
        $('#contact_modal').modal('hide')
    }, 2000)
}

/**************************** CONFIGURATION DU SUMMEROTE ****************************/

var adm_contact_myMainHeight = 190;
var adm_contact_myMainWidth = 340;
const adm_contact_summernote = {
    "maxWidth": adm_contact_myMainWidth,
    "maxHeight": adm_contact_myMainHeight,
    "lang": "fr-FR",
    "width": adm_contact_myMainWidth,
    "height": adm_contact_myMainHeight,
    "toolbar": [
        ['style', ['style', 'bold', 'italic', 'underline']],
        ['font', ['strikethrough']],
        ['style', ['clear']],
        ['fontname', ['fontname']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        // ['table', ['table']],
        // ['link', ['link']],
        // ['picture', ['picture']],
        // ['video', ['video']],
        // ['hr', ['hr']],
        ['codeview', ['codeview']],
        ['undo', ['undo']],
        ['redo', ['redo']]
    ],
    "fontNames": [
        'Arial', 'Arial Black', 'Verdana'
    ]
}

const adm_contact_myTable = {
    "language": {
        "sProcessing": "Traitement en cours ...",
        "sLengthMenu": "Afficher _MENU_ lignes",
        "sZeroRecords": "Aucun résultat trouvé",
        "sEmptyTable": "Aucune donnée disponible",
        "sInfo": "Lignes _START_ à _END_ sur _TOTAL_",
        "sInfoEmpty": "Aucune ligne affichée",
        "sInfoFiltered": "(Filtrer un maximum de_MAX_)",
        "sInfoPostFix": "",
        "sSearch": "Chercher:",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Chargement...",
        "oPaginate": {
            "sFirst": "Premier",
            "sLast": "Dernier",
            "sNext": "Suivant",
            "sPrevious": "Précédent"
        },
        "oAria": {
            "sSortAscending": ": Trier par ordre croissant",
            "sSortDescending": ": Trier par ordre décroissant"
        }
    }
}

/**************************** DECODE LE HTML SPECIAL CHARS POUR L'AFFICHAGE ****************************/
function htmlspecialchars_decode(str) {
    if (typeof (str) == "string") {
        str = str.replaceAll(/&amp;/g, "&"); /* must do &amp; first */
        str = str.replaceAll(/&quot;/g, '"');
        str = str.replaceAll(/&amp;#039;/g, "'");
        str = str.replaceAll(/&lt;/g, "<");
        str = str.replaceAll(/&gt;/g, ">");
    }
    return str;
}