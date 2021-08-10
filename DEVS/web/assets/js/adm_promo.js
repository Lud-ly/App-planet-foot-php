
/** Adm_promo : description
 * 
 * This script permite to :
 *  • add a new promotion
 *  • edit an existing promotion
 *  • activate/deactivate an existing promotion
 */

/**
 * @var {JSON} jPromosDatatableConfig Promos datatable config
 */
const jPromosDatatableConfig = {
	"responsive": true,
	"stateSave": true,
	"order": [[2, "asc"]],
	"pagingType": "simple_numbers",
	"searching": true,
	"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tous"]], 
	"language": {
		"info": "Résultats _START_ à _END_ sur _TOTAL_",
		"emptyTable": "Aucune promotion",
		"lengthMenu": "_MENU_ Promotions par page",
		"search": "Rechercher : ",
		"zeroRecords": "Aucun résultat de recherche",
		"paginate": {
			"previous": "Précédent",
			"next": "Suivant"
		},
		"sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
		"sInfoEmpty":      "Promotions 0 à 0 sur 0 sélectionnée",
	},
	"columns": [
		{
			"orderable": true /* code */
            ,'width': '30%'
        },
        {
			"orderable": true /* avantage */
        },
        {
			"orderable": true /* début */
		},
		{
			"orderable": true  /* fin */
		},
        {
			"orderable": true /* état */
        },
        // {
		// 	"orderable": true /* description */
        // },
        {
			"orderable": true /* quantité */
		},
		{
			"orderable": false /* statut */
		},
		{
			"orderable": false /* action */
		},
	],
	'retrieve': true
};

/**
 * @var {HTMLElement} $promosTable Promotions table
 */
var $promosTable;
/**
 * @var {array} aPromos All promos
 */
var aPromos = [];
/**
 * @var {object} icAddPromo InputControl object ('addPromo')
 */
var icAddPromo;
/**
  * @var {object} icEditPromo InputControl object ('editPromo')
  */
var icEditPromo;
/**
 * @var {string} sPromoId The promo id
 */
var sPromoId;


// On load
$(document).ready(function() {
    createEditModal()

    // gets promos + table construct
	loadPromos();

    // starts the data entry control on change
    icAddPromo = new InputControl('addPromo');
    icEditPromo = new InputControl('editPromo');

    // generates promo types select in the 2 modals
    let jRules = icEditPromo.getRules();
    if (jRules !== null) {
        const sPromoTypesOptionsHtml = getSelectOptionsHtml(jRules.promoType.inclusion, true, '%');
        icAddPromo.field('promoType').html(sPromoTypesOptionsHtml);
        icEditPromo.field('promoType').html(sPromoTypesOptionsHtml);
    }

    toggleButtonsEnabilityOnValidityChange()

    // ◘◘ DEV : logs on title dblclick
    $('.modal-title').dblclick(function() {
        icAddPromo.log();
        icEditPromo.log();
    })

    /**
     * Creates the edit modal by cloning the addPromoModal
     */
    function createEditModal()
    {
        let $editPromoModal = $('#addPromoModal').clone().attr('id', 'editPromoModal');
        $editPromoModal.find('.ic-form[name="addPromo"]').attr('name', 'editPromo');
        $editPromoModal.find('.modal-title').html('Éditer');
        $editPromoModal.find('[data-action="addPromo"]').attr('onClick', 'updatePromo()');
        $editPromoModal.find('[data-action="addPromo"]').attr('data-action', 'savePromo').html('Sauvegarder');
        $editPromoModal.appendTo('#modalWrapper');
    }
    /**
     * Enable/disable the 'Add promo' button (or 'save' button if edit modal)
     * on form validity change
     */
    function toggleButtonsEnabilityOnValidityChange()
    {
        // add promo modal
        const $addPromoButton = icAddPromo.form().find('button[data-action="addPromo"]');
        icAddPromo.form().on('valid', function() {
            $addPromoButton.removeAttr('disabled');
        });
        icAddPromo.form().on('invalid', function() {
            $addPromoButton.attr('disabled', true);
        });

        // edit promo modal
        const $editPromoButton = icEditPromo.form().find('button[data-action="savePromo"]');
        icEditPromo.form().on('valid', function() {
            $editPromoButton.removeAttr('disabled');
        });
        icEditPromo.form().on('invalid', function() {
            $editPromoButton.attr('disabled', true);
        });
    }
});

