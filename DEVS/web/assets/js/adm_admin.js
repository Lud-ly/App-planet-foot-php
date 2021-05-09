var tables;
var result = [];
var iIndice = "";
// let iIndiceEditionEncours;
let iRoleUtilisateur;
/**
 * @var {String} sIdUtilisateur Id de l'utilisateur cliqué (concerne le bouton 'supprimer")
 */
let sIdUtilisateur;
/**
 * @var {JSON} oInfosUtilisateur Infos sur l'admin ou l'utilisateur choisi (qui deviendra admin)
 */
let oInfosUtilisateur;
/**
 * @constant {JSON} cfgDatatable Configuration du datatable
 */
const cfgDatatable = {
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

// var result = [
//     { "id_user": 1, "user_mail": "mymy@gmail.com", "user_firstname": "Mymy", "user_name": "zoltan", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": 2, "user_gender": "2", "user_status": "1" },
//     { "id_user": 2, "user_mail": "jijou@gmail.com", "user_firstname": "Jijou", "user_name": "Pagan", "user_identifier": "1 705 8952", "user_phoneNumber": "06.01.02.03.04", "user_role": 1, "user_gender": "1", "user_status": "1" }
// ];

// exemple de tableau d'utilisateurs du site
// var resultat = [
//     { "id_user": "1", "id_center": "1", "user_mail": "jijou@gmail.com", "user_firstname": "Jijou", "user_name": "Pagan", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "4", "user_function": "Formateur DWWM/CDA", "user_gender": "1" },
//     { "id_user": "2", "id_center": "1", "user_mail": "mymy@gmail.com", "user_firstname": "Mymy", "user_name": "zoltan", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "2", "user_function": "Stagiaire CDA", "user_gender": "2" },
//     { "id_user": "5", "id_center": "1", "user_mail": "boris.zoltan@gmail.com", "user_firstname": "Boris", "user_name": "zoltan", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "2", "user_function": "Stagiaire ACOM", "user_gender": "1" },
//     { "id_user": "6", "id_center": "1", "user_mail": "michel.debussy@gmail.com", "user_firstname": "Michel", "user_name": "Debussy", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "3", "user_function": "Stagiaire CDA", "user_gender": "1" },
//     { "id_user": "21", "id_center": "1", "user_mail": "christian.dupont@gmail.com", "user_firstname": "Christian", "user_name": "Dupont", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "3", "user_function": "Formateur Compta", "user_gender": "1" },
//     { "id_user": "22", "id_center": "1", "user_mail": "enselme.lupin@gmail.com", "user_firstname": "Enselme", "user_name": "Lupin", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "4", "user_function": "Stagiaire Compta", "user_gender": "1" },
//     { "id_user": "27", "id_center": "1", "user_mail": "lucie.lemoine@gmail.com", "user_firstname": "Lucie", "user_name": "Lemoine", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "1", "user_function": "Stagiaire CRCD", "user_gender": "2" },
//     { "id_user": "28", "id_center": "1", "user_mail": "virginie@gmail.com", "user_firstname": "Virginie", "user_name": "Vigneron", "user_identifier": "1 705 1256", "user_phoneNumber": "06.55.44.11.22", "user_role": "2", "user_function": "Formatrice CRCD", "user_gender": "2" },
//     { "id_user": "37", "id_center": "1", "user_mail": "guy@gmail.com", "user_firstname": "Guy", "user_name": "Perez", "user_identifier": "1 704 3209", "user_phoneNumber": "06.55.44.11.22", "user_role": "1", "user_function": "Stagiaire CDA", "user_gender": "1" },
// ];

/**
 * Au chargement de la page
 */
$(document).ready(function() {
    // INIT DATATABLE
    // Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
    //adm_admin_tables.page.len(10).draw();
    // récupère les infos sur l'utilisateur connecté
    obtInfosUtilisateur()
    // Si le rôle de l'utilisateur connecté n'a pas été récupéré :
    if (iRoleUtilisateur == undefined) {
        // ..affiche une erreur et stoppe le script
        toastr.error('Erreur de réception des données', 'Erreur')
        return;
    }
    loadAdm_admin();
    loadPersonnes();
});


/////////////////////////////////////////////////// LES FONCTIONS //////////////////////////////////////////////////	
/**
 * Charge les admins et les affiche dans le datatable
 */
function loadAdm_admin() {
    showLoadingModal();
    let datas = 
    {
    	page : "admin__get_admins_infos",
    	bJSON : 1
    }
    $.ajax(
    {
    	type: "POST",
    	url: "route.php",
    	async: true,
    	data: datas,
    	dataType: "json",
    	cache: false,
    })
    .always(function()
    {
        hideLoadingModal();
        log('args', [arguments])
    })
    .done(function(data) 
    {
        log('received_data', Object.assign({}, data) );
        // var data = [{ "id_user": "1", "id_center": "1", "email_user": "boris@gmail.com", "pwd_user": "1111", "token_user": "fakeToken", "reset_token_user": "fakeResetToken", "firstname_user": "boris", "lastname_user": "zoltan", "tel_user": "0655441122", "role_user": "1", "active_user": "1", "comment_user": null, "date_creation_user": "2020-01-01 00:00:00", "date_last_connection_user": "2020-02-26 08:37:41" }];

        var iAdm_admin = 0;

        for (var ligne in data) {
            data[ligne].user_role = obtLibelleRoleUtilisateur(data[ligne].user_role);
        }

        result = data;

        // INIT DATATABLE
        // Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
        // tables.page.len(10).draw();
        constructTable();

        // copie l'id de l'utilisateur en cas de clic sur son bouton "supprimer"
        $('.adm_admin_delete').click(function() {
            sIdUtilisateur = $(this).closest('tr').attr('user_id');
        })

    })
    .fail(function(err) 
    {
        toastr.error('Erreur de réception des données', 'Erreur')
        showError(err);
    });
}

/**
 * Renvoie le libellé du rôle utilisateur depuis son id
 * 
 * @param {Int} iUserRole Id du rôle utilisateur
 * @returns {String}
 */
function obtLibelleRoleUtilisateur(iUserRole) {
    switch (+ iUserRole) {
        case 0:     return "Utilisateur";
        case 1:     return "Administrateur Informatique";
        case 2:     return "Administrateur CRCD";
        case 3:     return "Administrateur Compta";
        case 4:     return "Administrateur SuperAdmin";
    }
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
    sHTML += "<th data-priority='1'>Statut</th>";
    sHTML += "<th>Action</th>";
    sHTML += "</tr>";
    sHTML += "</thead>";
    sHTML += "<tbody class='text-center'>";

    for (i = 0; i < result.length; i++) {

        iIndice = i;

        sHTML += `<tr user_id=${result[i]["id_user"]}>`;
        sHTML += "<td>" + (result[i]["user_name"]).toUpperCase() + "</td>";
        sHTML += "<td>" + (result[i]["user_firstname"]).charAt(0).toUpperCase() + result[i]["user_firstname"].slice(1) + "</td>";
        sHTML += "<td>" + result[i]["user_mail"] + "</td>";
        sHTML += "<td>" + result[i]["user_phoneNumber"] + "</td>";
        // sHTML += "<td>" + result[i]["role_user"] + "</td>";
        sHTML += "<td>" + result[i]["user_role"] + "</td>";

        if (result[i]["user_status"] == 1) {
            sHTML += "<td data-label=\"Status\"><input class=\"checkbox adm_admin_checkbox\" id=\"checkbox_" + i + "\" type=\"checkbox\" checked /><label id=\"checkbox" + i + "\" checked onclick=\"adm_admin_change_status(" + i + ")\" for=\"checkbox_(" + i + ")\"></label></td>";
        } else if (result[i]["user_status"] == 0) {
            sHTML += "<td data-label=\"Status\"><input class=\"checkbox adm_admin_checkbox\" id=\"checkbox_" + i + "\" type=\"checkbox\"/><label for=\"checkbox_(" + i + ")\" id=\"checkbox" + i + "\" onclick=\"adm_admin_change_status(" + i + ")\"></label></td>"
        }

        sHTML += '<td class="adm_admin_action">';
        // sHTML += <a class="edit" data-toggle="modal" data-toggle='modal' data-target='#adm_admin_modal_ajout' onclick="editPersonne(` + i + `)"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
        sHTML += '<a class="" style="width:20px" data-toggle="modal" data-toggle="modal" data-target="#infos"><i class="fas fa-trash-alt adm_admin_delete" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td>';
        // sHTML += "<td> <img src= \"assets/img/edit.png\" onClick=\"editPersonne(" + i + ")\"data-toggle=\"modal\" data-target=\"#modal_edition\"></td>";
        // sHTML += "<td> <img src= \"assets/img/trash.png\" onClick=\" recup(" + i + ")\"data-toggle=\"modal\" data-target=\"#infos\"> </td>";
        sHTML += "</tr>";

    }
    sHTML += "</tbody>";
    $('#table_personnes').html(sHTML);
    tables = $('#table_personnes').DataTable(cfgDatatable);

}

///// fonction qui vérifie que les inputs soient biens remplis
// function that verifies that the inputs are filled
function verif() { // si un seul des champs est vide le modal s'active rajout de la class modal au bouton ajouter si inputs vide 
    // if one of the inputs is empty the modal is activated 
    if ($('#prenom').val() == "" || $('#nom').val() == "" || $('#telephone').val() == "" || $('#email').val() == "") {
        $("#btn_ajouter_modal").attr("data-toggle", "modal");
        $("#btn_ajouter_modal").attr("data-target", "#infos2");
        return true;
    } else {
        ///supprime la classe modal si tout les inputs sont remplis
        //delete modal if inputs are all filled 
        $("#btn_ajouter_modal").removeAttr("data-toggle", "modal");
        $("#btn_ajouter_modal").removeAttr("data-target", "#infos2");
        return false;
    }

}

// gestion du changement de status
function adm_admin_change_status(iIndice) {
    const ERROR_TITLE = "Échec de l'enregistrement";
    const ERROR_MESSAGE = "Une erreur a été rencontrée lors de la mise à jour du status.";
    let bNouveauStatus, sIdUtilisateur, oDonnees;
    bNouveauStatus = !$('#checkbox_' + iIndice).is(":checked");
    sIdUtilisateur = $('#checkbox_' + iIndice).closest('tr').attr('user_id');
    $('#modal_save').show();
    // update the status
    oDonnees = {
        page: 'admin__update_status',
        user_id: +sIdUtilisateur,
        user_status: bNouveauStatus,
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
            result[iIndice]["user_status"] = bNouveauStatus;
            $('#checkbox_' + iIndice).filter(':checkbox').prop('checked', bNouveauStatus);
        }
    })
    .fail(function(error) {
        showError(error)
        toastr.error(ERROR_MESSAGE, ERROR_TITLE)
    });

}

