var tables;
var aOfPersonnes = [];
var iVerif;
var iIndice = "";
var sHTML_datalist = "";
var iIndiceData = ""


/////////////////////////////////////////////////// LES FONCTIONS //////////////////////////////////////////////////	
function loadAdm_admin() {
    showLoadingModal();
    var result = [{ "id_user": "1", "id_center": "2", "user_mail": "mymy@gmail.com", "user_firstname": "Mymy", "user_name": "zoltan", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "2", "user_gender": "2", "user_status": "1", "center_name": "AFPA Saint-Jean-de-Vedas" },
        { "id_user": "2", "id_center": "1", "user_mail": "jijou@gmail.com", "user_firstname": "Jijou", "user_name": "Pagan", "user_identifier": "1 705 8952", "user_phoneNumber": "06.01.02.03.04", "user_role": "1", "user_gender": "1", "user_status": "1", "center_name": "AFPA Toulouse" }
    ];
    var iAdm_admin = 0;
    for (var ligne in result) {

        if (result[ligne]["user_role"] == 1) {
            result[ligne]["user_role"] = "Administrateur Informatique"
        } else if (result[ligne]["user_role"] == 2) {
            result[ligne]["user_role"] = "Administrateur CRCD"
        }

        aOfPersonnes[iAdm_admin] = [];
        aOfPersonnes[iAdm_admin]["id_user"] = result[ligne]["id_user"];
        aOfPersonnes[iAdm_admin]["id_center"] = result[ligne]["id_center"];
        aOfPersonnes[iAdm_admin]["user_firstname"] = result[ligne]["user_firstname"];
        aOfPersonnes[iAdm_admin]["user_name"] = result[ligne]["user_name"];
        aOfPersonnes[iAdm_admin]["user_mail"] = result[ligne]["user_mail"];
        aOfPersonnes[iAdm_admin]["user_identifier"] = result[ligne]["user_identifier"];
        aOfPersonnes[iAdm_admin]["user_phoneNumber"] = result[ligne]["user_phoneNumber"];
        aOfPersonnes[iAdm_admin]["user_role"] = result[ligne]["user_role"];
        aOfPersonnes[iAdm_admin]["user_gender"] = result[ligne]["user_gender"];
        aOfPersonnes[iAdm_admin]["user_status"] = result[ligne]["user_status"];
        iAdm_admin++;
    }
    // INIT DATATABLE
    // Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
    // tables.page.len(10).draw();
    constructTable();
    hideLoadingModal();

}

function constructTable() {
    var i;
    var sHTML = "";
    sHTML += "<thead class = \" text-center\">";
    sHTML += "<tr>";
    sHTML += "<th>Nom</th>";
    sHTML += "<th>Prénom</th>";
    sHTML += "<th>Email</th>";
    sHTML += "<th>Téléphone</th>";
    sHTML += "<th>Rôle de l'utilisateur</th>";
    sHTML += "<th>Statut</th>";
    sHTML += "<th>Action</th>";
    sHTML += "</tr>";
    sHTML += "</thead>";
    sHTML += "<tbody class = text-center>";

    for (i = 0; i < aOfPersonnes.length; i++) {

        iIndice = i;

        sHTML += "<tr>";
        sHTML += "<td>" + (aOfPersonnes[i]["user_name"]).toUpperCase() + "</td>";
        sHTML += "<td>" + (aOfPersonnes[i]["user_firstname"]).charAt(0).toUpperCase() + aOfPersonnes[i]["user_firstname"].slice(1) + "</td>";
        sHTML += "<td>" + aOfPersonnes[i]["user_mail"] + "</td>";
        sHTML += "<td>" + aOfPersonnes[i]["user_phoneNumber"] + "</td>";
        sHTML += "<td>" + aOfPersonnes[i]["user_role"] + "</td>";

        if (aOfPersonnes[i]["user_status"] == 1) {
            sHTML += "<td data-label=\"Status\"><input class=\"checkbox adm_admin_checkbox\" id=\"checkbox_" + i + "\" type=\"checkbox\" checked /><label id=\"checkbox" + i + "\" checked onclick=\"adm_admin_change_status(" + i + ")\" for=\"checkbox_(" + i + ")\"></label></td>";
        } else if (aOfPersonnes[i]["user_status"] == 0) {
            sHTML += "<td data-label=\"Status\"><input class=\"checkbox adm_admin_checkbox\" id=\"checkbox_" + i + "\" type=\"checkbox\"/><label for=\"checkbox_(" + i + ")\" id=\"checkbox" + i + "\" onclick=\"adm_admin_change_status(" + i + ")\"></label></td>"
        }

        sHTML += '<td class="adm_admin_action">';
        sHTML += '<a class="" style="width:20px" data-toggle="modal" onClick="recup(' + i + ')" data-toggle="modal" data-target="#infos"><i class="fas fa-trash-alt adm_admin_delete" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td>';
        sHTML += "</tr>";

    }
    sHTML += "</tbody>";
    $('#table_personnes').html(sHTML);
    tables = $('#table_personnes').DataTable(configuration);

}