/**
 * Change promo status
 */
function changePromoStatus(iPromoIndex) {
    const ERROR_TITLE = "Échec de l'enregistrement";
    const ERROR_MESSAGE = "Une erreur a été rencontrée lors de la mise à jour du status.";
    let bNewStatus, id_promo;
    bNewStatus = !$('#checkbox_' + iPromoIndex).is(":checked");
    id_promo = $('#checkbox_' + iPromoIndex).closest('tr').attr('id_promo');
    $('#modal_save').show();
    // update the status
    let datas = {
        page: 'adm_promo_status',
        bJSON: 1,
        id_promo: aPromos[iPromoIndex]["id_promo"],
        promo_status: bNewStatus
    }
    console.log('envoyé', datas);
    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: false,
        data: datas,
        dataType: 'json',
        cache: false
    })
    .always(function() {
        $('#modal_save').hide();
    })
    .done(function(data) {
        // si erreur :
        if (!isEmpty(data.error)) {
            // si message d'erreur renvoyé par le contrôleur :
            if (typeof(data.error) === 'string') {
                // ..l'affiche
                toastr.error(data.error, ERROR_TITLE);
            } else {
                // ..affiche le message d'erreur défini dans ERROR_MESSAGE
                toastr.error(ERROR_MESSAGE, ERROR_TITLE);
            }
        } else {
            toastr.success('Statut mis à jour avec succès', 'Succès')
            // update the status in appearence
            aPromos[iPromoIndex]["promo_status"] = bNewStatus;
            $('#checkbox_' + iPromoIndex).filter(':checkbox').prop('checked', bNewStatus);
        }
    })
    .fail(function(error) {
        showError(error)
        displayErrorMessage(ERROR_MESSAGE, ERROR_TITLE);
    });
}

/**
 * Display an error message
 * 
 * @param {string} sMessage The error message
 * @param {string} sTitle The title
 */
function displayErrorMessage(sMessage = 'Un ou plusieurs champs ne sont pas valides', sTitle = 'Promo non ajoutée')
{
    toastr.error(sMessage, sTitle);
}

/**
 * Edit a promo (assign values in the edit promo modal)
 * 
 * @param {string|number} sPromoId The promo id
 */
function editPromotion(sPromoId) {
    let jPromo = jsonArray.findWhere(aPromos, 'id_promo', '==', sPromoId, 1);
    icEditPromo.setValues(jPromo, false, true);
}

/**
 * Returns the html of users who have entered coupon codes on purchases not yet made (to display on hover)
 * 
 * @param { JSON[] } aUsers
 */
function getEnteredPromoReferenceUsersOnPurchasesNotYetMadeHtml(aUsers) {
    let sHtml = 'Utilisateurs ayant saisi le code promo mais pas encore obtenu leur référence d\'achat :';
    aUsers.forEach(function(user) {
        sHtml += '\n • ' + user['userFirstName'] + ' ' + user['userName'] + ',  ' + user['centerName'];
    })
    return sHtml;
}

/**
 * Returns the promo state label
 * 
 * @param {string} promoState 
 * 
 * @returns {string}
 */
function getPromoStateLabel(promoState = 'inProgress') {
    switch (promoState) {
        case 'finished':
            return 'Terminée';
        case 'inProgress':
            return 'En cours';
        case 'toComeUp':
            return 'À venir';
    }
}

/**
 * Recovers promos and constructs the table 
 * 
 * @param {boolean} bRefresh If true, refresh the datatable after table construct
 */
