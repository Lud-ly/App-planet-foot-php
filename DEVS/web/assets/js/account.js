/**
 * 
 * Page "Mon Compte"
 * 
 */

/**
 * @var {JSON.Mixed} oChangementsUtilisateur JSON qui contient les nouveaux changements effectués par l'utilisateur
 * (qui seront envoyés au contrôleur pour maj de la BDD). Peut contenir les clés :
 *   - 'tel'
 *   - 'email'
 *   - 'password'
 */
var oChangementsUtilisateur = {};

/**
 * @var {JSON.String} oPatterns JSON qui contient les patterns utilisés pour le contrôle de saisie
 * (envoyés par le contrôleur)
 */
var oPatterns = {};

/**
 * @var {JSON.jQuery} oJq JSON qui contient les éléments du DOM suivants (chacun dans un objet jQuery) :
 *  - tel:              Champ 'numéro de téléphone'
 *  - email:            Champ 'adresse e-mail'
 *  - mdpNouveau:       Champ 'nouveau mot de passe'
 *  - mdpResultatTest:  Résultat du contrôle du nouveau mot de passe
 *  - ...               Autres : cf definirObjetsJquery()
 */
var oJq = {};

/**
 * @var {object} oTelInputMask Instance de la classe TelInputMask (améliore le comportement de l'input 'tel')
 */
let oTelInputMask;


/**
 * Au chargement de la page
 */
$(document).ready(function() 
{
    showLoadingModal();
    
    // Définit les objets jQuery (champs tel, email..)
    definirObjetsJquery();

    // Récupère les patterns depuis PHP
    obtenirPatterns();

    // Vérifie le champ 'email' pour appliquer le style valide/invalide
    account_verifierSaisieEmail(false);

    // Vérifie le champ 'tel' (et applique le masque..)
    oTelInputMask = TelInputMask.add('#tel_user');

    // Lance les écouteurs d'événements
    ecouter();

    // Insère des données erronnées pour tester le contrôle de saisie back
    // insererDonneesErronees();

    hideLoadingModal();

    /**
     * Insère des données erronnées pour tester le contrôle de saisie back
     * Cliquer sur le bouton "Enregistrer les modifs" pour vérifier le bon fonctionnement
     */
    function insererDonneesErronees() {
        account_majChangementsUtilisateur('tel', '0411223344xxxxx');
        account_majChangementsUtilisateur('email', 'toto@ff@fr');
        account_majChangementsUtilisateur('password', '  ');
    }

    /**
     * Récupère les patterns qui concernent la partie 'Account' depuis PHP
     */
    function obtenirPatterns()
    {
        $.ajax({
            type: 'POST',
            url: 'route.php',
            async: false,
            data: {
                page: 'account_ajax',
                action: 'get_patterns',
                bJSON: 1
            },
            dataType: 'json',
            cache: false
        })
        .done(function(data) {
            oPatterns = data;
            log('oPatterns', oPatterns)
            // $('#modal_save').show();
        })
        .fail(function(error) {
        })
    }

    /**
     * Définit les objets jQuery (champs éditables par l'utilisateur etc..) stockés dans 'oJq'
     */
    function definirObjetsJquery()
    {
        oJq.email = $('#email_user');
        oJq.emailDescr = $('#email_user ~ span.descr');
        oJq.tel = $('#tel_user');
        oJq.telDescr = $('#tel_user ~ span.descr');
        oJq.mdpNouveau = $('#newPassword');
        oJq.mdpDescr = $("#newPassword ~ span.descr");
        oJq.mdpConfirm = $("#confirmPassword");
        oJq.mdpResultatTest = $('#resultTestPsw');
        oJq.mdpNouveauStatut = $('#statutNewPwd');
        oJq.mdpBtnVoirEnClair = $(".toggle-password");
        oJq.btnEnregistrer = $('#bouton_enregistrer');
    };

    /**
     * Lance les écouteurs d'événements
     */
    function ecouter() {
        // quand le champ 'email' est modifié
        oJq.email.keyup(function()
        {
            account_verifierSaisieEmail();
        })

        // quand le champ 'tel' est modifié et comporte un numéro VALIDE
        oJq.tel.on('valid', function() {
            // met à jour les nouveaux changements et active le bouton 'enregistrer'
            account_majChangementsUtilisateur('tel', oTelInputMask.val());
            account_masquerDescrChampInvalide('tel');
        })
        // quand le champ 'tel' est modifié et comporte un numéro INVALIDE
        oJq.tel.on('invalid', function() {
            // supprime 'tel' des nouveaux changements
            account_majChangementsUtilisateur('tel');
            account_montrerDescrChampInvalide('tel');
        })

        // quand le champ 'pass' est modifié
        oJq.mdpNouveau.keyup(function() 
        {
            oJq.mdpResultatTest.html(account_verifierForceMdp(oJq.mdpNouveau.val()))
            account_verifierSaisieMdp();
        })

        // quand le bouton 'enregistrer les modifs' est cliqué
        oJq.btnEnregistrer.click(function()
        {
            enregistrerChangementsUtilisateurs();
        })

        // quand le bouton 'voir le mot de passe en clair' est cliqué
        oJq.mdpBtnVoirEnClair.click(function()
        {
            let input = $($(this).attr("toggle"));
            if (input.attr("type") == "password")
            {
                input.attr("type", "text");
            } 
            else
            {
                input.attr("type", "password");
            }
        });

        //onclick="deleteAccount(); disconnect();" 
        $('#boutonConfirmerSuppression').click(function()
        {
            account_supprimerCompte();
        })
    }
}); 