//
// Partie récupération des données liées à la personne que l'on souhaite mettre administrateur
//

// exemple de tableau d'utilisateurs du site
var resultat = [{ "id_user": "1", "id_center": "2", "user_mail": "jijou@gmail.com", "user_firstname": "Jijou", "user_name": "Pagan", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "4", "user_function": "Formateur DWWM/CDA", "user_gender": "1" },
    { "id_user": "2", "id_center": "1", "user_mail": "mymy@gmail.com", "user_firstname": "Mymy", "user_name": "zoltan", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "2", "user_function": "Stagiaire CDA", "user_gender": "2" },
    { "id_user": "5", "id_center": "1", "user_mail": "boris.zoltan@gmail.com", "user_firstname": "Boris", "user_name": "zoltan", "user_identifier": "1 308 9285", "user_phoneNumber": "06.55.44.11.22", "user_role": "5", "user_function": "Stagiaire ACOM", "user_gender": "1" },
    { "id_user": "6", "id_center": "1", "user_mail": "michel.debussy@gmail.com", "user_firstname": "Michel", "user_name": "Debussy", "user_identifier": "1 123 5468", "user_phoneNumber": "06.55.44.11.22", "user_role": "4", "user_function": "Stagiaire CDA", "user_gender": "1" },
    { "id_user": "21", "id_center": "1", "user_mail": "christian.dupont@gmail.com", "user_firstname": "Christian", "user_name": "Dupont", "user_identifier": "1 325 6326", "user_phoneNumber": "06.55.44.11.22", "user_role": "3", "user_function": "Formateur Compta", "user_gender": "1" },
    { "id_user": "22", "id_center": "1", "user_mail": "enselme.lupin@gmail.com", "user_firstname": "Enselme", "user_name": "Lupin", "user_identifier": "1 585 2365", "user_phoneNumber": "06.55.44.11.22", "user_role": "5", "user_function": "Stagiaire Compta", "user_gender": "1" },
    { "id_user": "27", "id_center": "1", "user_mail": "lucie.lemoine@gmail.com", "user_firstname": "Lucie", "user_name": "Lemoine", "user_identifier": "1 546 2368", "user_phoneNumber": "06.55.44.11.22", "user_role": "5", "user_function": "Stagiaire CRCD", "user_gender": "2" },
    { "id_user": "28", "id_center": "1", "user_mail": "virginie@gmail.com", "user_firstname": "Virginie", "user_name": "Vigneron", "user_identifier": "1 857 3496", "user_phoneNumber": "06.55.44.11.22", "user_role": "2", "user_function": "Formatrice CRCD", "user_gender": "2" },
    { "id_user": "37", "id_center": "1", "user_mail": "guy@gmail.com", "user_firstname": "Guy", "user_name": "Perez", "user_identifier": "1 704 3209", "user_phoneNumber": "06.55.44.11.22", "user_role": "1", "user_function": "Stagiaire CDA", "user_gender": "1" },
]