// Gestion du datalist des utilisateurs du site

// Cette fonction vide les champs de la modal ajout admin et la renomme 
function adm_admin_change_title() {
    $('.modal-title').html('Ajout/modif Administrateur');
    $('#btn_modification').html('Ajouter');

    // efface le contenu de l'input de selection du nom de l'utilisateur
    $('.adm_admin_select').val('');

    // cache la div des infos liées à l'utilisateur sélectionné
    $('#adm_admin_edit_data').hide();

}

/**
 * Affiche les infos concernant l'utilisateur choisi (et permet de modifier son rôle).
 * @param {String|Integer} idUtilisateur
 */
function editPersonne(idUtilisateur)
{
    // enregistre l'id utilisateur
    sIdUtilisateur = idUtilisateur;
    const ERROR_TITLE = "Échec";
    const ERROR_MESSAGE = 'Une erreur a été rencontrée lors de la récupération des données".';
    showLoadingModal();
    // update the status
    oDonnees = {
        page: 'admin__get_not_admin_user_infos',
        user_id: +idUtilisateur,
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
        hideLoadingModal();
        console.log('reçu', [arguments]);
    })
    .done(function(data) {
        if (isEmpty(data.error) && data[0] != undefined) {
            oInfosUtilisateur = data[0];
            $('#adm_admin_edit_data').show();
            // ajout du contenu du tableau dans les inputs en bas de page
            // add content of the table in the inputs at the end of page
            // $('#id_user_edit').val(oInfosUtilisateur["id_user"]);
            $('#label_civilite').val(oInfosUtilisateur["userGender"])
            $('#user_firstname').val(oInfosUtilisateur["userFirstName"]);
            $('#user_name').val((oInfosUtilisateur["userName"]).toUpperCase());
            $('#user_mail').val(oInfosUtilisateur["userEmail"]);
            $('#user_identifier').val(oInfosUtilisateur["userIdentifier"]);
            $('#user_phoneNumber').val(oInfosUtilisateur["userPhoneNumber"]);
            // $('#role_user_edit').val(oInfosUtilisateur["role_user"]);
            // $('#comment_user_edit').val(oInfosUtilisateur["comment_user"]);
            // $('#date_creation_edit').val(oInfosUtilisateur["date_creation_user"]);
            $('#label_role').val(oInfosUtilisateur["userRole"])
            $('#label_role').off('change.check_val');
            $('#label_role').on('change.check_val', function() {
                val = $(this).val();
                if (val != oInfosUtilisateur["userRole"]) {
                    $(this).addClass('changed');
                } else {
                    $(this).removeClass('changed');
                }
                majBoutonEnregistrer();
            })
            // si utilisateur non SuperAdmin :
            if (iRoleUtilisateur != 4) {
                // ..désactive la possibilité de définir la personne choisie comme SuperAdmin
                $(`#label_role option[value='4']`).attr('disabled', true);
            }
            // applique le libellé 'Enregistrer' au bouton de gauche
            $('#btn_modification').html('Enregistrer');
            majBoutonEnregistrer();
        } else {
            toastr.error(ERROR_MESSAGE, ERROR_TITLE)
        }
    })
    .fail(function(error) {
        showError(error)
        toastr.error(ERROR_MESSAGE, ERROR_TITLE)
    });
    /**
     * Active ou désactive le bouton 'Enregistrer' selon
     * que des changements aient été effectués ou non
     */
    function majBoutonEnregistrer() {
        let bChangementsEffectues = $(`#label_role`).hasClass('changed');
        if (bChangementsEffectues) {
            // active le bouton
            $('#btn_modification').removeAttr('disabled');
        } else {
            // désactive le bouton
            $('#btn_modification').attr('disabled', true);
        }
    }
}

