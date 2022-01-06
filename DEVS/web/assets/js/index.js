var aOfFoot = [];
var indice;
var makein;
var date;
var image;
var comp;
var video;
var videoHtml;
var title;

$(function () {
    scrollTo($("#viewScroll"));
    $("#viewCards").empty();
});


const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://free-football-soccer-videos1.p.rapidapi.com/v1/",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "39ac6c85ebmsh6b6e308a4061cbfp1b0061jsn5e48f2a2f866",
        "x-rapidapi-host": "free-football-soccer-videos1.p.rapidapi.com"
    }
};
$.ajax(settings).done(function (response) {
    console.log(response);
    aOfFoot = response;
    var resultHtml = $("<div class='cardGrid'>");
    for (i = 0; i < aOfFoot.length; i++) {

        indice = i;
        makein = aOfFoot[i]["date"] == null ? "No information available" : aOfFoot[i]["date"];
        date = makein.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3-$2-$1").slice(0, 10);
        image = aOfFoot[i]["thumbnail"] == null ? "Image/no-image.png" : aOfFoot[i]["thumbnail"];
        comp = aOfFoot[i]["competition"]["name"] == null ? "No information available" : aOfFoot[i]["competition"]["name"];
        var sideTeam1 = aOfFoot[i]["side1"]["name"] == null ? "pas d'équipe" : aOfFoot[i]["side1"]["name"];
        var sideTeam2 = aOfFoot[i]["side2"]["name"] == null ? "pas d'équipe" : aOfFoot[i]["side2"]["name"];

        title = aOfFoot[i]["title"] == null ? "Image/no-image.png" : aOfFoot[i]["title"];

        resultHtml.append('<div class="card" id="foot" style="width: 22rem;background:#23272b" resourceId=' + aOfFoot[i]["competition"]["id"] + '">'
            + '<p class="card-title text-center">' + comp + ' | ' + date + '</p>'
            //+ '<img class="card-img-top" src=' + image + ' alt="Card image cap">'
            + '<div class="card-body">'
            + '<div id="teams"><h6>' + sideTeam1 + '</h6><span class="versus"> vs </span><h6>' + sideTeam2 + '</h6></div>'
            + '<p class="card-text"></p>'
            + '<p class="text-center"><button class="btn btn-dark" onclick="Play(' + indice + ')"><a href="#ex1" rel="modal:open"><img class="card-img-top" src=' + image + ' alt="Card image cap"></a></button></p>'
            + '</div>'

        );
    }
    $("#viewCards").hide();
    $("#viewCards").html(resultHtml);
});
function showCard() {
    $("#viewCards").toggle();
}

function Hide() {
    $('#video').html("");
    $("#close").addClass('hide');
    $("#video").addClass('hide');
}
function Play(indice) {
    console.log(indice);
    videoHtml = +'<div class="modal">' + aOfFoot[indice]['embed'] + '</div>'
    $("#video").removeClass('hide');
    $("#video").addClass('show');
    $("#video").html(videoHtml);
    $("#close").removeClass('hide');
    $("#close").addClass('show');
};

function scrollTo(target) {
    if (target.length) {
        $("html, body").stop().animate({ scrollTop: target.offset().top }, 1500);
    }
}




