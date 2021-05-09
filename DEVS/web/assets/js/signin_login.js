/*  ------------------------------------------
*    Scripts des pages "Login" et "inscription"
*    ------------------------------------------
*/

//Vérif de la force du mot de passse
$(document).ready(function() 
{
    $('#password').keyup(function() 
    {
        $('#result').html(signin_checkStrength($('#password').val()))
    })
    // vérifie le nbre de caractères du pwd 
    function signin_checkStrength(password) {
        var strength = 0
        if (password.length < 8)
        {
            $('#result').removeClass()
            $('#result').addClass('short')
            return 'Mot de passe trop court'
        }
        // Si la longueur du pwd atteind 8 caractères : strength + 1
        if (password.length > 9) strength += 1
        // Si le mot de passe contient minuscules et manuscules : strength + 1.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
        // Si le mot de passe contient un numérique
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
        // Si le mot de passe contient 1 caractère spécial
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // Si le mot de passe contient 2 caractères spéciaux
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // Après calcul de la variable strength
        // Si la valeur de strength < 2 => mot de passe faible
        if (strength < 3)
        {
            $('#result').removeClass()
            $('#result').addClass('weak')
            return 'Mot de passe moyen'
            // Si la valeur de strength = 3, mot de passe correct
        } else if (strength == 3)
        {
            $('#result').removeClass()
            $('#result').addClass('good')
            return 'Mot de passe fiable'
        } else {
            // Si la valeur de strength > 3, mot de passe excellent
            $('#result').removeClass()
            $('#result').addClass('strong')
            return 'Mot de passe sécurisé'
        }
    }
    $(".toggle-password").click(function()
    {

  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password")
  {
    input.attr("type", "text");
  } else
  {
    input.attr("type", "password");
  }
    });
}); 

/* Fonction afficher les mots de passe */
function signin_affichePwd()
{
    var x = $('#password');
    var y = $('#confirmePassword');
    //Si type input = 'password' alors on change en 'texte'
    x[0].type == 'password' || y[0].type == 'password' ? ( 
        x[0].type = 'text',  y[0].type = 'text', $('#labelShowPwd').html('Décochez pour cacher') 
        ) : ( 
        x[0].type = 'password',  y[0].type = 'password', $('#labelShowPwd').html('Montrer les mots de passe')
        );
}
    
// Afficher le mot de passe de la page "login"
function signin_afficheLoginPwd() 
{
    //var x = document.getElementById("password");
    var x = $('#password');
    //Si type input = 'password' alors on change en 'texte'
    x[0].type == 'password' ? ( 
        x[0].type = 'text',  $('#labelShowPwd').html('Décochez pour cacher') 
        ) : ( 
        x[0].type = 'password',  $('#labelShowPwd').html('Montrer le mots de passe')
        );
}

var bNewPassword2 = false;
var bValideForm = false;

/* Vérification des champs vides */
function signin_verifierFormulaire() {
    if ($('#checkLecture').is(':checked'))
    {
        var bCheck = true;
    } else
    {
        $('#labelCheck').css("background", "red");
        var bCheck = false;
    }
    if ($('#nom').val() == '')
    {
        $('#labelNom').css("color", "red");
        var bNom = false;
    } else {
        $('#labelNom').css("color", "black");
        var bNom = true;
    }
    if ($('#prenom').val() == '')
    {
        $('#labelPrenom').css("color", "red");
        var bPrenom = false;
    } else {
        $('#labelPrenom').css("color", "black");
        var bPrenom = true;
    }
    if ($('#telephone').val() == '')
    {
        $('#labelTelephone').css("color", "red");
        var bTel = false;
    } else {
        $('#labelTelephone').css("color", "black");
        var bTel = true;
    }
    if ($('#email').val().indexOf("@", 0) < 0)
    {
        $('#labelEmail').html("Votre adresse mail : format non valide");
        $('#labelEmail').css("color", "red");
        var bEmail = false;
    } else
    {
        $('#labelEmail').html("Votre adresse mail");
        $('#labelEmail').css("color", "black");
        var bEmail = true;
    }
    bValideForm = bCheck & bNom & bPrenom & bNom & bTel & bEmail;
    //console.log('valide 1 : ' + bValideForm + ' ==> ' + bCheck + ' ' + bNom + ' ' +  bPrenom + ' ' + bNom + ' ' + bTel + ' ' + bEmail);
}

