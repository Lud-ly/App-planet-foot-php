$(document).ready(function(){
    listOrderAjax();
});


function jqueryAjax(datas) {
    return $.ajax({
        type : "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType : "json",
        cache : false,
    })
}

 
/**
 * SELECT ORDER by id_user
 */
function listOrderAjax() {
    var datas = {
        page : "order_ajax",
        mode : "list_order",
        bJSON : 1,
        //id_user : $('#userId').val()
    }
    jqueryAjax(datas)
    .done(function(result) {
        console.log(result);
        deep_array_data = result.liste_order;
        constructOrder()

    })
    .fail(function(err) {
        console.log(err);
    })
}

function insertOrderAjax() {
    var datas = {
        page : "order_ajax",
        mode : "insert_order",
        bJSON : 1
        
    }; 

    jqueryAjax(datas)
    .done(function(result) {
        console.log(result);
    })
    .fail(function(err) {
        console.log(err);
    })
}













