/**************************** CONSTRUCTION TABLEAU ****************************/
var aOfActu = [];
var iIndiceAjout;

function adm_notice_list() {
    let datas = {
        page: 'adm_notice_list',
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
            aOfActu = result;
            constructTable();
        })
        .fail(function(err) {
            err = 'raté';
        })
}

function constructTable() {
    var i;
    var sHTML = "";
    sHTML += "<thead>";
    sHTML += "<tr>";
    sHTML += "<th>Photo</th>";
    sHTML += "<th>Titre</th>";
    sHTML += "<th>Auteur</th>";
    sHTML += "<th>Date de l'article</th>";
    sHTML += "<th data-priority='1'>Status</th>";
    sHTML += "<th>Action</th>";
    sHTML += "</tr>";
    sHTML += "</thead>";
    sHTML += "<tbody>";
    sHTML += "<tr>";


    for (i = 0; i < aOfActu.length; i++) {
        iIndiceAjout = i;
        sHTML += `<td data-label="Photo"><img class="photo" src="assets/img/` + aOfActu[i]["article_url_img"] + ` " alt="Image de l'actualité" /></td>`;
        sHTML += "<td data-label=\"Titre\">" + htmlspecialchars_decode(aOfActu[i]["article_title"]) + "</td>";
        sHTML += "<td data-label=\"Auteur\">" + aOfActu[i]["article_author"] + "</td>";
        sHTML += "<td data-label=\"Date de l'article\">" + aOfActu[i]["article_date"] + "</td>";

        if (aOfActu[i]["article_status"] == 1) {
            sHTML += "<td data-label=\"Status\"><input class=\"checkbox adm_notice_checkbox\" id=\"checkbox_" + i + "\" type=\"checkbox\" checked /><label id=\"checkbox" + i + "\" checked onclick=\"adm_notice_change_status(" + i + ")\" for=\"checkbox_(" + i + ")\"></label></td>";
        } else if (aOfActu[i]["article_status"] == 0) {
            sHTML += "<td data-label=\"Status\"><input class=\"checkbox adm_notice_checkbox\" id=\"checkbox_" + i + "\" type=\"checkbox\"/><label for=\"checkbox_(" + i + ")\" id=\"checkbox" + i + "\" onclick=\"adm_notice_change_status(" + i + ")\"></label></td>"
        }

        sHTML += `<td> 
            <a class="edit" data-toggle="modal" data-toggle="modal" data-target="#editModal" onclick="editActu(` + i + `)"><i class="material-icons edit" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
            <a class="delete" data-toggle="modal" data-toggle="modal" data-target="#deleteModal" onClick="deleteActu(` + i + `)"><i class="material-icons delete" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td>`
        sHTML += "</tr>";
    }
    sHTML += "</tbody>";
    $('#table_actu').html(sHTML);

}


/**************************** DECODE LE HTML SPECIAL CHARS POUR L'AFFICHAGE ****************************/
function htmlspecialchars_decode(str) {
    if (typeof(str) == "string") {
        str = str.replaceAll(/&amp;/g, "&"); /* must do &amp; first */
        str = str.replaceAll(/&quot;/g, '"');
        str = str.replaceAll(/&amp;#039;/g, "'");
        str = str.replaceAll(/&lt;/g, "<");
        str = str.replaceAll(/&gt;/g, ">");
    }
    return str;
}

/**************************** CHANGER LE STATUT D'UNE ACTUALITE ****************************/
function adm_notice_change_status(iIndice) {
    const ERROR_TITLE = "Échec de l'enregistrement";
    const ERROR_MESSAGE = "Une erreur a été rencontrée lors de la mise à jour du status.";
    let bNouveauStatus, id_article;
    bNouveauStatus = !$('#checkbox_' + iIndice).is(":checked");
    id_article = $('#checkbox_' + iIndice).closest('tr').attr('id_article');
    $('#modal_save').show();

    let datas = {
        page: 'adm_notice_status',
        bJSON: 1,
        id_article: aOfActu[iIndice]["id_article"],
        article_status: bNouveauStatus,

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
                aOfActu[iIndice]["article_status"] = bNouveauStatus;
                $('#checkbox_' + iIndice).filter(':checkbox').prop('checked', bNouveauStatus);
            }
        })
        .fail(function(error) {
            showError(error)
            toastr.error(ERROR_MESSAGE, ERROR_TITLE)
        });

}


