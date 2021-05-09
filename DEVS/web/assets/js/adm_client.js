// /**
//  * detect IE
//  * returns version of IE or false, if browser is not Internet Explorer or Edge
//  */
// function detectIEorSafari() {
//     var ua = window.navigator.userAgent;

//     var msie = ua.indexOf('MSIE ');
//     if (msie > 0) {
//         // IE 10 or older
//         return true;
//     }

//     var trident = ua.indexOf('Trident/');
//     if (trident > 0) {
//         // IE 11
//         return true;
//     }

//     var edge = ua.indexOf('Edge/');
//     if (edge > 0) {
//         // Edge (IE 12+)
//         return true;
//     }

//     var safari = ua.indexOf('Safari/');
//     var chrome = ua.indexOf('Chrome/');
//     if ((safari > 0) && (chrome == -1)) {
//         // Safari
//         return true;
//     }

//     // other browser
//     return false;
// }

// /**
//  * Convert date aaaa-mm-jj into jj/mm/aaaa
//  */
// function convertDate(sDate) {
//     var aOfDates = sDate.split("-");
//     return aOfDates[2] + "/" + aOfDates[1] + "/" + aOfDates[0];
// }

// /**
//  * Convert date jj/mm/aaaa into aaaa-mm-jj
//  */
// function inverseDate(sDate) {
//     var aOfDates = sDate.split("/");
//     return aOfDates[2] + "-" + aOfDates[1] + "-" + aOfDates[0];
// }

// /**
//  * Convert specials HTML entities HTML in character
//  */
// function htmlspecialchars_decode(str) {
//     if (typeof(str) == "string") {
//         str = str.replace(/&amp;/g, "&");
//         str = str.replace(/&quot;/g, "\"");
//         str = str.replace(/&#039;/g, "'");
//         str = str.replace(/&lt;/g, "<");
//         str = str.replace(/&gt;/g, ">");
//     }
//     return str;
// }



var currentCenter = [];
var aOfPersonnes = [];
var iIndice = "";
var iIndiceEditEncours = "";
var aOfCommandesAnnulees = [];
var aOfCommandesPassees = [];
var iCommandesPassées = "";
var iCommandesAnnulees = "";

/**
 * Get users from database
 *
 * if OK add user to array aOfClients
 *
 * if OK then build table and call datatable
 */