// Vérif champs mot de passe vide
function signin_verifierPwdVide()
{
    if ($("#password").val() == '')
    {
        $("#labelPwd").css('color', 'red');
        $("#labelConfirmePwd").css('color', 'red');
        $("#confirmePassword").val('');
        var bPassword = false;
    } else
    {
        $("#labelPwd").css('color', 'black');
        var bPassword = true;
    }
    if ($("#confirmePassword").val() == '')
    {
        $("#labelConfirmePwd").css('color', 'red');
        $("#labelPwd").css('color', 'red');
        $("#password").val('');
        var bConfirmePwd = false;
    } else {
        $("#labelConfirmePwd").css('color', 'black');
        var bConfirmePwd = true;
    }
    bValideForm &= bPassword & bConfirmePwd;
    //console.log('valide 2 : ' + bValideForm + ' ==> ' + bPassword + ' ' + bConfirmePwd);
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
        } else if ($("#password").val() === $("#confirmePassword").val())
        {
            $('#statutPwd').removeClass('hide');
            $('#statutPwd').css('color', 'green');
            $('#statutPwd').html('Mots de passe identiques');
            bNewPassword2 = true;
        }
    }
    console.log('valid psw : ' + bNewPassword2);
}

/* Checks nouveau mot de passe */
function signin_validerNewPassword()
{
    bValideForm &= bNewPassword2;
    
    signin_verifierSaisiePwd();
    signin_verifierPwdVide();
    if (!bValideForm)
    {
        signin_montrerModal(2);
    } else {
        signin_montrerModal(1);
    }
}

/****************************/
/* Validation du formulaire */
/****************************/
function signin_envoiFormulaire()
{
    signin_verifierFormulaire();
    signin_verifierPwdVide();
   // Si formulaire pas valide alors on affiche modal2
    bValideForm &= bNewPassword2;
    //console.log('validation finale : Vform => ' + bValideForm + ' NewPWd => ' + bNewPassword2);
    if (!bValideForm)
    {
        signin_montrerModal(2);
      //sinon on envoi les data vers php et on affiche modale1
    } else {
        //push datas to PHP
        
        signin_montrerModal(1);
        
        const obj = {
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

/******************************/
/*   Forget Password          */
/******************************/
function valideMail(){
    var adresse = $('#email2').val();
    var iAt = adresse.indexOf("@");
    if (iAt == -1)
    {
        alert('Adresse email non valide, veuillez recommencer.');
    } else
    {
        signin_cacherModal(2);
        signin_montrerModal(3);
    }
}

/*****************************/
/*   Fenetres modales        */
/*****************************/

/* On affiche le modal ou on le cache */
function signin_cacherModal(numModal)
{
    $('#modal' + numModal).modal('hide');
}
function signin_montrerModal(numModal)
{
    $('#modal' + numModal).modal('show');  
}

function connection() {
    const arrayUsers =  JSON.parse(localStorage.getItem("users"));

    const mail = $("#email").val();
    const password = $("#password").val();

    console.log("console",mail,password);
    if(mail == "" && password == "") {
        signin_montrerModal(1);
        return;
    }
  
    const indexUser = arrayUsers.findIndex(user => (user.mail === mail) && (user.password === password) );
    console.log(indexUser);
    if(indexUser !== -1) {
        localStorage.setItem("userConnected", indexUser);
        console.log("Connecté");
        ajaxConnection();
        
    }else {
        signin_montrerModal(1);
    }
}

$(document).on("keyup",function(event) {
    
    if(event.code == "Enter") {
        connection();
    }
});

function ajaxConnection() {
    const datas = {
        page: "login_ajax",
        mode: "connect",
        bJSON: 1
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        dataType: "json",
        async: true,
        data: datas,
        catch: false,
    })
    .done(function(result) {
        console.log(result);
        if(localStorage.getItem("orderWaiting") === "active") {
            localStorage.setItem("orderWaiting","validate");
            window.location.href = "cart";
        }
        else window.location.href = "account";
    })
    .fail(function(error) {
        console.log(error);
    });
}