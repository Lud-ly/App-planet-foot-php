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
 
 var aOfCommande= [];
             aOfCommande[0]= [];
             aOfCommande[0]["id_commande"]= "1";
             aOfCommande[0]["id_client"]= "3";
             aOfCommande[0]["num_commande"]= "123";
             aOfCommande[0]["date_commande"]= "10/09/2020";
             aOfCommande[0]["code_produit"]= "Panier1";
             aOfCommande[0]["prix_unite"]= "15";
             aOfCommande[0]["quantite"]= "1";
             aOfCommande[0]["prix_total"]= "15";
             aOfCommande[0]["date_livraison"]= "19/09/2020";
             aOfCommande[0]["fournisseur"]= "Jean Dupuis";
             aOfCommande[0]["facture"]= "145";
             aOfCommande[0]["section"]= "Stagiaire";
 
             aOfCommande[1]= [];
             aOfCommande[1]["id_commande"]= "2";
             aOfCommande[1]["id_client"]= "2";
             aOfCommande[1]["num_commande"]= "124";
             aOfCommande[1]["date_commande"]= "11/09/2020";
             aOfCommande[1]["code_produit"]= "Panier2";
             aOfCommande[1]["prix_unite"]= "20";
             aOfCommande[1]["quantite"]= "2";
             aOfCommande[1]["prix_total"]= "40";
             aOfCommande[1]["date_livraison"]= "19/09/2020";
             aOfCommande[1]["fournisseur"]= "Jean Dupuis";
             aOfCommande[1]["facture"]= "146";
             aOfCommande[1]["section"]= "Bureau";
 
 

 

             function constructTable()	{
                 //tables = $('#table_commande').DataTable(configuration);
                 var i;
 
                 var sHTML= "";
                 sHTML+= "<thead>";
                 sHTML+= "<tr>";
                 sHTML+= "<td>ID commande</td>";
                 sHTML+= "<td>ID client</td>";
                 sHTML+= "<td>N° commande</td>";
                 sHTML+= "<td>Total</td>";
                 sHTML+= "<td>Editer</td>";
                 sHTML+= "<td>Supprimer</td>";
                 sHTML+= "</tr>";
                 sHTML+= "</thead>";
                 sHTML+= "<tbody>";
 
                 for (i=0; i<aOfCommande.length; i++)	{
                     sHTML+= "<tr>";
                     sHTML+= "<td>" + aOfCommande[i]["id_commande"] + "</td>";
                     sHTML+= "<td>" + aOfCommande[i]["id_client"] + "</td>";
                     sHTML+= "<td>" + aOfCommande[i]["num_commande"] + "</td>";
                     sHTML+= "<td>" + aOfCommande[i]["prix_total"] + "</td>";
                     sHTML+= "<td><button id='Editer"+i+"' onClick=\"editCommmande(" + i + ")\">Editer</button></td>";
					 sHTML+= "<td><button id='Supprimer"+i+"' onClick=\"supCommande(" + i + ")\">Supprimer</button></td>";
                     sHTML+= "</tr>";
                 }
                 
                 sHTML+= "</tbody>";
                 $('#table_commande').html(sHTML);
             }
             
             function rebuildDatable()	{
				$('#table_commande').html("");
				table.clear(); 
				table.destroy(); 
				constructTable();
				table = $('#table_commande').DataTable(configuration);
            }

            function resetFormulaire() {
                $('#id_commande').val("");
                $('#id_client').val("");
                $('#num_commande').val("");
                $('#date_commande').val("");
                $('#code_produit').val("");
                $('#prix_unite').val("");
                $('#quantite').val("");
                $('#prix_total').val("");
                $('#date_livraison').val("");
                $('#fournisseur').val("");
                $('#facture').val("");
                $('#section').val("");
            }

             function ajoutCommande()	{
                 var iLongueur= aOfCommande.length;
                 aOfCommande[iLongueur]= [];
                 aOfCommande[iLongueur]["id_commande"]= $('#id_commande').val();
                 aOfCommande[iLongueur]["id_client"]= $('#id_client').val();
                 aOfCommande[iLongueur]["num_commande"]= $('#num_commande').val();
                 aOfCommande[iLongueur]["date_commande"]= $('#date_commande').val();
                 aOfCommande[iLongueur]["code_produit"]= $('#code_produit').val();
                 aOfCommande[iLongueur]["prix_unite"]= $('#prix_unite').val();
                 aOfCommande[iLongueur]["quantite"]= $('#quantite').val();
                 aOfCommande[iLongueur]["prix_total"]= $('#prix_total').val();
                 aOfCommande[iLongueur]["date_livraison"]= $('#date_livraison').val();
                 aOfCommande[iLongueur]["fournisseur"]= $('#fournisseur').val();
                 aOfCommande[iLongueur]["facture"]= $('#facture').val();
                 aOfCommande[iLongueur]["section"]= $('#section').val();
                 constructTable();
                 //appel ici a la fonction mystère de reconstruire le datatable
                 // alors qu'il a déjà été appelé
                 resetFormulaire ();
             } 

             function majCommande()	{
                                 //function btn_modifier ()
                                 aOfCommande[iIndiceEditionEncours]["id_commande"] = $('#id_commande').val();
                                 aOfCommande[iIndiceEditionEncours]["id_client"] = $('#id_client').val();
                                 aOfCommande[iIndiceEditionEncours]["num_commande"] = $('#num_commande').val();
                                 aOfCommande[iIndiceEditionEncours]["date_commande"] = $('#date_commande').val();
                                 aOfCommande[iIndiceEditionEncours]["code_produit"] = $('#code_produit').val();
                                 aOfCommande[iIndiceEditionEncours]["prix_unite"] = $('#prix_unite').val();
                                 aOfCommande[iIndiceEditionEncours]["quantite"] = $('#quantite').val();
                                 aOfCommande[iIndiceEditionEncours]["prix_total"] = $('#prix_total').val();
                                 aOfCommande[iIndiceEditionEncours]["date_livraison"] = $('#date_livraison').val();
                                 aOfCommande[iIndiceEditionEncours]["fournisseur"] = $('#fournisseur').val();
                                 aOfCommande[iIndiceEditionEncours]["facture"] = $('#facture').val();
                                 aOfCommande[iIndiceEditionEncours]["section"] = $('#section').val();
                                 rebuildDatable();
                                 resetFormulaire();
                                 cacherBouton('#btn_modifier');
                                 cacherBouton('#btn_ajouter');
                             }
            
             var iIndiceEditionEncours;
             console.log(iIndiceEditionEncours);
             function editCommande(iIndiceEdit)	{
                 //alert("iIndiceEdit = " + iIndiceEdit);
                 iIndiceEditionEncours= iIndiceEdit;
                 
                 $('#id_commande').val( aOfCommande[iIndiceEdit]["id_commande"] );
                 $('#id_client').val( aOfCommande[iIndiceEdit]["id_client"] );
                 $('#num_commande').val( aOfCommande[iIndiceEdit]["num_commande"] );
                 $('#date_commande').val( aOfCommande[iIndiceEdit]["date_commande"] );
                 $('#code_produit').val( aOfCommande[iIndiceEdit]["code_produit"] );
                 $('#prix_unite').val( aOfCommande[iIndiceEdit]["prix_unite"] );
                 $('#quantite').val( aOfCommande[iIndiceEdit]["quantite"] );
                 $('#prix_total').val( aOfCommande[iIndiceEdit]["prix_total"] );
                 $('#date_livraison').val( aOfCommande[iIndiceEdit]["date_livraison"] );
                 $('#fournisseur').val( aOfCommande[iIndiceEdit]["fournisseur"] );
                 $('#facture').val( aOfCommande[iIndiceEdit]["facture"] );
                 $('#section').val( aOfCommande[iIndiceEdit]["section"] );
            }
            var iIndiceSupEnCours;
            
            function supCommande(iIndiceSup)	{
                iIndiceSupEnCours=iIndiceSup;
                aOfCommande.splice(iIndiceSup,1);
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
                                 "info": "Commandes _START_ à _END_ sur _TOTAL_ sélectionnées",
                                 "emptyTable": "Aucune Commande",
                                 "lengthMenu": "_MENU_ Commande par page",
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
             var table; // cette fonction permet de mettre en application le tp datatable une fois que tout  été effectué
             $(document).ready(function() {
                 constructTable();
                 // INIT DATATABLE (permet d'avoir le look complet du tableau datatable)
                 table = $('#table_commande').DataTable(configuration);
             });
 
 
 
 
 
 
  
     
   
         
 
 