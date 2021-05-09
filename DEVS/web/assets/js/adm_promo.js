/**************************** Config DU DATATABLE ****************************/
const oPromosDatatableConfig = {
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

var tables;
/**
 * @var {json} fieldsRules Fields rules
 */
var fieldsRules;
/**
 * @var {array} promoTypes Promotion types
 */
var promoTypes;
/**
 * @var {object} oInputControl Input Control object
 */
var oInputControl;



// On load
$(document).ready(function() {
	adm_promo_list();
    console.log('oPromosDatatableConfig', oPromosDatatableConfig)
    // tables = $('#table_promo').DataTable(oPromosDatatableConfig);
    // get promo types
    getPromoTypes();    
    // getfields rules
    // fieldsRules = InputControl.getRules();
    oInputControl = new InputControl();
    // let test1 = validate(
    //     {
    //         promoStartDate: '1500-03-04',
    //         promoEndDate: '1600-03-04',
    //     },
    //     {
    //         promoStartDate: {
    //             date: true
    //         },
    //         promoEndDate: {
    //             date: true
    //         },
    //     },
    //     {format: 'flat'}
    // )
    // let test;
    // test = oInputControl.validate(
    //     // {promoDescription: 4},
    //     {
    //         promoStartDate: '2018-03-04',
    //         promoEndDate: '2020-03-04',
    //     },
    //     {format: 'flat'}
    // )
    
    // test = validate(
    //     {'test': '2020-06-01'},
    //     {'test': {
    //         datetime:   {
    //             dateOnly:  true,
    //             'earliest':  '2021-03-28',
    //         }
    //     }},
    //     {format: 'flat'}
    // )
    // log('test ♪', test)
    // a(
    //     // validate(
    //     //     {'test': '2020-06-01'},
    //     //     {'test': {
    //     //         datetime:   {
    //     //             dateOnly:  true,
    //     //             '>=':  '2021-03-28',
    //     //         }
    //     //     }},
    //     // )

    //     validate.single(
    //         'ttt',
    //         { 'type': 'number' }
    //         // 3,
    //         // {  '>=': {'>=' : 10, presence: true, 'message': 'salutéé !'}  }
    //         // {  'datetime': {
    //         //     dateOnly: true,
    //         //     earliest: {
    //         //         earliest: '2021-03-28',
    //         //         message: 'pas avant le 2021-03-28 svp'
    //         //     }
    //         // }  }
    //     )

    //     // validate({foo: "some value", bar: 'toto'}, {foo: {custom: "some options"}})
    // )

    // enable date pickers
    // $( "input.datepicker" ).datepicker();
    // generates promo types select
    $('#promoType').html( getSelectOptionsHtml(promoTypes, true, '%') );
});

/**
 * Check the fields
 */
 function checkFields() 
 { 
    a('Goo isValid()')
    console.log( 'zzz oInputControl.isValid()', oInputControl.isValid() )
    // let oValues = InputControl.collectValues();
    // let oCheck = oInputControl.checkFields();

    // let oCheck = InputControl.checkAll(oValues, fieldsRules);

    // console.log('◘ collectValues', oValues)
    // console.log('◘ checkAll', oCheck)

    return; //here!!
    let value,
        oFields = {};
    $('.field').each(function() {
        value = $(this).value();
        oFields[$(this).attr('id')] = value;
    })
    // send to PHP
    log('oFields', oFields);
 
    let oData = {
        page: 'adm_promo',
        action: 'saveNewPromo',
        bJSON: 1,
        bLoadHtml: false,
        json: JSON.stringify(oFields)
    }
    log('envoyé', oData);
    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: false,
        data: oData,
        dataType: 'json',
        cache: false
    })
    .always(function() {
		log('saveNewPromo', [arguments]);
    })
    .done(function(data) {
        // alert('ok')
    })
    .fail(function(err) {
        showError(err);
        // alert('raté')
    })

 
     // bValideForm= bDateDebut && bHeureDebut && bDateFin && bHeureFin && bCode && bValeur && bType && bDescription && bQuantite;
 
     // if (bValideForm == true)
     // {
     //     addPromo();
     //     $("#addButton").attr("data-dismiss","modal");
     // }
 
     // else
     // {
     //     toastr.error('Tous les champs doivent être renseignés', 'Erreur');
 
     // }
 }

