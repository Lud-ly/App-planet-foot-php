
$(document).ready(function () {
    getPollList();

    $("#polls").bind('click', function () {

        nbAnswer = 0;
    })
});

var oAnswers = {};
var aOfAnswers = [];
var nbAnswer = 0;



function selectAnswer(indice) {

    if (aOfAnswers.length <= aOfPolls.length) {

        if (nbAnswer == 2) {
            Swal.fire({
                title: 'Veuillez choisir une autre question',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });

            return;
        }

        aOfAnswers.push(aOfPolls[indice]['name']);
        nbAnswer++
        $("#answers" + indice).empty();
        $("#answers" + indice).fadeOut();

        for (var i = 0; i < aOfAnswers.length; i++) {
            oAnswer = aOfAnswers[i];
            oAnswers[i] = oAnswer;
        }


    }


    console.log("oAnswers->", oAnswers);
    console.log("aOfAnswers->", aOfAnswers[0]);
    console.log("aOfAnswers->", aOfAnswers[1]);
}

function sendMessage(indice) {
    var datas = {
        page: "pollAdd",
        username: $("#username").val(),
        message: $("#message").val(),
        answer1: aOfAnswers[0],
        answer2: aOfAnswers[1],
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
            console.log(result);
            if (result["isValid"]) {
                console.log('ok');
            }
            else {

                var sMessage;
                for (var iField = 0; iField < result.invalidFields.length; iField++) {

                    var sField = Object.keys(result.invalidFields[iField])[0];
                    console.log(sField);
                    sMessage = (result.invalidFields[iField][sField]);
                    $("#" + sField + " + span").html(sMessage);
                    $("#" + sField).css("border", "3px solid red");
                }

                Swal.fire({
                    title: 'formulaire invalide',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            }
            console.log(result);
        })
        // Dans le ".fail", si il y'a eu une erreur d'exécution côté serveur.
        .fail(function (err) {
            // alert('error : ' + err.status);

        })
}




var aOfPolls = [];

function getPollList() {
    //showLoadingModal();
    var datas = {
        page: "pollList",
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

            aOfPolls = result;
            console.log(aOfPolls);
            var oPoll;
            var oResult = {};
            for (var i = 0; i < aOfPolls.length; i++) {
                oPoll = aOfPolls[i];
                oResult[oPoll.id] = oPoll.subject;
            }
            console.log("Objet oResult", oResult);
            //J' appelle la function dans utils.js qui construit mes options du select 
            //Je selectionne l'id 1 par default dans le select
            $("#polls").html(createOptionForSelectHtml(oResult, false, '1'));

            editPolls();

        })
        .fail(function (err) {
            alert('error : ' + err.status);


        })
}

function getPoll(poll_id) {

    for (var i = 0; i < aOfPolls.length; i++) {
        oPoll = aOfPolls[i];
        if (oPoll.id == poll_id) {
            return oPoll;
        }
    }
}
let indice;
function editPolls(element) {
    $("#answers").empty();
    let poll_id = $(element).value() ?? 1;
    let oPoll = getPoll(poll_id);
    console.log("oPoll", oPoll.name);
    for (var i = 0; i < aOfPolls.length; i++) {
        indice = i;
        if (aOfPolls[i]['id'] == poll_id) {
            $("#answers").append('<div id="answers' + indice + '" class="contAnswers" onclick="selectAnswer(' + indice + ')"><p class="m-3">' + aOfPolls[i]["name"] + '</p></div>');
        }
    }
}