/**************************** AJOUTER UNE ACTUALITE ****************************/
function addActu() {
    let datas = {
        page: 'adm_notice_insert',
        bJSON: 1,
        article_url_img: $('#adm_notice_newFormatDate').val(),
        article_title: $('#titreAjout').summernote("code"),
        article_subtitle: $('#phrase_accrocheAjout').summernote("code"),
        article_content: $('#contenuAjout').summernote("code"),
        article_author: $('#auteurAjout').val(),
        article_date: $('#date_articleAjout').val(),
        article_time: $('#heure_articleAjout').val(),
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
        if (isEmpty(result.error)) {
            toastr.success('Article ajouté avec succès', 'Succès');
            adm_notice_list();
            tables.clear();
            tables.destroy();
            tables = $('#table_commandes').DataTable(configuration_notice);
        }
    })

    .fail(function(error) {
        showError(error);
        toastr.error('Tous les champs doivent être renseignés', 'Erreur');
    })

    constructTable();
    tables.clear();
    tables.destroy();
    tables = $('#table_commandes').DataTable(configuration_notice);
};


/**************************** MODIFIER UNE ACTUALITE ****************************/
var iIndiceEditionEncours;

/* on affiche les valeurs du tableau dans nos inputs */
function editActu(iIndiceEdit) {
    iIndiceEditionEncours = iIndiceEdit;
    $('#photoEdit').val(aOfActu[iIndiceEdit]["article_url_img"]);
    $('#titreEdit').summernote("code", htmlspecialchars_decode(aOfActu[iIndiceEdit]["article_title"]));
    $('#phrase_accrocheEdit').summernote("code", htmlspecialchars_decode(aOfActu[iIndiceEdit]["article_subtitle"]));
    $('#contenuEdit').summernote("code", htmlspecialchars_decode(aOfActu[iIndiceEdit]["article_content"]));
    $('#auteurEdit').val(aOfActu[iIndiceEdit]["article_author"]);
    $('#date_articleEdit').val(aOfActu[iIndiceEdit]["article_date"]);
    $('#heure_articleEdit').val(aOfActu[iIndiceEdit]["article_time"]);
}

/* Modification de la base de données avec ce qui est renseigné dans les inputs */
function modifyActu(iIndiceEditionEncours) {
    let datas = {
        page: 'adm_notice_update',
        bJSON: 1,
        id_article: aOfActu[iIndiceEditionEncours]["id_article"],
        article_url_img: $('#photoEdit').val(),
        article_title: $('#titreEdit').summernote("code"),
        article_subtitle: $('#phrase_accrocheEdit').summernote("code"),
        article_content: $('#contenuEdit').summernote("code"),
        article_author: $('#auteurEdit').val(),
        article_date: $('#date_articleEdit').val(),
        article_time: $('#heure_articleEdit').val()
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

        if (isEmpty(result.error)) {
            toastr.success('Article modifié avec succès', 'Succès');
            adm_notice_list();
            tables.clear();
            tables.destroy();
            tables = $('#table_commandes').DataTable(configuration_notice);
        }
    })

    .fail(function(error) {
        showError(error);
        toastr.error('Tous les champs doivent être renseignés', 'Erreur');
    })
}

/**************************** SUPPRIMER UNE ACTUALITE ****************************/
var iIndiceDeleteEncours;

function deleteActu(iIndiceDelete) {
    iIndiceDeleteEncours = iIndiceDelete;
    $('#photoDelete').val(aOfActu[iIndiceDelete]["article_url_img"]);
    $('#titreDelete').val(aOfActu[iIndiceDelete]["article_title"]);
    $('#phrase_accrocheDelete').val(aOfActu[iIndiceDelete]["article_subtitle"]);
    $('#contenuDelete').val(aOfActu[iIndiceDelete]["article_content"]);
    $('#auteurDelete').val(aOfActu[iIndiceDelete]["article_author"]);
    $('#date_articleDelete').val(aOfActu[iIndiceDelete]["article_date"]);
    $('#heure_articleDelete').val(aOfActu[iIndiceDelete]["article_time"]);
}


function deleteActuDefinitif(iIndiceDeleteEncours) {
    let datas = {
        page: 'adm_notice_delete',
        bJSON: 1,
        id_article: aOfActu[iIndiceDeleteEncours]["id_article"],
        article_url_img: $('#photoDelete').val(),
        article_title: $('#titreDelete').val(),
        article_subtitle: $('#phrase_accrocheDelete').val(),
        article_content: $('#contenuDelete').val(),
        article_author: $('#auteurDelete').val(),
        article_date: $('#date_articleDelete').val(),
        article_time: $('#heure_articleDelete').val()
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

        adm_notice_list();
        tables.clear();
        tables.destroy();
        tables = $('#table_commandes').DataTable(configuration_notice);
    })

    .fail(function(err) {
        err = 'raté';
    })

}

$(document).ready(function() {
    adm_notice_list();
});