/**
 * Get promo types
 */
function getPromoTypes() {
    let oData = {
        page: 'adm_promo',
        action: 'getPromoTypes',
        bJSON: 1,
        bLoadHtml: false
    }
    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: false,
        data: oData,
        dataType: 'json',
        cache: false
    })
    .always(function() {
        log('getPromoTypes', [arguments])
    })
    .done(function(data) {
		promoTypes = data;
    })
    .fail(function(err) {
        err = 'raté';
        console.log(err)
    })

}




/**************************** CONSTRUCTION TABLEAU ****************************/
var aOfPromo= [];
var iIndiceAjout;

function adm_promo_list() {
    let datas = {
        page: 'adm_promo_list',
        bJSON: 1
    }

    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: true,
        data: datas,
        dataType: 'json',
        cache: false
    })

    .done(function(result) {
		aOfPromo= result;
		constructTable();
    })

    .fail(function(err) {
        err = 'raté';
        console.log(err)
    })
}

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
		sHTML+= "<tr>";
        log(aOfPromo)
		for ( i= 0; i < aOfPromo.length; i++)	
		{
            aPromo = aOfPromo[i];
			sHTML+= "<td data-label=\"Code\">" + aPromo["promo_reference"] + "</td>";
			sHTML+= "<td data-label=\"Avantage\">" + aPromo["promo_number"] + ' ' + aPromo["promo_type"] + "</td>";
			// sHTML+= "<td data-label=\"Type\">" + aPromo["promo_type"] + "</td>";
            
            sLabel = (aPromo["promo_begin_date_label"] != undefined) ? aPromo["promo_begin_date_label"] : '';
			sHTML+= '<td data-label="Début">' +
                        sLabel +
                    '</td>';
			// sHTML+= '<td data-label="Début" title="' + sLabel + '">' + aPromo["promo_begin_date"] + '</td>';
            sLabel = (aPromo["promo_end_date_label"] != undefined) ? aPromo["promo_end_date_label"] : '';
			// sHTML+= '<td data-label="Fin" title="' + sLabel + '">' + aPromo["promo_end_date"] + '</td>';
			sHTML+= '<td data-label="Fin">' +
                        sLabel +
                    '</td>';
			sHTML+= '<td data-label="État">' +
                        getPromoStateLabel(aPromo["state"]) +
                    '</td>';
			
            // sHTML+= "<td data-label=\"Heure de début\">" + aPromo["promo_begin_time"] + "</td>";
			// sHTML+= "<td data-label=\"Heure de fin\">" + aPromo["promo_end_time"] + "</td>";
			// sHTML+= "<td data-label=\"Description\">" + aPromo["promo_label"] + "</td>";
			sHTML+= '<td data-label="Quantité"';
			sHTML+= '>' +
                    aPromo["alreadyUsedPromoCount"] + ' / ' + aPromo["promo_quantity"] +
                    ((aPromo['enteredPromoCodeCountOnPurchasesNotYetMade'] > 0) ?
                        `<i class="hot fab fa-hotjar" title="${getEnteredPromoCodeUsersOnPurchasesNotYetMadeHtml(aPromo['enteredPromoCodeUsersOnPurchasesNotYetMade'])}"></i>` :
                        '') +
                    "</td>";

            if (aPromo["state"] === 'finished') {
                sHTML += "<td data-label=Statut> </label></td>";
            } else {
                if (aPromo["promo_status"] == 1) {
                    sHTML += "<td data-label=\"Statut\"><input class=\"checkbox adm_promo_checkbox\" id=\"checkbox_" + i + "\" type=\"checkbox\" checked /><label id=\"checkbox" + i + "\" checked onclick=\"adm_promo_change_status(" + i + ")\" for=\"checkbox_(" + i + ")\" title='Désactiver la promo'></label></td>";
                } else if (aPromo["promo_status"] == 0) {
                    sHTML += "<td data-label=\"Statut\"><input class=\"checkbox adm_promo_checkbox\" id=\"checkbox_" + i + "\" type=\"checkbox\"/><label for=\"checkbox_(" + i + ")\" id=\"checkbox" + i + "\" onclick=\"adm_promo_change_status(" + i + ")\" title='Activer la promo'></label></td>"
                }
            }

            if (aPromo["state"] === 'finished') {
                sHTML += "<td data-label=Statut> </label></td>";
            } else {
                sHTML+= `<td> 
                <a class="edit" data-toggle="modal" data-toggle="modal" data-target="#editModal" onclick="editPromo(` + i + `)"><i class="material-icons edit" data-toggle="tooltip" title="Éditer la promo">&#xE254;</i></a></td>`
            }
            sHTML+= "</tr>";

		}
		sHTML+= "</tbody>";
		$('#table_promo').html(sHTML);

}

