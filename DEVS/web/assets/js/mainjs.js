
let array_panier = [

        {
            ingredient : 'banane',
            quantite : 300,
            unite : 'g',
            

        }
    ];
  
    
let stringHTML = '';
array_panier.map((element, index) => {

    stringHTML += `
    <tr class="element" id="id_element_${index}">
        <td style="width :150px;">${element.ingredient}</td>        
        <td style="width :150px;">${element.quantite}</td>
        <td style="width :150px;">${element.unite}</td>
    </tr>
`;

})
$('#panier_tbody').html(stringHTML);

function ajoutligne() {
    
        var ingredient = "";
        var quantite = 0;
        var unite = 0;
        ingredient= $("#ingredient").val();
        quantite= $("#quantite").val();
        unite= $("#unite").val();
        
        console.log(ingredient,quantite,unite);

        let array_panier = [

            {
                ingredient : ingredient,
                unite : unite,
                quantite : quantite,
     
            }
        ];


        array_panier.map((element, index) => {

            stringHTML += `
            <tr class="element" id="id_element_${index}">
                <td>${element.ingredient}</td>                
                <td>${element.quantite}</td>
                <td>${element.unite}</td>
            </tr>
        `;



        })
        console.log(stringHTML, $('#panier_tbody'));
        $('#panier_tbody').html(stringHTML);
        console.log("index : " + index);

}

function supligne() {

    array_panier.splice( iIndiceEditionEncours, 1 );

    array_panier.map((element, index) => {

        stringHTML += `
        <tr class="element" id="id_element_${index}">
            <td>${element.ingredient}</td>                
            <td>${element.quantite}</td>
            <td>${element.unite}</td>
        </tr>
    `;



    })
    console.log(stringHTML, $('#panier_tbody'));
    $('#panier_tbody').html(stringHTML);


}  

var iIndiceEditionEncours;
function edit(iIndiceEdit)	{
    alert("iIndiceEdit = " + iIndiceEdit);
    iIndiceEditionEncours= iIndiceEdit;
    $('#ingredient').val( array_panier[iIndiceEdit]["ingredient"] );
    $('#quantite').val( array_panier[iIndiceEdit]["quantite"] );
    $('#unite').val( array_panier[iIndiceEdit]["unite"] );
    
}
function modifligne()	{
    
    array_panier[iIndiceEditionEncours]= [];
    array_panier[iIndiceEditionEncours]["ingredient"]= $('#ingredient').val();
    array_panier[iIndiceEditionEncours]["quantite"]= $('#quantite').val();
    array_panier[iIndiceEditionEncours]["unite"]= $('#unite').val();

    array_panier.map((element, index) => {

        stringHTML += `
        <tr class="element" id="id_element_${index}">
            <td>${element.ingredient}</td>                
            <td>${element.quantite}</td>
            <td>${element.unite}</td>
        </tr>
    `;
  })
}