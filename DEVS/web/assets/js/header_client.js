/**
 * @var {json[]} notifs Contains notifications from the logged in user ('message' str ; 'alreadyRead' bool ; 'purchaseId' str ; 'fieldType' str ; 'unreadCount' int)
 */
var notifs = {};

// ******************************************** /
//                COMPTEUR PANIER
// ******************************************** /

$(document).ready(function() {
    header_client_CommandeEnCours();
    treatNotifs();

    // on 'Accueil Admin' clic
    $('#mode_admin').click(function() {
        // disallow the 'customer' mode
        $.ajax({
            type: 'POST',
            url: 'route.php',
            async: false,
            data: {
                page: 'adm_home',
                action: 'disable_customer_mode',
                bJSON: 1,
                bLoadHtml: false,
            },
            dataType: 'json',
            cache: false
        })
        .done(function(data) {
            if (!data.error) {
                window.location.href = 'adm_home';
            }
        })
    })
});

// Variable compteur
var Header_client_iCompteur = 0;

// function permettant d'afficher le nombre de panier de la commande "en cours"
function header_client_CommandeEnCours() {

    // si des paniers ont déjà été choisis
    if (localStorage["articles"]) {
        // récupération des donnée dans le localStorage
        var retrievedOffer = localStorage.getItem("articles");
        var storedOffer = JSON.parse(retrievedOffer);

        // compte le nombre de panier présent sur la page "Mon panier"
        for (var i = 0; i < storedOffer.length; i++) {
            Header_client_iCompteur++;
        }
        // affichage du compteur dans le header
        $('#count_basket').html(Header_client_iCompteur);

        if ($('#count_basket').html() == "0") {
            $('#count_basket').hide();
        }
        localStorage.setItem("articles", JSON.stringify(storedOffer));
    }
    // si aucun panier n'a été choisi
    else {
        // on cache la div contenant le compteur
        $('#count_basket').hide();
    }
}

/**
 * Treat notifications
 * 
 * @todo TRAVAIL EN COURS SUR CETTE PARTIE
 */
function treatNotifs() {
    const ERROR_TITLE = "Échec";
    showLoadingModal();
    let oDonnees = {
        page: 'notif',
        bJSON: 1,
        bLoadHtml: false,
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
        console.log('treatNotifs, reçu :', [arguments]);
    })
    .done(function(data) {
        console.log('bien reçu', data);
        if ( ((typeof(data) !== 'object') || (!isEmpty(data.message))) ) {
            toastr.error('Erreur lors de la récupération des notifications', ERROR_TITLE)
        } else {
            notifs.data = data;
            updateNotifs();
            $('#info_notif').on('shown.bs.modal', function() {
                showNotif.call(this, 1);
            })
            $('.arrow').click(function() {
                if ($(this).hasAttr('disabled')) {
                    return;
                }
                let iNewIndex = $(this).hasClass('left') ? (notifs.index - 1) : (notifs.index + 1);
                showNotif.call($('#info_notif'), iNewIndex);
            })
        }
        // let sChamp, sMessage;
        // if (data.is_valid) {
        //     toastr.success('Enregistrement réussi !', 'Succès')
        //     oUserChanges = {};
        //     saveInitValues();
        //     changeButton();
        // } else {
        //     let sMessage = (
        //         (data.error != undefined) &&
        //         (typeof(data.error) === 'string') &&
        //         (!isEmpty(data.error))
        //     ) ? data.error : 'Merci de vérifier les champs erronnés';
        //     toastr.error(sMessage, ERROR_TITLE)
        // }
    })
    .fail(function(error) {
        // showError(error)
        toastr.error('Une erreur a été rencontrée', ERROR_TITLE)
    });

    log('notifs', notifs);

    /**
     * Displays the number of messages and messages content
     *  
     */
    function updateNotifs() {
        let length, keys, values, iUnreadNotifsCount;
        let jqCounter = $('.count-container.notifs');
        iUnreadNotifsCount = 0;
        keys = Object.keys(notifs.data);
        length = keys.length;
        updateCounter();
        /**
         * Update the read status (background-color will be modified)
         * 
         */
        function updateCounter() {
            let sAriaLabel;
            // content : notifs number
            jqCounter.html(length);
            // background-color : read / unread
            jqCounter.removeClass(['read', 'unread']);
            // counts the number of notifications that have never been read
            values = Object.values(notifs.data);
            for (let i = 0; i < length; i++) {
                if (values[i].alreadyRead == 0) {
                    iUnreadNotifsCount++;
                }
            }
            notifs.unreadCount = iUnreadNotifsCount;
            // change the background-color
            jqCounter.addClass(
                (iUnreadNotifsCount > 0) ? 'unread' : 'read'
            );
            if (length === 0) {
                // aria-label
                sAriaLabel = 'Vous n\'avez aucune notification';
                jqCounter.addClass('empty');
                $('.show_notifs').attr('data-target', '');
                $('.show_notifs').attr('disabled', true);
            } else {
                jqCounter.removeClass('empty');
                $('.show_notifs').attr('data-target', '#info_notif');
                $('.show_notifs').removeAttr('disabled');
                // aria-label
                sAriaLabel = 'Vous avez ' + length + ' notification';
                if (length > 1) {
                    sAriaLabel += 's';
                }
                sAriaLabel += (' dont ' + iUnreadNotifsCount + ((iUnreadNotifsCount > 1) ? ' non lues' : ' non lue'));
            }
            jqCounter.attr('aria-label', sAriaLabel);
        }
    }

    /**
     * Show a notif into the modal
     * 
     * @param {int} notif_index 
     */
    function showNotif(notif_index = 1) {
        notifs.index = notif_index;
        /**
         * @var {int} count The number of notifications
         */
        let count = notifs.data.length;
        /**
         * @var {JSON} notif The visible notification
         */
        let notif = notifs.data[notifs.index - 1];

        // insert the notification message
        $('#notif_message').html(notif.message);
        $(this).find('#notif_index').html('<b>' + notifs.index + '</b> / ' + count);
        if (notifs.index == 1) {
            // fist notif : disallow left
            $('.left.arrow').attr('disabled', true);
        } else {
            // middle/last notif : allow left
            $('.left.arrow').removeAttr('disabled');
        }
        if (notifs.index == count) {
            // last notif : disallow right
            $('.right.arrow').attr('disabled', true);
        } else {
            // middle/first notif : allow right
            $('.right.arrow').removeAttr('disabled');
        }
        if (notif.alreadyRead == 1) {
            // already read : hide the icon
            $('#new_notif').disappear(1000);
        } else {
            // not already read : show the icon
            $('#new_notif').appear(400);
            setTimeout(
                function() {
                    $('#new_notif').disappear(1000);
                    notifs.unreadCount--;
                    if (notifs.unreadCount === 0) {
                        $('.notifs.count-container').removeClass('unread').addClass('read');
                    }
                    // met à jour le statut vers 'lu'
                    $.ajax({
                        type: 'POST',
                        url: 'route.php',
                        async: false,
                        data: {
                            page: 'notif',
                            action: 'update_read_status',
                            purchaseId: notif.purchaseId,
                            fieldType: notif.fieldType,
                            bJSON: 1,
                            bLoadHtml: false,
                        },
                        dataType: 'json',
                        cache: false
                    })
                    .always(function(data) {
                        log('reçu après maj statut', data);
                    })
                    .fail(function() {
                        log('erreur de mise à jour du statut');
                    })

                },
                1500
            )
        }
    }

    
}