/************************** 
 *
 *    Scripts des pages "Login" et "register"
 *    Afpa-Lab | Florent LEGER
 *
 */

var bValideForm = false;


/**************************
 * 
 * GESTION DU MOT DE PASSE
 * 
 */
$(document).ready(function () 
{
    //Vérification de la force du mot de passse
    $('#password').keyup(function () 
    {
        $('#result').html(login_checkStrength($('#password').val()))
    })
    // vérifie le nbre de caractères du pwd 
    function login_checkStrength(password) 
    {
        var strength = 0;
        if (password.length < 7) 
        {   
            bValideForm = false;
            console.log('trop court...'  + bValideForm)
            $('#result').removeClass();
            $('#result').addClass('short');
            return 'Trop court';
        }
        // Si la longueur du pwd atteind 8 caractère : strength + 1
        if (password.length > 8) strength += 1;
        // Si le mot de passe contient minuscules et manuscules : strength + 1.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
        // Si le mot de passe contient un numérique
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1;
        // Si le mot de passe contient 1 caractère spécial
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
        // Si le mot de passe contient 2 caractères spéciaux
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
        // Après calcul de la variable strength
        // Si la valeur de strength < 2 => mot de passe faible
        if (strength < 3) 
        {
            $('#result').removeClass();
            $('#result').addClass('weak');
            bValideForm = false;
            console.log('secu mini... valideForm = '  + bValideForm);
            return '<i class="far fa-frown"></i>';
            // Si la valeur de strength = 3, mot de passe correct
        } else if (strength == 3)
        {
            $('#result').removeClass();
            $('#result').addClass('good');
            bValideForm = true;
            console.log('secu moyenne... valideForm = '  + bValideForm);
            return '<i class="far fa-meh"></i>';
        } else {
            // Si la valeur de strength > 3, mot de passe excellent
            $('#result').removeClass();
            $('#result').addClass('strong');
            bValideForm = true;
            console.log('secu OK - valideForm = ' + bValideForm);
            return '<i class="far fa-smile"></i>';
        }
    }
});

// Fonction afficher les mots de passe
function login_affichePwd() 
{
    var x = document.getElementById("pwd_user");
    var y = document.getElementById("check_pwd2");
    if (x.type === "password" || y.type === "password") 
    {
        x.type = "text";
        y.type = "text";
        // document.getElementById("labelShowPwd").innerHTML = "Décochez pour cacher";
    } else {
        x.type = "password";
        y.type = "password";
        // document.getElementById("labelShowPwd").innerHTML = "Montrer les mots de passe";
    }
}

// Afficher le mot de passe de la page "login"
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


/* Vérification des champs vides */
function login_verifierFormulaire() 
{
    if ($('#nom').val() == '') 
    {
        $('#labelNom').css("color", "red");
        var bNom = false;
    } else 
    {
        $('#labelNom').css("color", "black");
        var bNom = true;
    }
    if ($('#prenom').val() == '') 
    {
        $('#labelPrenom').css("color", "red");
        var bPrenom = false;
    } else 
    {
        $('#labelPrenom').css("color", "black");
        var bPrenom = true;
    }
    if ($('#telephone').val() == '') 
    {
        $('#labelTelephone').css("color", "red");
        var bTel = false;
    } else 
    {
        $('#labelTelephone').css("color", "black");
        var bTel = true;
    }
    if ($('#email').val().indexOf("@", 0) < 0) 
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
    bValideForm &= bNom & bPrenom & bTel & bEmail & bChecked;
    console.log('nom: ' + bNom + ' - pnom: ' + bPrenom + ' - tel: ' + bTel + ' - mail: ' + bEmail);
    console.log('valideForm_saisie : ' + bValideForm);
    if (bValideForm == false) login_montrerModal(2);

}

function login_verifierPwdVide() 
{
    if ($("#password").val() == '') 
    {
        $("#labelPwd").css('color', 'red');
        $("#labelConfirmePwd").css('color', 'red');
        $("#confirmePassword").val('');
        var bPassword = false;
        console.log('mdp vide... - ' + bPassword);
    } else {
        $("#labelPwd").css('color', 'black');
        var bPassword = true;
        console.log('mdp : ' + $('#password').val() + ' - ' + bPassword);
    }
    if ($("#confirmePassword").val() == '') 
    {
        $("#labelConfirmePwd").css('color', 'red');
        $("#labelPwd").css('color', 'red');
        $("#password").val('');
        var bConfirmePwd = false;
        console.log('verif mdp vide... - ' + bConfirmePwd);
    } else 
    {
        $("#labelConfirmePwd").css('color', 'black');
        var bConfirmePwd = true;
        console.log('vérif mdp: ' + $("#confirmePassword").val() + ' - ' + bConfirmePwd);
    }
    bValideForm &= bPassword & bConfirmePwd;
    console.log ('ValideForm_pwd_vide :' + bValideForm)
}