function loadPromos(bRefresh = false) {
    let jData = {
        page: 'adm_promo_list',
        bJSON: 1
    }
    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: false,
        data: jData,
        dataType: 'json',
        cache: false
    })
    .done(function(result) {
		aPromos = result;
		constructTable();
        if (bRefresh) {
            $promosTable.clear();
			$promosTable.destroy();
        }
        $promosTable = $('#table_promo').DataTable(jPromosDatatableConfig);
    })
    .fail(function(err) {
        displayErrorMessage('Erreur dans la réception des promotions', 'Echec')
    })
    /**
     * Constructs the table to display all promotions
     */
    function constructTable()
    {
        var i;
        var sHTML= "";
        let sLabel,
            aPromo;
        
        // ◘ Table Head
        sHTML+= "<thead>";
            sHTML+= "<tr>";
                sHTML+= "<th title='Code à saisir pour bénéficier de la promo'>Code</th>";
                sHTML+= "<th title='Avantage offert au bénéficiaire'>Avantage</th>";
                // sHTML+= "<th>Type</th>";
                sHTML+= "<th title='Date et heure à partir de laquelle le code promo peut être saisi'>Début</th>";
                // sHTML+= "<th>Heure de début</th>";
                sHTML+= "<th title='Date et heure à partir de laquelle le code promo ne peut plus être saisi'>Fin</th>";
                // sHTML+= "<th>Heure de fin</th>";
                // sHTML+= "<th>Description</th>";
                sHTML+= "<th title='Promo passée, en cours, ou à venir ?'>État</th>";
                sHTML+= "<th title='Coupons de promo utilisés / total'>Quantité</th>";
                sHTML+= "<th title='Activer / Désactiver la promo' data-priority='1'>Statut</th>";
                sHTML+= "<th>Action</th>";
            sHTML+= "</tr>";
        sHTML+= "</thead>";

        // ◘ Table Body
        sHTML+= "<tbody>";
        log(aPromos)
        for ( i= 0; i < aPromos.length; i++)	
        {
            aPromo = aPromos[i];
            sHTML+= `<tr data-promo-id="${aPromo["id_promo"]}">`;
            sHTML+=     "<td data-label=\"Code\">" + aPromo["promo_reference"] + "</td>";
            sHTML+=     "<td data-label=\"Avantage\">" + aPromo["promo_value"] + ' ' + aPromo["promo_type"] + "</td>";
            // sHTML+= "<td data-label=\"Type\">" + aPromo["promo_type"] + "</td>";
            
            sLabel = (aPromo["promo_begin_date_label"] != undefined) ? aPromo["promo_begin_date_label"] : '';
            sHTML+=     '<td data-label="Début">' +
                            sLabel +
                        '</td>';
            // sHTML+= '<td data-label="Début" title="' + sLabel + '">' + aPromo["promo_begin_date"] + '</td>';
            sLabel = (aPromo["promo_end_date_label"] != undefined) ? aPromo["promo_end_date_label"] : '';
            // sHTML+= '<td data-label="Fin" title="' + sLabel + '">' + aPromo["promo_end_date"] + '</td>';
            sHTML+=     '<td data-label="Fin">' +
                            sLabel +
                        '</td>';
            sHTML+=     '<td data-label="État">' +
                            getPromoStateLabel(aPromo["state"]) +
                        '</td>';
            
            // sHTML+= "<td data-label=\"Heure de début\">" + aPromo["promo_begin_time"] + "</td>";
            // sHTML+= "<td data-label=\"Heure de fin\">" + aPromo["promo_end_time"] + "</td>";
            // sHTML+= "<td data-label=\"Description\">" + aPromo["promo_label"] + "</td>";
            sHTML+=     '<td data-label="Quantité">' +
                            aPromo["alreadyUsedPromoCount"] + ' / ' + aPromo["promo_quantity"] +
                            (
                                (aPromo['enteredPromoReferenceCountOnPurchasesNotYetMade'] > 0) ?
                                    `<i class="hot fab fa-hotjar" title="${getEnteredPromoReferenceUsersOnPurchasesNotYetMadeHtml(aPromo['enteredPromoReferenceUsersOnPurchasesNotYetMade'])}"></i>` :
                                    ''
                            ) +
                        '</td>';

            if (aPromo["state"] === 'finished') {
                sHTML += "<td data-label=Statut> </label></td>";
            } else {
                if (aPromo["promo_status"] == 1) {
                    sHTML += "<td data-label=\"Statut\"><input class=\"checkbox adm_promo_checkbox\" id=\"checkbox_" + i + "\" type=\"checkbox\" checked /><label id=\"checkbox" + i + "\" checked onclick=\"changePromoStatus(" + i + ")\" for=\"checkbox_(" + i + ")\" title='Désactiver la promo'></label></td>";
                } else if (aPromo["promo_status"] == 0) {
                    sHTML += "<td data-label=\"Statut\"><input class=\"checkbox adm_promo_checkbox\" id=\"checkbox_" + i + "\" type=\"checkbox\"/><label for=\"checkbox_(" + i + ")\" id=\"checkbox" + i + "\" onclick=\"changePromoStatus(" + i + ")\" title='Activer la promo'></label></td>"
                }
            }

            if (aPromo["state"] === 'finished') {
                sHTML += "<td data-label=Statut> </label></td>";
            } else {
                sHTML+= `<td>`; 
                sHTML+=     `<a class="edit" data-toggle="modal" data-toggle="modal" data-target="#editPromoModal" onclick="sPromoId = $(this).closest('tr').data('promo-id'); editPromotion(sPromoId);"><i class="material-icons edit" title="Éditer la promo">&#xE254;</i></a>`;
                sHTML+= `</td>`
            }
            sHTML+= "</tr>";

        }
        sHTML+= "</tbody>";
        $('#table_promo').html(sHTML);
    }
}

