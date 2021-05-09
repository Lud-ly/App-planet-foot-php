// create a new table
var notice_tableone= [];

// FUNCTION WHO CREATE THE PAGE WITH THE RIGHT DATAS
function loadNotice()	{
    var datas = {
        page : "notice_liste_single",
        // peek the right parameter for the article
        article : $('#article').val(),
        bJSON : 1
    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })
    .done(function(result) {
        console.log('done: ', result);
        $('#title_news').html(result[0]["label_news"]);
        $('#intro_news').html(result[0]["intro_news"]);
        // display the right picture with a max-width
        $('#img_news').attr("src",`assets/img/${result[0]["img_news"]}`).css("max-width","550px");
        $('#content_news').html(result[0]["content_news"]);
        $('#author_news').html(result[0]["author_news"]);
        $('#date_creation_news').html(result[0]["date_creation_news"]);
    })
    .fail(function(err) {
        console.log('fail: ', err);
    });
}

// When launching my page, send me my function
$(document).ready(function() {
    loadNotice();
});
