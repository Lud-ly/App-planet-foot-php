/* 
card_order_panier = [
    {
        "id_panier": 321,
        "titre_panier":"Mon super panier",
        "description_panier":"Description de mon panierDescription de mon panierDescription de mon panierDescription de mon panierDescription de mon panierDescription de mon panier",
        "date_creation_panier": "",
        "date_livraison_panier": "",
        "date_visualisation_start_panier": "",
        "date_visualisation_end_panier": "",
        "date_payment_start_panier": "",
        "date_payment_end_panier": "",
        "producteur_panier": "Jean Charle",
        "image_panier": "https://poirier.fr/wp-content/uploads/2018/08/2-Corbeille-de-Fruits-Frais-de-Saison.png",
        "variante_panier": [
            {
                "id_variante_panier": 555,
                "titre_variante_panier": "Ma premiere variante",
                "prix_variante_panier": 5,
                "article_variante_panier": [
                    {
                        "name_article_variante_panier": "Pomme",
                        "mesure_article_variante_panier": "kg",
                        "poids_article_variante_panier": 20
                    },
                    {
                        "name_article_variante_panier": "Carrote",
                        "mesure_article_variante_panier": "kg",
                        "poids_article_variante_panier": 20
                    }
                ]
            },
            {
                "id_variante_panier": 556,
                "titre_variante_panier": "Ma seconde variante",
                "prix_variante_panier": 50,
                "article_variante_panier": [
                    {
                        "name_article_variante_panier": "Pomme",
                        "mesure_article_variante_panier": "kg",
                        "poids_article_variante_panier": 20
                    },
                    {
                        "name_article_variante_panier": "Carrote",
                        "mesure_article_variante_panier": "kg",
                        "poids_article_variante_panier": 20
                    }
                ]
            }
        ]
    },
]
*/

let card_order_list = $('#card_order_list');

$(function() {
    $.each(card_order_panier, function(key, value) {
        card_order_add_panier(key, value)
    })
});

const card_order_add_panier = (id, data) => {
    console.log(data)
    card_order_list.append(`        
        <div class="card my-3 mx-5" style="width: 20rem;height: 40rem;">
            <img class="card-img-top" src="${data.image_panier}" alt="Card image cap">
            <div class="card-body h-100">
                <h5 class="card-title">${data.titre_panier}</h5>
                <p class="card-text test">${data.description_panier}</p>
                <select name="card_order_variation" id="card_order_variation${id}"></select>
            </div>
<!--            <ul class="list-group list-group-flush">-->
<!--                <li class="list-group-item">Cras justo odio</li>-->
<!--                <li class="list-group-item">Dapibus ac facilisis in</li>-->
<!--                <li class="list-group-item">Vestibulum at eros</li>-->
<!--            </ul>-->
            <div class="card-body text-center">
                <button href="#" class="card-link btn button_green">Detail du panier</button>
            </div>
        </div>
    `)
    $.each(data.variante_panier, function(key, value) {
        $(`#card_order_variation${id}`).append(`
            <option value="${value.id_variante_panier}">${value.titre_variante_panier} : ${value.prix_variante_panier}</option>
        `)
    })
}