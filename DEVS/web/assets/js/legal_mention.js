var aOfTexte= [];

function legal_mention_list() {
    let datas = {
        page: 'legal_mention_list',
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
            sHTML+= "<div class=\"titre\">" + htmlspecialchars_decode(aOfTexte[i]["page_content_title"] + "</div>");
            sHTML+= "<div class=\"texte\">" + htmlspecialchars_decode(aOfTexte[i]["page_content"] + "</div>");
        }
        $('#mentionLegale').html(sHTML);
    })

    .fail(function(err) {
        err = 'raté';
        console.log(err)
    })
}


function htmlspecialchars_decode(str) 
{
    if (typeof(str) == "string") {
        str = str.replaceAll(/&amp;/g, "&"); /* must do &amp; first */
        str = str.replaceAll(/&quot;/g, '"');
        str = str.replaceAll(/&amp;#039;/g, "'");
        str = str.replaceAll(/&lt;/g, "<");
        str = str.replaceAll(/&gt;/g, ">");
        console.log(str)
    }
    return str;
}

$(document).ready(function() 
{
	legal_mention_list();
});
