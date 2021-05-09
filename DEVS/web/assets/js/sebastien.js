
// var aOfpaniers= [];
//   aOfpaniers[0]= [];
//   aOfpaniers[0]["Ingredient"]= "Pomme";
//   aOfpaniers[0]["3kg"]= 1;
//   aOfpaniers[0]["6kg"]= 2;
//   aOfpaniers[0]["9kg"]= 3;
//   aOfpaniers[0]["12kg"]= 4;
  

// function constructTable()	{
//     var i;
//     // Entête du tableau
//     var sHTML= "";
//     sHTML+= "<thead>";
//     sHTML+= "<tr>";
//     sHTML+= "<td>Ingredient</td>";
//     sHTML+= "<td>3kg</td>";
//     sHTML+= "<td>6kg</td>";
//     sHTML+= "<td>9kg</td>";
//     sHTML+= "<td>12kg</td>";
//     sHTML+= "<td>Editer</td>";
//     sHTML+= "<td>Supprimer</td>";
//     sHTML+= "</tr>";
//     sHTML+= "</thead>";
//     sHTML+= "<tbody>";

//     for (i=0; i<aOfpaniers.length; i++)	{
//       sHTML+= "<tr>";
//       sHTML+= "<td>" + aOfpaniers[i]["Ingredient"] + "</td>";
//       sHTML+= "<td>" + aOfpaniers[i]["3kg"] + "</td>";
//       sHTML+= "<td>" + aOfpaniers[i]["6kg"] + "</td>";
//       sHTML+= "<td>" + aOfpaniers[i]["9kg"] + "</td>";
//       sHTML+= "<td>" + aOfpaniers[i]["12kg"] + "</td>";
//       sHTML+= "<td onClick=\"editPersonne(" + i + ")\"><button>Editer</button></td>";
//       sHTML+= "<td onClick=\"supprimPersonne(" + i + ")\"><button>Supprimer</button></td>";
//       sHTML+= "</tr>";

//     }

//     sHTML+= "</tbody>";
//     $('#table_paniers').html(sHTML);
//   }

//   function ajoutPersonne()	{
//     var iLongueur= aOfpaniers.length;
//     aOfpaniers[iLongueur]= [];
//     aOfpaniers[iLongueur]["Ingredient"]= $('#Ingredient').val();
//     aOfpaniers[iLongueur]["3kg"]= $('#3kg').val();
//     aOfpaniers[iLongueur]["6kg"]= $('#6kg').val();
//     aOfpaniers[iLongueur]["9kg"]= $('#9kg').val();
//     aOfpaniers[iLongueur]["12kg"]= $('#12kg').val();

//     tables.clear();// nettoye le tableau
//     tables.destroy();//détruit le tableau
//     constructTable();
//     tables = $('#table_paniers').DataTable(configuration);
//   }

//   function majPersonne()	{
//     aOfpaniers[iIndiceEditionEncours]= [];
//     aOfpaniers[iIndiceEditionEncours]["Ingredient"]= $('#Ingredient').val();
//     aOfpaniers[iIndiceEditionEncours]["3kg"]= $('#3kg').val();
//     aOfpaniers[iIndiceEditionEncours]["6kg"]= $('#6kg').val();
//     aOfpaniers[iIndiceEditionEncours]["9kg"]= $('#9kg').val();
//     aOfpaniers[iIndiceEditionEncours]["12kg"]= $('#12kg').val();

//     tables.clear();// nettoye le tableau
//     tables.destroy();//détruit le tableau
//     constructTable();// reconstruit le tableau
//     tables = $('#table_paniers').DataTable(configuration);

//   }

//   function supprimPersonne()	{

//     aOfpaniers.splice( iIndiceEditionEncours, 1 );
//     tables.clear();// nettoye le tableau
//     tables.destroy();//détruit le tableau
//     constructTable();
//     tables = $('#table_paniers').DataTable(configuration);

//   }

//   var iIndiceEditionEncours;
//   function editPersonne(iIndiceEdit)	{
//     alert("iIndiceEdit = " + iIndiceEdit);
//     iIndiceEditionEncours= iIndiceEdit;
//     $('#Ingredient').val( aOfpaniers[iIndiceEdit]["Ingredient"] );
//     $('#3kg').val( aOfpaniers[iIndiceEdit]["3kg"] );
//     $('#6kg').val( aOfpaniers[iIndiceEdit]["6kg"] );
//     $('#9kg').val( aOfpaniers[iIndiceEdit]["9kg"] );
//     $('#12kg').val( aOfpaniers[iIndiceEdit]["12kg"] );


//   }


//   // CONFIGURATION DATATABLE
//   const configuration = {
//     "stateSave": false,
//     "order": [[1, "asc"]],
//     "pagingType": "simple_numbers",
//     "searching": true,
//     "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tous"]],
//     "language": {
//       "info": "Utilisateurs _START_ à _END_ sur _TOTAL_ sélectionnées",
//       "emptyTable": "Aucun utilisateur",
//       "lengthMenu": "_MENU_ Utilisateurs par page",
//       "search": "Rechercher : ",
//       "zeroRecords": "Aucun résultat de recherche",
//       "paginate": {
//         "previous": "Précédent",
//         "next": "Suivant"
//       },
//       "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
//       "sInfoEmpty":      "Utilisateurs 0 à 0 sur 0 sélectionnée",
//     },
//     "columns": [
//       {
//         "orderable": true
//       },
//       {
//         "orderable": true
//       },
//       {
//         "orderable": true
//       },
//       {
//         "orderable": true
//       },
//       {
//         "orderable": true
//       },
//       {
//         "orderable": false
//       },
//       {
//         "orderable": false
//       }
//     ],
//     'retrieve': true
//   };


//   var tables;
//   $(document).ready(function() {
//     // INIT DATATABLE
//     // Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
//     // tables.page.len(10).draw();
//     constructTable();
//     tables = $('#table_paniers').DataTable(configuration);
//   });
  

// Script pour summernote
$(document).ready(function(){
  var myMainHeight= 200;
  var myMainWidth= 300;
  // pour les param?res, voir summernote.js ?partir de la ligne 7320.
        $('.summernote').summernote({
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
  // je remplis ?entuellement le textarea
constructTable();
// Vide le summernote
$('#summernote').summernote("code", "");
$('#myTable').DataTable({
     "language": {
    "sProcessing": "Traitement en cours ...",
    "sLengthMenu": "Afficher _MENU_ lignes",
    "sZeroRecords": "Aucun rÈsultat trouvÈ",
    "sEmptyTable": "Aucune donnÈe disponible",
    "sInfo": "Lignes _START_ ‡ _END_ sur _TOTAL_",
    "sInfoEmpty": "Aucune ligne affichÈe",
    "sInfoFiltered": "(Filtrer un maximum de_MAX_)",
    "sInfoPostFix": "",
    "sSearch": "Chercher:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Chargement...",
    "oPaginate": {
      "sFirst": "Premier", "sLast": "Dernier", "sNext": "Suivant", "sPrevious": "PrÈcÈdent"
    },
    "oAria": {
      "sSortAscending": ": Trier par ordre croissant", "sSortDescending": ": Trier par ordre dÈcroissant"
    }
  }
});
});