function loadPersonnes() {

    sHTML_datalist += '<label for="user_identifier" id="labelDatalist">Veuillez selectionner votre code bénéficiaire :</label>';
    sHTML_datalist += '<input onchange="editPersonne(this)" name="adm_admin_datalist_content" list="adm_admin_datalist_content" class="adm_admin_select custom-select custom-select-sm">';
    sHTML_datalist += '<datalist id="adm_admin_datalist_content">'

    for (i = 0; i < resultat.length; i++) {

        var Identifiant = ((resultat[i]["user_identifier"]));
        console.log(Identifiant);

        iIndiceData = i;
        sHTML_datalist += "<option data-value='" + iIndiceData + "' value='" + Identifiant + "'>";
        sHTML_datalist += "</option>"
    }

    sHTML_datalist += '</datalist>';

    $('#adm_admin_datalist').html(sHTML_datalist);
}

function editPersonne(i)
////ajout du contenu du tableau dans les inputs en bas de page
{
    iIndiceData = $('[name="adm_admin_datalist_content"]').val();
    iIndiceData = ($('#adm_admin_datalist_content [value="' + iIndiceData + '"]').data('value'));

    $('#adm_admin_edit_data').show();
    
    $('#btn_modification').html('Enregistrer');
    $('#label_civilite').val(resultat[iIndiceData]["user_gender"])
    $('#user_firstname').val(resultat[iIndiceData]["user_firstname"]);
    $('#user_name').val(resultat[iIndiceData]["user_name"]);
    $('#user_mail').val(resultat[iIndiceData]["user_mail"]);
    $('#user_phoneNumber').val(resultat[iIndiceData]["user_phoneNumber"]);
}


///////////////////////////////////////////////////////////////////////////////////////////////////



$(document).ready(function() {
    // INIT DATATABLE
    // Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
    //adm_admin_tables.page.len(10).draw();
    loadAdm_admin();
    loadPersonnes();
});


// adm_admin DATATABLE
const configuration = {
    "responsive": true,
    "stateSave": false,
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
        "info": "Administrateurs _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucun administrateur",
        "lengthMenu": "_MENU_ Administrateurs par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Administrateurs 0 à 0 sur 0 sélectionnée",
    },

    "columns": [{
            "orderable": true
        },
        {
            "orderable": true
        },

        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": false
        },
    ],
    'retrieve': true,
    "responsive": true
};




var bValidPwd = false;
/**************************
 * 
 *  TEST FORCE DU MOT DE PASSE
 *  pages register + change pwd
 */
