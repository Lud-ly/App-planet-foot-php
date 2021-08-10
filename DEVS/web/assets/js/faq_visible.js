var aOfQuestions = [];

//To check that the questions fit into the table.
console.log("aOfQuestions => ", aOfQuestions)

function loadFaq() {
    // showLoadingModal();
    var datas = {
        page: "faq_visible_list",
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

            aOfQuestions = result

            constructQuestions();
            // tables = $('#table_questions').DataTable(configuration);
        })
        .fail(function (err) {
            alert('error : ' + err.status);
            // constructQuestions();
        })
        .always(function () {
            console.log('arguments faq list', arguments);
        });
}

function constructQuestions() {

    var sHTML = "";
    for (var i = 0; i < aOfQuestions.length; i++) {
        sHTML += "<button type='button' class='questionFaq mb-1' data-toggle='collapse' data-target='#faq" + (i + 1) + "' id='question" + (i + 1) + "'>" + aOfQuestions[i]['faq_question'] + "</button>"
        sHTML += "<div id='faq" + (i + 1) + "' class='collapse mb-3'>" + aOfQuestions[i]['faq_answer'] + "</div>"
    }
    $('#table_questions').html(sHTML);
}

function toggleQuestion(index) {

    $("#panel_" + index).slideToggle("slow");

}

//la fonction qui permet d'avoir les 10 premiers résultats
$(document).ready(function () {
    // constructQuestions();
    loadFaq();
});


