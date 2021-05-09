
// On definit un array avec les "[]" qui sert a stocker une COLLECTION d'elements
let array_data = [

    // On definit un objet javascript avec "{}" en utilisant la meme structure qu'un array associatif en PHP
    // Donc des paires key => value
    // Pas besoin de mettre de "" pour la key, pour la value par contre les "" sont nécéssaires pour les variables de type STRING
    // Les paires key => value doivent etre séparés par une virgule ,
    {
        nom: 'cochon',
        age: 12,
        tel: '0655558877',
        mail: 'spider@cochon.org'
    },
    // On est dans un array, donc on met une virgule apres chaque element
    // Ici la virgule au dessus séparant le premier objet JS du deuxieme objet en dessous
    {
        nom: 'gretchka',
        age: 54,
        tel: '0655221100',
        mail: 'gretchka@gmail.org'
    },
    {
        nom: 'toto',
        age: 62,
        tel: '0674458877',
        mail: 'toto@gmail.org'
    },
    {
        nom: 'igor',
        age: 11,
        tel: '0654778855',
        mail: 'igor@cochon.org'
    }
];
console.log('Structure initiale => ', array_data)
console.log('============================')


console.log('Debut de la boucle sur le tableau de données')
console.log('============================')

// On definit une variable de type STRING qui va container les elements HTML a afficher
let stringHTML = '';

// Méthode '.map' qui sert a boucler sur un array
// L'argument index end dessous commence a 0 automatiquement et est incrementée a chaque boucle
array_data.map((element, index) => {

    console.log('Element en cours  => ', index ,' : ', element)
    console.log('Nom de l\'element en cours => ', element.nom)
    console.log('-------------------------')

    // L'opérateur "+=" en dessous sert a concatener les elements HTML a chaque passage dans la boucle dans la variable 'stringHTML'
    // Utilisation des `` pour englober le HTML
    stringHTML += `
        <tr class="element" id="id_element_${index}">
            <td>${element.nom}</td>
            <td>${element.age}</td>
            <td>${element.tel}</td>
            <td>${element.mail}</td>
        </tr>
    `;



})
console.log('Fin de boucle et affichage des données')
console.log('============================')

// On insere la variable contenant tous les elements HTML dans le tbody de la table
$('#gen_table_exemple_tbody').html(stringHTML);




/////////////////////////////////////////////////////////////////
// SHORT VERSION


let array_data_min = [
    {
        nom: 'cochon',
        age: 12,
        tel: '0655558877',
        mail: 'spider@cochon.org'
    },
    {
        nom: 'gretchka',
        age: 54,
        tel: '0655221100',
        mail: 'gretchka@gmail.org'
    },
    {
        nom: 'toto',
        age: 62,
        tel: '0674458877',
        mail: 'toto@gmail.org'
    },
    {
        nom: 'igor',
        age: 11,
        tel: '0654778855',
        mail: 'igor@cochon.org'
    }
];
//
let stringHTML_min = '';
//
array_data_min.map((element, index) => {

    stringHTML_min += `
        <tr class="element" id="id_element_${index}">
            <td>${element.nom}</td>
            <td>${element.age}</td>
            <td>${element.tel}</td>
            <td>${element.mail}</td>
        </tr>
    `;

});
//
$('#nothing').html(stringHTML_min);







