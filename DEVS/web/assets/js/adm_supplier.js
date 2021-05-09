/***************************************************
   @author @AfpaLabTeam - Ludovic Mouly
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 ***************************************************/

/****************************LOAD SUPPLIER LIST****************************/

var aOfSupplier = [];
function loadSupplier() {

    // J'affiche l'image GIF de la roue dentée qui tourne, indiquant le chargement
    showLoadingModal();
    // Ici je mets les paramètres pour appeler un autre PHP :
    // Je décide de l'appeler "adm_supplier_list"
    // Qui va s'occuper d'aller chercher mes données dans la base
    // Dans le paramètre page, je vais mettre "index_list_supplier"
    // Le paramètre bJSON à 1, me permet que ma page ne se recharge pas
    // Mais reste bien figée
    var datas = {
        page: "adm_supplier_list",
        bJSON: 1
    }
    // J'exécute le POST
    // Dans le ".done", le retour du PHP "admin_client_liste", soit "admin_client_liste.html"
    // Si tout s'est bien passé
    // Dans le ".fail", si il y'a eu une erreur d'exécution côté serveur.
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false
    })
        .done(function (result) {
            // C'est dans result que je recevrais les données de la base de données
            // Je fais un console.log pour voir son contenu
            // console.log("Supplier", result);
            // Ici j'aurais à coder de parcourir le tableau "result"
            aOfSupplier = result;
            // Et qui me permettra de remplacer mes "fausses" données par les vraies
            // ............
            // ............
            // Ensuite, ici, j'appellerai ma fonction qui met en place mes données dans la datatable
            constructTable();
            // Enfin, je cache l'image GIF de la roue dentée qui tourne
            hideLoadingModal();
        })
        .fail(function (err) {
            alert('error : ' + err.status);
            showError(err);
        })
        .always(function () {
            console.log('arguments supplier list', arguments);
        })
}

/**************************** MAKE DATATABLE ****************************/
var i;
function constructTable() {

    var sHTML = "";
    sHTML += `<thead>`;
    sHTML += `<tr>`;
    sHTML += `<th>Image</th>`;
    sHTML += `<th>Société</th>`;
    sHTML += `<th>Email</th>`;
    sHTML += `<th>Ville</th>`;
    // sHTML += `<th>Code Postal</th>`;
    sHTML += `<th>Action</th>`;
    sHTML += `<th>Map</th>`;
    sHTML += `</tr>`;
    sHTML += `</thead>`;
    sHTML += `<tbody>`;
    sHTML += `<tr>`;

    for (i = 0; i < aOfSupplier.length; i++) {
        iIndiceDelete = i;
        sHTML += `<td data-label="Image"><img class="supplier_img" src="assets/img/` + aOfSupplier[i]["supplier_img"] + ` " alt="Image du fournisseur" title="Voir la carte" /></td>`;
        sHTML += `<td data-label="Nom_société">` + aOfSupplier[i]["supplier_storeName"] + `</td>`;
        sHTML += `<td data-label="Email">` + aOfSupplier[i]["supplier_mail"] + `</td>`;
        sHTML += `<td data-label="Ville">` + aOfSupplier[i]["supplier_city"] + `</td>`;
        // sHTML += `<td data-label="CodePostal">` + aOfSupplier[i]["supplier_zipCode"] + `</td>`;
        sHTML += `<td>
        <a class="edit" data-toggle="modal" data-toggle="modal" data-target="#editModal" onclick="editSupplier(` + i + `)"><i class="material-icons edit" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
        <a class="delete" data-toggle="modal" data-toggle="modal" data-target="#deleteModal" onClick="deleteSupplier(` + i + `)"><i class="material-icons delete" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td>`
        sHTML += `<td data-label="GoogleMap">` + htmlspecialchars_decode(aOfSupplier[i]["supplier_urlGoogleMap"]) + `</td>`;
        sHTML += `</tr>`;
    }
    sHTML += "</tbody>";
    $('#table_supplier').html(sHTML);
    tables = $('#table_supplier').DataTable(configuration);
}


/**************************** ADD SUPPLIER DATATABLE****************************/

function addSupplier() {
    var iLongueur = aOfSupplier.length;
    aOfSupplier[iLongueur] = [];
    aOfSupplier[iLongueur]["supplier_img"] = $('#nom_fichier').val();
    aOfSupplier[iLongueur]["supplier_firstname"] = $('#addFirstname').val();
    aOfSupplier[iLongueur]["supplier_name"] = $('#addName').val();
    aOfSupplier[iLongueur]["supplier_mail"] = $('#addEmail').val();
    aOfSupplier[iLongueur]["supplier_phoneNumber"] = $('#addPhone').val();
    aOfSupplier[iLongueur]["supplier_address"] = $('#addAddress').val();
    aOfSupplier[iLongueur]["supplier_city"] = $('#addCity').val();
    aOfSupplier[iLongueur]["supplier_zipCode"] = $('#addZip').val();
    aOfSupplier[iLongueur]["supplier_storeName"] = $('#addStore').val();
    aOfSupplier[iLongueur]["supplier_urlGoogleMap"] = $('#addMap').val();
};

