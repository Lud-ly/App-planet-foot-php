/***************************************************
   @author @AfpaLabTeam - Antoine MORENO
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 ***************************************************/

/****************************LOAD FAQ LIST****************************/

var aOfFaq = [];
function loadFaq() {
    showLoadingModal();
    var datas = {
        page: "adm_faq_list",
        bJSON: 1
        // bLoadHtml: false
        
    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false
    })
        .done(function (result) {
            aOfFaq = result;
            constructTable();
            hideLoadingModal();
        })
        .fail(function (err) {
            alert('error : ' + err.status);
            showError(err);
        })
        .always(function () {
            console.log('arguments faq list', arguments);
            hideLoadingModal();
        })
}

/**************************** MAKE DATATABLE ****************************/
var i;
function constructTable() {

    var sHTML = "";
    sHTML += `<thead>`;
    sHTML += `<tr>`;
    sHTML += `<th>ID Faq</th>`;
    sHTML += `<th>Num Centre</th>`;
    sHTML += `<th>Question</th>`;
    sHTML += `<th>Réponse</th>`;
    sHTML += `<th>Order</th>`;
    sHTML += `<th>Status</th>`;
    sHTML += `<th>Modif/Suppr</th>`;
    sHTML += `</tr>`;
    sHTML += `</thead>`;
    sHTML += `<tbody>`;
    sHTML += `<tr>`;

    for (i = 0; i < aOfFaq.length; i++) {
        iIndiceDelete = i;
        sHTML += `<td data-label="ID Faq">` + aOfFaq[i]["id_faq"] + `</td>`;
        sHTML += `<td data-label="Num Centre">` + aOfFaq[i]["id_center"] + `</td>`;
        sHTML += `<td data-label="Question">` + htmlspecialchars_decode(aOfFaq[i]["faq_question"]) + `</td>`;
        sHTML += `<td data-label="Réponse">` + htmlspecialchars_decode(aOfFaq[i]["faq_answer"]) + `</td>`;
        sHTML += `<td data-label="Order">` + aOfFaq[i]["faq_order"] + `</td>`;
        sHTML += `<td data-label="Status">` + aOfFaq[i]["faq_status"] + `</td>`;
        sHTML += `<td>
        <a class="edit" data-toggle="modal" data-target="#addEditModal" onclick="editFaq(` + i + `)"><i class="material-icons edit" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
        <a class="delete" data-toggle="modal" data-target="#deleteModal" onClick="deleteFaq(` + i + `)"><i class="material-icons delete" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td>`

        sHTML += `</tr>`;
    }
    sHTML += "</tbody>";
    $('#table_faq').html(sHTML);
    tables = $('#table_faq').DataTable(jDatatableConfig);
}

/****************************ADD FAQ SERVER**************************/
var aOfFaq = [];
function add_faq_server() {

    var datas = {
        page: "adm_faq_add",
        numCenter: $('#numCenter').val(),
        question: $('#question').summernote('code'),
        answer: $('#reponse').summernote('code'),
        order: $('#order').val(),
        status: $('#status').val(),
        bJSON: 1
    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false
    })
        .done(function (result) {
            if (result["error_form"] === undefined || result["error_form"].length == 0) {
                $("#addEditModal").hide();
                $(".modal-backdrop").hide();
                toastr.success('Enregistrement du fournisseur réussi !', 'Succès');
                tables.clear();
                tables.destroy();
                loadFaq();
                cleanForm();
            }
            else {
                cleanFormError()
                //Fetch JSON to display all key / values from json
                var aOfKeys = [];
                result["error_form"].forEach(jError => {
                    aOfKeys = Object.keys(jError);
                    aOfKeys.forEach(sKey => {
                        //Va afficher dans chaque span les error reçu en JSON avec les key/value                   
                        $(`#${sKey}_error`).html(jError[sKey]);
                    });
                });
            }
        })
        .fail(function (err) {
            alert('error : ' + err.status);
        })
        .always(function () {
            console.log('arguments add faq', arguments);
        })
}

/****************************EDIT ELEMENT FAQ DATATABLE-> MODALFORM****************************/

var iIndiceEditionEncours;

