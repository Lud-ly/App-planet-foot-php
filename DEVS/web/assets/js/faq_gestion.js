var iQuestionEnEdition;
var tables;

/**
 * Tables of questions for FAQ.
 */
var aOfQuestions = [];

//To check that the questions fit into the table.
console.log("aOfQuestions => ", aOfQuestions)

function loadFaq() {
    // showLoadingModal();
    const parser = new DOMParser;
	/*
    var datas = {
        page: "faq_gestion_liste",
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
	*/
			var result= [{"id_questionfaq":"1","id_center":"1","label_questionfaq":"Fake question 1 mtp","answer_questionfaq":"Fake answer 1","position_questionfaq":"1"},{"id_questionfaq":"4","id_center":"2","label_questionfaq":"Fake question 1 tls","answer_questionfaq":"Fake answer 4","position_questionfaq":"1"},{"id_questionfaq":"2","id_center":"1","label_questionfaq":"Fake question 2 mtp","answer_questionfaq":"Fake answer 2","position_questionfaq":"2"},{"id_questionfaq":"3","id_center":"1","label_questionfaq":"Fake question 3 mtp","answer_questionfaq":"Fake answer 3","position_questionfaq":"3"}];
            var id_questionfaq = 0;
            for (var ligne in result) {
                let dom = parser.parseFromString(
                    '<!doctype html><body>' + result[ligne]["answer_questionfaq"],
                    'text/html'
                );
                result[ligne]["answer_questionfaq"] = dom.body.textContent
                aOfQuestions[id_questionfaq] = [];
                aOfQuestions[id_questionfaq]["id_questionfaq"] = result[ligne]["id_questionfaq"];
                aOfQuestions[id_questionfaq]["position_questionfaq"] = result[ligne]["position_questionfaq"];
                aOfQuestions[id_questionfaq]["label_questionfaq"] = result[ligne]["label_questionfaq"];
                aOfQuestions[id_questionfaq]["answer_questionfaq"] = result[ligne]["answer_questionfaq"];
                id_questionfaq++;
                
            }
            // INIT DATATABLE
            // Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
            // tables.page.len(10).draw();
            constructQuestions();
            tables = $('#table_questions').DataTable(configuration);
	/*
        })
        .fail(function (err) {
            alert('error : ' + err.status);
        });
	*/
}

/**
 * Function to display tables.
 */
function constructQuestions() {
    var sHTML = "";
    sHTML += "<thead>";
    sHTML += "<tr>";
    sHTML += "<td>Id</td>";
    sHTML += "<td>Position</td>";
    sHTML += "<td>Questions</td>";
    sHTML += "<td>Réponse</td>";
    sHTML += "<td>Editer</td>";
    sHTML += "<td>Supprimer</td>";
    sHTML += "</tr>";
    sHTML += "</thead>";
    sHTML += "<tbody>";

    for (var i = 0; i < aOfQuestions.length; i++) {
        sHTML += "<tr id=" + i + ">";
        sHTML += "<td>" + aOfQuestions[i]["id_questionfaq"] + "</td>";
        sHTML += "<td>" + aOfQuestions[i]["position_questionfaq"] + "</td>";
        sHTML += "<td>" + aOfQuestions[i]["label_questionfaq"] + "</td>";
        sHTML += "<td>" + aOfQuestions[i]["answer_questionfaq"] + "</td>";
        sHTML += "<td onClick=\"newQuestion(), displayQuestion(" + i + ")\"><img src=\"assets/img/edit.png\" alt=\"logo stylo pour éditer\" height=\"25px\"></td>";
        sHTML += "<td><img src=\"assets/img/trash.png\" onClick='displayModal(" + i + ")' alt=\"logo poubelle pour supprimer\" height=\"25px\"></td>";
        sHTML += "</tr>";

    }

    sHTML += "</tbody>";
    $('#table_questions').html(sHTML);
}

function newQuestion() {
    console.log("coucou")
    $("#faq_gestion_new_question").show()
}

function empty_input_reset() {
    $('#inputNumber').css("border", "1px solid #ced4da");
    $('#questions').css("border", "1px solid #ced4da");
    $('.note-editable').css("border", "1px solid #ced4da");
}

var bFieldsNOK = false;