//
// Partie récupération des données liées à la personne que l'on souhaite mettre administrateur
//

/**
 * Charge la liste de l'ensemble des utilisateurs de la plateforme Af'panier
 */
function loadPersonnes(){
    showLoadingModal();
    let datas = 
    {
    	page : "admin__get_not_admin_users",
    	bJSON : 1
    }
    $.ajax(
    {
    	type: "POST",
    	url: "route.php",
    	async: true,
    	data: datas,
    	dataType: "json",
    	cache: false,
    })
    .always(function()
    {
        hideLoadingModal();
        log('admin__get_not_admin_users', [arguments])
    })
    .done(function(data) 
    {
        resultat = data;
        let sHtmlSelect = '<select id="utilisateurs" data-placeholder="Choisissez un utilisateur..." class="chosen-select" tabindex="0">';
        for (i = 0; i < resultat.length; i++) {
            // TODO when having SuperUser : get user description (instead of 'Super Héro')
            let NomPrenom = ((resultat[i]["userName"]).toUpperCase() + ' ' + resultat[i]["userFirstName"].substr(0, 1).toUpperCase() + resultat[i]["userFirstName"].substr(1)) + ", " + `Super Héro`;
            sHtmlSelect += "\n<option value=''></option>";
            sHtmlSelect += "\n<option value='" + resultat[i]["userId"] + "'>" + NomPrenom + "</option>"
        }
        sHtmlSelect += '</select>';
        // au chargement du modal
        $('#adm_admin_modal_ajout').off('shown.bs.modal');
        $('#adm_admin_modal_ajout').on('shown.bs.modal', function() {
            // affiche la liste
            $('#adm_admin_datalist').html(sHtmlSelect);
            $('#utilisateurs').chosen({
                allow_single_deselect: true, // ignoré
                disable_search_threshold: 5,
                no_results_text: "Oups, cet utilisateur n'a pas été trouvé :"
            })
            // dès que l'utilisateur est modifié
            .change(function() {
                let sIdUtilisateur = $(this).val();
                // affiche les infos le concernant
                editPersonne(sIdUtilisateur)
            })
        });

    })
    .fail(function(err) 
    {
        toastr.error('Erreur de réception des données', 'Erreur')
        showError(err);
    });

}