function editFaq(iIndiceEdit) {
    $("#btn_add_faq").hide();
    $("#btn_modify_faq").show();
    iIndiceEditionEncours = iIndiceEdit;
    $('#numCenter').val(aOfFaq[iIndiceEdit]["id_center"]);
    $('#question').summernote('code', htmlspecialchars_decode(aOfFaq[iIndiceEdit]["faq_question"]));
    $('#reponse').summernote('code', htmlspecialchars_decode(aOfFaq[iIndiceEdit]["faq_answer"]));
    $('#order').val(aOfFaq[iIndiceEdit]["faq_order"]);
    $('#status').val(aOfFaq[iIndiceEdit]["faq_status"]);
}

/****************************UPDATE ELEMENT FAQ->BDD****************************/


function modifyFaq() {

    var datas = {
        page: "adm_faq_update",
        idFaq: aOfFaq[iIndiceEditionEncours]["id_faq"],
        numCenter: $('#numCenter').val(),
        question: $('#question').summernote('code'),
        answer: $('#reponse').summernote('code'),
        order: $('#order').val(),
        status: $('#status').val(),
        bJSON: 1
    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false
    })
        .done(function (result) {
            if (result["error_form"] === undefined || result["error_form"].length == 0) {
                $("#addEditModal").hide();
                $(".modal-backdrop").hide();
                toastr.success('Modification de la faq réussi !', 'Succès');
                tables.clear();
                tables.destroy();
                loadFaq();
                cleanForm();
            }
            else {
                cleanFormError()
                //Fetch JSON to display all key / values from json
                var aOfKeys = [];
                result["error_form"].forEach(jError => {
                    aOfKeys = Object.keys(jError);
                    aOfKeys.forEach(sKey => {
                        //Va afficher dans chaque span les error reçu en JSON avec les key/value                   
                        $(`#${sKey}_error`).html(jError[sKey]);
                    });
                });
            }
        })
        .fail(function (err) {
            alert('error : ' + err.status);
        })
        .always(function () {
            console.log('arguments add faq', arguments);
        })

}


/******************************DELETE ELEMENT->iIndiceDeleteEncours*****************************/

var iIndiceDeleteEncours;

//Recup iIndiceDelete et met dans iIndiceDeleteEncours
function deleteFaq(iIndiceDelete) {
    var supName = aOfFaq[iIndiceDelete]["faq_storeName"];
    $("#deleteFaq").val(supName);
    iIndiceDeleteEncours = iIndiceDelete;
}

/******************************DELETE ELEMENT SUPPLIER BDD*****************************/

function delete_faq_server(iIndiceDeleteEnCours) {

    showLoadingModal();
    //Envoyer l'indice à la page adm_faq_delete
    let datas = {
        page: "adm_faq_delete",
        bJSON: 1,
        bLoadHtml: 0,
        id_faq: aOfFaq[iIndiceDeleteEnCours]["id_faq"]
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
            toastr.success('Suppression de la FAQ réussi !', 'Succès');
            // tables.clear();
            // tables.destroy();
            loadFaq();
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
function cleanForm() {
    $("#btn_modify_faq").hide();
    $("#btn_add_faq").show();
    $('#numCenter').val("");
    $('#question').summernote('code', '');
    $('#reponse').summernote('code', '');
    $('#order').val("");
    $('#status').val("");
}

function cleanFormError() {
    $('#numCenter_error').html("");
    $('#question_error').html("");
    $('#answer_error').html("");
    $('#order_error').html("");
    $('#status_error').html("");
}


/******************************jDatatableConfig DATATABLE *******************/

const jDatatableConfig = {
    "stateSave": false,
    "order": [
        [1, "asc"]
    ],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "Tous"]
    ],
    "language": {
        "info": "FAQ _START_ à _END_ sur _TOTAL_",
        "emptyTable": "Aucune FAQ",
        "lengthMenu": "_MENU_ FAQ par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "FAQ 0 à 0 sur 0 sélectionnée",
    },
    "columns": [{
        "orderable": false /* Id faq */
    },
    {
        "orderable": true /* Num Centre */
    },
    {
        "orderable": true /* Question */
    },
    {
        "orderable": true /* Réponse */
    },
    {
        "orderable": false /* Order */
    },
    {
        "orderable": false/* Status */
    },
    {
        "orderable": false/* Rest */
    }
    ],
    'retrieve': true,
    "responsive": true
};


/****************************READY************************************* */

var tables;

$(document).ready(function () {
    $('#question').summernote();
    $('#reponse').summernote();
    loadFaq();
});