var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function loadClients() {

    // $('#divModalSaving').show();
    var datas = {
        page: "adm_client_list",
        bJSON: 1
    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(result) {

        aOfPersonnes = result[0]["adm_client_list"];
        aOfCommandesAnnulees = result[0]["count_canceled_purchases"];
        aOfCommandesPassees = result[0]["count_all_purchases"];

        var i;
        var sHTML = "";
        sHTML += "<thead class=\"\">";
        sHTML += "<tr>";
        sHTML += "<th class='text-center'>Identité</th>";
        sHTML += "<th class='text-center'>Téléphone</th>";
        sHTML += "<th class='text-center'>Email</th>";
        sHTML += "<th class='text-center'>Nombre total<br>de commandes</th>";
        sHTML += "<th class='text-center'>Commandes<br>annulées</th>";
        sHTML += "<th class='text-center'>Derniere connexion au site</th>";
        sHTML += "<th class='text-center'>Action</th>";
        // sHTML += "<th>Désactiver</td>";
        sHTML += "</tr>";
        sHTML += "</thead>";
        sHTML += "<tbody>";


        for (i = 0; i < aOfPersonnes.length; i++) {

            iIndice = i;

            // affiche uniquement les personnes dont le compte est toujours actif sur le site
            if (aOfPersonnes[i]['userStatus'] == 1) {

                date = (aOfPersonnes[i]["userDateLastConnection"]) ? moment(new Date(aOfPersonnes[i]["userDateLastConnection"]), "DD/MM/YYYY HH:mm:ss", 'fr').format("DD/MM/YYYY HH:mm:ss") : "Aucune date";
                sHTML += "<tr class=\"text-center\">";
                sHTML += "<td>" + (aOfPersonnes[i]["userName"]).toUpperCase() + " " + ((aOfPersonnes[i]["userFirstName"]).charAt(0)).toUpperCase() + aOfPersonnes[i]["userFirstName"].slice(1) + "</td>";
                sHTML += "<td>" + aOfPersonnes[i]["userPhoneNumber"] + "</td>";
                sHTML += "<td ><button class = \"btn btn-green text-center font-weight-bold\" onclick=\"openNav(" + i + ")\"> " + aOfPersonnes[i]["userMail"] + "</button>"
                sHTML += '<a class=\"edit text-right\"  data-toggle="modal" data-target="#client_infosModal" onClick=\"editClient(' + i + ')\"><i class="edit material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>';
                sHTML += "</td>";
                sHTML += "<td class=\"text-center\">";

                // affiche ou non, le nombre de l'ensemble des commandes passées par l'utilisateur
                for (var k = 0; k < aOfCommandesPassees.length; k++) {
                    if (aOfPersonnes[i]['userId'] == aOfCommandesPassees[k]['userId']) {
                        iCommandesPassées = aOfCommandesPassees[k]["Commandes_passées"]
                        sHTML += iCommandesPassées;
                    }
                }
                if (iCommandesPassées == "") {
                    sHTML += "/";
                }

                sHTML += "</td>";
                sHTML += "<td class=\"text-center\">";
                // affiche ou non, le nombre de l'ensemble des commandes passées par l'utilisateur qui ont été annulées
                for (var l = 0; l < aOfCommandesAnnulees.length; l++) {
                    if (aOfPersonnes[i]['userId'] == aOfCommandesAnnulees[l]['userId']) {
                        iCommandesAnnulees = aOfCommandesAnnulees[l]["Commandes_annulées"]
                        sHTML += iCommandesAnnulees;
                    }
                }
                if (iCommandesAnnulees == "") {
                    sHTML += "/";
                }
                sHTML += "</td>";
                sHTML += "<td data-order='" + aOfPersonnes[i]["userDateLastConnection"] + "'>" + date + "</td>";
                sHTML += "<td class=\"\"><a class=\"delete\" data-toggle=\"modal\" data-target=\"#infos1\" onClick=\"recup(" + i + ")\"><i class=\"fas fa-trash-alt cart_icon cart_icon_remove\"  data-toggle=\"tooltip\" title=\"Delete\"></i></a></td>";
                sHTML += "</tr>";
            }
            iCommandesAnnulees = "";
            iCommandesPassées = "";
        }

        sHTML += "</tbody>";
        $('#table_clients').html(sHTML);
        $('#btn_supp').hide();

        let template_option;
        var adm_client_newCenter = "";

        // list of all AFPA centers used for clients list
        template_option = '<option value="-">--- Sélectionnez ---</option>'
        aOfPersonnes.map(function(element, index) {

                var adm_client_center = element.centerId;
                if (adm_client_center != adm_client_newCenter) {
                    template_option += '<option value="${element.centerId}"> ${element.centerName}</option>';
                }
                adm_client_newCenter = adm_client_center
            })
            //*************************************************** */

        $("#label_center").html(template_option);

        $('#divModalSaving').hide();

        // datatable
        tables = $('#table_clients').DataTable(adm_client_configuration);
    })

    .fail(function(err) {
        alert('error : ' + err.status);
    });

}


/**
 * clear table HTML
 * 
 * clear and destroy datatable
 * 
 * build table and call datatable
 * 
 */
function rebuildDatable() {
    tables.clear();
    tables.destroy();
    loadClients();
}

