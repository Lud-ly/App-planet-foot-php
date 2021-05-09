
var aOfProducteurs= [];

aOfProducteurs[0]= [];
aOfProducteurs[0]["raisonsociale"]= "DufourCorp";
aOfProducteurs[0]["adresse"]= "24 rue bleue";
aOfProducteurs[0]["adressecomplement"]= "batiment B";
aOfProducteurs[0]["ville"]= "Saint Jean de Vedas";
aOfProducteurs[0]["CP"]= "34430";
aOfProducteurs[0]["telephoneentreprise"]= "0702030405";
aOfProducteurs[0]["emailentreprise"]= "dufourcorp@outlook.com";
aOfProducteurs[0]["type"]= "Légumes";
aOfProducteurs[0]["image"]= "";
aOfProducteurs[0]["description"]= "";
aOfProducteurs[0]["commentaire"]= "test";
aOfProducteurs[0]["evaluation"]= "";
aOfProducteurs[0]["nomcontact"]= "Dufour";
aOfProducteurs[0]["prenomcontact"]= "Bidule";
aOfProducteurs[0]["telephonecontact"]= "0102030405";
aOfProducteurs[0]["emailcontact"]= "truc@outlook.com";

aOfProducteurs[1]= [];
aOfProducteurs[1]["raisonsociale"]= "SuperFarm";
aOfProducteurs[1]["adresse"]= "35 rue jaune";
aOfProducteurs[1]["adressecomplement"]= "batiment A";
aOfProducteurs[1]["ville"]= "Montpellier";
aOfProducteurs[1]["CP"]= "34000";
aOfProducteurs[1]["telephoneentreprise"]= "0706060606";
aOfProducteurs[1]["emailentreprise"]= "superfarm@gmail.fr";
aOfProducteurs[1]["type"]= "Fruits";
aOfProducteurs[1]["image"]= "";
aOfProducteurs[1]["description"]= "";
aOfProducteurs[1]["commentaire"]= "test2";
aOfProducteurs[1]["evaluation"]= "";
aOfProducteurs[1]["nomcontact"]= "Dupont";
aOfProducteurs[1]["prenomcontact"]= "Machin";
aOfProducteurs[1]["telephonecontact"]= "0102030405";
aOfProducteurs[1]["emailcontact"]= "machin@outlook.com";


function constructTable()	
{
    var i;

    var sHTML= "";
    sHTML+= "<thead class=\"bg-secondary text-white\">";
    sHTML+= "<tr>";
    sHTML+= "<td>Raison Sociale</td>";
    sHTML+= "<td>CP</td>";
    sHTML+= "<td>Ville</td>";
    sHTML+= "<td>Tél</td>";
    sHTML+= "<td>E-mail</td>";
    sHTML+= "<td>Evaluation</td>";
    sHTML+= "<td>Editer</td>";
    sHTML+= "<td>Supprimer</td>";
    sHTML+= "</tr>";
    sHTML+= "</thead>";
    sHTML+= "<tbody>";

    for (i=0; i<aOfProducteurs.length; i++)	
    {
        sHTML+= "<tr>";
        sHTML+= "<td>" + aOfProducteurs[i]["raisonsociale"] + "</td>";
        sHTML+= "<td>" + aOfProducteurs[i]["CP"] + "</td>";
        sHTML+= "<td>" + aOfProducteurs[i]["ville"] + "</td>";
        sHTML+= "<td>" + aOfProducteurs[i]["telephoneentreprise"] + "</td>";
        sHTML+= "<td>" + aOfProducteurs[i]["emailentreprise"] + "</td>";
        sHTML+= "<td>" + aOfProducteurs[i]["evaluation"] + "</td>";
        sHTML+= "<td><button onClick=\"editProducteur(" + i + ")\" class=\"btn_action rounded\" data-toggle=\"collapse\" data-target=\"#form_afficher\">Editer</button></td>";
        sHTML+= "<td><button onClick=\"supprimProducteur(" + i + ")\" class=\"btn_action rounded\">Supprimer</button></td>";
        sHTML+= "</tr>";
    }
    
    sHTML+= "</tbody>";
    $('#table_producteurs').html(sHTML);
}

function afficheProducteur()	
{
    document.getElementById("btn_ajouter").className = "btn_action rounded";
    document.getElementById("btn_afficher").className = "btn_action rounded collapse";
    document.getElementById("btn_modifier").className = "btn_action rounded collapse";
    document.getElementById("btn_annuler").className = "btn_action rounded";
}

