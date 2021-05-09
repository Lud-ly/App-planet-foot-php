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

function listNotifAjax() {
    var datas = {
        page : "notif_ajax",
        mode : "list_notif",
        bJSON : 1
        
    }; 


    jqueryAjax(datas)
    .done(function(result) {
        console.log(result);
        deep_array_data = result.liste_notif;
        constructNotif()

    })
    .fail(function(err) {
        console.log(err);
    })
}

