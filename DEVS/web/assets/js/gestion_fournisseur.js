
			var fournisseur_selectionner = 0;			
			var valeur_smiley = 0;
		
// ////////////////////////////////////////////////// CETTE FONCTION SERT A RECUPERER L INDEX DU FOURNISSEUR SELECTIONNER DANS DATATABLE AFIN DE LE SUPPR///////////////////////
			function detect_index_fournisseur_a_suppr(element_selectionner)
			{
				fournisseur_selectionner = element_selectionner;
			}
// ////////////////////////////////////////////////// FONCTION AFFICHE LE MODAL D AJOUT DE FOURNISSEUR ///////////////////////////////////////////////////////////////////
			function affiche_modal_ajout() {
				document.getElementById('modal-title').innerHTML = 'Ajout Fournisseur';
				// AFFICHAGE DE HIDE DES BTN
				$('#btn_modifier').addClass('d-none');
				$('#btn_annuler').removeClass('d-none');
				$('#btn_ajouter').removeClass('d-none');
				// VIDE LES INPUTS
				$('#firstname_supplier').val("");
				$('#lastname_supplier').val("");
				$('#corporatename_supplier').val("");
				$('#desc_supplier').val("");
				$('#adress_1_supplier').val("");
				$('#adress_2_supplier').val("");
				$('#mail_supplier').val("");
				$('#tel_supplier').val("");
				$('#position_supplier').val("");
				$('#active_supplier').val(1);
				$('#comment_supplier').val("");
				smiley(0);
				document.getElementById('photo_de_profil').src = "afpanier/assets/img/profil.jpg";
				// MODAL AJOUT FOURNISSEUR
				$('#infos10').modal('show');
			}
			// ////////////////////////////////////////////////// FONCTION AFFICHE LE MODAL DE MODIFICATION DE FOURNISSEUR ///////////////////////////////////////////////////////////////////
			
			function affiche_modal_modification(element_selectionner) {
				fournisseur_selectionner = element_selectionner;
				// MODAL MODIFICATION FOURNISSEUR
				$('#infos10').modal('show');
				document.getElementById('modal-title').innerHTML = 'Modification Fournisseur';
					// AFFICHAGE DE HIDE DES BTN
					$('#btn_modifier').removeClass('d-none');
					$('#btn_annuler').removeClass('d-none');
					$('#btn_ajouter').addClass('d-none');//invisible
					//REMPLIS LES INPTS
					$('#firstname_supplier').val(aOfFournisseurs[fournisseur_selectionner]["firstname_supplier"]);
					$('#lastname_supplier').val(aOfFournisseurs[fournisseur_selectionner]["lastname_supplier"]);
					$('#corporatename_supplier').val(aOfFournisseurs[fournisseur_selectionner]["corporatename_supplier"]);
					$('#desc_supplier').val(aOfFournisseurs[fournisseur_selectionner]["desc_supplier"]);
					$('#adress_1_supplier').val(aOfFournisseurs[fournisseur_selectionner]["adress_1_supplier"]);
					$('#adress_2_supplier').val(aOfFournisseurs[fournisseur_selectionner]["adress_2_supplier"]);
					$('#mail_supplier').val(aOfFournisseurs[fournisseur_selectionner]["mail_supplier"]);
					$('#tel_supplier').val(aOfFournisseurs[fournisseur_selectionner]["tel_supplier"]);
					$('#position_supplier').val(aOfFournisseurs[fournisseur_selectionner]["position_supplier"]);
					$('#active_supplier').val(aOfFournisseurs[fournisseur_selectionner]["active_supplier"]);
					$('#comment_supplier').val(aOfFournisseurs[fournisseur_selectionner]["comment_supplier"]);
					if(aOfFournisseurs[fournisseur_selectionner]["feedback_supplier"] == 0)
					{
						
						setTimeout("smiley(0)", 1500);
					}
					else if(aOfFournisseurs[fournisseur_selectionner]["feedback_supplier"] == 1)
					{
						
						setTimeout("smiley(1)", 1500);
					}
					else if(aOfFournisseurs[fournisseur_selectionner]["feedback_supplier"] == 2)
					{
						
						setTimeout("smiley(2)", 1500);
					}
					else if(aOfFournisseurs[fournisseur_selectionner]["feedback_supplier"] == 3)
					{
						
						setTimeout("smiley(3)", 1500);
					}
					
					// AFFICHE LA PHOTO DE PROFIL DU FOURNISSEUR SELECTIONNER
					if(aOfFournisseurs[fournisseur_selectionner]["img_supplier"] == undefined || aOfFournisseurs[fournisseur_selectionner]["img_supplier"] == "")
					{
						
						document.getElementById('photo_de_profil').src = "afpanier/assets/img/profil.jpg";
					}
					else
					{
						document.getElementById('photo_de_profil').src = "../../images_upload/" + aOfFournisseurs[fournisseur_selectionner]["img_supplier"];
					}
					document.getElementById('new_fichier').value = "../../images_upload/" + aOfFournisseurs[fournisseur_selectionner]["img_supplier"];
				
			}
			