function faq_gestion_fields() {
    empty_input_reset()
    if ($('#inputNumber').val() == '') {
        $('#inputNumber').css("border", "1px solid red");
        var boolPosition = false;
    } else {
        $('#inputNumber').css("border", "1px solid #ced4da");
        var boolPosition = true;
    }
    if ($('#questions').val() == '') {
        $('#questions').css("border", "1px solid red");
        var boolQuestion = false;
    } else {
        $('#questions').css("border", "1px solid #ced4da");
        var boolQuestion = true;
    }
    if ($('#reponseSummernote').val() == '') {
        $('.note-editable').css("border", "1px solid red");
        var boolAnswer = false;
    } else {
        $('.note-editable').css("border", "1px solid #ced4da");
        var boolAnswer = true;
    }
    bFieldsNOK = (boolPosition & boolQuestion & boolAnswer) ? true : false;
    // if (bFieldsNOK = boolPosition &  boolQuestion & boolAnswer) {
    //     addQuestion();
    // } else {
    //     $("#resultat_empty_input").html("Tous les champssss ne sont pas remplis.");
    // }

}
/**
 * add a question in database
 * 
 * build table and call datatable
 * 
 */
function addQuestion() {
    // showLoadingModal();
    var datas = 
    {
        page: "faq_gestion_insert",
        bJSON: 1,
        id_questionfaq: $('#inputId').val(),
        position_questionfaq: $('#inputNumber').val(),
        label_questionfaq: $('#questions').val(),
        answer_questionfaq: $('#reponseSummernote').val()
    }
    faq_gestion_fields();
    console.log(bFieldsNOK)
    if (!bFieldsNOK) 
    {
        $("#resultat_empty_input").html("Tous les champs ne sont pas remplis.");

    } else 
    {
        $.ajax(
            {
                type: "POST",
                url: "route.php",
                async: true,
                data: datas,
                dataType: "json",
                cache: false,
            })
    
            .done(function (result)
            {
                const parser = new DOMParser;
                let dom = parser.parseFromString(
                    '<!doctype html><body>' + result.answer_questionfaq,
                    'text/html'
                );
                console.log("result => ",result)
                // var id_questionfaq = 0;
                var lastIndex = aOfQuestions.length;
                aOfQuestions[lastIndex] = [];
                aOfQuestions[lastIndex]["id_questionfaq"] = result.id_questionfaq;
                aOfQuestions[lastIndex]["position_questionfaq"] = result.position_questionfaq;
                aOfQuestions[lastIndex]["label_questionfaq"] = result.label_questionfaq;
                aOfQuestions[lastIndex]["answer_questionfaq"] = dom.body.textContent;

                aOfQuestions.sort((a,b) => parseFloat(a.position_questionfaq) - parseFloat(b.position_questionfaq));
                rebuildDatatablesFAQ();
                reset();
            })
        .fail(function (err) {
            console.log('ERR ', err);
        });
    }
}

/**
 * Recuperates the question and answers it in the input and summernote.  
 * Then make the necessary buttons appear. 
 */
function displayQuestion(iQuestionEdit) {
    iQuestionEnEdition = iQuestionEdit;
    $("#inputId").val(aOfQuestions[iQuestionEdit]["id_questionfaq"]);
    $("#inputNumber").val(aOfQuestions[iQuestionEdit]["position_questionfaq"]);
    $("#questions").val(aOfQuestions[iQuestionEdit]["label_questionfaq"]);
    $("#reponseSummernote").summernote('code', aOfQuestions[iQuestionEdit]["answer_questionfaq"]);
    //To check the button edit
    console.log($('#faq_controls_btn_edit'));
    $('#faq_controls_btn_edit').attr('onclick', 'updateQuestion(' + iQuestionEdit + ')');
    showModify();
    // $("#faq_gestion_new_question").toggle();
}


/**
 * Update a question in database
 * 
 * build table and call datatable
 * 
 */
function updateQuestion() {
    var datas = {
        page: "faq_gestion_update",
        bJSON: 1,
        id_questionfaq: $('#inputId').val(),
        position_questionfaq: $('#inputNumber').val(),
        label_questionfaq: $('#questions').val(),
        answer_questionfaq: $('#reponseSummernote').val(),
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
            faq_gestion_fields()
            if (!bFieldsNOK) {
                $("#resultat_empty_input").html("Tous les champs ne sont pas remplis.");
            } else {
                aOfQuestions[iQuestionEnEdition]["id_questionfaq"] = $('#inputId').val();
                aOfQuestions[iQuestionEnEdition]["position_questionfaq"] = $('#inputNumber').val();
                aOfQuestions[iQuestionEnEdition]["label_questionfaq"] = $('#questions').val();
                aOfQuestions[iQuestionEnEdition]["answer_questionfaq"] = $('#reponseSummernote').val();
                reset();
                aOfQuestions.sort((a,b) => parseFloat(a.position_questionfaq) - parseFloat(b.position_questionfaq));
                rebuildDatatablesFAQ();
                showAdd();
            }
        })

        .fail(function (err) {
            console.log('error : ' + err.status);
        });

}

/**
 * Cancels a manipulation when clicked on the "cancel" button.
 * Make the new buttons appear and empty the inputs and summernote.
 */
function cancelQuestion() {
    showAdd();
    reset();
    $("#faq_gestion_new_question").hide();
}