/**************************** CONFIGURATION DU DATATABLE ****************************/
const configuration_notice = {
    "responsive": true,
    "stateSave": true,
    "order": [
        [2, "asc"]
    ],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "Tous"]
    ],
    "language": {
        "info": "Résultats _START_ à _END_ sur _TOTAL_",
        "emptyTable": "Aucune actualité",
        "lengthMenu": "_MENU_ Actualité par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Utilisateurs 0 à 0 sur 0 sélectionnée",
    },
    "columns": [{
            "orderable": true /* photo */
        },
        {
            "orderable": true /* titre */
        },
        {
            "orderable": true /* auteur */
        },
        {
            "orderable": true /* date article */
        },
        {
            "orderable": false
        },
        {
            "orderable": false
        },
    ],
    'retrieve': true
};

var tables;
$(document).ready(function() {
    adm_notice_list()
    tables = $('#table_actu').DataTable(configuration_notice);
});


/**************************** CONFIGURATION DU SUMMEROTE ****************************/
var adm_notice_myMainHeight = 320;
var adm_notice_myMainWidth = 650;
const adm_notice_summernote = {
    "maxWidth": adm_notice_myMainWidth,
    "maxHeight": adm_notice_myMainHeight,
    "lang": "fr-FR",
    "width": adm_notice_myMainWidth,
    "height": adm_notice_myMainHeight,
    "toolbar": [
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
    "fontNames": [
        'Arial', 'Arial Black', 'Verdana'
    ]
}

const adm_notice_myTable = {
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
}



/**************************** LANCEMENT DATATABLE ET SUMMERNOTE QUAND LA PAGE EST CHARGEE ****************************/
var adm_notice_table;
$(document).ready(function() {
    $('.summernote').summernote(adm_notice_summernote);
    $('#contenuEdit').summernote("code", "");
    $('#phrase_accrocheEdit').summernote("code", "");
    $('#titreEdit').summernote("code", "");
    $('#titreAjout').summernote("code", "");
    $('#phrase_accrocheAjout').summernote("code", "");
    $('#contenuAjout').summernote("code", "");
});

/**************************** VERIFICATION DES CHAMPS ****************************/

/****************** Vérification si champs vides lors de l'ajout de l'article ******************/

var bPhoto = false;
var bTitre = false;
var bAccroche = false;
var bArticle = false;
var bAuteur = false;
var bDate = false;
var bHeure = false;
var bValideForm = false;


function signin_verifierFormVideAjout() 
{
    if ($("#new_fichier").val() == '') 
    {
        $("#new_fichier").css('background-color', 'red');
        var bPhoto = false;
    } else {
        $("#new_fichier").css('background-color', 'white');
        var bPhoto = true;
    }

    if ($("#titreAjout").val() == '') {
        $("#titreAjout").css('border-color', 'red');
        $('#titreAjout').css("border-width", "0.25em");
        var bTitre = false;
    } else {
        $("#titreAjout").css('border-color', 'black');
        $('#titreAjout').css("border-width", "0.10em");
        var bTitre = true;
    }

    if ($("#phrase_accrocheAjout").val() == '') {
        $("#phrase_accrocheAjout").css('border-color', 'red');
        $('#phrase_accrocheAjout').css("border-width", "0.25em");
        var bAccroche = false;
    } else {
        $("#phrase_accrocheAjout").css('border-color', 'black');
        $('#phrase_accrocheAjout').css("border-width", "0.10em");
        var bAccroche = true;
    }

    if ($("#contenuAjout").val() == '') {
        $("#contenuAjout").css('border-color', 'red');
        $('#contenuAjout').css("border-width", "0.25em");
        var bArticle = false;
    } else {
        $("#contenuAjout").css('border-color', 'black');
        $('#contenuAjout').css("border-width", "0.10em");
        var bArticle = true;
    }

    if ($("#auteurAjout").val() == '') {
        $("#auteurAjout").css('border-color', 'red');
        $('#auteurAjout').css("border-width", "0.25em");
        var bAuteur = false;
    } else {
        $("#auteurAjout").css('border-color', 'black');
        $('#auteurAjout').css("border-width", "0.10em");
        var bAuteur = true;
    }

    if ($("#date_articleAjout").val() == '') {
        $("#date_articleAjout").css('border-color', 'red');
        $('#date_articleAjout').css("border-width", "0.25em");
        var bDate = false;
    } else {
        $("#date_articleAjout").css('border-color', 'black');
        $('#date_articleAjout').css("border-width", "0.10em");
        var bDate = true;
    }

    if ($("#heure_articleAjout").val() == '') {
        $("#heure_articleAjout").css('border-color', 'red');
        $('#heure_articleAjout').css("border-width", "0.25em");
        var bHeure = false;
    } else {
        $("#heure_articleAjout").css('border-color', 'black');
        $('#heure_articleAjout').css("border-width", "0.10em");
        var bHeure = true;
    }

    bValideForm = bPhoto && bTitre && bAccroche && bArticle && bAuteur && bDate && bHeure;

    if (bValideForm == true) {
        addActu();
        $("#clicAjout").attr("data-dismiss", "modal");
    } else {
        toastr.error('Tous les champs doivent être renseignés', 'Erreur');
    }
}

/****************** Vérification si champs vides lors de la modification de l'article ******************/

var bPhotoEdit = false;
var bTitreEdit = false;
var bAccrocheEdit = false;
var bArticleEdit = false;
var bAuteurEdit = false;
var bDateEdit = false;
var bHeureEdit = false;
var bValideFormEdit = false;

function signin_verifierFormVideEdit() {
    if ($("#photoEdit").val() == '') {
        $("#photoEdit").css('border-color', 'red');
        $('#photoEdit').css("border-width", "0.25em");
        var bPhotoEdit = false;
    } else {
        $("#photoEdit").css('border-color', 'black');   
        $('#photoEdit').css("border-width", "0.10em");
        var bPhotoEdit = true;
    }

    if ($("#titreEdit").val() == '') {
        $("#titreEdit").css('border-color', 'red');
        $('#titreEdit').css("border-width", "0.25em");
        var bTitreEdit = false;
    } else {
        $("#titreEdit").css('border-color', 'black');
        $('#titreEdit').css("border-width", "0.10em");
        var bTitreEdit = true;
    }

    if ($("#phrase_accrocheEdit").val() == '') {
        $("#phrase_accrocheEdit").css('border-color', 'red');
        $('#phrase_accrocheEdit').css("border-width", "0.25em");
        var bAccrocheEdit = false;
    } else {
        $("#phrase_accrocheEdit").css('border-color', 'black');
        $('#phrase_accrocheEdit').css("border-width", "0.10em");
        var bAccrocheEdit = true;
    }

    if ($("#contenuEdit").val() == '') {
        $("#contenuEdit").css('border-color', 'red');
        $('#contenuEdit').css("border-width", "0.25em");
        var bArticleEdit = false;
    } else {
        $("#contenuEdit").css('border-color', 'black');
        $('#contenuEdit').css("border-width", "0.10em");
        var bArticleEdit = true;
    }

    if ($("#auteurEdit").val() == '') {
        $("#auteurEdit").css('border-color', 'red');
        $('#auteurEdit').css("border-width", "0.25em");
        var bAuteurEdit = false;
    } else {
        $("#auteurEdit").css('border-color', 'black');
        $('#auteurEdit').css("border-width", "0.10em");
        var bAuteurEdit = true;
    }

    if ($("#date_articleEdit").val() == '') {
        $("#date_articleEdit").css('border-color', 'red');
        $('#date_articleEdit').css("border-width", "0.25em");
        var bDateEdit = false;
    } else {
        $("#date_articleEdit").css('border-color', 'black');
        $('#date_articleEdit').css("border-width", "0.10em");
        var bDateEdit = true;
    }

    if ($("#heure_articleEdit").val() == '') {
        $("#heure_articleEdit").css('border-color', 'red');
        $('#heure_articleEdit').css("border-width", "0.25em");
        var bHeureEdit = false;
    } else {
        $("#heure_articleEdit").css('border-color', 'black');
        $('#heure_articleEdit').css("border-width", "0.10em");
        var bHeureEdit = true;
    }

    bValideFormEdit = bPhotoEdit && bTitreEdit && bAccrocheEdit && bArticleEdit && bAuteurEdit && bDateEdit && bHeureEdit;

    if (bValideFormEdit == true) {
        modifyActu(iIndiceEditionEncours);
        $("#clicEdit").attr("data-dismiss", "modal");
    } else {
        toastr.error('Tous les champs doivent être renseignés', 'Erreur');

    }
}

/****************** UPLOAD DU FICHIER ******************/
function doUpload() {
    // la fenêtre de chargement
    $('#divModalSaving').show();
    // je submit les données suivantes :
    // new_fichier = url local du fichier
    // page = upload_fichier
    // bJSON = 1
    // on met le contenu de l'id "new fichier" dans la variable "str" 
    var str = $('#new_fichier').val();
    console.log(str)
    // on coupe chaque segment du nom du fichier séparé par un point et on le met dans le tableau 
    // ex: kiwi.jpg = colonne 1:kiwi / colonne 2:jpg
    var aOfDate = str.split(".");
    // on récupère la dernière colonne du tableau (où se trouve le nom de l'xtension) et on la met dans la variable extension précédée d'un point
    var extension = "." + aOfDate[aOfDate.length - 1];

    Nom_fichier_image();

    date += extension;

    $('#adm_notice_newFormatDate').val("article_" + date);


    $('#uploadForm').submit();
    
}

function Nom_fichier_image() 
{
    date = new Date();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : '' + month;

    var day = date.getDate();
    day = day < 10 ? '0' + day : '' + day;

    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : '' + minutes;

    date = day + "_" + month + "_" + minutes;

    return date;
}  