// ////////////////////////////////////////////////// FONCTION RECUPERATION VALEUR SMILEY ET POSITIONEMENT DU SELECTEUR ///////////////////////////////////////////////////////////////////

			function smiley (val)
			{
				valeur_smiley = val;
				var difference = (document.getElementById('selecteur').offsetWidth - document.getElementById('smiley_vert').offsetWidth) / 2;
				var position_selecteur = (window.scrollX + document.querySelector('#area').getBoundingClientRect().left);
				var position_smiley_vert = (window.scrollX + document.querySelector('#smiley_vert').getBoundingClientRect().left - position_selecteur) - difference;
				var position_smiley_jaune = (window.scrollX + document.querySelector('#smiley_jaune').getBoundingClientRect().left - position_selecteur) - difference;
				var position_smiley_rouge = (window.scrollX + document.querySelector('#smiley_rouge').getBoundingClientRect().left - position_selecteur) - difference;
				if(valeur_smiley == 0)
				{
					$('#selecteur').addClass('invisible');
				}
				else
				{
					$('#selecteur').removeClass('invisible');
				}
				if(valeur_smiley == 1)
				{
					$('#selecteur').css({'left':position_smiley_vert});
				}
				else if(valeur_smiley == 2)
				{
					$('#selecteur').css({'left':position_smiley_jaune});
				}
				else if(valeur_smiley == 3)
				{
					$('#selecteur').css({'left':position_smiley_rouge});
				}
				
			}
			/**
			* detect IE
			* returns version of IE or false, if browser is not Internet Explorer or Edge
			*/
			function detectIEorSafari() {
				var ua = window.navigator.userAgent;

				var msie = ua.indexOf('MSIE ');
				if (msie > 0) {
					// IE 10 or older
					return true;
				}

				var trident = ua.indexOf('Trident/');
				if (trident > 0) {
					// IE 11
					return true;
				}

				var edge = ua.indexOf('Edge/');
				if (edge > 0) {
					// Edge (IE 12+)
					return true;
				}

				var safari = ua.indexOf('Safari/');
				var chrome = ua.indexOf('Chrome/');
				if ((safari > 0) && (chrome == -1)) {
					// Safari
					return true;
				}

				// other browser
				return false;
			}
		
			/**
			 * Convert date aaaa-mm-jj into jj/mm/aaaa
			 */
			function convertDate(sDate)	{
				var aOfDates= sDate.split("-");
				return aOfDates[2] + "/" + aOfDates[1] + "/" + aOfDates[0];
			}

			/**
			 * Convert date jj/mm/aaaa into aaaa-mm-jj
			 */
			function inverseDate(sDate)	{
				var aOfDates= sDate.split("/");
				return aOfDates[2] + "-" + aOfDates[1] + "-" + aOfDates[0];
			}

			/**
			 * Convert specials HTML entities HTML in character
			 */
			function htmlspecialchars_decode(str) {
				if (typeof(str) == "string") {
					str = str.replace(/&amp;/g, "&");
					str = str.replace(/&quot;/g, "\"");
					str = str.replace(/&#039;/g, "'");
					str = str.replace(/&lt;/g, "<");
					str = str.replace(/&gt;/g, ">");
				}
				return str;
			}
			
			/**
			 * public aOfFournisseurs is used to store all datas of movies
			 * @var array
			 */
			var aOfFournisseurs= [];
			
			/**
			 * Get Movies from database
			 *
			 * if OK add movies to array aOfFournisseurs
			 *
			 * if OK then build table and call datatable
			 */
			function loadFournisseurs()	{
				/*
				$('#divModalSaving').show();
				var datas = {
					page : "liste_fournisseur",
					bJSON : 1,
				}
				$.ajax({
					type: "POST",
					url: "route.php",
					async: true,
					data: datas,
					dataType: "json",
					cache: false,
				})
				.done(function(result) {
					*/
					var result= [{"id_supplier":"1","firstname_supplier":"","lastname_supplier":"","corporatename_supplier":"La petite Ferme","desc_supplier":"desc ...","adress_1_supplier":"1 rue du moulin","adress_2_supplier":"","mail_supplier":"petiteferme@gmail.com","img_supplier":"fakeImg.png","comment_supplier":null,"tel_supplier":"0644112255","active_supplier":"1"},{"id_supplier":"2","firstname_supplier":"","lastname_supplier":"","corporatename_supplier":"Coop Bio","desc_supplier":"desc ...","adress_1_supplier":"1 rue de la coop","adress_2_supplier":"","mail_supplier":"coopbio@gmail.com","img_supplier":"fakeImg.png","comment_supplier":null,"tel_supplier":"0411774411","active_supplier":"1"},{"id_supplier":"3","firstname_supplier":"Jean","lastname_supplier":"Dupont","corporatename_supplier":"","desc_supplier":"desc ...","adress_1_supplier":"10 rue paysanne","adress_2_supplier":"","mail_supplier":"jeandupont@gmail.com","img_supplier":"fakeImg.png","comment_supplier":null,"tel_supplier":"0644112255","active_supplier":"0"}];
					var iFournisseur= 0;
					for (var ligne in result)	{
						aOfFournisseurs[iFournisseur]= [];
						aOfFournisseurs[iFournisseur]["id_supplier"]= result[ligne]["id_supplier"];
						aOfFournisseurs[iFournisseur]["firstname_supplier"]= result[ligne]["firstname_supplier"];
						aOfFournisseurs[iFournisseur]["lastname_supplier"]= result[ligne]["lastname_supplier"];
						aOfFournisseurs[iFournisseur]["corporatename_supplier"]= result[ligne]["corporatename_supplier"];
						aOfFournisseurs[iFournisseur]["desc_supplier"]= result[ligne]["desc_supplier"];
						aOfFournisseurs[iFournisseur]["adress_1_supplier"]= result[ligne]["adress_1_supplier"];
						aOfFournisseurs[iFournisseur]["adress_2_supplier"]= result[ligne]["adress_2_supplier"];
						aOfFournisseurs[iFournisseur]["mail_supplier"]= result[ligne]["mail_supplier"];
						aOfFournisseurs[iFournisseur]["img_supplier"]= result[ligne]["img_supplier"];
						aOfFournisseurs[iFournisseur]["comment_supplier"]= result[ligne]["comment_supplier"];
						aOfFournisseurs[iFournisseur]["tel_supplier"]= result[ligne]["tel_supplier"];
						aOfFournisseurs[iFournisseur]["feedback_supplier"]= result[ligne]["feedback_supplier"];
						aOfFournisseurs[iFournisseur]["position_supplier"]= result[ligne]["position_supplier"];
						aOfFournisseurs[iFournisseur]["active_supplier"]= result[ligne]["active_supplier"];
						iFournisseur++;
					}
					// INIT DATATABLE
					// Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
					// tables.page.len(10).draw();
					constructTable();
					tables = $('#table_fournisseurs').DataTable(configuration);
					$('#divModalSaving').hide();
					/*
				})
				.fail(function(err) 
				{
					alert('error : ' + err.status);
					console.log(err);
				});
				*/
			}

			/**
			 * Parse array aOfFournisseurs and build table HTML
			 */
			function constructTable()	{
				var i;

				var sHTML= "";
				sHTML+= "<thead>";
				sHTML+= "<tr>";
				sHTML+= "<td><h5><b>Société</b></h5></td>";
				sHTML+= "<td><h5><b>Contact</b></h5></td>";
				sHTML+= "<td><h5><b>Adresse</b></h5></td>";
				sHTML+= "<td><h5><b class=\"text-nowrap\">Dernier Panier<br>mis en vente</b></h5></td>";
				sHTML+= "<td><h5><b class=\"text-nowrap\">Type de produit</b></h5></td>";
				sHTML+= "<td><h5><b>Telephone</b></h5></td>";
				sHTML+= "<td><h5><b>Satisfaction</b></h5></td>";
				sHTML+= "<td><h5><b>Statut</b></h5></td>";
				sHTML+= "<td><h5><b>Prénom</b></h5></td>";
				sHTML+= "<td><h5><b>Nom</b></h5></td>";
				sHTML+= "<td><h5><b>Déscription</b></h5></td>";
				sHTML+= "<td><h5><b>Adresse 2</b></h5></td>";
				sHTML+= "<td><h5><b>Adresse email</b></h5></td>";
				sHTML+= "<td><h5><b>Commentaire</b></h5></td>";
				sHTML+= "<td><h5><b class='titre_google_map'>Position Geographique</b></h5></td>";
				sHTML+= "<td><h5><b class='titre_google_map'>Photo de profil</b></h5></td>";
				sHTML+= "<td></td>"; // aucun nom pour la colone car elle contient 2 boutons
				sHTML+= "</tr>";
				sHTML+= "</thead>";
				sHTML+= "<tbody>";

				for (i=0; i<aOfFournisseurs.length; i++)	{
					sHTML+= "<tr>";
					//////////////////////////////////////////// GESTION DES VALEUR SOCIETE  ///////////////////////////////////////////
					if(aOfFournisseurs[i]["corporatename_supplier"] == undefined || aOfFournisseurs[i]["corporatename_supplier"].length == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + aOfFournisseurs[i]["corporatename_supplier"] + "</td>";
					}
					//////////////////////////////////////////// GESTION DES VALEUR NOM  ///////////////////////////////////////////
					if(aOfFournisseurs[i]["lastname_supplier"] == undefined || aOfFournisseurs[i]["lastname_supplier"].length == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + aOfFournisseurs[i]["lastname_supplier"] + "</td>";
					}
					//////////////////////////////////////////// GESTION DES VALEUR ADRESSE 1  ///////////////////////////////////////////
					if(aOfFournisseurs[i]["adress_1_supplier"] == undefined || aOfFournisseurs[i]["adress_1_supplier"].length == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + aOfFournisseurs[i]["adress_1_supplier"] + "</td>";
					}
					sHTML+= "<td>" + "date" + "</td>";
					sHTML+= "<td>" + "type de produit" + "</td>";
					//////////////////////////////////////////// GESTION DES VALEUR  TELEPHONE ///////////////////////////////////////////
					if(aOfFournisseurs[i]["tel_supplier"] == undefined || aOfFournisseurs[i]["tel_supplier"].length == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + aOfFournisseurs[i]["tel_supplier"] + "</td>";
					}
					//////////////////////////////////////////// GESTION DES VALEUR  TAUX DE SATISFACTION ///////////////////////////////////////////
					if(aOfFournisseurs[i]["feedback_supplier"] == undefined || aOfFournisseurs[i]["feedback_supplier"] == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else if(aOfFournisseurs[i]["feedback_supplier"] == 1)
					{
						sHTML+= "<td>" + '<img class="smiley_datatable" src="afpanier/assets/img/smiley_vert.svg">'	+ "</td>";
					}
					else if(aOfFournisseurs[i]["feedback_supplier"] == 2)
					{
						sHTML+= "<td>" + '<img class="smiley_datatable" src="afpanier/assets/img/smiley_jaune.svg">'	+ "</td>";
					}
					else if(aOfFournisseurs[i]["feedback_supplier"] == 3)
					{
						sHTML+= "<td>" + '<img class="smiley_datatable" src="afpanier/assets/img/smiley_rouge.svg">'	+ "</td>";
					}
					//////////////////////////////////////////// GESTION DES VALEUR  D ACTIVITÉ ///////////////////////////////////////////
					if(aOfFournisseurs[i]["active_supplier"] == 0)
					{
						sHTML+= "<td>" + "Actif" + "</td>";
					}
					else if(aOfFournisseurs[i]["active_supplier"] == 1)
					{
						sHTML+= "<td>" + "Inactif" + "</td>";
					}
					//////////////////////////////////////////// GESTION DES VALEUR PRENOM  ///////////////////////////////////////////
					if(aOfFournisseurs[i]["firstname_supplier"] == undefined || aOfFournisseurs[i]["firstname_supplier"].length == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + aOfFournisseurs[i]["firstname_supplier"] + "</td>";
					}

					//////////////////////////////////////////// GESTION DES VALEUR NOM  ///////////////////////////////////////////
					if(aOfFournisseurs[i]["lastname_supplier"] == undefined || aOfFournisseurs[i]["lastname_supplier"].length == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + aOfFournisseurs[i]["lastname_supplier"] + "</td>";
					}
					
					//////////////////////////////////////////// GESTION DES VALEUR DESCRIPTION  ///////////////////////////////////////////
					if(aOfFournisseurs[i]["desc_supplier"] == undefined || aOfFournisseurs[i]["desc_supplier"].length == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + aOfFournisseurs[i]["desc_supplier"] + "</td>";
					}
					
					//////////////////////////////////////////// GESTION DES VALEUR ADRESSE 2  ///////////////////////////////////////////
					if(aOfFournisseurs[i]["adress_2_supplier"] == undefined || aOfFournisseurs[i]["adress_2_supplier"].length == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + aOfFournisseurs[i]["adress_2_supplier"] + "</td>";
					}
					
					//////////////////////////////////////////// GESTION DES VALEUR ADRESSE EMAIL ///////////////////////////////////////////
					if(aOfFournisseurs[i]["mail_supplier"] == undefined || aOfFournisseurs[i]["mail_supplier"].length == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + aOfFournisseurs[i]["mail_supplier"] + "</td>";
					}
					
					//////////////////////////////////////////// GESTION DES VALEUR COMMENTAIRE  ///////////////////////////////////////////
					if(aOfFournisseurs[i]["comment_supplier"] == undefined || aOfFournisseurs[i]["comment_supplier"].length == 0)
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + aOfFournisseurs[i]["comment_supplier"] + "</td>";
					}
					
					//////////////////////////////////////////// GESTION DES VALEUR POSITION GOOGLE MAP ///////////////////////////////////////////
					if(aOfFournisseurs[i]["position_supplier"] == undefined || aOfFournisseurs[i]["position_supplier"] == "")
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else if(aOfFournisseurs[i]["position_supplier"].startsWith('http'))
					{
						sHTML+= "<td> <iframe class='google_map' src='" + aOfFournisseurs[i]["position_supplier"] + "' width='100%' height='100%' frameborder='0' style='border:0;' allowfullscreen=''></iframe> </td>";						
					}
					//////////////////////////////////////////// GESTION DES VALEUR IMG ///////////////////////////////////////////
					if(aOfFournisseurs[i]["img_supplier"] == undefined || aOfFournisseurs[i]["img_supplier"] == "")
					{
						sHTML+= "<td>" + "Non renseigner" + "</td>";
					}
					else
					{
						sHTML+= "<td>" + "<img class='photo_profil_dans_datatable' src='../../images_upload/" + aOfFournisseurs[i]["img_supplier"] + "'>" + "</td>";
						
					}
					//////////////////////////////////////////// AJOUT DES BOUTONS AJOUTER ET SUPPRIMER   ///////////////////////////////////////////
					sHTML+= "<td> <button id=\"bouton_modifier\" class =\"btn btn-success mr-1\" onClick=\"affiche_modal_modification(" + i + ")\">Modifier</button> <button class = \"btn btn-danger \" type=\"button\" data-toggle=\"modal\" data-target=\"#infos\" onClick=\"detect_index_fournisseur_a_suppr(" + i + ")\">Supprimer</button></td>";

					sHTML+= "</tr>";
				}
				
				sHTML+= "</tbody>";
				$('#table_fournisseurs').html(sHTML);
			}
			
			/**
			 * clear table HTML
			 * 
			 * clear and destroy datatable
			 * 
			 * build table and call datatable
			 * 
			 */
			function rebuildDatable()	{
				tables.clear();
				tables.destroy();
				constructTable();
				tables = $('#table_fournisseurs').DataTable(configuration);
			}
			
			/**
			 * clear HTML Form
			 * 
			 */
			function clearForm()	{
				$('#firstname_supplier').val("");
				$('#lastname_supplier').val("");
				$('#corporatename_supplier').val("");
				$('#desc_supplier').val("");
				$('#adress_1_supplier').val("");
				$('#adress_2_supplier').val("");
				$('#mail_supplier').val("");
				$('#comment_supplier').val("");
				$('#tel_supplier').val("");
				$('#position_supplier').val("");
				smiley(0);

				$('#btn_ajouter').removeClass('d-none');
				$('#btn_modifier').addClass('d-none');
				$('#btn_annuler').addClass('d-none');
				document.getElementById('photo_de_profil').src = "afpanier/assets/img/profil.jpg";
				ajout = true;
			}
			
			function verifie_inputs(action = "") 
			{
				var VarHtml = '';
				var caractere_interdit = ['a', 'b', 'c'];
				for (let index = 0; index < caractere_interdit.length; index++)
				{
					///////////////////////////////////////////  VERIFIE SI LE FIRSTNAME CONTAIN CARACTERES INTERDIT  ///////////////////////////////
					if(document.getElementById('firstname_supplier').value.includes(caractere_interdit[index]))
					{
						VarHtml += "Prenom invalide\n";
					}
					///////////////////////////////////////////  VERIFIE SI LE LASTNAME CONTAIN CARACTERES INTERDIT  ///////////////////////////////
					if(document.getElementById('lastname_supplier').value.includes(caractere_interdit[index]))
					{
						VarHtml += "Nom invalide\n";
					}
					///////////////////////////////////////////  VERIFIE SI LE CORPORATE NAME CONTAIN CARACTERES INTERDIT  ///////////////////////////////
					if(document.getElementById('corporatename_supplier').value.includes(caractere_interdit[index]))
					{
						VarHtml += "Nom Societé invalide\n";
					}
					///////////////////////////////////////////  VERIFIE SI LA DESCRIPTION CONTAIN CARACTERES INTERDIT  ///////////////////////////////
					if(document.getElementById('desc_supplier').value.includes(caractere_interdit[index]))
					{
						VarHtml += "Description invalide\n";
					}
					///////////////////////////////////////////  VERIFIE SI LE ADRESSE 1 CONTAIN CARACTERES INTERDIT  ///////////////////////////////
					if(document.getElementById('adress_1_supplier').value.includes(caractere_interdit[index]))
					{
						VarHtml += "Adresse 1 invalide\n";
					}
					///////////////////////////////////////////  VERIFIE SI LE ADRESSE 2 CONTAIN CARACTERES INTERDIT  ///////////////////////////////
					if(document.getElementById('adress_2_supplier').value.includes(caractere_interdit[index]))
					{
						VarHtml += "Adresse 2 invalide\n";
					}
					///////////////////////////////////////////  VERIFIE SI LE COMMENTAIRE CONTAIN CARACTERES INTERDIT  ///////////////////////////////
					if(document.getElementById('comment_supplier').value.includes(caractere_interdit[index]))
					{
						VarHtml += "Commentaire invalide\n";
					}
				}
				alert(VarHtml);
				/*if()
				{

				}
				if()
				{

				}
				if()
				{

				}
				if()
				{

				}
				if()
				{

				}
				if()
				{

				}
				if()
				{

				}*/
				
				
			}
			/**
			 * add a movie in database
			 * 
			 * build table and call datatable
			 * 
			 */
			function ajoutFournisseur()	
			{
				$('#divModalSaving').show();

				
				var dDateFournisseur;
				if (detectIEorSafari())	{
					dDateFournisseur= inverseDate($('#date_fournisseur').val());
				}  else  {
					dDateFournisseur= $('#date_fournisseur').val();
				}
				

				var file_data;
				const form_data = new FormData();

				if($('#new_fichier')[0].files[0] != undefined)
				{
					alert("envoi avec img");
					file_data = $('#new_fichier')[0].files[0];
					form_data.append('new_fichier',file_data);
				}					
					
				form_data.append('page','save_fournisseur');
				form_data.append('bJSON',1);
				form_data.append("firstname_supplier", $('#firstname_supplier').val());
				form_data.append("lastname_supplier", $('#lastname_supplier').val());
				form_data.append("corporatename_supplier", $('#corporatename_supplier').val());
				form_data.append("desc_supplier", $('#desc_supplier').val());
				form_data.append("adress_1_supplier", $('#adress_1_supplier').val());
				form_data.append("adress_2_supplier", $('#adress_2_supplier').val());
				form_data.append("mail_supplier", $('#mail_supplier').val());
				form_data.append("comment_supplier", $('#comment_supplier').val());
				form_data.append("tel_supplier", $('#tel_supplier').val());
				form_data.append("feedback_supplier", valeur_smiley);
				form_data.append("position_supplier", $('#position_supplier').val());
				form_data.append("active_supplier", $('#active_supplier').val());

				$.ajax({
					type: "POST",
					url: "route.php",
					async: true,
					data: form_data,
					dataType: "json",
					processData:false,
					contentType:false,
					cache: false,
				})
				.done(function(result) {
					if (result[0]["error"] != "" || result[0]['response'] != 'ok')	{
						$('#divModalSaving').hide();
						alert("Erreur lors de l'ajout de votre fournisseur. Vous allez être déconnecté.");
						self.location.href= "route.php?page=logout"
					}  else  {
						alert(result[0]['nom']);
						var iLongueur= aOfFournisseurs.length;
						aOfFournisseurs[iLongueur]= [];
						aOfFournisseurs[iLongueur]["id_supplier"]= result[0]["id_supplier"];
						aOfFournisseurs[iLongueur]["firstname_supplier"]= $('#firstname_supplier').val();
						aOfFournisseurs[iLongueur]["lastname_supplier"]= $('#lastname_supplier').val();
						aOfFournisseurs[iLongueur]["corporatename_supplier"]= $('#corporatename_supplier').val();
						aOfFournisseurs[iLongueur]["desc_supplier"]= $('#desc_supplier').val();
						aOfFournisseurs[iLongueur]["adress_1_supplier"]= $('#adress_1_supplier').val();
						aOfFournisseurs[iLongueur]["adress_2_supplier"]= $('#adress_2_supplier').val();
						aOfFournisseurs[iLongueur]["mail_supplier"]= $('#mail_supplier').val();
						aOfFournisseurs[iLongueur]["img_supplier"]= result[0]['nom'];
						aOfFournisseurs[iLongueur]["active_supplier"]= $('#active_supplier').val();
						aOfFournisseurs[iLongueur]["comment_supplier"]= $('#comment_supplier').val();
						rebuildDatable();
						clearForm();
						$('#divModalSaving').hide();
						$('#infos3').modal('show');
					}
				})
				.fail(function(err) 
				{
					console.log('error : ' + err.status);
					alert("Erreur lors de l'ajout de votre fournisseur. Vous allez être déconnecté.");
					self.location.href= "route.php?page=logout";
				});
			}

			/**
			 * Update a movie in database
			 * 
			 * build table and call datatable
			 * 
			 */
			function majFournisseur()	{
				$('#divModalSaving').show();
				/*
				var dDateFournisseur;
				if (detectIEorSafari())	{
					dDateFournisseur= inverseDate($('#date_fournisseur').val());
				}  else  {
					dDateFournisseur= $('#date_fournisseur').val();
				}*/



				var file_data;
				const form_data = new FormData();

				if($('#new_fichier')[0].files[0] != undefined)
				{
					alert("envoi avec img");
					file_data = $('#new_fichier')[0].files[0];
					form_data.append('new_fichier',file_data);
				}					
					
				form_data.append('page','update_fournisseur');
				form_data.append('bJSON',1);
				form_data.append("id_supplier", aOfFournisseurs[fournisseur_selectionner]['id_supplier']);
				form_data.append("firstname_supplier", $('#firstname_supplier').val());
				form_data.append("lastname_supplier", $('#lastname_supplier').val());
				form_data.append("corporatename_supplier", $('#corporatename_supplier').val());
				form_data.append("desc_supplier", $('#desc_supplier').val());
				form_data.append("adress_1_supplier", $('#adress_1_supplier').val());
				form_data.append("adress_2_supplier", $('#adress_2_supplier').val());
				form_data.append("mail_supplier", $('#mail_supplier').val());
				form_data.append("comment_supplier", $('#comment_supplier').val());
				form_data.append("tel_supplier", $('#tel_supplier').val());
				form_data.append("feedback_supplier", valeur_smiley);
				form_data.append("position_supplier", $('#position_supplier').val());
				form_data.append("active_supplier", $('#active_supplier').val());

				$.ajax({
					type: "POST",
					url: "route.php",
					async: true,
					data: form_data,
					dataType: "json",
					processData:false,
					contentType:false,
					cache: false,
				})
				.done(function(result) {
					if (result[0]["error"] != "" ||  result[0]['response'] != 'ok')	{
						$('#divModalSaving').hide();
						alert("Erreur lors de la modification de votre fournisseur. Vous allez être déconnecté.");
						self.location.href= "route.php?page=logout"
					}  else  {
						aOfFournisseurs[fournisseur_selectionner]["firstname_supplier"]= $('#firstname_supplier').val();
						aOfFournisseurs[fournisseur_selectionner]["lastname_supplier"]= $('#lastname_supplier').val();
						aOfFournisseurs[fournisseur_selectionner]["corporatename_supplier"]= $('#corporatename_supplier').val();
						aOfFournisseurs[fournisseur_selectionner]["desc_supplier"]= $('#desc_supplier').val();
						aOfFournisseurs[fournisseur_selectionner]["adress_1_supplier"]= $('#adress_1_supplier').val();
						aOfFournisseurs[fournisseur_selectionner]["adress_2_supplier"]= $('#adress_2_supplier').val();
						aOfFournisseurs[fournisseur_selectionner]["mail_supplier"]= $('#mail_supplier').val();
						aOfFournisseurs[fournisseur_selectionner]["img_supplier"] = result[0]['nom'];
						aOfFournisseurs[fournisseur_selectionner]["comment_supplier"]= $('#comment_supplier').val();
						aOfFournisseurs[fournisseur_selectionner]["tel_supplier"]= $('#tel_supplier').val();
						aOfFournisseurs[fournisseur_selectionner]["feedback_supplier"]= valeur_smiley;
						aOfFournisseurs[fournisseur_selectionner]["position_supplier"]= $('#position_supplier').val();
						aOfFournisseurs[fournisseur_selectionner]["active_supplier"]= $('#active_supplier').val();

						rebuildDatable();
						clearForm();
						$('#divModalSaving').hide();
						$('#infos10').modal('hide');
						$('#infos4').modal('show');
					}
				})
				.fail(function(err) {
					
					console.log('error : ' + err.status);
					alert("Erreur lors de la modification de votre fournisseur. Vous allez être déconnecté.");
					self.location.href= "route.php?page=logout";
				});
			}

			/**
			 * delete a movie in database
			 * 
			 * build table and call datatable
			 * 
			 */
			function supprimFournisseur()	{
				$('#divModalSaving').show();
				var datas = {
					page : "supprime_fournisseur",
					bJSON : 1, 
					id_supplier: aOfFournisseurs[fournisseur_selectionner]["id_supplier"],
				}
				$.ajax({
					type: "POST",
					url: "route.php",
					async: true,
					data: datas,
					dataType: "json",
					cache: false,
				})
				.done(function(result) {
					if (result[0]["error"] != "")	{
						$('#divModalSaving').hide();
						alert("Erreur lors de la suppression de votre fournisseur. Vous allez être déconnecté.");
						self.location.href= "route.php?page=logout"
					}  else  {
						for (var i=fournisseur_selectionner; i<(aOfFournisseurs.length-1); i++)	{
							aOfFournisseurs[i]= aOfFournisseurs[i+1];
						}
						aOfFournisseurs.length--;
						rebuildDatable();
						clearForm();
						$('#divModalSaving').hide();
						$('#infos5').modal('show');
					}
				})
				.fail(function(err) {
					console.log(err);
					
					console.log('error : ' + err.status);
					alert("Erreur lors de la suppression de votre fournisseur. Vous allez être déconnecté.");
					self.location.href= "route.php?page=logout";
				});
			}






			///////////////////////////////////// FONCTION AFFICHAGE IMG SELECTIONNER PAR L UTILISATEUR ///////////////////////////////////////

			function affiche_img(input = null)
			{
				
					if (input.files && input.files[0]) 
					{
						// le filereader sert a lire un fichier
						var reader = new FileReader();            
						reader.onload = function (e) {
							// ces ligne servents a changer la src de l img pour que l image selectionner soit visible par l utilisateur
							$('#photo_de_profil').attr('src', e.target.result);
						}
						reader.readAsDataURL(input.files[0]);
					}
			}
			///////////////////////////////////// CONFIGURATION DE DATATABLE ///////////////////////////////////////
			const configuration = {
				"stateSave": false,
				"order": [[0, "asc"]],
				"pagingType": "simple_numbers",
				"searching": true,
				"lengthMenu": [[25, 50, 250, -1], [25, 50, 100, "Tous"]], 
				"language": {
					"info": "Fournisseurs _START_ à _END_ sur _TOTAL_ sélectionnées",
					"emptyTable": "Aucun fournisseur",
					"lengthMenu": "_MENU_ fournisseurs par page",
					"search": "Rechercher : ",
					"zeroRecords": "Aucun résultat de recherche",
					"paginate": {
						"previous": "Précédent",
						"next": "Suivant"
					},
					"sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
					"sInfoEmpty":      "Fournisseurs 0 à 0 sur 0 sélectionnée",
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
					{
						"orderable": false
					},
					{
						"orderable": false
					},
					{
						"orderable": false
					},
					{
						"orderable": false
					},
					{
						"orderable": false
					},
					{
						"orderable": false
					},
					{
						"orderable": false
					},
					{
						"orderable": false
					},
					{
						"orderable": false
					},
					{
						"orderable": false
					},
					{
						"orderable": false
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

			/**
			 * Init start
			 * 
			 */
			var tables;
			$(document).ready(function() {
				loadFournisseurs();
				
			});
			

		