/**
 * Enregistre les changements effectués par l'utilisateur
 */
function enregistrerChangementsUtilisateurs() {
    const ERROR_TITLE = "Échec de l'enregistrement";
    // Si des changements ont été effectués
    showLoadingModal();
    if (!isEmpty(oChangementsUtilisateur)) {
        let oDonnees = {
            page: 'account_ajax',
            action: 'update',
            json: JSON.stringify(oChangementsUtilisateur),
            bJSON: 1
        }
        console.log('envoyé', oDonnees);
        $.ajax({
            type: 'POST',
            url: 'route.php',
            async: false,
            data: oDonnees,
            dataType: 'json',
            cache: false
        })
        .always(function() {
            hideLoadingModal();
            console.log('reçu', [arguments]);
        })
        .done(function(data) {
            let sChamp, sMessage;
            if (data.is_valid) {
                toastr.success('Enregistrement réussi !', 'Succès')
            } else {
                if (typeof(data.invalid_fields) === 'object') {
                    for (let i = 0; i < Object.keys(data.invalid_fields).length; i++) {
                        sChamp = Object.keys(data.invalid_fields)[i];
                        // affiche la description por chaque champ invalide
                        sMessage = data.invalid_fields[sChamp].message;
                        account_montrerDescrChampInvalide(sChamp, sMessage);
                    }
                }
                toastr.error('Merci de vérifier les champs erronnés', ERROR_TITLE)
            }
        })
        .fail(function(error) {
            showError(error)
            toastr.error('Une erreur a été rencontrée', ERROR_TITLE)
        });

    }
}

/**
 * Définit un champ comme invalide (affiche la description de l'erreur rencontrée)
 * @param {String} sNomChamp Nom du champ.
 * @param {String} sMessage? Message à afficher. Si null, laisse le message défini dans le code html.
 */
function account_montrerDescrChampInvalide(sNomChamp = 'tel', sMessage = null) {
    let jqChamp;
    switch (sNomChamp) {
        case 'tel':
            jqChamp = oJq.telDescr; break;
        case 'email':
            jqChamp = oJq.emailDescr; break;
        case 'password':
            jqChamp = oJq.mdpDescr;
            jqChamp.addClass('invalid'); break;
        default:
            return;
    }
    if (sMessage != null) {
        jqChamp.html(sMessage);
    }
    jqChamp.removeClass('hide');
}

/**
 * Définit un champ comme invalide (affiche la description de l'erreur rencontrée)
 * @param {String} sNomChamp 
 */
function account_masquerDescrChampInvalide(sNomChamp = 'tel') {
    switch (sNomChamp) {
        case 'tel':
            oJq.telDescr.addClass('hide'); break;
        case 'email':
            oJq.emailDescr.addClass('hide'); break;
        case 'password':
            oJq.mdpDescr.addClass('hide');
    }
}

