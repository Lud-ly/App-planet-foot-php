
/***************************************************
   @author @AfpaLabTeam - Ludovic Mouly
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 ***************************************************/
/***************************************************/



/***************************************************************************** */
/****************************LOAD CENTER LIST CLIENT****************************/
/***************************************************************************** */
var aOfScheduleClient = [];
var center_id_edit;
function loadCenterListClient() {

    // J'affiche l'image GIF de la roue dentée qui tourne, indiquant le chargement
    showLoadingModal();
    // Ici je mets les paramètres pour appeler un autre PHP :
    // Je décide de l'appeler "contact_list_client"
    // Qui va s'occuper d'aller chercher mes données dans la base
    var datas = {
        page: "adm_contact_list",
        bJSON: 1
    }
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
            // Ici je rentre dans le tableau 
            aOfScheduleClient = result[0];
            var oCenter;
            var oResult = {};
            for (var i = 0; i < aOfScheduleClient.length; i++) {
                oCenter = aOfScheduleClient[i];
                oResult[oCenter.id_center] = oCenter.center_name;
            }
            console.log("Objet oResult", oResult);
            //J' appelle la function dans utils.js qui construit mon select et retourne tout dans sHtml
            //Je selectionne l'id 1 par default dans le select
            $("#adm_contact_center").html(getSelectOptionsHtml(oResult, false, '1'));
            // ............
            editOrderScheduleClient();
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


/**************************** EDIT LIST MESSAGE CENTER ****************************/
/**********************************************************************************
 ********************************************************************************** 
 * @param {dom} element correspond au select qui contient les centres.
 **********************************************************************************/

var oCenter;
//Je boucle sur aOfScheduleClient, je remplis 
// Si l'id de oCenter est égale à element center_id retourne l'objet oCenter 
function getCenterClient(center_id) {
    for (var i = 0; i < aOfScheduleClient.length; i++) {
        oCenter = aOfScheduleClient[i];
        if (oCenter.id_center == center_id) {
            return oCenter;
        }
    }
}


function editOrderScheduleClient(element) {
    showLoadingModal();

    //J'initialize par default à 1 pour que le select soit sur svj
    let center_id = $(element).value() ?? 1;
    let oCenter = getCenterClient(center_id);
    toastr.success(oCenter.center_name, 'Bienvenue');

    //1 La phrase pour le formulaire dans l'encadré
    //Message pour indiquer à l'utilisateur de contacter le centre via le formulaire
    $("#center_contact_form_message").html(htmlspecialchars_decode(oCenter["center_contact_form_message"]));

    //2 Carte VALIDER une commande
    //Les horaires pour valider une commande
    textValid = "";
    textValid += htmlspecialchars_decode(oCenter["center_validate_schedule"]);
    $('#center_validate_schedule').html(textValid);
    //Telephone  
    $("#center_phoneNumber").html(htmlspecialchars_decode(oCenter["center_phoneNumber"]));

    //3 Carte PAYER une commande
    //Date de retrait de commande disponible,date de paiement d'une commande,lieu de paiement d'une commande
    textPay = "";
    textPay += htmlspecialchars_decode(oCenter["withdrawall_date_available"]);
    $("#withdrawall_date_available").html(textPay);
    $("#center_place_topay").html(htmlspecialchars_decode(oCenter["center_place_topay"]));

    //4 Carte RETIRER une commande
    // Le jour et l'heure du retrait d'une commande
    // Lieu du retrait d'une commande
    textRetir = "";
    textRetir += htmlspecialchars_decode(oCenter["center_withdrawall_schedule"]);
    $("#center_withdrawall_schedule").html(textRetir);
    $("#center_contact_mail").html(htmlspecialchars_decode(oCenter["center_contact_mail"]));

    //5 IFRAME Google map
    $("#center_urlGoogleMap").html(htmlspecialchars_decode(oCenter["center_urlGoogleMap"]));
    $("#ifr_urlGoogleMap").attr('src', oCenter["center_urlGoogleMap"]);

    hideLoadingModal();

}

/*************************************************************************************** */
/**************************************VALIDATION TO SEND EMAIL***************************/
/*************************************************************************************** */

function contact_mail_to() {
    error_form = validateForm();
    if (error_form == false) {
        return;
    }
    // else {
    //     sendEmail();
    //     toggleModal();
    // }
}
function sendEmail() {
    alert("message envoyé");
}

/*************************************************************************************** */
/**********************************SHOW MODAL SEND EMAIL**********************************/
/*************************************************************************************** */

function toggleModal() {

    $('#contact_modal').modal('show')
    $('.inputMain').each(function () {
        $(this).val('')
    })
    setTimeout(() => {
        $('#contact_modal').modal('hide')
    }, 2000)
}


$(document).ready(function () {
    loadCenterListClient();
});

/*************************************************************************************** */
/*********************************VALIDATION FORMULAIRE***********************************/
/*************************************************************************************** */


function validateForm() {
    // Vérifie le input name 
    var name = $('#nom').val();
    if (name == "") {
        $('#error_nom').html("Veuillez remplir le champ Nom");
        $("#nom").css("border", "2px solid red");
        return false;
    }

    // Vérifie le input name 
    var firstname = $('#prenom').val();
    if (firstname == "") {
        $('#error_prenom').html("Veuillez remplir le champ Prénom");
        $("#prenom").css("border", "2px solid red");
        return false;
    }

    // Vérifie le input email
    var email = $('#email').val();
    if (email == "") {
        $('#error_email').html("Veuillez remplir le champ Email");
        $("#email").css("border", "2px solid red");
        return false;
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            $('#error_email').html("Format Email invalide");
            $("#email").css("border", "2px solid red");
            return false;
        }
    }
    // Vérifie le telephone
    var phone = $('#telephone').val();
    if (phone == "") {
        $('#error_telephone').html("Veuillez remplir le champ Telephone");
        $("#telephone").css("border", "2px solid red");
        return false;
    }

    // Vérifie le input sujet 
    var subject = $('#subject').val();
    if (subject == "") {
        $('#error_subject').html("Veuillez remplir le champ Sujet");
        $("#subject").css("border", "2px solid red");
        return false;
    }

    // Vérifie le input massage
    var message = $('#contact_message_content').val();
    if (message == "") {
        $('#error_contact_message_content').html("Veuillez ecrire un message");
        $("#contact_message_content").css("border", "2px solid red");
        return false;
    }
}
// function change telephone
// $("input[name='telephone']").keyup(function () {
//     $(this).val($(this).val().replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})+$/, "$1.$2.$3.$4.$5"));
// });

// $(window).resize(function () {

//     // change Quantité en Qté ainsi qu ele statut terminée en en OK sur téléphone
//     if (window.innerWidth > 380) {
//         $('.contact-container').addClass('col-1');
//         $('.contact-container').removeClass('col-12');
//         $('.contact_subtitle').addClass('col-11');
//         $('.contact_subtitle').removeClass('col-12');
//     }
//     if (window.innerWidth <= 380) {
//         $('.contact-container').addClass('col-12');
//         $('.contact-container').removeClass('col-1');
//         $('.contact_subtitle').addClass('col-12');
//         $('.contact_subtitle').removeClass('col-11');
//     }
// });