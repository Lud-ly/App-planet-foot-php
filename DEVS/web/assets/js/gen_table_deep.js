/////////////////////////////////////////////////////////////////
//  VERSION AVEC DEUX NIVEAUX IMBRIQUES



// Array "commandes"
let deep_array_data = [

    // Premier objet "commande"
    {
        id_commande: 1,
        nom_commande: 'commande_1',
        ref_commande: 'FRT4777',
        date_commande: '07/07/1999',
        // Array imbriqué "paniers"
        paniers: [
            // Premier objet  "panier" imbriqué dans l'array 'produits'
            {
                id_panier: 45,
                label_panier: 'Super panier',
                nombre: 3,
                prix_unitaire: 12
            },
            // Deuxieme objet "panier"
            {
                id_panier: 78,
                label_panier: 'Moyen panier',
                nombre: 1,
                prix_unitaire: 17
            },
        ]
    },

    // Second objet  "commande", ne pas oublier la virgule au dessus séparant les objets
    {
        id_commande: 2,
        nom_commande: 'commande_2',
        ref_commande: 'FRT9999',
        date_commande: '17/11/2149',
        paniers: [
            {
                id_panier: 74,
                label_panier: 'Bof panier',
                nombre: 2,
                prix_unitaire: 25
            }
        ]
    },

    // Troisième objet "commande"
    {
        id_commande: 3,
        nom_commande: 'commande_3',
        ref_commande: 'FRT1447',
        date_commande: '14/04/2444',
        paniers: [
            {
                id_panier: 788,
                label_panier: 'Tata panier',
                nombre: 1,
                prix_unitaire: 45
            },
            {
                id_panier: 55,
                label_panier: 'Toto panier',
                nombre: 8,
                prix_unitaire: 78
            }
        ]
    }

];


// On definit les variables recuperant les elements HTML
let stringHTML_commande = '';

// Création de la premiére boucle qui boucle sur les elements "commande"
deep_array_data.map(commande => {

    let stringHTML_panier = '';

    // Création de la seconde boucle qui boucle sur les elements "panier" de l'element "commande" en cours
    commande.paniers.map(panier => {
        stringHTML_panier += `
            <div class="panier col-12 pt-1" id="${panier.id_panier}" style="display: none;">
                <div class="row">
                    <div class="col-3">Id :${panier.id_panier}</div>
                    <div class="col-3">Label : ${panier.label_panier}</div>
                    <div class="col-3">Nombre : ${panier.nombre}</div>
                    <div class="col-3">Prix unitaire : ${panier.prix_unitaire}</div>
                </div>
            </div>
        `;
    });

    //Lorsque la seconde boucle est terminée, création du HTML pour les commandes
    stringHTML_commande += `
        <div class="commande row mb-2 mt-2" id="id_commande_${commande.id_commande}" onclick="openContainer(this)">
            <div class="col-1">${commande.id_commande}</div>
            <div class="col-3">${commande.ref_commande}</div>
            <div class="col-4">${commande.nom_commande}</div>
            <div class="col-4">${commande.date_commande}</div>
            ${stringHTML_panier}
        </div>
    `;

});

// Lorsque le 'map' des commandes est terminé, insertion du HTML dans le DOM
$('#gen_table_deep_array_tbody').html(stringHTML_commande);


// Fonction utilisée pour enlever toggle display show/none du detail
function openContainer(container){
    console.log(container);
    $(container).find('.panier').toggle()
}