/**
 * Met à jour le rôle administrateur d'une personne
 * verif() retourne faux car tout les inputs sont remplis donc la fonction majRoleAdmin se déclenche
 * verif() return false if all the inputs are filled and the function majRoleAdmin is activated
 */
function majRoleAdmin()
{
    // oInfosUtilisateur
    if (!$('#label_role').hasClass('changed')) {
        return;
    }
    let iNouveauRole = +$('#label_role').val();
    const ERROR_TITLE = "Échec";
    const ERROR_MESSAGE = "Une erreur a été rencontrée lors de l'enregistrement.";
    showLoadingModal();
    // update the user role
    oDonnees = {
        page: 'admin__update_role',
        user_id: sIdUtilisateur,
        user_role: iNouveauRole,
        bJSON: 1
    }
    console.log('envoyé ◘ admin__update_role', oDonnees);
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
        console.log('reçu ◘ admin__update_role', [arguments]);
    })
    .done(function(data) {
        checkHackingAttempt(data);
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
            // ok :
            loadPersonnes();
            toastr.success('Rôle "administrateur" mis à jour avec succès', 'Succès')
            // oInfosUtilisateur = data[0];
            // $('#adm_admin_edit_data').show();
            // ajout du contenu du tableau dans les inputs en bas de page
            // add content of the table in the inputs at the end of page
            // $('#id_user_edit').val(oInfosUtilisateur["id_user"]);
        }
    })
    .fail(function(error) {
        showError(error)
        toastr.error(ERROR_MESSAGE, ERROR_TITLE)
    });

    // if (verif() == false) {
    //     showLoadingModal();
    //     var datas = {
    //         page: "save_adm_admin",
    //         bJSON: 1,
    //         id_center: $('#center').val(),
    //         email_user: $('#email').val(),
    //         pwd_user: $('#pwd').val(),
    //         firstname_user: $('#prenom').val(),
    //         lastname_user: $('#nom').val(),
    //         tel_user: $('#telephone').val(),
    //         role_user: $('#role_user').val(),
    //     }

    //     $.ajax({
    //         type: "POST",
    //         url: "route.php",
    //         async: true,
    //         data: datas,
    //         dataType: "json",
    //         cache: false,
    //     })

    //     .done(function(result) {
    //         let data = result.last_admin[0];
    //         var iLongueur = result.length;
    //         result[iLongueur] = [];
    //         result[iLongueur]["id_center"] = $('#center').val();
    //         result[iLongueur]["user_mail"] = $('#email').val();
    //         result[iLongueur]["user_pwd"] = $('#pwd').val();
    //         result[iLongueur]["user_firstname"] = $('#prenom').val();
    //         result[iLongueur]["user_name"] = $('#nom').val();
    //         result[iLongueur]["user_phoneNumber"] = $('#telephone').val();
    //         result[iLongueur]["user_role"] = $('#role_user').val();
    //         result[iLongueur]["user_status"] = $('#active_user').val();

    //         // recharge la datatable
    //         tables.clear();
    //         tables.destroy();
    //         constructTable();
    //         tables = $('#table_personnes').DataTable(cfgDatatable);
    //         hideLoadingModal();
    //     })

    //     .fail(function(err) {
    //         console.log('error : ', err);
    //     });
    // }
    result.push({ "id_user": result.length, "user_mail": $('#user_mail').val(), "user_firstname": $('#user_firstname').val(), "user_name": $('#user_name').val(), "user_identifier": $('#user_identifier').val(), "user_phoneNumber": $('#user_phoneNumber').val(), "user_role": $('#label_role').val(), "user_gender": $('#label_civilite').val(), "user_status": "1" });

    loadAdm_admin()
    constructTable();
    tables.clear();
    tables.destroy();
    tables = $('#table_personnes').DataTable(cfgDatatable);
}