/**
 * Permet de définir le niveau de sécurité du mot de passe (adapte les classes pour le css)
 * 
 * @param {String} sNiveauDeSecurite Niveau de sécurité ('low' |'weak' | 'high' | 'good' | 'strong')
 */
function account_definirNiveauSecuriteMdp(sNiveauDeSecurite = 'low') {
    oJq.mdpResultatTest.removeClass('weak')
    oJq.mdpResultatTest.removeClass('strong_security');
    oJq.mdpResultatTest.removeClass('good_security');
    oJq.mdpResultatTest.removeClass('weak_security');
    oJq.mdpResultatTest.removeClass('low_security');
    switch (sNiveauDeSecurite) {
        case 'low':
            oJq.mdpResultatTest.addClass('low_security'); break;
        case 'weak':
            oJq.mdpResultatTest.addClass('weak_security'); break;
        case 'good':
            oJq.mdpResultatTest.addClass('good_security'); break;
        case 'strong':
            oJq.mdpResultatTest.addClass('strong_security');
    }
    oJq.mdpResultatTest.removeClass('hide');
}

/**
 * Permet de définir le statut du mot de passe (adapte les classes pour le css)
 * 
 * @param {String} sStatut Statut ('differents' |'identiques')
 */
function account_definirStatutMdp(sStatut = 'differents') {
    oJq.mdpNouveauStatut.removeClass('identiques');
    oJq.mdpNouveauStatut.removeClass('differents');
    switch (sStatut) {
        case 'identiques':
            oJq.mdpNouveauStatut.addClass('identiques'); break;
        case 'differents':
            oJq.mdpNouveauStatut.addClass('differents');
    }
}

/**
 * Met à jour les changements effectués par l'utilisateur dans le json et active le bouton 'enregistrer'
 * 
 * @param {String} champ Le champ (ex: 'password')
 * @param {*} valeur La valeur à mettre à jour
 */
function account_majChangementsUtilisateur(champ, valeur = null)
{
    // si aucune valeur fournie :
    if (valeur == null) {
        // supprime le changement, et màj le bouton
        supprimeChangementUtilisateur(champ)
        majBoutonEnregistrer();
        return;
    }
    // sinon, stocke la nouvelle valeur en mémoire, et màj le bouton
    oChangementsUtilisateur[champ] = valeur;
    majBoutonEnregistrer();

    /**
     * Supprime le changement de l'ensemble des nouveaux changements effectués par l'utilisateur
     * 
     * @param {String} champ
     */
    function supprimeChangementUtilisateur(champ) {
        if (oChangementsUtilisateur[champ] !== undefined) {
            delete oChangementsUtilisateur[champ];
        }
    }
    
    /**
     * Active ou désactive le bouton "Enregistrer"
     */
    function majBoutonEnregistrer() {
        if (Object.keys(oChangementsUtilisateur).length > 0) {
            // passe le bouton "enregistrer" en enabled
            $('#bouton_enregistrer').removeAttr('disabled');
        } else {
            // passe le bouton "enregistrer" en disabled
            $('#bouton_enregistrer').attr('disabled', true); 
        }
        // log
        log('oChangementsUtilisateur', oChangementsUtilisateur);
    }
}

/**
 * Message de confirmation suppression du compte
 */
function account_supprimerCompte() 
{
    const DEL_ERROR__TITLE = "Échec";
    const DEL_ERROR__MESSAGE = 'Erreur lors de la suppression du compte. Merci de contacter le service technique.';
    let oDonnees = {
        page: 'account_ajax',
        action: 'delete',
        bJSON: 1
    }
    console.log('envoyé', oDonnees);
    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: false,
        data: oDonnees,
        dataType: 'json',
        cache: false
    })
    .always(function() {
        $('#modal_save').hide();
        console.log('reçu', [arguments]);
    })
    .done(function(data) {
        if (isEmpty(data.error)) {
            toastr.success('Votre compte a bien été supprimé', 'Supprimé');
        } else {
            toastr.error(DEL_ERROR__MESSAGE, DEL_ERROR__TITLE);
        }
        logOut();
    })
    .fail(function(error) {
        showError(error)
        toastr.error(DEL_ERROR__MESSAGE, DEL_ERROR__TITLE);
    });
    /**
     * Logout the user
     */
    function logOut() {
        setTimeout(
            function() {
                window.location = "logout";
            }, 3000
        );
    }
}

