/*********************** CONSTRUCTION TABLEAU DE DONNEES ***********************/

var tables;
var aOfPersonnes = [];
var iVerif;
var iIndice = "";
var sHTML_datalist = "";
var iIndiceData = ""


$(document).ready(function () {
    loadAdm_admin();
    loadPersonnes();
});

function emptyLogin() {
    if ($('#login_username').val() == "") {
        $('#sp_error_login_username').html("Identifiant obligatoire");
        $('#login_username').css("border", "1px solid #7fc241");
        $('#sp_error_login_username').css("color", "red");
        return true;
    } else {
        return false;
    }
}

function emptyPassword() {
    if ($('#login_password').val() == "") {
        $('#sp_error_login_password').html("Mot de passe obligatoire");
        $('#login_password').css("border", "1px solid #7fc241");
        $('#sp_error_login_password').css("color", "red");
        return true;
    } else {
        return false;
    };
}

function initErrorInput() {
    $('#sp_error_login_username').html("");
    $('#sp_error_login_password').html("");
    $("#sp_error_connexion").html("");
}

function areLoginAndPasswordInputsFilled() {
    var loginInput = $("#login_username").val();
    var passwordInput = $("#login_password").val();
    if (loginInput != "" && passwordInput != "") {
        return true;
    }
    else {
        return false;
    }
}

function signin_login() {
    //Reinit des champs errur
    initErrorInput()

    //Vérif des champs login et password
    emptyLogin();
    emptyPassword();


    //Si les champs login ET password ne sont pas vide on lance la requete AJAZX
    areLoginAndPasswordInputsFilled();
    if (areLoginAndPasswordInputsFilled()) {
        // REQUETE AJAX
        var datas = {
            page: "login",
            login_username: $('#login_username').val(),
            login_password: $('#login_password').val(),
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
                if (result[0]["code"] == "001") {
                    self.location.href = result[0]["url"];
                }
                if (result[0]["code"] == "007") {
                    //Cas ou l'utilisateur n'est pas trouvé dans la BDD
                    // On affiche le msg d'erreur du retour backend
                    $("#sp_error_connexion").html(result[0]["message"]);
                }
            })
            .fail(function (err) {
                alert('error : ' + err.status);
            })
    }
}

function loadAdm_admin() {
    showLoadingModal();

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


    sHTML += "</tbody>";
    $('#table_personnes').html(sHTML);
    tables = $('#table_personnes').DataTable(configuration);

}

/****************** Exemple de tableau d'utilisateurs du site ******************/

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

/****************** Suite séléction code bénéficiaire: Affichage des données dans les inputs correspondants ******************/
function loadPersonnes() {

    sHTML_datalist += '<label for="user_identifier" id="labelDatalist">Veuillez selectionner votre code bénéficiaire :</label>';
    sHTML_datalist += '<input onchange="editPersonne(this)" name="adm_admin_datalist_content" list="adm_admin_datalist_content" class="adm_admin_select custom-select custom-select-sm" id="user_datalist">';
    sHTML_datalist += '<datalist id="adm_admin_datalist_content">'

    for (i = 0; i < resultat.length; i++) {

        var Identifiant = ((resultat[i]["user_identifier"]));

        iIndiceData = i;
        sHTML_datalist += "<option data-value='" + iIndiceData + "' value='" + Identifiant + "'>";
        sHTML_datalist += "</option>"
    }

    sHTML_datalist += '</datalist>';

    $('#adm_admin_datalist').html(sHTML_datalist);
}

