
/************************** 
 *
 *    Scripts des pages "Login" et "register"
 *    Afpa-Lab | Florent LEGER
 *
 */



/***********
 * 
 * CREATION DES MODALES
 */
function createModal(type)
{
    var title;
    var text;
    switch(type)
    {
        case 'createUser':
            title = 'Demande envoyée',
            text = 'La création de votre compte est effective.</p><p>Veuillez renseigner le code à 6 caractères que vous venez de recevoir par email :';
            generateModal(title,text,1,0,0,0,0,1,1);
            $('#maModale').modal('show');
            break; 
        
        case 'infoManquante':
            title = 'Echec de validation';
            text = 'Certains champs ne sont pas remplis ou ne le sont pas correctement. <br> Vérifiez les informations en rouge.'
            generateModal(title,text,1,0,0,0,0,0,0);
            $('#maModale').modal('show');
            break;
        
        case 'forgetPwd' :
            title = 'Mot de passe oublié'
            text = 'Veuillez saisir votre adresse mail afin de réinitialiser votre mot de passe :'
            generateModal(title,text,1,0,0,1,0,0,1);
            $('#maModale').modal('show');
            break;

        case 'badPwd':
            title = 'Echec mot de passe';
            text = 'Votre mot de passe n\'est pas suffisamment sécurisé. <br> Veillez à ce qu\'il contienne au moins 8 caractères, dont :<br>';
            text += '<br>- 1 caractère spécial, <br>- 1 chiffre, <br>- 1 majuscule.'
            generateModal(title,text,1,0,0,1,0,0,0);
            $('#maModale').modal('show');
            break;

        case 'connexionKo':
            title = 'Echec de connexion';
            text = 'Le login ou le mot de passe est incorrect.';
            generateModal(title,text,1,0,1,0,1,0,0);
            $('#maModale').modal('show');
            break;
        
        case 'accountDesable':
            title = 'Compte révoqué';
            text = 'Votre compte n\'est pas actif. <br> Cliquez <a href="#" id="genereMail">ici</a> pour regénérer le mail d\'activation de compte.';
            generateModal(title,text,1,0,0,0,0,0,0);
            $('#maModale').modal('show');
            break;
        
        case 'errorCreateUser':
            title = 'Erreur détectée';
            text = 'Il semble que nous nous connaissions déjà, <br>votre adresse mail est enregistrée dans notre base.';
            generateModal(title,text,1,0,0,0,0,0,0);
            $('#maModale').modal('show');
            break;

        case 'success':
            title = 'Enregistrement réussi';
            text = 'Vos informations ont bien été enregistrées';
            generateModal(title,text,0,1,0,0,0,0,0);
            $('#maModale').modal('show');
            break;

        case 'error':
            title = 'Erreur';
            text = 'Echec de l\'enregistrement. <br> Veuillez raffraîchir la page et recommencer.';
            generateModal(title, text, 1,0,0,0,0,0,0);
            $('#maModale').modal('show');
            break;

        default:
            title = 'Echec';
            text = 'Une erreur s\'est produite lors de l\'enregistrerment dans la base de données. <br> Contactez l\'administrateur du site.';
            generateModal(title,text,1,0,0,0,0,0,0);
            $('#maModale').modal('show');
    }
}

var tokenInput = '';
function generateModal(titre, texte, btnClose, btnClose2, btnRegister, btnEnvoyer, btnAccueil, btnActiveAccount, input)
{
    let sHtml = '<div class="modal-dialog modal-dialog-centered" role="document">';
    sHtml +=    '<div class="modal-content"><div class="modal-header"><h3 class="modal-title text-center" id="titre_modal3">' + titre +'</h3>';
    sHtml +=    '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>'
    sHtml +=    '</div>';
    sHtml +=    '<div class="modal-body" id="contenu_modal"><p>'+ texte +'</p></div>'
    if (input)
    {
        sHtml += '<div class="pb-2 text-center"><input type="text" class="inputMain id="token" value="' + tokenInput + '" /></div>';
    }   
    sHtml +=    '<div class="modal-footer">';
    if (btnRegister)
    {
        sHtml += '<button class="mb-0 btn btn-vert btn-md" onclick="window.location.href=\'register\'">Inscription</button>'; // Btn Inscription
    }
    if (btnEnvoyer)
    {
        sHtml += '<button class="mb-0 btn btn-bleu btn-md">Envoyer (HS)</button>'; // Btn Accueil
    }
    if (btnAccueil)
    {
        sHtml += '<button class="mb-0 btn btn-bleu btn-md">Accueil</button>'; // Btn Accueil
    }
    if (btnActiveAccount)
    {
        sHtml += '<button class="mb-0 btn btn-vert btn-md" onclick="login_activeAccount()">Activer le compte</button>'; // Btn Activer compte
    }
    if (btnClose)
    {
        sHtml += '<button class="mb-0 btn btn-valid btn-md" onclick="fermerModal()">Fermer</button>'; // Btn Fermer la fenetre
    }
    if (btnClose2)
    {
        sHtml += '<button class="mb-0 btn btn-valid btn-md" onclick="document.location.reload(false)">Fermer</button>'; // Btn Fermer la fenetre
    }
    sHtml +=    '</div></div></div>';

    $('#maModale').html(sHtml);

}

function fermerModal()
{
    $('#maModale').modal('hide');
}


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