function openNav(i) {
    $("#myNav").css("width", "100%");
    indiceaOfClients = aOfPersonnes[i];
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

function cancel() {

    ////annule tout les inputs et revient à l'ajout 
    $('#id_user').val("");
    $('#label_civilite').val("");
    $('#user_firstname').val("");
    $('#user_name').val("");
    $('#user_mail').val("");
    $('#user_identifier').val("");
    $('#user_phoneNumber').val("");
    $('#select_user').val("");
    // $('#Nombre').val("");
    // $('#Derniere').val("");

    $('#btn_annuler').show();
    $('#btn_valid').show();
    $('#btn_modifier').hide();
}



var check = true;
// fonction qui vérifie que les inputs soient biens remplis
function verif() {
    /* si un seul des champs est vide le modal s'active 
    	rajout de la class modal au bouton ajouter et modifier si inputs vide */
    if ($('#user_firstname').val() == "" || $('#user_name').val() == "" || $('#user_phoneNumber').val() == "" || $('#user_mail').val() == "" || ($('#user_mail').val().indexOf("@", 0) < 0)) {
        $("#btn_valid").attr("data-toggle", "modal");
        $("#btn_valid").attr("data-target", "#infos2");
        $("#btn_modifier").attr("data-toggle", "modal");
        $("#btn_modifier").attr("data-target", "#infos2");
        return true;
    } else { ///supprime la classe modal si tout les inputs sont remplis
        $("#btn_valid").removeAttr("data-toggle", "modal");
        $("#btn_valid").removeAttr("data-target", "#infos2");
        $("#btn_modifier").removeAttr("data-toggle", "modal");
        $("#btn_modifier").removeAttr("data-target", "#infos2")
        return false;
    }
}

// viariable de verifiaction de l'e-mail et du mot de passe
var client = "";
var client1 = ""

// function inputclient() {

//     client = true;

//     if ($('#user_firstname').val() == '') {
//         console.log('fefz')
//         $('#labelprenom').css("color", "red");
//         var boolprenom = false;
//     } else {
//         $('#labelprenom').css("color", "black");
//         var boolprenom = true;
//     }
//     if ($('#user_name').val() == '') {
//         $('#labelnom').css("color", "red");
//         var boolnom = false;
//     } else {
//         $('#labelnom').css("color", "black");
//         var boolnom = true;
//     }
//     if (($('#user_phoneNumber').val() == '') || ($('#user_phoneNumber').val().length > 14)) {
//         $('#labeltelephone').css("color", "red");
//         var booltelephone = false;
//     } else {
//         $('#labeltelephone').css("color", "black");
//         var booltelephone = true;
//     }
//     if ((!($('#user_mail').val().match(regex))) || ($('#user_mail').val() == '')) {
//         $('#verifemail').html("Votre adresse mail : format non valide");
//         $('#verifemail').css("color", "red");
//         $('#user_mail').css({ "color": "red", "border": "1px red solid" });
//         var boolemail = false;
//     } else {
//         $('#user_mail').css({ "color": "black", "border": "1px solid #dddddd" });
//         $('#verifemail').html("");
//         var boolemail = true;
//     }

//     return client = boolprenom && boolnom && booltelephone && boolemail;
// }


// function changeCenter(select) {
//     currentCenter = select.options[select.selectedIndex].text;
// }

// Erase the fields content and change the name of the modal at its opening
function changeTitle() {
    $('#btn_modification').html('Ajouter');
    $('#id_user').val("");
    $('#label_center').val("-");
    $('#label_civilite').val("-");
    $('#user_firstname').val("");
    $('#user_name').val("");
    $('#user_mail').val("");
    $('#user_phoneNumber').val("");
}


function adm_client_reveal_pwd() {
    if ($('#adm_client_pwd_i').hasClass("fas fa-eye-slash")) {
        $('#adm_client_pwd_i').removeClass("fas fa-eye-slash");
        $('#adm_client_pwd_i').addClass("fas fa-eye");
        $('#adm_client_form_pwd').find('input:password').prop({ type: "text" });
    } else {
        $('#adm_client_pwd_i').removeClass("fas fa-eye");
        $('#adm_client_pwd_i').addClass("fas fa-eye-slash");
        $('#adm_client_form_pwd').find('input:text').prop({ type: "password" });
    }
}

function login_checkStrength() {

    var bPwd_ok = true;

    $("#btn_modifier").removeAttr("data-dismiss");
    $('#user_pwd').css({ "color": "black", "border": "1px solid #dddddd" });
    $('#verif_pwd').html("");

    client1 = false;

    if ($('#user_pwd').val() == '') {
        $('#verif_pwd').html("Champs <strong>obligatoire</strong>");
        $('#verif_pwd').css("color", "red");
        $('#user_pwd').css({ "color": "red", "border": "1px red solid" });
        bPwd_ok = false;
    } else {
        $('#user_pwd').css({ "color": "black", "border": "1px solid #dddddd" });
        $('#verif_pwd').html("");
    }

    var bValidPwd = "";
    var pwd = $('#user_pwd').val();

    var password = pwd.split('');

    var strength = 0;

    if (password.length < 7) {
        bValidPwd = false;
    }

    // Si la longueur du pwd atteind 8 caractère : strength + 1
    if (password.length > 7) strength += 1;
    // Si le mot de passe contient minuscules et manuscules : strength + 1.
    if (pwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
    // Si le mot de passe contient un numérique
    if (pwd.match(/([a-zA-Z])/) && pwd.match(/([0-9])/)) strength += 1;
    // Si le mot de passe contient 1 caractère spécial
    if (pwd.match(/([!,%,.,&,@,#,$,^,*,?,_,~])/)) strength += 1;
    // Si le mot de passe contient 2 caractères spéciaux
    if (pwd.match(/(.*[!,%,&,@,#,.,$,^,*,?,_,~].*[!,%,&,@,#,.,$,^,*,?,_,~])/)) strength += 1;
    // Après calcul de la variable strength

    // Si la valeur de strength < 2 => mot de passe faible
    if ((strength > 0) && (strength < 3)) {

        bValidPwd = false;
        $('#verif_pwd').html('Faible <i class="far fa-frown"></i>');
        $('#verif_pwd').css('color', "blue");
        $('#user_pwd').css({ "border": "2px solid blue" });
        // Si la valeur de strength = 3, mot de passe correct

    } else if (strength == 3) {
        bValidPwd = false;
        $('#verif_pwd').html('Moyen <i class="far fa-meh"></i>');
        $('#verif_pwd').css('color', "orange");
        $('#user_pwd').css({ "border": "2px solid orange" });

    } else if (strength > 3) {
        // Si la valeur de strength > 3, mot de passe excellent
        bValidPwd = true;
        $('#verif_pwd').html('Fort <i class="far fa-smile"></i>');
        $('#verif_pwd').css('color', "var(--first");
        $('#user_pwd').css({ "border": "2px solid var(--first)" });
    }

    if (bPwd_ok == true) {
        client1 = true;
    }
}

var n;
// var obj = { indice: null }; 
// objet contenant l'indice de l'edition en cours
var iIndiceEditionEncours;

function editClient(iIndice) {

    iIndiceEditEncours = iIndice;

    $('.modal-title').html('Modifier un client');
    $('#btn_modification').html('Enregistrer');

    // reinitialise le css du champs mot de passe
    $('#verif_pwd').html("");
    $('#verif_pwd').css('color', "black");
    $('#user_pwd').css({ "border": "1px solid #dddddd" });

    // récupération des différentes valeurs modifiables
    $('#label_civilite').val(aOfPersonnes[iIndiceEditEncours]["userGender"])
    $('#id_user').val(aOfPersonnes[iIndiceEditEncours]["userId"]);
    $('#user_firstname').val(aOfPersonnes[iIndiceEditEncours]["userFirstName"]);
    $('#user_name').val((aOfPersonnes[iIndiceEditEncours]["userName"]).toUpperCase());
    $('#user_phoneNumber').val(aOfPersonnes[iIndiceEditEncours]["userPhoneNumber"]);
    $('#user_mail').val(aOfPersonnes[iIndiceEditEncours]["userMail"]);
    $('#label_center').val(aOfPersonnes[iIndiceEditEncours]["centerId"]);
    $('#user_identifier').val(aOfPersonnes[iIndiceEditEncours]["userIdentifier"]);
    $('#user_pwd').val(aOfPersonnes[iIndiceEditEncours]["userPWD"]);


    $('#btn_modifier').show();
    $('#btn_annuler').show();
    $('#btn_valid').hide();


    $('#user_mail').keyup(function() {
        $("#btn_modifier").removeAttr("data-dismiss");
        $('#user_mail').css({ "color": "black", "border": "1px solid #dddddd" });
        $('#verifemail').html("");

        client = false;

        if ((!($('#user_mail').val().match(regex))) && ($('#user_mail').val() != "")) {
            $('#verifemail').html("Adresse mail non valide");
            $('#verifemail').css("color", "red");
            $('#user_mail').css({ "color": "red", "border": "1px red solid" });
        } else if ($('#user_mail').val() == "") {
            $('#verifemail').html("Champs <strong>obligatoire</strong>");
            $('#verifemail').css("color", "red");
            $('#user_mail').css({ "color": "red", "border": "1px red solid" });
        } else {
            $('#user_mail').css({ "color": "black", "border": "1px solid #dddddd" });
            $('#verifemail').html("");
        }

        if ($('#verifemail').html() == "") {
            $("#btn_modifier").removeAttr("disabled");
            $("#btn_modifier").attr("data-dismiss", "modal");
            client = true;
        } else {
            $("#btn_modifier").attr("disabled", "disabled");
        }
    })
}

function majClient(iIndice) {
    // On met "iIndiceEditionEncours" a la place de "iLongueur".

    // verif();
    // inputclient();

    login_checkStrength();
    var resultats_check = client && client1;

    if (resultats_check == true) {

        var datas = {
            page: "adm_client_update",
            bJSON: 1,
            id_user: aOfPersonnes[iIndice]['userId'],
            user_mail: $('#user_mail').val(),
        }

        $.ajax({
            type: "POST",
            url: "route.php",
            async: true,
            data: datas,
            dataType: "json",
            cache: false,
        })

        .done(function(result) {
            rebuildDatable()
        })

        .fail(function(err) {
            console.log("raté");
        });
    }

    $("#btn_modifier").attr("data-dismiss", "modal");

}


/**
 * delete a movie in database
 * 
 * build table and call datatable
 * 
 */

function supprimPersonne(iIndice) {

    var datas = {
        page: "adm_client_delete",
        bJSON: 1,
        id_user: aOfPersonnes[iIndice]['userId'],
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(result) {
        rebuildDatable()
    })

    .fail(function(err) {
        console.log("raté");
    });
}

function recup(iIndice) {
    iIndiceEditEncours = iIndice;
    $('#divModalSaving').show();
}

// client_configuration DATATABLE

const adm_client_configuration = {
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
        "info": "Clients _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucun client",
        "lengthMenu": "_MENU_ Clients par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Client 0 à 0 sur 0 sélectionnée",
    },

    "columns": [{
            "orderable": true,
        },
        {
            "orderable": true,
        },
        {
            "orderable": true,
        },
        {
            "orderable": true,
        },
        {
            "orderable": true,
        },
        {
            "orderable": true,
        },
        {
            "orderable": false,
        },
        // {
        //     "orderable": false,
        // },
    ],
    'retrieve': true,
};

var tables;
$(document).ready(function() {
    loadClients();
});

// TEST INIT MAIL
var indiceaOfClients = [];
var Contenue;
var prenom;
var Email1;
var MonSujet = "";

function GetContenu() {

    //E-mail du destinataire:
    prenom = indiceaOfClients['userFirstName'];
    prenom = prenom.charAt(0).toUpperCase() + prenom.slice(1)
    Email1 = indiceaOfClients['userMail'];
    Contenue = "Salut " + prenom + ",%0A%0A Cela fait longtemps que tu n'as pas commandé ??%0A%0A Profite vite de nos promotions";

}

function mailenquiry(Adr) {

    if (Adr == false) {
        return false;
    } else {
        //L'objet du message
        MonSujet = "Relance client";
        //Le texte du message
        Contenue = `${Contenue} %0A%0AEn cliquant sur: %0A%0A http://localhost/afpanier %0A%0A A Bientot.`;

        //L'envoi du mail
        window.location.href = 'mailto:' + Email1 + '\?Subject=' + MonSujet + '&body=' + Contenue;

    }
}