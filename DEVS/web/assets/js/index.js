var foot;
var indice;

// $("#result").on("click", function FOOTAPI() {
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
    console.log("response", response);
    foot = response;
    var resultHtml = $("<div>");
    for (i = 0; i < foot.length; i++) {
        indice = i;
        var makein = foot[i]["date"] == null ? "No information available" : foot[i]["date"];
        var date = makein.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3-$2-$1").slice(0, 10);
        var image = foot[i]["thumbnail"] == null ? "Image/no-image.png" : foot[i]["thumbnail"];
        var comp = foot[i]["competition"]["name"] == null ? "No information available" : foot[i]["competition"]["name"];
        // var video = foot[i]["embed"] == null ? "Video/no-video.mp4" : foot[i]["embed"];
        var title = foot[i]["title"] == null ? "Image/no-image.png" : foot[i]["title"];


        resultHtml.append("<div class='card mb-4 mr-3' resourceId=\"" + foot[i]["competition"]["id"] + "\">"
            + '<div class="card-body">'
            + '<h5 class="card-title">' + title + '</h5>'
            + '<p class="card-title">' + comp + '</p>'
            + date
            + "<img  class='card-img-top' alt='Card image cap' src=\"" + image + "\" /></div>"
            + '<button onclick="Play(' + indice + ')">video</button>'
            + '<button id="close" class="hide" onclick="Hide()">fermer</button>'
            + '<div class="hide" id="video">' + videoHtml + '</div>'
            + ' </div>'
            + "</div>");
        resultHtml.append("</div>");
        $("#foot").html(resultHtml);
    }
});
// });

var videoHtml;
function Hide() {
    $('#video').html("");
    $("#close").addClass('hide');
}
function Play(indice) {
    console.log(indice);
    videoHtml = +'<div>' + foot[indice]['embed'] + '</div>'
    $("#video").removeClass('hide');
    $("#video").addClass('show');
    $("#video").html(videoHtml);
    $("#close").removeClass('hide');
    $("#close").addClass('show');
};












const settings2 = {
    "async": true,
    "crossDomain": true,
    "url": "https://football98.p.rapidapi.com/bundesliga/squads",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "39ac6c85ebmsh6b6e308a4061cbfp1b0061jsn5e48f2a2f866",
        "x-rapidapi-host": "football98.p.rapidapi.com"
    }
};

$.ajax(settings2).done(function (response) {
    console.log("squad", response);
});

const setting4 = {
    "async": true,
    "crossDomain": true,
    "url": "https://football98.p.rapidapi.com/ligue1/squadname/lens",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "39ac6c85ebmsh6b6e308a4061cbfp1b0061jsn5e48f2a2f866",
        "x-rapidapi-host": "football98.p.rapidapi.com"
    }
};

$.ajax(setting4).done(function (response) {
    console.log("equipe", response);
});


const settings3 = {
    "async": true,
    "crossDomain": true,
    "url": "https://football98.p.rapidapi.com/liga/scorers",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "39ac6c85ebmsh6b6e308a4061cbfp1b0061jsn5e48f2a2f866",
        "x-rapidapi-host": "football98.p.rapidapi.com"
    }
};

$.ajax(settings3).done(function (response) {
    console.log("scorers", response);
});