$(document).ready(function () 
{
    //Vérification de la force du mot de passse
    $('#pwd_user').keyup(function () 
    {
        $('#result').html(login_checkStrength($('#pwd_user').val()))
    })
    // vérifie le nbre de caractères du pwd 
    function login_checkStrength(password) 
    {
        var strength = 0;
        if (password.length < 2)
        {
            return null;
        }
        if (password.length < 7) 
        {   
            bValidPwd = false;
            console.log('trop court...'  + bValidPwd)
            $('#result').removeClass();
            $('#result').addClass('short');
            return 'Trop court';
        }
        // Si la longueur du pwd atteind 8 caractère : strength + 1
        if (password.length > 7) strength += 1;
        // Si le mot de passe contient minuscules et manuscules : strength + 1.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
        // Si le mot de passe contient un numérique
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1;
        // Si le mot de passe contient 1 caractère spécial
        if (password.match(/([!,%,.,&,@,#,$,^,*,?,_,~])/)) strength += 1;
        // Si le mot de passe contient 2 caractères spéciaux
        if (password.match(/(.*[!,%,&,@,#,.,$,^,*,?,_,~].*[!,%,&,@,#,.,$,^,*,?,_,~])/)) strength += 1;
        // Après calcul de la variable strength
        // Si la valeur de strength < 2 => mot de passe faible
        if (strength < 3) 
        {
            $('#result').removeClass();
            $('#result').addClass('weak');
            bValidPwd = false;
            console.log('secu mini... bValidPwd = '  + bValidPwd);
            return '<i class="far fa-frown"></i>';
            // Si la valeur de strength = 3, mot de passe correct
        } else if (strength == 3)
        {
            $('#result').removeClass();
            $('#result').addClass('good');
            bValidPwd = false;
            console.log('secu moyenne... bValidPwd = '  + bValidPwd);
            return '<i class="far fa-meh"></i>';
        } else {
            // Si la valeur de strength > 3, mot de passe excellent
            $('#result').removeClass();
            $('#result').addClass('strong');
            bValidPwd = true;
            console.log('secu OK - bValidPwd = ' + bValidPwd);
            return '<i class="far fa-smile"></i>';
        }
    }
});

/************
 * 
 *  VERIF SAME PASSWORDS
 *  register + change pwd
 */
function login_verifierSaisiePwd() 
{
    if ($("#pwd_user").val() !== '' && $("#check_pwd2").val() !== '') 
    {
        if (($("#pwd_user").val() !== $("#check_pwd2").val())) {
            $('#statutPwd').css('color', 'red');
            $('#statutPwd').removeClass('hide');
            $('#statutPwd').html('Les mots de passe ne sont pas identiques');
            var bChekSaisie = false;
        } else if ($("#pwd_user").val() === $("#check_pwd2").val()) 
        {
            $('#statutPwd').css('color', 'green');
            $('#statutPwd').removeClass('hide');
            $('#statutPwd').html('Mots de passe identiques');
            var bChekSaisie = true;
        }
    }
    return bChekSaisie;
}

var bvalideForm = false;
/**************************
 * 
 * VERIF DES INPUTS VIDES
 * 
 *     page register 
 */

function login_verifierFormulaire() 
{
    if ($('#lastname_user').val() == '') 
    {
        $('#labelNom').css("color", "red");
        var bNom = false;
    } else 
    {
        $('#labelNom').css("color", "black");
        var bNom = true;
    }
    if ($('#firstname_user').val() == '') 
    {
        $('#labelPrenom').css("color", "red");
        var bPrenom = false;
    } else 
    {
        $('#labelPrenom').css("color", "black");
        var bPrenom = true;
    }
    if (($('#tel_user').val() == '') || ($('#tel_user').val().length > 10))
    {
        $('#labelTelephone').css("color", "red");
        var bTel = false;
    } else 
    {
        $('#labelTelephone').css("color", "black");
        var bTel = true;
    }
    if ($('#email_user').val().indexOf("@", 0) < 0) 
    {
        $('#labelEmail').html("Votre adresse mail : format non valide");
        $('#labelEmail').css("color", "red");
        var bEmail = false;
    } else {
        $('#labelEmail').html("Votre adresse mail");
        $('#labelEmail').css("color", "black");
        var bEmail = true;
    }
    if ($('#checkLecture').prop('checked') == true)
    {
        $('#labelCheck').css("color", "black");
        var bChecked = true;
    }
    else
    {
        $('#labelCheck').css("color", "red");
        var bChecked = false;
    }
    if ($('#pwd_user').val() == '')
    {
        $("#label_pwd").css('color', 'red');
        var bPassword = false;
    }
    else
    {
        $("#label_pwd").css('color', 'black');
        var bPassword = true;
    }
    if ($('#check_pwd').val() == '')
    {
        $("#label_pwd2").css('color', 'red');
        var bPassword2 = false;
    }
    else
    {
        $("#label_pwd2").css('color', 'black');
        var bPassword2 = true;
    }
    // vérif si les mots de passe correspondent
    var bCheckSaisie = login_verifierSaisiePwd();
    // bouléen de validation finale
    var bValideForm = bNom & bPrenom & bTel & bEmail & bChecked & bPassword & bPassword2 & bCheckSaisie;

    console.log('nom: ' + bNom + ' - pnom: ' + bPrenom + ' - tel: ' + bTel + ' - mail: ' + bEmail + '  - pwd1: ' + bPassword + ' - pwd2: ' + bPassword2 + ' - bCheckSaisie ' + bCheckSaisie);
    console.log('Form = ' + bValideForm + ' / Pwd = ' + bValidPwd);
    // si 'false' alors affiche erreur

    if (bValideForm)
    {
        if (!bValidPwd)
        {
            createModal('badPwd');
        }
        else
        {
            login_newUser();
        }
    }
    else
    {
        createModal('infoManquante');
    }
}



//***  AJAX  ****/
/***********
 * 
 * CREATE ACCOUNT
 * 
 ***********/

function login_newUser()
{
    var datas = {
        page : "register_ajax",
        bJSON : 1,
        email_user:     $("#email_user").val(),
        firstname_user: $("#firstname_user").val(),
        lastname_user:  $("#lastname_user").val(),
        tel_user:       $("#tel_user").val(),
        pwd_user:       $("#pwd_user").val(),
        recaptcha_response: $("#g-token").val(),
    }
    //console.log(datas);
    $.ajax({
        type:   "POST",
        url:    "route.php",
        async:  true,
        data:   datas,
        dataType: "json",
        cache:  false,
    })
    .done(function(result) {
        console.log(result[0]['id_user'])
        if (result[0]['id_user'] == 0)
        {
            //info manquante, mail exitant
            createModal('errorCreateUser');
        }
        else
        {
            //création de compte réussie
            console.log(result[0]['token_user'])
            tokenInput = result[0]['token_user'];
            createModal('createUser');
            
        }
    })
    .fail(function(error) {
        //echec mail existant
        createModal('errorCreateUser');
    });
}

/****************
 * 
 * CONNEXION
 * 
 ***********/

function login_connection() 
{
    // on vérifie les champs vides de saisie

    //console.log($('#email_user').val() + " " + $('#pwd_user').val());
    if (($('#email_user').val() !== '') && ($('#pwd_user').val() !== ''))
    {
        var datas = 
        {
            page        :   "login_ajax",
            bJSON       :   1,
            email_user  :   $("#email_user").val(),
            pwd_user    :   $("#pwd_user").val(),
        }
        $.ajax({
            type        :   "POST",
            url         :   "route.php",
            async       :   true,
            data        :   datas,
            dataType    :   "json",
            cache       :   false,
        })
        .done(function(result) 
        {
            switch (result)
            {
                case 'success':
                    self.location.href='account';
                    break;
                case 'desable':
                    createModal('accountDesable');
                    break;
                case 'bad request':
                    createModal('connexionKo');
            }
        })
        .fail(function(error) {
            createModal('connexionKo');
        });
    }
    else
    {
        alert('Merci de renseigner les champs !')
    }
}


/***********
 * 
 * UPDATE ACCOUNT INFORMATIONS
 * 
 */

function login_updateUserAccount()
{
    
    var datas = 
        {
            page : "account_ajax",
            bJSON : 1,
            id_user:        $('#userid').val(),
            firstname_user: $('#firstname_user').val(),
            lastname_user:  $('#lastname_user').val(),
            tel_user:       $('#tel_user').val(),
            email_user:     $('#email_user').val(),
            pwd_user :      $('#pwd_user').val(),
        }
        $.ajax({
            type:   "POST",
            url:    "route.php",
            async:  true,
            data:   datas,
            dataType: "json",
            cache:  false,
        })
        .done(function(result) 
        {
            if (result = "success")
            {
                createModal('success');
            }
            else
            {
                createModal('error');
            }
            
        })
        .fail(function(error) 
        {
            createModal('error');
        });
}



/***********
 * 
 * FORGET PASSWORD
 * 
 */

function login_forgetPassword()
{

}



/***********
 * 
 * ACCOUNT ACTIVATION
 * 
 */
function login_activeAccount()
{
    var datas = 
        {
            page : "register_activate_account",
            bJSON : 1,
            token_user: tokenInput
        }
        $.ajax({
            type:   "POST",
            url:    "route.php",
            async:  true,
            data:   datas,
            dataType: "json",
            cache:  false,
        })
        .done(function(result) 
        {
            self.location.href='login';
        })
        .fail(function(error) 
        {
            createModal('error');
        });
}



/******
 *  Recup input mail
 *  Mdp oublié
 */
function login_recupMail()
{
    let mail = $('#email_user').val();
    $('#email2').val(mail);
}

/******
 * 
 *  Afficher les mots de passe
 *  
 */
function login_affichePwd() 
{
    var x = document.getElementById("pwd_user");
    var y = document.getElementById("check_pwd2");
    if (x)
    {
        if (x.type === "password") 
        {
            x.type = "text";
            // document.getElementById("labelShowPwd").innerHTML = "Décochez pour cacher";
        } else {
            x.type = "password";
            // document.getElementById("labelShowPwd").innerHTML = "Montrer le mot de passe";
        }
    }
    if (y)
    {
        if (y.type === "password") 
        {
            y.type = "text";
            // document.getElementById("labelShowPwd").innerHTML = "Décochez pour cacher";
        } else {
            y.type = "password";
            // document.getElementById("labelShowPwd").innerHTML = "Montrer le mot de passe";
        }
    }
    
}

/*  
*   ------------------------------------------
*    Scripts de la partie inscription du header
*    ------------------------------------------
*/

/* Vérification de la force du mot de passe */
$(document).ready(function() 
{
    $('#password').keyup(function() 
    {
        $('#result').html(signin_checkStrength($('#password').val()))
    })

    /* Vérification du nombre de caractères du mot de passe */ 
    function signin_checkStrength(password) 
    {
        var strength = 0
        if (password.length < 8)
        {
            $('#result').removeClass()
            $('#result').addClass('short')
            $('#result').css('color', 'red')
            $('#result').css('font-size', '80%')
            return 'Mot de passe trop court (doit contenir au minimum 8 caractères, des chiffres, des lettres et caractères spéciaux)'
        }
        //Si la longueur du mot de passe atteind 8 caractères : strength + 1.
        if (password.length > 9) strength += 1
        //Si le mot de passe contient minuscules et manuscules : strength + 1.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
        //Si le mot de passe contient un caractère numérique : strength + 1.
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
        //Si le mot de passe contient 1 caractère spécial : strength + 1.
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        //Si le mot de passe contient 2 caractères spéciaux : strength + 1.
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1

        //Après calcul de la variable strength
        //Si la valeur de strength < 2 => mot de passe faible
        if (strength < 3)
        {
            $('#result').removeClass()
            $('#result').addClass('weak')
            $('#result').css('color', 'orange')
            $('#result').css('font-size', '80%')
            return 'Mot de passe moyen'
        } 
        //Si la valeur de strength = 3, mot de passe correct
        else if (strength == 3)
        {
            $('#result').removeClass()
            $('#result').addClass('good')
            $('#result').css('color', 'green')
            $('#result').css('font-size', '80%')
            return 'Mot de passe fiable'
        } 
        //Si la valeur de strength > 3, mot de passe excellent
        else 
        {
            $('#result').removeClass()
            $('#result').addClass('strong')
            $('#result').css('color', 'black')
            $('#result').css('font-size', '80%')
            return 'Mot de passe sécurisé'
        }
    }
    $(".toggle-password").click(function()
    {
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password")
        {
            input.attr("type", "text");
        } 
        else
        {
            input.attr("type", "password");
        }
    });
}); 

var bNewPassword2 = false;
var bValideForm = false;

/* Vérification des champs vides */
function signin_verifierFormulaire() 
{
    if ($('#checkLecture').is(':checked'))
    {
        var bCheck = true;
    } 
    else
    {
        $('#labelCheck').css("background", "red");
        $('#labelCheck').css("border-width", "1em");
        var bCheck = false;
    }
    if ($('#nom').val() == '')
    {
        $('#nom').css("border-color", "red");
        $('#nom').css("border-width", "0.25em");
        var bNom = false;
    } 
    else 
    {
        $('#labelNom').css("border-color", "black");
        var bNom = true;
    }
    if ($('#prenom').val() == '')
    {
        $('#prenom').css("border-color", "red");
        $('#prenom').css("border-width", "0.25em");
        var bPrenom = false;
    } 
    else 
    {
        $('#prenom').css("border-color", "black");
        var bPrenom = true;
    }
    if ($('#telephone').val() == '')
    {
        $('#telephone').css("border-color", "red");
        $('#telephone').css("border-width", "0.25em");
        var bTel = false;
    } 
    else 
    {
        $('#telephone').css("border-color", "black");
        var bTel = true;
    }
    if ($('#email').val().indexOf("@", 0) < 0)
    {
        $('#email').html("Votre adresse mail : format non valide");
        $('#email').css("border-color", "red");
        $('#email').css("border-width", "0.25em");
        var bEmail = false;
    } 
    else
    {
        $('#email').html("Votre adresse mail");
        $('#email').css("border-color", "black");
        var bEmail = true;
    }
    if ($('#codeBenef').val() == '')
    {
        $('#codeBenef').html("Code bénéficiaire : format non valide");
        $('#codeBenef').css("border-color", "red");
        $('#codeBenef').css("border-width", "0.25em");
        var bCodeBenef = false;
    } 
    else
    {
        $('#codeBenef').html("Votre code bénéficiaire");
        $('#codeBenef').css("border-color", "black");
        var bCodeBenef = true;
    }
    bValideForm = bCheck & bNom & bPrenom & bNom & bTel & bEmail & bCodeBenef;
}

/* Vérification champs mot de passe vide */
function signin_verifierPwdVide()
{
    if ($("#password").val() == '')
    {
        $("#password").css('border-color', 'red');
        $('#password').css("border-width", "0.25em");
        $("#confirmePassword").css('border-color', 'red');
        $('#confirmePassword').css("border-width", "0.25em");
        $("#confirmePassword").val('');
        var bPassword = false;
    } 
    else
    {
        $("#password").css('border-color', 'black');
        var bPassword = true;
    }
    if ($("#confirmePassword").val() == '')
    {
        $("#confirmePassword").css('border-color', 'red');
        $('#confirmePassword').css("border-width", "0.25em");
        $("#password").css('border-color', 'red');
        $('#password').css("border-width", "0.25em");
        $("#password").val('');
        var bConfirmePwd = false;
    } 
    else 
    {
        $("#confirmePassword").css('border-color', 'black');
        var bConfirmePwd = true;
    }
    bValideForm &= bPassword & bConfirmePwd;
}

/* Vérification des mots de passe */
function signin_verifierSaisiePwd() {
    if ($("#password").val() !== '' && $("#confirmePassword").val() !== '')
    {
        if (($("#password").val() !== $("#confirmePassword").val()))
        {
            $('#statutPwd').removeClass('hide');
            $('#statutPwd').css('color', 'red');
            $('#statutPwd').html('Les mots de passe ne sont pas identiques');
            bNewPassword2 = false;
        } 
        else if ($("#password").val() === $("#confirmePassword").val())
        {
            $('#statutPwd').removeClass('hide');
            $('#statutPwd').css('color', 'green');
            $('#statutPwd').html('Mots de passe identiques');
            bNewPassword2 = true;
        }
    }
    console.log('valid psw : ' + bNewPassword2);
}

/* Validation du formulaire */
function signin_envoiFormulaire()
{
    
    signin_verifierFormulaire();
    signin_verifierPwdVide();
    

   // Si le formulaire n'est pas valide alors on affiche modal2
    bValideForm &= bNewPassword2;
    
    if (!bValideForm)
    {
        signin_montrerModal(2);
    }
    else 
    {
        //Sinon on envoi les data vers php et on affiche modale1
        signin_montrerModal(1);

        
        const obj =
        {
            nom: $("#nom").val(),
            prenom: $("#prenom").val(),
            phone: $("#telephone").val(),
            mail: $("#email").val(),
            password: $("#password").val(),
            status: "user"
        }
        
        const arrayUsers = JSON.parse(localStorage.getItem("users"));
        arrayUsers.push(obj);
        
        const arrayStr = JSON.stringify(arrayUsers);
        localStorage.setItem("users", arrayStr);
    }
}