/**
 * Check the fields and save the new promo if valid
 */
function saveNewPromo() 
{
    // returns if non valid data (front-end check)
    if ( !icAddPromo.isValid() ) {
        displayErrorMessage();
        return;
    }

    // save the promo (if valid back-end check)
    let jData = {
        page: 'adm_promo',
        action: 'saveNewPromo',
        bJSON: 1,
        bLoadHtml: 0,
        json: icAddPromo.getValues(false, true, true)
    }
    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: false,
        data: jData,
        dataType: 'json',
        cache: false
    })
    .always(function() {
        // log('saveNewPromo: reçu', [arguments]);
    })
    .done(function(data) {
        if (icAddPromo.isValidFromBackEnd(data)) {
            toastr.success('Promo ajoutée avec succès', 'Succès');
            $('button[data-action="addPromo"]').attr("data-dismiss","modal");
            loadPromos(true);
        } else {
            displayErrorMessage();
        }
    })
    .fail(function(err) {
        displayErrorMessage('Erreur de réception des données');
    })
}

/**
 * Display the users who have entered coupon codes on purchases not yet made
 * 
 * @param { HTMLElement } elem The targetted element
 * @param { string } str The string to display
 */
function showEnteredPromoReferenceUsersOnPurchasesNotYetMade(elem, str) {
    $(elem).attr('title', str);
}

/**
 * Check the fields and update the promo if valid
 */
function updatePromo() 
{
    // returns if non valid data (front-end check)
    if ( !icEditPromo.isValid() ) {
        displayErrorMessage();
        return;
    }

    // update the promo (if valid back-end check)
    let jData = {
        page: 'adm_promo',
        action: 'updatePromo',
        bJSON: 1,
        bLoadHtml: 0,
        json: icEditPromo.getValues(false, true, true),
        promoId: sPromoId
    }
    log('updatePromo: data to send', jData)
    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: false,
        data: jData,
        dataType: 'json',
        cache: false
    })
    .always(function() {
        // log('updatePromo: reçu', [arguments]);
    })
    .done(function(data) {
        if (icEditPromo.isValidFromBackEnd(data)) {
            toastr.success('Promo modifiée avec succès', 'Succès');
            $('button[data-action="editPromo"]').attr("data-dismiss","modal");
            loadPromos(true);

        } else {
            displayErrorMessage();
        }
    })
    .fail(function(err) {
        displayErrorMessage('Erreur de réception des données');
    })
}