function editPersonne(i) {
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



/****************** Configuration du datatable ******************/
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



/*********************** VERIFICATION DES MOTS DE PASSE (VISIBILITE, FORCE, CORRESPONDANCE, CHAMPS VIDES) ***********************/

/****************** Vérification de la force du mot de passe ******************/
var bValidPwd = false;
$(document).ready(function () {
    $('#password').keyup(function () {
        $('#result').html(signin_checkStrength($('#password').val()))
    })

    //Vérification du nombre de caractères du mot de passe
    function signin_checkStrength(password) {
        var strength = 0
        if (password.length < 8) {
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
        if (strength < 3) {
            $('#result').removeClass()
            $('#result').addClass('weak')
            $('#result').css('color', 'orange')
            $('#result').css('font-size', '80%')
            return 'Mot de passe moyen'
        }
        //Si la valeur de strength = 3, mot de passe correct
        else if (strength == 3) {
            $('#result').removeClass()
            $('#result').addClass('good')
            $('#result').css('color', 'green')
            $('#result').css('font-size', '80%')
            return 'Mot de passe fiable'
        }
        //Si la valeur de strength > 3, mot de passe excellent
        else {
            $('#result').removeClass()
            $('#result').addClass('strong')
            $('#result').css('color', 'black')
            $('#result').css('font-size', '80%')
            return 'Mot de passe sécurisé'
        }
    }
    $(".toggle-password").click(function () {
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
});

/****************** Vérification si champs vides mdp ******************/
var bNewPassword2 = false;
var bValideForm = false;

function signin_verifierPwdVide() {
    if ($("#password").val() == '') {
        $("#password").css('border-color', 'red');
        $('#password').css("border-width", "0.25em");
        $("#confirmePassword").css('border-color', 'red');
        $('#confirmePassword').css("border-width", "0.25em");
        $("#confirmePassword").val('');
        var bPassword = false;
    } else {
        $("#password").css('border-color', 'black');
        var bPassword = true;
    }
    if ($("#confirmePassword").val() == '') {
        $("#confirmePassword").css('border-color', 'red');
        $('#confirmePassword').css("border-width", "0.25em");
        $("#password").css('border-color', 'red');
        $('#password').css("border-width", "0.25em");
        $("#password").val('');
        var bConfirmePwd = false;
    } else {
        $("#confirmePassword").css('border-color', 'black');
        var bConfirmePwd = true;
    }
    bValideForm &= bPassword & bConfirmePwd;
}

/****************** Vérification correspondances des mdp ******************/
function signin_verifierSaisiePwd() {
    if ($("#password").val() !== '' && $("#confirmePassword").val() !== '') {
        if (($("#password").val() !== $("#confirmePassword").val())) {
            $('#statutPwd').removeClass('hide');
            $('#statutPwd').css('color', 'red');
            $('#statutPwd').html('Les mots de passe ne sont pas identiques');
            bNewPassword2 = false;
        } else if ($("#password").val() === $("#confirmePassword").val()) {
            $('#statutPwd').removeClass('hide');
            $('#statutPwd').css('color', 'green');
            $('#statutPwd').html('Mots de passe identiques');
            bNewPassword2 = true;
        }
    }
    console.log('valid psw : ' + bNewPassword2);
}



/*********************** VERIFICATION DU FORMULAIRE (CHAMPS VIDES, VALIDATION) ***********************/

/****************** Vérification si case non cochée dans le formulaire ******************/
function signin_verifierFormulaire() {

    if ($('#checkLecture').is(':checked')) {
        var bCheck = true;
    } else {
        $('#labelCheck').css("background", "red");
        $('#labelCheck').css("border-width", "1em");
        var bCheck = false;
    }


    bValideForm = bCheck & bCivilite;
}


/****************** Validation du formulaire ******************/


/* Validation du formulaire */
function signin_envoiFormulaire() {
    signin_verifierFormulaire();
    signin_verifierPwdVide();

    // Si le formulaire n'est pas valide alors on affiche modal2
    bValideForm &= bNewPassword2;

    if (!bValideForm) {
        signin_montrerModal(2);
    } else {
        //Sinon on envoi les data vers php et on affiche modale1
        signin_montrerModal(1);

        const obj = {
            nom: $("#nom").val(),
            prenom: $("#prenom").val(),
            password: $("#password").val(),
            status: "user"
        }

        const arrayUsers = JSON.parse(localStorage.getItem("users"));
        arrayUsers.push(obj);

        const arrayStr = JSON.stringify(arrayUsers);
        localStorage.setItem("users", arrayStr);
    }
}