function ajoutProducteur()	
{
    document.getElementById("btn_ajouter").className = "btn_action rounded collapse";
    document.getElementById("btn_modifier").className = "btn_action rounded collapse";
    document.getElementById("btn_annuler").className = "btn_action rounded collapse";
    document.getElementById("btn_afficher").className = "btn_action rounded";
    document.getElementById("form_afficher").className = "collapse";

    var iLongueur= aOfProducteurs.length;
    aOfProducteurs[iLongueur]= [];
    aOfProducteurs[iLongueur]["raisonsociale"]= $('#raisonsociale').val();
    aOfProducteurs[iLongueur]["adresse"]= $('#adresse').val();
    aOfProducteurs[iLongueur]["adressecomplement"]= $('#adressecomplement').val();
    aOfProducteurs[iLongueur]["ville"]= $('#ville').val();
    aOfProducteurs[iLongueur]["CP"]= $('#CP').val();
    aOfProducteurs[iLongueur]["telephoneentreprise"]= $('#telephoneentreprise').val();
    aOfProducteurs[iLongueur]["emailentreprise"]= $('#emailentreprise').val();
    aOfProducteurs[iLongueur]["type"]= $('#type').val();
    aOfProducteurs[iLongueur]["image"]= $('#image').val();
    aOfProducteurs[iLongueur]["description"]= $('#description').val();
    aOfProducteurs[iLongueur]["commentaire"]= $('#commentaire').val();
    aOfProducteurs[iLongueur]["evaluation"]= $('#evaluation').val();
    aOfProducteurs[iLongueur]["nomcontact"]= $('#nomcontact').val();
    aOfProducteurs[iLongueur]["prenomcontact"]= $('#prenomcontact').val();
    aOfProducteurs[iLongueur]["telephonecontact"]= $('#telephonecontact').val();
    aOfProducteurs[iLongueur]["emailcontact"]= $('#emailcontact').val();
    rebuildTable() 

    $('#raisonsociale').val("");
    $('#adresse').val("");
    $('#adressecomplement').val("");
    $('#ville').val("");
    $('#CP').val("");
    $('#telephoneentreprise').val("");
    $('#emailentreprise').val("");
    $('#type').val("");
    $('#image').val("");
    $('#description').val("");
    $('#commentaire').val("");
    $('#evaluation').val("");
    $('#nomcontact').val("");
    $('#prenomcontact').val("");
    $('#telephonecontact').val("");
    $('#emailcontact').val("");


}

var iIndiceEditionEncours;
function editProducteur(iIndiceEdit)	
{
    document.getElementById("btn_ajouter").className = "btn_action rounded hide";
    document.getElementById("btn_modifier").className = "btn_action rounded";
    document.getElementById("btn_annuler").className = "btn_action rounded";
    document.getElementById("form_afficher").className = "collapse";
    document.getElementById("btn_afficher").className = "btn_action rounded hide";
    
    iIndiceEditionEncours= iIndiceEdit;
    $('#raisonsociale').val( aOfProducteurs[iIndiceEdit]["raisonsociale"] );
    $('#adresse').val( aOfProducteurs[iIndiceEdit]["adresse"] );
    $('#adressecomplement').val( aOfProducteurs[iIndiceEdit]["adressecomplement"] );
    $('#ville').val( aOfProducteurs[iIndiceEdit]["ville"] );
    $('#CP').val( aOfProducteurs[iIndiceEdit]["CP"] );
    $('#telephoneentreprise').val( aOfProducteurs[iIndiceEdit]["telephoneentreprise"] );
    $('#emailentreprise').val( aOfProducteurs[iIndiceEdit]["emailentreprise"] );
    $('#type').val( aOfProducteurs[iIndiceEdit]["type"] );
    $('#image').val( aOfProducteurs[iIndiceEdit]["image"] );
    $('#description').val( aOfProducteurs[iIndiceEdit]["description"] );
    $('#commentaire').val( aOfProducteurs[iIndiceEdit]["commentaire"] );
    $('#evaluation').val( aOfProducteurs[iIndiceEdit]["evaluation"] );
    $('#nomcontact').val( aOfProducteurs[iIndiceEdit]["nomcontact"] );
    $('#prenomcontact').val( aOfProducteurs[iIndiceEdit]["prenomcontact"] );
    $('#telephonecontact').val( aOfProducteurs[iIndiceEdit]["telephonecontact"] );
    $('#emailcontact').val( aOfProducteurs[iIndiceEdit]["emailcontact"] );
}