/**
 * Display the users who have entered coupon codes on purchases not yet made
 * 
 * @param { HTMLElement } elem The targetted element
 * @param { string } str The string to display
 */
function showEnteredPromoCodeUsersOnPurchasesNotYetMade(elem, str) {
    $(elem).attr('title', str);
}

/**
 * Returns the html of users who have entered coupon codes on purchases not yet made (to display on hover)
 * 
 * @param { JSON[] } aUsers
 */
 function getEnteredPromoCodeUsersOnPurchasesNotYetMadeHtml(aUsers) {
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

/**************************** CHANGER LE STATUT D'UNE ACTUALITE ****************************/
function adm_promo_change_status(iIndice) {
    const ERROR_TITLE = "Échec de l'enregistrement";
    const ERROR_MESSAGE = "Une erreur a été rencontrée lors de la mise à jour du status.";
    let bNouveauStatus, id_promo;
    bNouveauStatus = !$('#checkbox_' + iIndice).is(":checked");
    id_promo = $('#checkbox_' + iIndice).closest('tr').attr('id_promo');
    $('#modal_save').show();
    // update the status
    let datas = {
        page: 'adm_promo_status',
        bJSON: 1,
        id_promo: aOfPromo[iIndice]["id_promo"],
        promo_status: bNouveauStatus,
        
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
            aOfPromo[iIndice]["promo_status"] = bNouveauStatus;
            $('#checkbox_' + iIndice).filter(':checkbox').prop('checked', bNouveauStatus);
        }
    })
    .fail(function(error) {
        showError(error)
        toastr.error(ERROR_MESSAGE, ERROR_TITLE)
    });
}


/**************************** AJOUTER UNE PROMOTION ****************************/
function addPromo() 
{
	let datas = {
        page: 'adm_promo_insert',
        bJSON: 1,
        promo_label: $('#adm_promo_description').val(),
        promo_reference : $('#adm_promo_code').val(),
        promo_number : $('#adm_promo_quantity').val(),
        promo_type: $('#adm_promo_type').val(),
        promo_begin_date: $('#adm_promo_start_date').val(),
        promo_begin_time: $('#adm_promo_start_time').val(),
        promo_end_date : $('#adm_promo_end_date').val(),
		promo_end_time : $('#adm_promo_end_time').val(),
		promo_quantity : $('#adm_promo_value').val(),

    }
    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: true,
        data: datas,
        dataType: 'json',
        cache: false
    })


    .done(function(result) {

		if (isEmpty(result.error)) 
        {
            toastr.success('Article ajouté avec succès', 'Succès');
			adm_promo_list();
			tables.clear();
			tables.destroy();
			tables = $('#table_promo').DataTable(oPromosDatatableConfig);
        } 
    })

    .fail(function(error) {
		showError(error);
        toastr.error('Tous les champs doivent être renseignés', 'Erreur');

    })

    constructTable();
    tables.clear();
    tables.destroy();
    tables = $('#table_promo').DataTable(oPromosDatatableConfig);
};



