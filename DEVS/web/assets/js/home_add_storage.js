function addPanier1() {
    // appel avec l'ajax
        var datas = {
            page:"home_basket_add",
            BJSON : 1
        };

        $.ajax({
            type:"POST",
            url:"route.php",
            async:true,
            data:datas,
            dataType:"json",
            cache:false,
        }).done(function(result){
            console.log(result)
        }).fail(function(err){
            console.log(err);
        })
    
    let arrayLength;
    let price;
    const event = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const date = event.toLocaleDateString("fr-FR",options);
    const listCart = $("#liste").val();
    $('#account_modal').show(0).delay(2000).hide(0);

    switch (listCart) {
        case "Panier 5Kg":
            price = 12.00;
            break;
    
        case "Panier 7Kg":
            price = 15.00;
            break;

        default:
            break;
    }

    const product = {
        product: listCart,
        description: `Laitue, tomates, oignons, poivrons, brocolis, pommes`, // OFFER desc_offer
        quantity: +$("#qte").val(),
        price, // OFFER price_offer
        image_panier: "assets/img/panier.png", // OFFER img_offer
        id_panier: null, //OFFER id_offer
        label_panier: 'Les légumes fruités', // OFFER label_offer
        prix: `${price}€`, // OFFER price_offer
        nombre: +$("#qte").val(),
        date,
        statut: '1', // OFFER nb_available_offer
        ref: "PRDO145522" // OFFER ref_offer
    };

    if(
        localStorage.getItem("product") === null ||
        localStorage.getItem("product") === 'undefined'
    ) {
        product.id_panier = 40;
        let arrayProducts = [product];
        arrayLength = arrayProducts.length;
        const objstr = JSON.stringify(arrayProducts);
        localStorage.setItem("product", objstr);
    } else {
        let stringPrducts = localStorage.getItem("product");
        const arrayProducts = JSON.parse(stringPrducts);

        const index = arrayProducts.findIndex(element => element.product === product.product);
        if(index !== -1) {
            arrayProducts[index].quantity = arrayProducts[index].quantity + product.quantity;
            arrayProducts[index].nombre = arrayProducts[index].nombre + product.nombre;
        } else {
            let lastElement = arrayProducts[arrayProducts.length-1];
            let num = lastElement.id_panier;
            product.id_panier = ++num;
            arrayProducts.push(product);
        }

        arrayLength = arrayProducts.length;

        const objstr = JSON.stringify(arrayProducts);
        localStorage.setItem("product", objstr);
    }
    $("#Qt-panier")
        .html(arrayLength)
        .attr("class","panier_count")
        .animate({"width":"-=10px","height":"-=10px"},300)
        .animate({"width":"+=10px","height":"+=10px"},300);
    console.log(localStorage.getItem("product"));
}

function addPanier2() {
    let arrayLength;
    const event = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const date = event.toLocaleDateString("fr-FR",options);
    const listCart = $("#liste2").val();
    $('#account_modal').show(0).delay(2000).hide(0);

    switch (listCart) {
        case "Panier 1Kg":
            price = 10.00;
            break;

        case "Panier 2Kg":
            price = 12.00; 
            break;

        case "Panier 3Kg":
            price = 14.00;
            break;

        default:
            break;
    }

    const product = {
        product: $("#liste2").val(),
        description: `Du vin et des raisins`,
        quantity: +$("#qte3").val(),
        price,
        image_panier: "assets/img/vin.png",
        id_panier: null,
        label_panier: 'Le vin garni',
        prix: `${price}€`,
        nombre: +$("#qte3").val(),
        date,
        statut: '1',
        ref: "PRDO1452345"
    };

    if(
        localStorage.getItem("product") === null ||
        localStorage.getItem("product") === 'undefined'
    ) {
        product.id_panier = 40;
        let arrayProducts = [product];
        arrayLength = arrayProducts.length;
        const objstr = JSON.stringify(arrayProducts);
        localStorage.setItem("product", objstr);
    } else {
        let stringPrducts = localStorage.getItem("product");
        const arrayProducts = JSON.parse(stringPrducts);

        const index = arrayProducts.findIndex(element => element.product === product.product);
        if(index !== -1) {
            arrayProducts[index].quantity = arrayProducts[index].quantity + product.quantity;
            arrayProducts[index].nombre = arrayProducts[index].nombre + product.nombre;
        } else {
            let lastElement = arrayProducts[arrayProducts.length-1];
            let num = lastElement.id_panier;
            product.id_panier = ++num;
            arrayProducts.push(product);
        }

        arrayLength = arrayProducts.length;

        const objstr = JSON.stringify(arrayProducts);
        localStorage.setItem("product", objstr);
    }
    $("#Qt-panier")
        .html(arrayLength)
        .attr("class","panier_count")
        .animate({"width":"-=10px","height":"-=10px"},300)
        .animate({"width":"+=10px","height":"+=10px"},300);
    console.log(localStorage.getItem("product"));
}
