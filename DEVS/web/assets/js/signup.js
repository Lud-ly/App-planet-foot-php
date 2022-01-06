
$(function () {
    $("#nom_fichier_fournisseur").hide();
    $("#cleansheetForm").hide();

});

/*****************************************CLEAR FORM***************************************** */
function clearForm() {
    $("input[type=text]").val("");
    $("input[type=email]").val("");
    $("input[type=tel]").val("");
    $("textarea").val("");
    $(".error").hide();
    $("input").css("border", "1px solid green");
    $("textarea").css("border", "1px solid green");
    $("#cleansheetForm").hide();
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

var aOfImage = [];
function add_user_server() {


    var datas = {
        page: "signup_add",
        addImage: $("#nom_fichier_fournisseur").val(),
        user_password: $("#user_password").val(),
        addName: $("#addName").val(),
        addEmail: $("#addEmail").val(),
        addPhone: $("#addPhone").val(),
        addAddress: $("#addAddress").val(),
        addCity: $("#addCity").val(),
        addZip: $("#addZip").val(),
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
            // J'affiche l'image GIF de la roue dentée qui tourne, indiquant le chargement
            showLoadingModal();
            // C'est dans result que je recevrais les données de la base de données
            // Ensuite,après verif du form ici, j'appellerai ma fonction qui ajoute mes données dans la BDD
            if (result["isValid"]) {
                // $("#addModal").attr("data-dismiss", "modal");

                // toastr.success('Enregistrement de l\' image réussi !', 'Succès');
                // alert('enregistrement réussi ! bravo');
                clearForm();
                $('#div_preview_img').fadeOut();
                window.location.replace('index');

                hideLoadingModal();
            }
            else {
                //toastr.error('Erreur', 'Vérifier vos champs');
                // Je boucle sur les champs et  j'affiche les erreurs dans les span sous les input
                var sMessage;
                for (var iField = 0; iField < result.invalidFields.length; iField++) {

                    var sField = Object.keys(result.invalidFields[iField])[0];
                    sMessage = (result.invalidFields[iField][sField]);
                    $("#" + sField + " + span").html(sMessage);
                    $("#" + sField).css("border", "3px solid red");
                }
                $("#cleansheetForm").show();
                $(".error").show();
                hideLoadingModal();
            }
        })
        // Dans le ".fail", si il y'a eu une erreur d'exécution côté serveur.
        .fail(function (err) {
            alert('error : ' + err.status);
            $("#cleansheetForm").show();
        })
        .always(function () {
            console.log('arguments add customers', arguments);
            //je cache l'image GIF 

        })
}
/**
     * Hide the loading modal
     */
function hideLoadingModal() {
    $('#loadingModal').hide();
}
/**
 * Show the loading modal
 */
function showLoadingModal() {
    $('#loadingModal').show();
}