/**************************** MODIFIER UNE PROMOTION ****************************/
var iIndiceEditionEncours;

function editPromo(iIndiceEdit) {
    let promo = aOfPromo[iIndiceEdit];
    iIndiceEditionEncours = iIndiceEdit;
	$('#dateDebutEdit').val(promo["promo_begin_date"]);
	$('#heureDebutEdit').val(promo["promo_begin_time"]);
	$('#dateFinEdit').val(promo["promo_end_date"]);
	$('#heureFinEdit').val(promo["promo_end_time"]);
    $('#codeEdit').val(promo["promo_reference"]);
    $('#valeurEdit').val(promo["promo_number"]);
    $('#typeEdit').val(promo["promo_type"]);
    $('#descriptionEdit').val(promo["promo_label"]);
	$('#quantiteEdit').val(promo["promo_quantity"]);
}

function modifyPromo(iIndiceEditionEncours) {

	let datas = {
        page: 'adm_promo_update',
        bJSON: 1,
        id_promo:aOfPromo[iIndiceEditionEncours]["id_promo"],
		promo_begin_date: $('#dateDebutEdit').val(),
		promo_begin_time: $('#heureDebutEdit').val(),
		promo_end_date: $('#dateFinEdit').val(),
		promo_end_time: $('#heureFinEdit').val(),
		promo_reference: $('#codeEdit').val(),
		promo_number: $('#valeurEdit').val(),
		promo_type: $('#typeEdit').val(),
        promo_label: $('#descriptionEdit').val(),
		promo_quantity: $('#quantiteEdit').val()
	}
	$.ajax({
        type: 'POST',
        url: 'route.php',
        async: true,
        data: datas,
        dataType: 'json',
        cache: false
	})
	.done(function(result) {
		if (isEmpty(result.error)) 
        {
            toastr.success('Promotion modifiée avec succès', 'Succès');
			adm_promo_list();
			tables.clear();
			tables.destroy();
			tables = $('#table_promo').DataTable(oPromosDatatableConfig);
        } 
	})
	.fail(function(error) {
        showError(error);
        toastr.error('Tous les champs doivent être renseignés', 'Erreur');
    })

	// console.log(aOfPromo);
}



/**************************** VERIFICATION DES CHAMPS ****************************/


/****************** Vérification si champs vides ajout article ******************/

var bDateDebut = false;
var bHeureDebut = false;
var bDateFin = false;
var bHeureFin = false;
var bCode = false;
var bValeur = false;
var bType = false;
var bDescription = false;
var bQuantite = false;
var bValideForm = false;


/****************** Vérification si champs vides modif article ******************/

var bDateDebutEdit = false;
var bHeureDebutEdit = false;
var bDateFinEdit = false;
var bHeureFinEdit = false;
var bCodeEdit = false;
var bValeurEdit = false;
var bTypeEdit = false;
var bDescriptionEdit = false;
var bQuantiteEdit = false;
var bValideFormEdit = false;

