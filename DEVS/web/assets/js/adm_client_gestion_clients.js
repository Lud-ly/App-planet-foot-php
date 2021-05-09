/*function toggle(id) {
    $(id).toggle(1000);
 
 }
 function create_formulaires() {
    var sResultat= "";
    var i;
    var iNumber= document.getElementById("iNumber").value;
    for (i=1; i<=iNumber; i++) {
        sResultat+= "<p>" + i + "&nbsp;: &nbsp; <input type=\"text\" name=\"note_" + i + "\" id=\"note_" + i + "\" value=\"" + Math.floor(Math.random()*20+1)  + "\"></p>";
    }
    document.getElementById("formulaire").innerHTML= sResultat;
 }*/
 
 var aOfClient= [];
             aOfClient[0]= [];
             aOfClient[0]["id_client"]= "1";
             aOfClient[0]["civilite"]= "Feminin";
             aOfClient[0]["nom"]= "Dudu";
             aOfClient[0]["prenom"]= "Lilou";
             aOfClient[0]["adresse"]= "123 rue du Bonheur";
             aOfClient[0]["code_postal"]= "34000";
             aOfClient[0]["ville"]= "Montpellier";
             aOfClient[0]["departement"]= "34";
             aOfClient[0]["tel"]= "0600000002";
             aOfClient[0]["mail"]= "d_lilou@free.fr";
             aOfClient[0]["section"]= "Stagiaire";
                 
             function constructTable()	{
                 var i;
 
                 var sHTML= "";
                 sHTML+= "<thead>";
                 sHTML+= "<tr>";
                 sHTML+= "<td>ID client</td>";
                 sHTML+= "<td>Nom</td>";
                 sHTML+= "<td>Prénom</td>";
                 sHTML+= "<td>Email</td>";
                 sHTML+= "<td>Editer</td>";
                 sHTML+= "<td>Supprimer</td>";
                 sHTML+= "</tr>";
                 sHTML+= "</thead>";
                 sHTML+= "<tbody>";
 
                 for (i=0; i<aOfClient.length; i++)	{
                     sHTML+= "<tr>";
                     sHTML+= "<td>" + aOfClient[i]["id_client"] + "</td>";
                     sHTML+= "<td>" + aOfClient[i]["nom"] + "</td>";
                     sHTML+= "<td>" + aOfClient[i]["prenom"] + "</td>";
                     sHTML+= "<td>" + aOfClient[i]["mail"] + "</td>";
                     sHTML+= "<td><button id='Editer"+i+"' onClick=\"editClient(" + i + ")\">Editer</button></td>";
					 sHTML+= "<td><button id='Supprimer"+i+"' onClick=\"supClient(" + i + ")\">Supprimer</button></td>";
                     sHTML+= "</tr>";
                 }

                 sHTML += "</tbody>";
                 $('#table_client').html(sHTML);
             }

             function rebuildDatable()	{
				$('#table_client').html("");
				table.clear(); 
				table.destroy(); 
				constructTable();
				table = $('#table_client').DataTable(configuration);
            }
            
            function resetFormulaire() {
                $('#id_client').val("");
                $('#civilite').val("");
				$('#nom').val("");
				$('#prenom').val("");
				$('#adresse').val("");
				$('#code_postal').val("");
				$('#departement').val("");
				$('#telephone').val(null);
				$('#mail').val("");
				$('#section').val("");
			}

             function ajoutClient()	{
                 //function btn_ajouter()
                var iLongueur= aOfClient.length;
                aOfClient[iLongueur]= [];
                aOfClient[iLongueur]["id_client"]= $('#id_client').val();
                aOfClient[iLongueur]["civilite"]= $('#civilite').val();
                aOfClient[iLongueur]["nom"]= $('#nom').val();
                aOfClient[iLongueur]["prenom"]= $('#prenom').val();
                aOfClient[iLongueur]["adresse"]= $('#adresse').val();
                aOfClient[iLongueur]["code_postal"]= $('#code_postal').val();
                aOfClient[iLongueur]["ville"]= $('#ville').val();
                aOfClient[iLongueur]["departement"]= $('#departement').val();
                aOfClient[iLongueur]["tel"]= $('#telephone').val();
                aOfClient[iLongueur]["mail"]= $('#mail').val();
                aOfClient[iLongueur]["section"]= $('#section').val();
                constructTable();
                //appel ici a la fonction mystère de reconstruire le datatable
                // alors qu'il a déjà été appelé
                resetFormulaire ();
            } 

            function majClient() {
                //function btn_modifier ()
                    aOfClient[iIndiceEditionEncours]["id_client"] = $('#id_client').val();
                    aOfClient[iIndiceEditionEncours]["civilite"] = $('#civilite').val();
                    aOfClient[iIndiceEditionEncours]["nom"] = $('#nom').val();
                    aOfClient[iIndiceEditionEncours]["prenom"] = $('#prenom').val();
                    aOfClient[iIndiceEditionEncours]["adresse"] = $('#adresse').val();
                    aOfClient[iIndiceEditionEncours]["code_postal"] = $('#code_postal').val();
                    aOfClient[iIndiceEditionEncours]["ville"] = $('#ville').val();
                    aOfClient[iIndiceEditionEncours]["departement"] = $('#departement').val();
                    aOfClient[iIndiceEditionEncours]["tel"] = $('#telephone').val();
                    aOfClient[iIndiceEditionEncours]["mail"] = $('#mail').val();
                    aOfClient[iIndiceEditionEncours]["section"] = $('#section').val();
                    rebuildDatable();
                    resetFormulaire();
                    cacherBouton('#btn_modifier');
                    cacherBouton('#btn_ajouter');
                }

            //function supClient(iIndiceEdit) {
                //aOfClient.splice(iIndiceEdit, 1);
                //construct();
            //}           
			var iIndiceEditionEncours;
			function editClient(iIndiceEdit)	{
				//alert("iIndiceEdit = " + iIndiceEdit);
				iIndiceEditionEncours= iIndiceEdit;
				$('#id_client').val(aOfClient[iIndiceEdit]["id_client"]);
				$('#civilite').val(aOfClient[iIndiceEdit]["civilite"]);
				$('#nom').val(aOfClient[iIndiceEdit]["nom"]);
				$('#prenom').val(aOfClient[iIndiceEdit]["prenom"]);
				$('#adresse').val(aOfClient[iIndiceEdit]["adresse"]);
				$('#code_postal').val(aOfClient[iIndiceEdit]["code_postal"]);
				$('#ville').val(aOfClient[iIndiceEdit]["ville"]);
				$('#departement').val(aOfClient[iIndiceEdit]["departement"]);
				$('#mail').val(aOfClient[iIndiceEdit]["mail"]);
				$('#section').val(aOfClient[iIndiceEdit]["section"]);
			}

            var iIndiceSupEncours;
			function supClient(iIndiceSup)	{
				iIndiceSupEnCours= iIndiceSup;
				aOfClient.splice(iIndiceSup,1);
				rebuildDatable();
				resetFormulaire();
            }
            
            /*function cacherBouton(the_button) {
                let divHTML = document.getElementById(the_button);
                    let value = divHTML.style.display;
                    console.log('LOG => ', value)
            
                    if (value === 'none') {
                        divHTML.style.display = 'flex';
                    } else {
                        divHTML.style.display = 'none';
                    }
                }*/
                          // CONFIGURATION DATATABLE
                         const configuration = {
                             "stateSave": false,
                             "order": [[2, "asc"]],
                             "pagingType": "simple_numbers",
                             "searching": true,
                             "lengthMenu": [[10, 25, 50, 100, -1], ["Dix", "Vingt cinq", "Cinquante", "Cent", "Tous"]], 
                             "language": {
                                 "info": "Client _START_ à _END_ sur _TOTAL_ sélectionnés",
                                 "emptyTable": "Aucun client",
                                 "lengthMenu": "_MENU_ Client par page",
                                 "search": "Rechercher : ",
                                 "zeroRecords": "Aucun résultat de recherche",
                                 "paginate": {
                                     "previous": "Précédent",
                                     "next": "Suivant"
                                 },
                                 "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                                 "sInfoEmpty":      "Utilisateurs 0 à 0 sur 0 sélectionné",
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
             var table; // cette fonction permet de mettre en application le tp datatable une fois que tout  été effectué
             $(document).ready(function() {
                 constructTable();
                 // INIT DATATABLE (permet d'avoir le look complet du tableau datatable)
                 table = $('#table_client').DataTable(configuration);
             });

             //function construct() {
                //tables.destroy();
                //constructTable();
                //tables = $("#table_client").DataTable(configuration);
            //}
 

        
   
 

 




     