function majProducteur()	
{
    document.getElementById("btn_ajouter").className = "btn_action rounded";
    document.getElementById("btn_modifier").className = "btn_action rounded hide";
    document.getElementById("btn_annuler").className = "btn_action rounded hide";
    document.getElementById("form_afficher").className = "collapse";

    aOfProducteurs[iIndiceEditionEncours]["raisonsociale"]= $('#raisonsociale').val();
    aOfProducteurs[iIndiceEditionEncours]["adresse"]= $('#adresse').val();
    aOfProducteurs[iIndiceEditionEncours]["adressecomplement"]= $('#adressecomplement').val();
    aOfProducteurs[iIndiceEditionEncours]["ville"]= $('#ville').val();
    aOfProducteurs[iIndiceEditionEncours]["CP"]= $('#CP').val();
    aOfProducteurs[iIndiceEditionEncours]["telephoneentreprise"]= $('#telephoneentreprise').val();
    aOfProducteurs[iIndiceEditionEncours]["emailentreprise"]= $('#emailentreprise').val();
    aOfProducteurs[iIndiceEditionEncours]["type"]= $('#type').val();
    aOfProducteurs[iIndiceEditionEncours]["image"]= $('#image').val();
    aOfProducteurs[iIndiceEditionEncours]["description"]= $('#description').val();
    aOfProducteurs[iIndiceEditionEncours]["commentaire"]= $('#commentaire').val();
    aOfProducteurs[iIndiceEditionEncours]["evaluation"]= $('#evaluation').val();
    aOfProducteurs[iIndiceEditionEncours]["nomcontact"]= $('#nomcontact').val();
    aOfProducteurs[iIndiceEditionEncours]["prenomcontact"]= $('#prenomcontact').val();
    aOfProducteurs[iIndiceEditionEncours]["telephonecontact"]= $('#telephonecontact').val();
    aOfProducteurs[iIndiceEditionEncours]["emailcontact"]= $('#emailcontact').val();
    rebuildTable() 

    $('#raisonsociale').val("");
    $('#adresse').val("");
    $('#adressecomplement').val("");
    $('#ville').val("");
    $('#CP').val("");
    $('#telephoneentreprise').val("");
    $('#emailentreprise').val("");
    $('#type').val("");
    $('#image').val("");
    $('#description').val("");
    $('#commentaire').val("");
    $('#evaluation').val("");
    $('#nomcontact').val("");
    $('#prenomcontact').val("");
    $('#telephonecontact').val("");
    $('#emailcontact').val("");
}

function supprimProducteur(iIndiceSupprim)	
{
    aOfProducteurs.splice (iIndiceSupprim, 1);
    rebuildTable() 
}

function annulProducteur()	
{
    document.getElementById("btn_ajouter").className = "btn_action rounded collapse";
    document.getElementById("btn_modifier").className = "btn_action rounded collapse";
    document.getElementById("btn_annuler").className = "btn_action rounded collapse";
    document.getElementById("btn_afficher").className = "btn_action rounded";
    document.getElementById("form_afficher").className = "collapse";

    $('#raisonsociale').val("");
    $('#adresse').val("");
    $('#adressecomplement').val("");
    $('#ville').val("");
    $('#CP').val("");
    $('#telephoneentreprise').val("");
    $('#emailentreprise').val("");
    $('#type').val("");
    $('#image').val("");
    $('#description').val("");
    $('#commentaire').val("");
    $('#evaluation').val("");
    $('#nomcontact').val("");
    $('#prenomcontact').val("");
    $('#telephonecontact').val("");
    $('#emailcontact').val("");
}

// CONFIGURATION DATATABLE
const configuration = 
{
    "stateSave": false,
    "order": [[1, "asc"]],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [[10, 25, 50, 100, -1], ["Dix", "Vingt cinq", "Cinquante", "Cent", "Ze total stp"]], 
    "language": 
    {
        "info": "Fournisseurs _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucun fournisseur",
        "lengthMenu": "_MENU_ Fournisseur par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": 
        {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty":      "Fournisseur 0 à 0 sur 0 sélectionnée",
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

var tables;
$(document).ready(function() 
{
    constructTable();
    // INIT DATATABLE
    tables = $('#table_producteurs').DataTable(configuration);
});

function rebuildTable() 
{
    $('#table_producteurs').html("");
    tables.clear(); 
    tables.destroy(); 
    constructTable();
    tables = $('#table_producteurs').DataTable(configuration);
}