/**
 * Récupère les infos sur l'utilisateur connecté (id, nom, prénom, rôle)
 */
function obtInfosUtilisateur() {
    const ERROR_TITLE = "Échec";
    const ERROR_MESSAGE = 'Une erreur a été rencontrée lors de la récupération du rôle utilisateur".';
    showLoadingModal();
    // update the status
    oDonnees = {
        page: 'account_ajax',
        action: 'get_infos',
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
        if (data[0] !== undefined) {
            data = data[0];
        }
        if (isEmpty(data.error)) {
            if (data.userRole !== undefined) {
                iRoleUtilisateur = data.userRole;
            }
        } else {
            toastr.error(ERROR_MESSAGE, ERROR_TITLE)
        }
    })
    .fail(function(error) {
        showError(error)
        toastr.error(ERROR_MESSAGE, ERROR_TITLE)
    });
}

/**
 * Supprime le rôle administrateur pour l'utilisateur cliqué
 */
function supprimPersonne() {
    const ERROR_TITLE = "Échec de l'enregistrement";
    const ERROR_MESSAGE = 'Une erreur a été rencontrée lors de la suppression du rôle "administrateur".';
    showLoadingModal();
    oDonnees = {
        page: 'admin__delete_admin_role',
        user_id: +sIdUtilisateur,
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
            // result.splice(iIndiceEditionEncours, 1);
            // reimport admins infos and reload the datatable
            loadAdm_admin()
            constructTable();
            tables.clear();
            tables.destroy();
            tables = $('#table_personnes').DataTable(cfgDatatable);
            loadPersonnes();
            toastr.success('Rôle "administrateur" supprimé avec succès', 'Suppression réussie')
        }
    })
    .fail(function(error) {
        showError(error)
        toastr.error(ERROR_MESSAGE, ERROR_TITLE)
    });
}

