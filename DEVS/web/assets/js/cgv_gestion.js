/**************************** CONSTRUCTION DU TABLEAU ****************************/
var aOfTexte= [];

function cgv_gestion_list() {
    let datas = {
        page: 'cgv_gestion_list',
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
        aOfTexte= result;
        var i;
        var sHTML= "";
        sHTML+= "<thead>";
        sHTML+= "<tr>";
        sHTML+= "<th>Nom de la page</th>";
        sHTML+= "<th>titre</th>";
        sHTML+= "<th>texte</th>";
        sHTML+= "<th>Action</th>";
        sHTML+= "</tr>";
        sHTML+= "</thead>";
        sHTML+= "<tbody>";
        sHTML+= "<tr>";

        for ( i= 0; i < result.length; i++)	
        {
            sHTML+= "<td data-label=\"Nom de la page\">" + aOfTexte[i]["page_title"] + "</td>";
            sHTML+= "<td data-label=\"titre\">" + htmlspecialchars_decode(aOfTexte[i]["page_content_title"]) + "</td>";
            sHTML+= "<td data-label=\"texte\">" + htmlspecialchars_decode(aOfTexte[i]["page_content"]) + "</td>";
            sHTML+= "</td>"
            sHTML+= `<td> 
            <a class="edit" data-toggle="modal" data-toggle="modal" data-target="#editModal" onclick="editTexte(` + i + `)"><i class="material-icons edit" data-toggle="tooltip" title="Edit">&#xE254;</i></a></td>`
            sHTML+= "</tr>";
        }
        sHTML+= "</tbody>";
        $('#table_texte').html(sHTML);
    })

    .fail(function(err) {
        err = 'raté';
        console.log(err)
    })
}

function htmlspecialchars_decode(str) 
{
    if (typeof(str) == "string") {
        str = str.replaceAll(/&amp;/g, "&"); /* must do &amp; first */
        str = str.replaceAll(/&quot;/g, '"');
        str = str.replaceAll(/&amp;#039;/g, "'");
        str = str.replaceAll(/&lt;/g, "<");
        str = str.replaceAll(/&gt;/g, ">");
    }
    return str;
}

/**************************** MODIFIER UN TEXTE ****************************/
var iIndiceEditionEncours;

function editTexte(iIndiceEdit) 
{
    iIndiceEditionEncours = iIndiceEdit;
    $('#titrePageEdit').val(aOfTexte[iIndiceEdit]["page_title"]);
    $('#titreEdit').summernote("code", htmlspecialchars_decode(aOfTexte[iIndiceEdit]["page_content_title"]));
    $('#texteEdit').summernote("code", htmlspecialchars_decode(aOfTexte[iIndiceEdit]["page_content"]));
}

function modifyTexte(iIndiceEditionEncours) 
{
    let datas = {
        page: 'cgv_gestion_update',
        bJSON: 1,
        id_page:aOfTexte[iIndiceEditionEncours]["id_page"],
        page_title: $('#titrePageEdit').val(),
        page_content_title: $('#titreEdit').summernote("code"),
        page_content: $('#texteEdit').summernote("code"),
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
            toastr.success('Texte modifié avec succès', 'Succès');
            cgv_gestion_list();
            tables.clear();
            tables.destroy();
            tables = $('#table_texte').DataTable(configuration);
        } 
    })
    .fail(function(error) {
        showError(error);
        toastr.error('Tous les champs doivent être renseignés', 'Erreur');
    })
}

$(document).ready(function() 
{
	cgv_gestion_list();
});


/**************************** CONFIGURATION DU DATATABLE ****************************/

const configuration = 
{
	"responsive": true,
	"stateSave": true,
	"order": [[2, "asc"]],
	"pagingType": "simple_numbers",
	"searching": true,
	"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tous"]], 
    "language": 
    {
        "info": "Résultats _START_ à _END_ sur _TOTAL_",
        "emptyTable": "Aucun texte",
        "lengthMenu": "_MENU_ texte par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": 
        {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty":      "Textes 0 à 0 sur 0 sélectionnée",
    },
	"columns": [
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
	'retrieve': true
};

/**************************** CONFIGURATION DU SUMMEROTE ****************************/
var cgv_gestion_myMainHeight = 320;
var cgv_gestion_myMainWidth = 650;

const cgv_gestion_summernote = {
    "maxWidth": cgv_gestion_myMainWidth,
    "maxHeight": cgv_gestion_myMainHeight,
    "lang": "fr-FR",
    "width": cgv_gestion_myMainWidth,
    "height": cgv_gestion_myMainHeight,
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

const cgv_gestion_myTable = {
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


var tables;
$(document).ready(function() 
{
	cgv_gestion_list();
	tables = $('#table_texte').DataTable(configuration);
    $('.summernote').summernote(cgv_gestion_summernote);
    $('#titreEdit').summernote("code", "");
    $('#texteEdit').summernote("code", "");
});

/****************** Vérification si champs vides ajout article ******************/

var bTitrePage = false;
var bTitreTexte = false;
var bTexte = false;
var bValideForm = false;


function signin_verifierFormVideEdit() 
{
    if ($("#titrePageEdit").val() == '') 
    {
        $("#titrePageEdit").css('border-color', 'red');
        $('#titrePageEdit').css("border-width", "0.25em");
        var bTitrePage = false;
    } 
    else 
    {
        $("#titrePageEdit").css('border-color', 'black');
        $('#titrePageEdit').css("border-width", "0.10em");
        var bTitrePage = true;
    }
    if ($("#titreEdit").val() == '') 
    {
        $("#titreEdit").css('border-color', 'red');
        $('#titreEdit').css("border-width", "0.25em");
        var bTitre = false;
    } 
    else 
    {
        $("#titreEdit").css('border-color', 'black');
        $('#titreEdit').css("border-width", "0.10em");
        var bTitre = true;
    }
    if ($("#texteEdit").val() == '') 
    {
        $("#texteEdit").css('border-color', 'red');
        $('#texteEdit').css("border-width", "0.25em");
        var bTexte = false;
    } 
    else 
    {
        $("#texteEdit").css('border-color', 'black');
        $('#texteEdit').css("border-width", "0.10em");
        var bTexte = true;
    }

    bValideForm= bTitrePage && bTitre && bTexte;

    if (bValideForm == true)
    {
        modifyTexte(iIndiceEditionEncours);
        $("#clicEdit").attr("data-dismiss","modal");
    }

    else
    {
        toastr.error('Tous les champs doivent être renseignés', 'Erreur');
    }
}