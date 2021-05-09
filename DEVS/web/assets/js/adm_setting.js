
/**
 * @var {JSON} oUserChanges The new user changes
 */
let oUserChanges = {};


/**
 * When the page is loaded
 */
$(function()
{

    saveInitValues();
    changeButton();

    // if a val is changed
    $('.choice').change(function() {
        let val = $(this).value();
        let sId = $(this).attr('id')
        if ( val != $(this).attr('init') ) {
            oUserChanges[sId] = val;
        } else {
            delete oUserChanges[sId];
        }
        changeButton();
        log(oUserChanges)
    })

    $('.icon').click(function() {
        treatNotifs()
    })
})

/**
 * Saves all init values
 */
function saveInitValues() {
    $('.choice').each(function() {
        let val = $(this).value();
        $(this).attr('init', val);
    })
}

/**
 * Enable / disable the button according to oUserChanges
 * 
 */
function changeButton() {
    if (!isEmpty(oUserChanges)) {
        $('#save_button').removeAttr('disabled');
    } else {
        $('#save_button').attr('disabled', true);
    }
}

/**************************** ENREGISTREMENT DES MODIFICATIONS ****************************/
function saveModif() {
    if (isEmpty(oUserChanges)) {
        return;
    }
    const ERROR_TITLE = "Échec de l'enregistrement";
    // Si des changements ont été effectués
    showLoadingModal();
    insertErrors();
    let oDonnees = {
        page: 'adm_setting__save_params',
        json: JSON.stringify(oUserChanges),
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
            oUserChanges = {};
            saveInitValues();
            changeButton();
        } else {
            let sMessage = (
                (data.error != undefined) &&
                (typeof(data.error) === 'string') &&
                (!isEmpty(data.error))
            ) ? data.error : 'Merci de vérifier les champs erronnés';
            toastr.error(sMessage, ERROR_TITLE)
        }
    })
    .fail(function(error) {
        showError(error)
        toastr.error('Une erreur a été rencontrée', ERROR_TITLE)
    });

    /**
     * Insert errors to test input control
     */
    function insertErrors() {
        // oUserChanges.crcdValidation = 'toto'
        // oUserChanges.crcdValidation = 'false'
        // oUserChanges.validationTime = 36
        // oUserChanges.paymentTime = 48
        // oUserChanges.recoveryTime = 96
        // oUserChanges.toto = 'yeah'
    }
}