/****************************ADD SUPPLIER SERVER**************************/

var aOfSupplier = [];
function add_supplier_server() {

    // J'affiche l'image GIF de la roue dentée qui tourne, indiquant le chargement
    // showLoadingModal();
    var datas = {
        page: "adm_supplier_add",
        addImage: $("#nom_fichier_fournisseur").val(),
        addFirstname: $("#addFirstname").val(),
        addName: $("#addName").val(),
        addEmail: $("#addEmail").val(),
        addPhone: $("#addPhone").val(),
        addAddress: $("#addAddress").val(),
        addCity: $("#addCity").val(),
        addZip: $("#addZip").val(),
        addStore: $("#addStore").val(),
        addMap: $("#addMap").val(),
        bJSON: 1,
        bLoadHtml: false
    }
    // J'exécute le POST
    // Si tout s'est bien passé
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })
        .done(function (result) {
            // C'est dans result que je recevrais les données de la base de données
            // Ensuite,après verif du form ici, j'appellerai ma fonction qui ajoute mes données dans la BDD
            if (result["isValid"]) {
                // $("#addModal").attr("data-dismiss", "modal");
                $("#addModal").hide();
                $(".modal-backdrop").hide();
                addSupplier();
                toastr.success('Enregistrement du fournisseur réussi !', 'Succès');
                tables.clear();
                tables.destroy();
                loadSupplier();
                cleanFormAdd();
                // hideLoadingModal();
            }
            else {
                toastr.error('Erreur', 'Vérifier vos champs');
                // Je boucle sur les champs et  j'affiche les erreurs dans les span sous les input
                var sMessage;
                for (var iField = 0; iField < result.invalidFields.length; iField++) {

                    var sField = Object.keys(result.invalidFields[iField])[0];
                    sMessage = (result.invalidFields[iField][sField]);
                    $("#" + sField + " + span").html(sMessage);
                    $("#" + sField).css("border", "1px solid red"); 
                }
                 hideLoadingModal();
            }
        })
        // Dans le ".fail", si il y'a eu une erreur d'exécution côté serveur.
        .fail(function (err) {
            alert('error : ' + err.status);
            // showError(err);
        })
        .always(function () {
            console.log('arguments add supplier', arguments);
            //je cache l'image GIF 

        })
}

/*****************************************UPLOAD IMAGE***************************************** */

function doUpload() {
    // la fenêtre de chargement
    $('#divModalSaving').show();
    // je submit les données suivantes :
    // new_fichier = url local du fichier
    // page = upload_fichier
    // recupération du nouveau nom de l'image pour l'enregistrement en BDD
    $('#uploadForm').submit();

}

/****************************EDIT ELEMENT SUPPLIER DATATABLE-> MODALFORM****************************/

var iIndiceEditionEncours;

function editSupplier(iIndiceEdit) {
    iIndiceEditionEncours = iIndiceEdit;
    /* on affiche les valeurs du tableau dans nos inputs pour pouvoir les modifier*/
    $('#id_supplier').val(aOfSupplier[iIndiceEdit]["id_supplier"]);
    $('#edit_nom_fichier_fournisseur').val(aOfSupplier[iIndiceEdit]["supplier_img"]);
    $('#editFirstname').val(aOfSupplier[iIndiceEdit]["supplier_firstname"]);
    $('#editName').val(aOfSupplier[iIndiceEdit]["supplier_name"]);
    $('#editEmail').val(aOfSupplier[iIndiceEdit]["supplier_mail"]);
    $('#editPhone').val(aOfSupplier[iIndiceEdit]["supplier_phoneNumber"]);
    $('#editAddress').val(aOfSupplier[iIndiceEdit]["supplier_address"]);
    $('#editCity').val(aOfSupplier[iIndiceEdit]["supplier_city"]);
    $('#editZip').val(aOfSupplier[iIndiceEdit]["supplier_zipCode"]);
    $('#editStore').val(aOfSupplier[iIndiceEdit]["supplier_storeName"]);
    $('#editMap').val(htmlspecialchars_decode(aOfSupplier[iIndiceEdit]["supplier_urlGoogleMap"]));
}

/****************************UPDATE ELEMENT SUPPLIER->BDD****************************/