function signin_verifierFormVideEdit() 
{
    if ($("#dateDebutEdit").val() == '') 
    {
        $("#dateDebutEdit").css('border-color', 'red');
        $('#dateDebutEdit').css("border-width", "0.25em");
        var bDateDebutEdit = false;
		console.log("date debut pas ok");
    } 
    else 
    {
        $("#dateDebutEdit").css('border-color', 'black');
        $('#dateDebutEdit').css("border-width", "0.10em");
        var bDateDebutEdit = true;
		console.log("date debut ok");

    }
    if ($("#heureDebutEdit").val() == '') 
    {
        $("#heureDebutEdit").css('border-color', 'red');
        $('#heureDebutEdit').css("border-width", "0.25em");
        var bHeureDebutEdit = false;
		console.log("heure debut pas ok");

    } 
    else 
    {
        $("#heureDebutEdit").css('border-color', 'black');
        $('#heureDebutEdit').css("border-width", "0.10em");
        var bHeureDebutEdit = true;
		console.log("heure debut  ok");

    }
    if ($("#dateFinEdit").val() == '') 
    {
        $("#dateFinEdit").css('border-color', 'red');
        $('#dateFinEdit').css("border-width", "0.25em");
        var bDateFinEdit = false;
		console.log("date fin pas ok");

    } 
    else 
    {
        $("#dateFinEdit").css('border-color', 'black');
        $('#dateFinEdit').css("border-width", "0.10em");
        var bDateFinEdit = true;
		console.log("date fin ok");

    }
    if ($("#heureFinEdit").val() == '') 
    {
        $("#heureFinEdit").css('border-color', 'red');
        $('#heureFinEdit').css("border-width", "0.25em");
        var bHeureFinEdit = false;
		console.log("heure fin pas ok");

    } 
    else 
    {
        $("#heureFinEdit").css('border-color', 'black');
        $('#heureFinEdit').css("border-width", "0.10em");
        var bHeureFinEdit = true;
		console.log("heure fin ok");

    }
    if ($("#codeEdit").val() == '') 
    {
        $("#codeEdit").css('border-color', 'red');
        $('#codeEdit').css("border-width", "0.25em");
        var bCodeEdit = false;
		console.log("code pas ok");

    } 
    else 
    {
        $("#codeEdit").css('border-color', 'black');
        $('#codeEdit').css("border-width", "0.10em");
        var bCodeEdit = true;
		console.log("code ok");

    }
    if ($("#valeurEdit").val() == '') 
    {
        $("#valeurEdit").css('border-color', 'red');
        $('#valeurEdit').css("border-width", "0.25em");
        var bValeurEdit = false;
		console.log("valeur pas ok");

    } 
    else 
    {
        $("#valeurEdit").css('border-color', 'black');
        $('#valeurEdit').css("border-width", "0.10em");
        var bValeurEdit = true;
		console.log("valeur ok");

    }
    if ($("#typeEdit").val() == '') 
    {
        $("#typeEdit").css('border-color', 'red');
        $('#typeEdit').css("border-width", "0.25em");
        var bTypeEdit = false;
		console.log("type pas ok");

    } 
    else 
    {
        $("#typeEdit").css('border-color', 'black');
        $('#typeEdit').css("border-width", "0.10em");
        var bTypeEdit = true;
		console.log("type ok");

    }
	if ($("#descriptionEdit").val() == '') 
    {
        $("#descriptionEdit").css('border-color', 'red');
        $('#descriptionEdit').css("border-width", "0.25em");
        var bDescriptionEdit = false;
		console.log("description pas ok");

    } 
    else 
    {
        $("#descriptionEdit").css('border-color', 'black');
        $('#descriptionEdit').css("border-width", "0.10em");
        var bDescriptionEdit = true;
		console.log("description ok");

    }
	if ($("#quantiteEdit").val() == '') 
    {
        $("#quantiteEdit").css('border-color', 'red');
        $('#quantiteEdit').css("border-width", "0.25em");
        var bQuantiteEdit = false;
		console.log("quantite pas ok");

    } 
    else 
    {
        $("#quantiteEdit").css('border-color', 'black');
        $('#quantiteEdit').css("border-width", "0.10em");
        var bQuantiteEdit = true;
		console.log("quantite ok");

    }

    bValideFormEdit= bDateDebutEdit && bHeureDebutEdit && bDateFinEdit && bHeureFinEdit && bCodeEdit && bValeurEdit && bTypeEdit && bDescriptionEdit && bQuantiteEdit;    
    if (bValideFormEdit == true)
    {
        modifyPromo(iIndiceEditionEncours);
        $("#clicEdit").attr("data-dismiss","modal");
    }

    else
    {
        toastr.error('Tous les champs doivent être renseignés', 'Erreur');

    }
}