
			var tables;
			var iIndiceSuppEncours;
			var aOfPersonnes= [];
			aOfPersonnes[0]= [];
			aOfPersonnes[0]["prenom"]= "Spider";
			aOfPersonnes[0]["nom"]= "Cochon";
			aOfPersonnes[0]["tel"]= "0601020304";
			aOfPersonnes[0]["mail"]= "spider@cochon.org";
			
			aOfPersonnes[1]= [];
			aOfPersonnes[1]["prenom"]= "Tony";
			aOfPersonnes[1]["nom"]= "Stark";
			aOfPersonnes[1]["tel"]= "0706050403";
			aOfPersonnes[1]["mail"]= "tony@marvel.universe";
			
			aOfPersonnes[2]= [];
			aOfPersonnes[2]["prenom"]= "Tony";
			aOfPersonnes[2]["nom"]= "Montana";
			aOfPersonnes[2]["age"]= "47";
			aOfPersonnes[2]["tel"]= "0706050403";
			aOfPersonnes[2]["mail"]= "tony@marvel.universe";
			
			aOfPersonnes[3]= [];
			aOfPersonnes[3]["prenom"]= "Tony";
			aOfPersonnes[3]["nom"]= "Merguez";
			aOfPersonnes[3]["tel"]= "0706050403";
			aOfPersonnes[3]["mail"]= "tony@marvel.universe";
			
			aOfPersonnes[4]= [];
			aOfPersonnes[4]["prenom"]= "Tony";
			aOfPersonnes[4]["nom"]= "Stark";
			aOfPersonnes[4]["tel"]= "0706050403";
			aOfPersonnes[4]["mail"]= "tony@marvel.universe";
			
			aOfPersonnes[5]= [];
			aOfPersonnes[5]["prenom"]= "Tony";
			aOfPersonnes[5]["nom"]= "Stark";
			aOfPersonnes[5]["tel"]= "0706050403";
			aOfPersonnes[5]["mail"]= "tony@marvel.universe";
			
			
			
			function constructTable()	
			{
				var i;
				var sHTML= "";
				sHTML+= "<thead class = \"bg-dark text-light text-uppercase text-center font-weight-bold\">";
				sHTML+= "<tr>";
				sHTML+= "<td >Prénom</td>";
				sHTML+= "<td>Nom</td>";
				sHTML+= "<td>Téléphone</td>";
				sHTML+= "<td>Email</td>";
				sHTML+= "<td>Éditer</td>";
				sHTML+= "<td>Supprimer</td>";
				sHTML+= "</tr>";
				sHTML+= "</thead>";
				sHTML+= "<tbody class = text-center>";

				for (i=0; i<aOfPersonnes.length; i++)	
				{
					sHTML+= "<tr>";
					sHTML+= "<td>" + aOfPersonnes[i]["prenom"] + "</td>";
					sHTML+= "<td>" + aOfPersonnes[i]["nom"] + "</td>";
					sHTML+= "<td>" + aOfPersonnes[i]["tel"] + "</td>";
					sHTML+= "<td>" + aOfPersonnes[i]["mail"] + "</td>";
					sHTML+= "<td> <button class = \"btn btn-success text-uppercase font-weight-bold\"  onClick=\"editPersonne(" + i + ")\">Editer </button></td>";
					sHTML+= "<td> <button class = \"btn btn-danger text-uppercase font-weight-bold\" onClick=\"supprimPersonne(" + i + ")\">Supprimer </button></td>";
					sHTML+= "</tr>";
				}
				sHTML+= "</tbody>";
				$('#table_personnes').html(sHTML);
			}
			
			function ajoutPersonne()	
			{
				var iLongueur= aOfPersonnes.length;
				aOfPersonnes[iLongueur]= [];
				aOfPersonnes[iLongueur]["prenom"]= $('#prenom').val();
				aOfPersonnes[iLongueur]["nom"]= $('#nom').val();
				aOfPersonnes[iLongueur]["tel"]= $('#telephone').val();
				aOfPersonnes[iLongueur]["mail"]= $('#email').val();
				constructTable();
				tables = $('#table_personnes').DataTable(configuration);
			}

			function majPersonne()	
			{
				aOfPersonnes[iIndiceEditionEncours]= [];
				aOfPersonnes[iIndiceEditionEncours]["prenom"]= $('#prenom').val();
				aOfPersonnes[iIndiceEditionEncours]["nom"]= $('#nom').val();
				aOfPersonnes[iIndiceEditionEncours]["mail"]= $('#email').val();
				aOfPersonnes[iIndiceEditionEncours]["tel"]= $('#telephone').val();
				tables.clear();
				tables.destroy();
				constructTable();
				tables = $('#table_personnes').DataTable(configuration);
			}
		    
			function supprimPersonne(iIndiceEdit = 0)	
			{	
				
				iIndiceSuppEncours = iIndiceEdit;
				alert(iIndiceEdit);
				if(iIndiceEdit == 0 )
				{
				   aOfPersonnes[iIndiceSuppEncours]= [];
				   aOfPersonnes.splice(iIndiceSuppEncours,1) ;
				  
				}
				$('#prenom').val( aOfPersonnes[iIndiceEdit]["prenom"]);
				$('#nom').val( aOfPersonnes[iIndiceEdit]["nom"]);
				$('#email').val( aOfPersonnes[iIndiceEdit]["mail"]);
				$('#telephone').val( aOfPersonnes[iIndiceEdit]["tel"]);
				$('#btn_supprimer').show();
				$('#btn_modifier').hide();
				$('#btn_ajouter').hide();
				$('#btn_annuler').show();
				tables.clear();
				tables.destroy();
				constructTable();
			   tables = $('#table_personnes').DataTable(configuration);
				
			}

			 
			 function cancel()
			 {	
				$('#prenom').val("");
				$('#nom').val("");
				$('#email').val("");
				$('#telephone').val("");
				$('#btn_supprimer').hide();
				$('#btn_annuler').hide();
				$('#btn_ajouter').show();
				$('#btn_modifier').hide();
			 }
			
			var iIndiceEditionEncours;
			function editPersonne(iIndiceEdit)	
			{
				iIndiceEditionEncours = iIndiceEdit;
				$('#prenom').val( aOfPersonnes[iIndiceEdit]["prenom"]);
				$('#nom').val( aOfPersonnes[iIndiceEdit]["nom"]);
				$('#telephone').val( aOfPersonnes[iIndiceEdit]["tel"]);
				$('#email').val( aOfPersonnes[iIndiceEdit]["mail"]);
				$('#btn_ajouter').hide();
				$('#btn_supprimer').hide();
				$('#btn_modifier').show();
				$('#btn_annuler').show();
				
			}
		

			// CONFIGURATION DATATABLE
			const configuration = {
				"stateSave": false,
				"order": [[2, "asc"]],
				"pagingType": "simple_numbers",
				"searching": true,
				"lengthMenu": [[20, 30, 50, -1], [20, 30, 50, "Tous"]], 
				"language": {
					"info": "Utilisateurs _START_ à _END_ sur _TOTAL_ sélectionnées",
					"emptyTable": "Aucun utilisateur",
					"lengthMenu": "_MENU_ Utilisateurs par page",
					"search": "Rechercher : ",
					"zeroRecords": "Aucun résultat de recherche",
					"paginate": {
						"previous": "Précédent",
						"next": "Suivant"
					},
					"sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
					"sInfoEmpty":      "Utilisateurs 0 à 0 sur 0 sélectionnée",
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


			
			$(document).ready(function() {
				// INIT DATATABLE
				// Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
				//tables.page.len(10).draw();
				constructTable();
				tables = $('#table_personnes').DataTable(configuration);
			});
///////////////////////////////////////////////SUMMERNOTE///////////////////////////////////////////////////////////
			/*$(document).ready(function(){
			constructTable();
			tables = $('#table_personnes').DataTable(configuration);
			var myMainHeight= 500;
			var myMainWidth= 1100;
			// pour les param?res, voir summernote.js ?partir de la ligne 7320.
            $('.summernote').summernote({
                maxWidth: myMainWidth ,
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
		//constructTable();
		// Vide le summernote
		$('#summernote').summernote("code", "");
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
		      "sFirst": "Premier", "sLast": "Dernier", "sNext": "Suivant", "sPrevious": "Précédent"
		    },
		    "oAria": {
		      "sSortAscending": ": Trier par ordre croissant", "sSortDescending": ": Trier par ordre décroissant"
		    }
		  }
		});
    });*/
// exemple pour remplir le summernote en édition :
	