function modifySupplier(iIndiceEditionEncours) {
    showLoadingModal();
    let datas = {
        page: "adm_supplier_update",
        id_supplier: aOfSupplier[iIndiceEditionEncours]["id_supplier"],
        editImage: $("#edit_nom_fichier_fournisseur").val(),
        editFirstname: $("#editFirstname").val(),
        editName: $("#editName").val(),
        editEmail: $("#editEmail").val(),
        editPhone: $("#editPhone").val(),
        editAddress: $("#editAddress").val(),
        editCity: $("#editCity").val(),
        editZip: $("#editZip").val(),
        editStore: $("#editStore").val(),
        editMap: $("#editMap").val(),
        bJSON: 1
    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })
        .done(function (result) {
            console.log(result);
            if (result["isValidEdit"]) {
                hideLoadingModal();
                // $("#editModal").attr("data-dismiss", "modal");
                $("#editModal").hide();
                $(".modal-backdrop").hide();
                cleanFormEdit();
                toastr.success('Modification du fournisseur réussi !', 'Succès');
                tables.clear();
                tables.destroy();
                loadSupplier();
            }
            else {
                // Je boucle sur les champs et teste si c'est vide ou non-conforme et j'affiche sous les erreurs dans les span sous les input
                var sMessage;
                for (var iField = 0; iField < result.invalidEditFields.length; iField++) {

                    var sField = Object.keys(result.invalidEditFields[iField])[0];
                    sMessage = (result.invalidEditFields[iField][sField]);
                    $("#" + sField + " + span").html(sMessage);
                    $("#" + sField).css("border", "1px solid red");
                }
                hideLoadingModal();
            }
        })
        .fail(function (err) {
            showError(err);
            alert('error : ' + err.status);
        })
        .always(function () {
            console.log('arguments edit supplier', arguments);
        })
}


/******************************DELETE ELEMENT->iIndiceDeleteEncours*****************************/

var iIndiceDeleteEncours;
//Recup iIndiceDelete et met dans iIndiceDeleteEncours
function deleteSupplier(iIndiceDelete) {
    var supName = aOfSupplier[iIndiceDelete]["supplier_storeName"];
    document.getElementById("deleteSupplier").innerHTML = (supName);
    iIndiceDeleteEncours = iIndiceDelete;
}

/******************************DELETE ELEMENT SUPPLIER BDD*****************************/

function delete_supplier_server(iIndiceDeleteEnCours) {
    //appel ajax vers php
    showLoadingModal();
    //Envoyer l'indice à la page adm_supplier_delete
    let datas = {
        page: "adm_supplier_delete",
        bJSON: 1,
        id_supplier: aOfSupplier[iIndiceDeleteEnCours]["id_supplier"],
    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })
        // Au retour server mettre dans le .done :
        .done(function (result) {
            if (result) {
                toastr.success('Suppression du fournisseur réussi !', 'Succès');
                tables.clear();
                tables.destroy();
                loadSupplier();
            }
            else {
                toastr.error('Erreur Suppression !', 'Echec');
            }

            // Hide div saving
            hideLoadingModal();
        })
        .fail(function (err) {
            alert('echec : ' + err.status);
            hideLoadingModal();
        });



}
/**************************************************
 * Convert specials HTML entities HTML in character
 **************************************************/
function htmlspecialchars_decode(str) {
    if (typeof (str) == "string") {
        str = str.replace(/&amp;/g, "&");
        str = str.replace(/&quot;/g, "\"");
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/&lt;/g, "<");
        str = str.replace(/&gt;/g, ">");
    }
    return str;
}
/**************************************************
 * Vider le form
 **************************************************/
function cleanFormAdd() {
    $('#new_fichier').val("");
    $("input[ type=text]").val("");
    $("#div_preview_img").empty();
    $('#addFirstname').val("");
    $('#addName').val("");
    $('#addEmail').val("");
    $('#addPhone').val("");
    $('#addAddress').val("");
    $('#addCity').val("");
    $('#addZip').val("");
    $('#addStore').val("");
    $('#addMap').val("");
    $(".error").remove();
    $("input,textarea").css("border", "1px solid #ddd");
}
function cleanFormEdit() {
    $('#edit_nom_fichier_fournisseur').val("");
    $("input[type=text]").val("");
    $("#div_preview_img").empty();
    $('#editFirstname').val("");
    $('#editName').val("");
    $('#editEmail').val("");
    $('#editPhone').val("");
    $('#editAddress').val("");
    $('#editCity').val("");
    $('#editZip').val("");
    $('#editStore').val("");
    $('#editMap').val("");
    $(".error").remove();
    $("input,textarea").css("border", "1px solid #ddd");
}

/******************************CONFIGURATION DATATABLE *******************/

const configuration = {
    "stateSave": false,
    "order": [
        [1, "asc"]
    ],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [
        [3, 10, 25, 50, -1],
        [3, 10, 25, 50, "Tous"]
    ],
    "language": {
        "info": "Producteurs _START_ à _END_ sur _TOTAL_",
        "emptyTable": "Aucun Producteur",
        "lengthMenu": "_MENU_ Producteurs par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Producteur 0 à 0 sur 0 sélectionnée",
    },
    "columns": [{
        "orderable": false /* image */
    },
    {
        "orderable": true /* Société */
    },
    {
        "orderable": true /* email */
    },
    {
        "orderable": true /* ville */
    },
    // {
    //     "orderable": true /* Zip code */
    // },
    {
        "orderable": false /* Action */
    },
    {
        "orderable": false/* Map */
    },
    ],
    'retrieve': true,
    "responsive": true
};


/****************************READY************************************* */

var tables;

$(document).ready(function () {
    // $('#divModalSaving').show();
    // INIT DATATABLE
    // Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
    // tables.page.len(10).draw();
    //Loading supplier list
    loadSupplier();
});