/**
 * Garde en mémoire l'id de l'utilisateur cliqué (avant affichage du modal de suppression du rôle 'admin').
 * Modifie le titre du modal (devient "Supprimer Administrateur")
 * 
 * @param {String} value 
 */
function saveUserId(value) {
    // iIndiceEditionEncours = value;
    sIdUtilisateur = +value;
    $('.modal-title').html('Supprimer Administrateur');
}

function cancel()
////annule tout les inputs et revient à l'ajout 
// cancel all the inputs and return to the adding 
{
    $('#adm_admin_edit_data').hide();

    $('#btn_modification').html('Enregistrer');

    // $('#id_user_edit').val(resultat["id_user"]);
    $('#label_civilite').val("")
    $('#user_firstname').val("");
    $('#user_name').val("");
    $('#user_mail').val("");
    $('#user_identifier').val("");
    $('#user_phoneNumber').val("");
    $(".adm_admin_select").val("");
    // $('#role_user_edit').val(resultat[iIndiceEdit]["role_user"]);
    // $('#comment_user_edit').val(resultat[iIndiceEdit]["comment_user"]);
    // $('#date_creation_edit').val(resultat[iIndiceEdit]["date_creation_user"]);
    $('#label_role').val("")
}

// function majPersonne() {

//     showLoadingModal();
//     var datas = {
//         page: "update_adm_admin",
//         bJSON: 1,
//         id_user: $('#id_user_edit').val(),
//         id_center: $('#center_edit').val(),
//         email_user: $('#email_edit').val(),
//         pwd_user: $('#pwd_edit').val(),
//         firstname_user: $('#prenom_edit').val(),
//         lastname_user: $('#nom_edit').val(),
//         tel_user: $('#telephone_edit').val(),
//         role_user: $('#role_user_edit').val(),
//         active_user: $('#active_user_edit').val(),
//         date_last_connection_user: $('#date_last_edit').val(),
//     }

//     $.ajax({
//         type: "POST",
//         url: "route.php",
//         async: true,
//         data: datas,
//         dataType: "json",
//         cache: false,
//     })

//     .done(function(result) {
//         console.log("result", result)
//         result[iIndiceEditionEncours]["id_user"] = $('#id_user_edit').val();
//         result[iIndiceEditionEncours]["id_center"] = $('#center_edit').val();
//         result[iIndiceEditionEncours]["email"] = $('#email_edit').val();
//         result[iIndiceEditionEncours]["pwd"] = $('#pwd_edit').val();
//         result[iIndiceEditionEncours]["firstname_user"] = $('#prenom_edit').val();
//         result[iIndiceEditionEncours]["lastname_user"] = $('#nom_edit').val();
//         result[iIndiceEditionEncours]["tel_user"] = $('#telephone_edit').val();
//         // result[iIndiceEditionEncours]["role_user"] = $('#role_user_edit').val();
//         result[iIndiceEditionEncours]["active_user"] = $('#active_user_edit').val();
//         result[iIndiceEditionEncours]["date_last_connection_user"] = $('#date_last_edit').val();
//         loadAdm_admin();
//         hideLoadingModal();
//     })

//     .fail(function(err) {
//         console.log('error : ', err);
//     });
// }
