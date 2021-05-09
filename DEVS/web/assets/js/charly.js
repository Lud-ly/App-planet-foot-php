console.log("test");
var aOfQuestions = [];
    aOfQuestions[0] = [];
    // aOfQuestions[0]["place"] = "1";
    aOfQuestions[0]["questions"] = "Comment ça marche?";
    aOfQuestions[0]["reponse"] = "Comme ceci";
//le(s) tableau(x) des questions de la FAQ


//la fonction permettant d'afficher le(s) tableau(x)
function constructQuestions() {
    var i;

    var sHTML = "";
    sHTML += "<thead>";
    sHTML += "<tr>";
    // sHTML += "<td>Place</td>";
    sHTML += "<td>Questions</td>";
    sHTML += "<td>Réponse</td>";
    sHTML += "<td>Editer</td>";
    sHTML += "<td>Supprimer</td>";
    sHTML += "</tr>";
    sHTML += "</thead>";
    sHTML += "<tbody>";

    for (i = 0; i < aOfQuestions.length; i++) {
        sHTML += "<tr id="+ i +">";
        // sHTML += "<td>" + aOfQuestions[i]["place"] + "</td>";
        sHTML += "<td>" + aOfQuestions[i]["questions"] + "</td>";
        sHTML += "<td>" + aOfQuestions[i]["reponse"] + "</td>";
        sHTML += "<td onClick=\"displayQuestion(" + i + ")\"><img src=\"assets/img/editer.png\" alt=\"logo poubelle pour supprimer\" height=\"25px\"></td>";
        sHTML += "<td onClick=\"supprimQuestion(" + i + ")\"><img src=\"assets/img/poubelle.png\" alt=\"logo stylo pour éditer\" height=\"25px\"></td>";
        sHTML += "</tr>";
    }

    sHTML += "</tbody>";
    $('#table_questions').html(sHTML);
}

//la fonction permettant d'ajouter une question
function ajoutQuestion() {
    var iLongueur = aOfQuestions.length;
    aOfQuestions[iLongueur] = [];
    // aOfQuestions[iLongueur]["place"] = $("#place").val();
    aOfQuestions[iLongueur]["questions"] = $("#questions").val();
    aOfQuestions[iLongueur]["reponse"] = $("#reponseSummernote").val();
    console.log(aOfQuestions[iLongueur]["questions"]);
    constructQuestions();
}

//la fonction permettant de récupérer les informations d'une question
var iQuestionEnEdition

function displayQuestion(iQuestionEdit) {
    iQuestionEnEdition = iQuestionEdit;
    console.log(iQuestionEdit);
    // $("#place").val(aOfQuestions[iQuestionEdit]["place"]);
    $("#questions").val(aOfQuestions[iQuestionEdit]["questions"]);
    $("#reponseSummernote").val(aOfQuestions[iQuestionEdit]["reponse"]);
    console.log($('#faq_controls_btn_edit'))
    $('#faq_controls_btn_edit').attr('onclick', 'editQuestion('+ iQuestionEdit +')')
    // confirm("Voulez-vous modifier cette questions :" + iQuestionEdit);
}

//la fonction permettant d'éditer une question
function editQuestion(iQuestionEdit) {
    iQuestionEnEdition = iQuestionEdit; 
    console.log(iQuestionEnEdition);
    // aOfQuestions[iQuestionEnEdition]["place"] = $('#place').val();
    aOfQuestions[iQuestionEnEdition]["questions"] = $('#questions').val();
    aOfQuestions[iQuestionEnEdition]["reponse"] = $('#reponseSummernote').val();
    constructQuestions();
}


//la fonction qui permet de supprimer une question
function supprimQuestion(iQuestionEdit) {
    iQuestionEnEdition = iQuestionEdit;
    aOfQuestions.splice(iQuestionEnEdition, 1);
    constructQuestions();
}

//la configuration de datatables
const configuration = {
    "stateSave": false,
    "order": [
        [0, "asc"]
    ],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "tous"]
    ],
    "language": {
        "info": "Questions _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucune questions",
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
        }
    ],
    'retrieve': true
};

//la fonction qui permet d'avoir les 10 premiers résultats
var tables;
$(document).ready(function() {
    constructQuestions();
    tables = $('#table_questions').DataTable(configuration);
});

$(document).ready(function() {
    var myMainHeight = 500;
    var myMainWidth = 1105;
    // pour les paramètres, voir summernote.js à partir de la ligne 7320.
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
    // je remplis éventuellement le textarea 
    constructQuestions();
    // Vide le summernote
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
});

//la fonciton permettant de recharger le tableau
// function majTab() {
//     aOfQuestions.destroy();
//     constructQuestions();
//     aOfQuestions = $('#table_questions').DataTable(configuration);
//     reset();
// }

// //la fonciton permettant de vider les inputs après les avoirs renvoyer dans le tableau
// function reset() {
//     $("#place").val("");
//     $("#questions").val("");
//     $("#reponse").val("");
// }