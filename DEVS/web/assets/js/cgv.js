var aOfTexte= [];

function cgv_list() {
    let datas = {
        page: 'cgv_list',
        bJSON: 1
    }

    $.ajax({
        type: 'POST',
        url: 'route.php',
        async: true,
        data: datas,
        dataType: 'json',
        cache: false
    })

    .done(function(result) {
        aOfTexte= result;
        var i;
        var sHTML= "";

        for ( i= 0; i < result.length; i++)	
        {
            sHTML+= "<div class=\"titre\">" + aOfTexte[i]["page_content_title"] + "</div>";
            sHTML+= "<div class=\"texte\">" + aOfTexte[i]["page_content"] + "</div>";
        }
        $('#cgv').html(sHTML);
    })

    .fail(function(err) {
        err = 'raté';
        console.log(err)
    })
}


$(document).ready(function() 
{
	cgv_list();
});