/**
 * delete a movie in database
 * 
 * build table and call datatable
 * 
 */
function deleteQuestion(iIndiceSuppr) {
    showLoadingModal();
    var datas = {
        page: "faq_gestion_delete",
        bJSON: 1,
        id_questionfaq: aOfQuestions[iIndiceSuppr]["id_questionfaq"]
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
            for (var i = iIndiceSuppr; i < (aOfQuestions.length - 1); i++) {
                aOfQuestions[i] = aOfQuestions[i + 1];
            }
            aOfQuestions.length--;
            rebuildDatatablesFAQ();
            $("#exampleModalCenter").modal("hide")
            hideLoadingModal();
            showAdd()
        })
        .fail(function (err) {
            console.log(err);
            alert("zut.");
        });


}


/**
 * Remove a question by removing the elements from the array with splice. 
 * Displays the modal to confirm the deletion of the question. 
 * Then disappear the modal. 
 */
function displayModal(target) {
    $("#deletebtn").attr("onclick", "deleteQuestion(" + target + ")");
    $("#exampleModalCenter").modal("show");
}

/**
 * Functions to show/hide buttons if necessary.
 */
function showAdd() {
    $('#faq_controls_btn_add').removeClass("hide");
    $('#faq_controls_btn_edit').addClass("hide");
    $('#faq_controls_btn_delete').addClass("hide");
    $('#faq_controls_btn_cancel').removeClass("hide");
}

function showModify() {
    $('#faq_controls_btn_add').addClass("hide");
    $('#faq_controls_btn_edit').removeClass("hide");
    $('#faq_controls_btn_delete').addClass("hide");
    $('#faq_controls_btn_cancel').removeClass("hide");
}

/**
 * Reload the table by destroying and rebuilding it.
 */
function majTab() {
    aOfQuestions.destroy();
    constructQuestions();
    aOfQuestions = $('#table_questions').DataTable(configuration);
    reset();
}

/**
 * Empty inputs when you click cancel
 */
function reset() {
    $("#inputNumber").val("");
    $("#questions").val("");
    $(".reponseSummernote").summernote("code", "");
}

/**
 * Configuration datatables
 */
const configuration = {
    "stateSave": false,
    "order": false,
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "tous"]
    ],
    "language": {
        "info": "Questions _START_ à _END_ sur _TOTAL_",
        "emptyTable": "Aucune question",
        "lengthMenu": "_MENU_ Questions par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Questions 0 à 0 sur 0 sélectionnée",
    },
    "columns": [{
            "visible": false
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
        {
            "orderable": false
        },
    ],
    'retrieve': true,
    'responsive': true,
    'autoWidth': false
};

function firstInit() {
    loadFaq();
    var myMainHeight = 300;
    var myMainWidth = 1000;
    $('.reponseSummernote').summernote({
        maxWidth: myMainWidth,
        maxHeight: myMainHeight,
        lang: "fr-FR",
        width: myMainWidth,
        height: myMainHeight,
        toolbar: [
            ['style', ['style', 'bold', 'italic', 'underline']],
            ['font', ['strikethrough']],
            ['style', ['clear']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['link', ['link']],
            ['picture', ['picture']],
            ['video', ['video']],
            ['hr', ['hr']],
            ['codeview', ['codeview']],
            ['undo', ['undo']],
            ['redo', ['redo']]
        ],
        fontNames: [
            'Arial', 'Arial Black', 'Verdana'
        ]
    });

    /**
     * Empty the summernote
     */
    $('#reponseSummernote').summernote("code", "");
    $('#myTable').DataTable({
        "language": {
            "sProcessing": "Traitement en cours ...",
            "sLengthMenu": "Afficher _MENU_ lignes",
            "sZeroRecords": "Aucun résultat trouvé",
            "sEmptyTable": "Aucune donnée disponible",
            "sInfo": "Lignes _START_ à _END_ sur _TOTAL_",
            "sInfoEmpty": "Aucune ligne affichée",
            "sInfoFiltered": "(Filtrer un maximum de_MAX_)",
            "sInfoPostFix": "",
            "sSearch": "Chercher:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Chargement...",
            "oPaginate": {
                "sFirst": "Premier",
                "sLast": "Dernier",
                "sNext": "Suivant",
                "sPrevious": "Précédent"
            },
            "oAria": {
                "sSortAscending": ": Trier par ordre croissant",
                "sSortDescending": ": Trier par ordre décroissant"
            }
        }
    });
};

$( document ).ready(function() {
    firstInit();
});

/**
 * Reload data by destroying and rebuilding it. 
 */
function rebuildDatatablesFAQ() {
    tables.clear();
    tables.destroy();
    constructQuestions();
    tables = $('#table_questions').DataTable(configuration);
    console.log("coucou", tables)
}