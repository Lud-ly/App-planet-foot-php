

$(function() {
    // si clic sur 'Voir le site en tant que client'
    $('#enable_customer_mode').click(function() {
        // active le mode 'client'
        $.ajax({
            type: 'POST',
            url: 'route.php',
            async: false,
            data: {
                page: 'adm_home',
                action: 'enable_customer_mode',
                bJSON: 1,
                bLoadHtml: false,
            },
            dataType: 'json',
            cache: false
        })
        .done(function(data) {
            if (!data.error) {
                window.location.href = 'index';
            }
        })
    })
})