/**
 * Vérifie le nombre de caractères du mot de passe
 * @param {String} nouveauPass 
 */
function account_verifierForceMdp(nouveauPass) 
{   
    let force = 0
    if (nouveauPass.length < 8)
    {
        account_definirNiveauSecuriteMdp('low');
        return 'Mot de passe trop court (doit contenir au minimum 8 caractères, des chiffres, des lettres et caractères spéciaux)'
    }
    //Si la longueur du mot de passe atteind 8 caractères : force + 1.
    if (nouveauPass.length > 9) force += 1
    //Si le mot de passe contient minuscules et manuscules : force + 1.
    if (nouveauPass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) force += 1
    //Si le mot de passe contient un caractère numérique : force + 1.
    if (nouveauPass.match(/([a-zA-Z])/) && nouveauPass.match(/([0-9])/)) force += 1
    //Si le mot de passe contient 1 caractère spécial : force + 1.
    if (nouveauPass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) force += 1
    //Si le mot de passe contient 2 caractères spéciaux : force + 1.
    if (nouveauPass.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) force += 1

    //Après calcul de la variable force
    //Si la valeur de force < 2 => mot de passe faible
    if (force < 3)
    {
        account_definirNiveauSecuriteMdp('weak');
        return 'Mot de passe moyen'
    } 
    //Si la valeur de force = 3, mot de passe correct
    else if (force == 3)
    {
        account_definirNiveauSecuriteMdp('good');
        return 'Mot de passe fiable'
    } 
    //Si la valeur de force > 3, mot de passe excellent
    else 
    {
        account_definirNiveauSecuriteMdp('strong');
        return 'Mot de passe sécurisé'
    }
}

/**
 * Vérifie les mots de passe
 */
function account_verifierSaisieMdp() 
{
    let bNouveauPass2 = false;
    let bValideForm = false;
    if (oJq.mdpNouveau.val() !== '' && oJq.mdpConfirm.val() !== '')
    {
        oJq.mdpNouveauStatut.removeClass('hide');
        if ((oJq.mdpNouveau.val() !== oJq.mdpConfirm.val()))
        {
            account_definirStatutMdp('differents');
            oJq.mdpNouveauStatut.html('Les mots de passe ne sont pas identiques');
            bNouveauPass2 = false;
            // supprime 'password' des nouveaux changements
            account_majChangementsUtilisateur('password');
        } 
        else if (oJq.mdpNouveau.val() === oJq.mdpConfirm.val())
        {
            account_definirStatutMdp('identiques');
            oJq.mdpNouveauStatut.html('Mots de passe identiques');
            bNouveauPass2 = true;
            // met à jour les nouveaux changements et active le bouton 'enregistrer'
            account_majChangementsUtilisateur('password', oJq.mdpNouveau.val());
        }
    }
    console.log('valid psw : ' + bNouveauPass2);
}


/**
 * Vérifie si l'e-mail saisi est valide ou non (et applique le style correspondant)
 * 
 * @param {Bool} bMajChangement Mettre à jour le changement ?
 */
function account_verifierSaisieEmail(bMajChangement = true)
{
    let sSaisie = oJq.email.val();
    let sEmail = sSaisie.trim();
    // si email VALIDE
    if (RegExp(oPatterns.email).exec(sEmail)) {
        // applique un pattern identique au numéro de tel pour que visuellement ça paraisse comme VALIDE
        setValidPattern(oJq.email);
        account_masquerDescrChampInvalide('email');
        if (bMajChangement) {
            // met à jour les nouveaux changements et active le bouton 'enregistrer'
            account_majChangementsUtilisateur('email', sEmail);
        }
    } else {
        // applique un pattern différent pour que ça parraisse comme INVALIDE
        setInvalidPattern(oJq.email);
        // supprime 'email' des nouveaux changements
        account_majChangementsUtilisateur('email');
        account_montrerDescrChampInvalide('email');
    }
}