/* Vérification des mots de passe */
function login_verifierSaisiePwd() 
{
    if ($("#password").val() !== '' && $("#confirmePassword").val() !== '') 
    {
        if (($("#password").val() !== $("#confirmePassword").val())) {
            $('#statutPwd').css('color', 'red');
            $('#statutPwd').removeClass('hide');
            $('#statutPwd').html('Les mots de passe ne sont pas identiques');
            
        } else if ($("#password").val() === $("#confirmePassword").val()) 
        {
            $('#statutPwd').css('color', 'green');
            $('#statutPwd').removeClass('hide');
            $('#statutPwd').html('Mots de passe identiques');
            
        }
    }
    //bValideForm &= bValideForm & bNewPassword2;
}


function login_montrerModal(numModal) 
{
    $('#modal' + numModal).modal('show');
}

function login_cacherModal(numModal) 
{
    $('#modal' + numModal).modal('hide');
}

/* Checks nouveau mot de passe */
function login_validerNewPassword() 
{
    login_verifierPwdVide();
    login_verifierSaisiePwd();
    if (!bValideForm) 
    {
        login_montrerModal(2);
    } else 
    {
        // enregistrement du nouveau pwd dans la bdd
        login_montrerModal(1);

    }
}

// Validation du formulaire
function login_envoiFormulaire() 
{
    login_verifierFormulaire();
    login_verifierPwdVide();
    // bValideForm = bGenre & bNom & bPrenom & bNom & bTel & bEmail & bPassword & bConfirmePwd & bNewPassword;
    if (!bValideForm) 
    {
        login_montrerModal(2);
    } else 
    {
        //push datas to bdd
        login_montrerModal(1);
    }
}

function login_recupMail()
{
    let mail = $('#email_user').val();
    $('#email2').val(mail);
}




/***********
 * 
 * CHANGE PASSWORD
 * 
 ***********/

function login_changePassword(){
    login_verifierPwdVide();
    //if (bValideForm == 1) 
    {
        var datas = 
        {
            page : "login_renewpassword_ajax",
            bJSON : 1,
            pwd_user : $("#password").val(),
        }
        $.ajax({
            type: "GET",
            url: "route.php",
            async: true,
            data: datas,
            dataType: "json",
            cache: false,
        })
        .done(function(result) 
        {
            login_montrerModal(1);
        })
        .fail(function(error) 
        {
            login_montrerModal(2);
        });
    }
}


/***********
 * 
 * FORGET PASSWORD
 * 
 ***********/

function login_forgetPassword(){

}

/***********
 * 
 * UPDATE ACCOUNT INFORMATIONS
 * 
 ***********/

function login_updateUserAccount(){
    var datas = 
        {
            page : "account_ajax",
            bJSON : 1,
            firstname_user: $('#firstname_user').val(),
            lastname_user:  $('#lastname_user').val(),
            tel_user:       $('#tel_user').val(),
            email_user:     $('#email_user').val(),
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
            login_montrerModal(1);
        })
        .fail(function(error) 
        {
            login_montrerModal(2);
        });
}

/***********
 * 
 * CREATE ACCOUNT
 * 
 ***********/

function login_newUser()
{
    login_verifierFormulaire();
    login_verifierPwdVide();
    //console.log('bValide = ' + bValideForm);
    // bValideForm = bNom & bPrenom & bNom & bTel & bEmail & bPassword & bConfirmePwd & bNewPassword;
    if (bValideForm == 1) 
    {
        var datas = {
            page : "register_ajax",
            bJSON : 1,
            email_user:     $("#email").val(),
            firstname_user: $("#prenom").val(),
            lastname_user:  $("#nom").val(),
            tel_user:       $("#telephone").val(),
            pwd_user:       $("#password").val(),
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
            if (result.length == 0){
                login_montrerModal(2);
            }
            else
            {
                login_montrerModal(1);
            }
        })
        .fail(function(error) {
            login_montrerModal(3);
        });
    }

}