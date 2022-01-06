/*----------------1---------------------FUNCTION  5 + 5 VOLETS CLUBS ----------*/

$(function () {
    // $(".fullHoverImg").css('display', 'none');
    // $(".description").hover(function () {
    //     $(".fullHoverImg").css('display', 'block');
    // });

    var $mainMenuItems = $("#main-menu ul").children("li"),
        totalMainMenuItems = $mainMenuItems.length,
        openedIndex = 0,

        init = function () {
            bindEvents();
            if (validIndex(openedIndex))
                animateItem($mainMenuItems.eq(openedIndex), true, 700);
        },

        bindEvents = function () {

            $mainMenuItems.children(".images").click(function () {
                var newIndex = $(this).parent().index();
                checkAndAnimateItem(newIndex);
            });

            $(".button").hover(
                function () {
                    $(this).addClass("hovered");
                },
                function () {
                    $(this).removeClass("hovered");
                }
            );

            $(".button").click(function () {
                var newIndex = $(this).index();
                checkAndAnimateItem(newIndex);
            });


        },

        validIndex = function (indexToCheck) {
            return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems);
        },

        animateItem = function ($item, toOpen, speed) {
            var $colorImage = $item.find(".color"),
                itemParam = toOpen ? { width: "420px" } : { width: "140px" },
                colorImageParam = toOpen ? { left: "0px" } : { left: "140px" };
            $colorImage.animate(colorImageParam, speed);
            $item.animate(itemParam, speed);
        },

        checkAndAnimateItem = function (indexToCheckAndAnimate) {
            if (openedIndex === indexToCheckAndAnimate) {
                animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, 250);
                openedIndex = -1;
            }
            else {
                if (validIndex(indexToCheckAndAnimate)) {
                    animateItem($mainMenuItems.eq(openedIndex), false, 250);
                    openedIndex = indexToCheckAndAnimate;
                    animateItem($mainMenuItems.eq(openedIndex), true, 250);
                }
            }
        };

    init();




    $.ajax({
        headers: {
            'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85'
        },
        url: 'https://api.football-data.org/v2/teams/81/',
        mode: 'no-cors',
        dataType: 'json',
        type: 'GET',
    }).then(function (response) {
        var teams = response;

        $('#codeClub').text(teams.tla);
        $('#imgClub').html('<img src="' + teams.crestUrl + '">');
        $('#shortName').text(teams.shortName);
        $('#clubName').text(teams.name);
        $('#founded').text(teams.founded);
        $('#stadeName').text(teams.venue);
        $('#websiteClub').text(teams.website);
        $('#emailClub').text(teams.email);
        $('#phoneClub').text(teams.phone);
    });

    $.ajax({
        headers: { 'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85' },
        url: 'https://api.football-data.org/v2/teams/86/',
        mode: 'no-cors',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        var teams = response;

        $('#codeClub1').text(teams.tla);
        $('#imgClub1').html('<img src="' + teams.crestUrl + '">');
        $('#shortName1').text(teams.shortName);
        $('#clubName1').text(teams.name);
        $('#founded1').text(teams.founded);
        $('#stadeName1').text(teams.venue);
        $('#websiteClub1').text(teams.website);
        $('#emailClub1').text(teams.email);
        $('#phoneClub1').text(teams.phone);
    });
    $.ajax({
        headers: { 'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85' },
        url: 'https://api.football-data.org/v2/teams/524/',
        mode: 'no-cors',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        var teams = response;

        $('#codeClub2').text(teams.tla);
        $('#imgClub2').html('<img src="' + teams.crestUrl + '">');
        $('#shortName2').text(teams.shortName);
        $('#clubName2').text(teams.name);
        $('#founded2').text(teams.founded);
        $('#stadeName2').text(teams.venue);
        $('#websiteClub2').text(teams.website);
        $('#emailClub2').text(teams.email);
        $('#phoneClub2').text(teams.phone);
    });

    $.ajax({
        headers: { 'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85' },
        url: 'https://api.football-data.org/v2/teams/516/',
        mode: 'no-cors',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        var teams = response;

        $('#codeClub3').text(teams.tla);
        $('#imgClub3').html('<img src="' + teams.crestUrl + '">');
        $('#shortName3').text(teams.shortName);
        $('#clubName3').text(teams.name);
        $('#founded3').text(teams.founded);
        $('#stadeName3').text(teams.venue);
        $('#websiteClub3').text(teams.website);
        $('#emailClub3').text(teams.email);
        $('#phoneClub3').text(teams.phone);
    });

    $.ajax({
        headers: { 'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85' },
        url: 'https://api.football-data.org/v2/teams/64/',
        mode: 'no-cors',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        var teams = response;

        $('#codeClub4').text(teams.tla);
        $('#imgClub4').html('<img src="' + teams.crestUrl + '">');
        $('#shortName4').text(teams.shortName);
        $('#clubName4').text(teams.name);
        $('#founded4').text(teams.founded);
        $('#stadeName4').text(teams.venue);
        $('#websiteClub4').text(teams.website);
        $('#emailClub4').text(teams.email);
        $('#phoneClub4').text(teams.phone);
    });
    /*---------------2----------------------VOLET ROULANT CLUBS N°2-----------------------------------------------*/

    $.ajax({
        headers: { 'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85' },
        url: 'https://api.football-data.org/v2/teams/65/',
        mode: 'no-cors',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        var teams = response;

        $('#codeClub5').text(teams.tla);
        $('#imgClub5').html('<img src="' + teams.crestUrl + '">');
        $('#shortName5').text(teams.shortName);
        $('#clubName5').text(teams.name);
        $('#founded5').text(teams.founded);
        $('#stadeName5').text(teams.venue);
        $('#websiteClub5').text(teams.website);
        $('#emailClub5').text(teams.email);
        $('#phoneClub5').text(teams.phone);
    });

    $.ajax({
        headers: { 'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85' },
        url: 'https://api.football-data.org/v2/teams/66/',
        mode: 'no-cors',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        var teams = response;

        $('#codeClub6').text(teams.tla);
        $('#imgClub6').html('<img src="' + teams.crestUrl + '">');
        $('#shortName6').text(teams.shortName);
        $('#clubName6').text(teams.name);
        $('#founded6').text(teams.founded);
        $('#stadeName6').text(teams.venue);
        $('#websiteClub6').text(teams.website);
        $('#emailClub6').text(teams.email);
        $('#phoneClub6').text(teams.phone);
    });
    $.ajax({
        headers: {
            'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85',
        },
        url: 'https://api.football-data.org/v2/teams/4/',
        mode: 'no-cors',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        var teams = response;

        $('#codeClub7').text(teams.tla);
        $('#imgClub7').html('<img src="' + teams.crestUrl + '">');
        $('#shortName7').text(teams.shortName);
        $('#clubName7').text(teams.name);
        $('#founded7').text(teams.founded);
        $('#stadeName7').text(teams.venue);
        $('#websiteClub7').text(teams.website);
        $('#emailClub7').text(teams.email);
        $('#phoneClub7').text(teams.phone);
    });

    $.ajax({
        headers: {
            'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85',
        },
        url: 'https://api.football-data.org/v2/teams/5/',
        mode: 'no-cors',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        var teams = response;

        $('#codeClub8').text(teams.tla);
        $('#imgClub8').html('<img src="' + teams.crestUrl + '">');
        $('#shortName8').text(teams.shortName);
        $('#clubName8').text(teams.name);
        $('#founded8').text(teams.founded);
        $('#stadeName8').text(teams.venue);
        $('#websiteClub8').text(teams.website);
        $('#emailClub8').text(teams.email);
        $('#phoneClub8').text(teams.phone);
    });

    $.ajax({
        headers: { 'X-Auth-Token': 'a7be21e1dd70494f9d8ac3cb035a4a85' },
        url: 'https://api.football-data.org/v2/teams/109/',
        mode: 'no-cors',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        var teams = response;

        $('#imgClub9').html('<img src="' + teams.crestUrl + '">');
        $('#shortName9').text(teams.shortName);
        $('#clubName9').text(teams.name);
        $('#founded9').text(teams.founded);
        $('#lastUpdated').text(teams.lastUpdated);
        $('#stadeName9').text(teams.venue);
        $('#websiteClub9').text(teams.website);
        $('#emailClub9').text(teams.email);
        $('#phoneClub9').text(teams.phone);
    });


});
$(function () {

    var $mainMenuItems = $("#main-menu2 ul").children("li"),
        totalMainMenuItems = $mainMenuItems.length,
        openedIndex = 2,

        init = function () {
            bindEvents();
            if (validIndex(openedIndex))
                animateItem($mainMenuItems.eq(openedIndex), true, 700);
        },

        bindEvents = function () {

            $mainMenuItems.children(".images").click(function () {
                var newIndex = $(this).parent().index();
                checkAndAnimateItem(newIndex);
            });

            $(".button2").hover(
                function () {
                    $(this).addClass("hovered");
                },
                function () {
                    $(this).removeClass("hovered");
                }
            );

            $(".button2").click(function () {
                var newIndex = $(this).index();
                checkAndAnimateItem(newIndex);
            });


        },

        validIndex = function (indexToCheck) {
            return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems);
        },

        animateItem = function ($item, toOpen, speed) {
            var $colorImage = $item.find(".color2"),
                itemParam = toOpen ? { width: "420px" } : { width: "140px" },
                colorImageParam = toOpen ? { left: "0px" } : { left: "140px" };
            $colorImage.animate(colorImageParam, speed);
            $item.animate(itemParam, speed);
        },

        checkAndAnimateItem = function (indexToCheckAndAnimate) {
            if (openedIndex === indexToCheckAndAnimate) {
                animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, 250);
                openedIndex = -1;
            }
            else {
                if (validIndex(indexToCheckAndAnimate)) {
                    animateItem($mainMenuItems.eq(openedIndex), false, 250);
                    openedIndex = indexToCheckAndAnimate;
                    animateItem($mainMenuItems.eq(openedIndex), true, 250);
                }
            }
        };

    init();

});

var idCounter = 1;
function editValueInputs() {
    for (var i = 0; i < aOfCars.length; i++) {
        console.log(aOfCars[i]["marque"]);
        var inputControl = '<div class="inputControl">'
            + '<input value="' + aOfCars[i]["marque"] + '" id="answer_' + idCounter + '" placeholder="Entrez une reponse">'
            + '<a class="delete" type="button" id="answer_' + idCounter + '">Delete</a>'
            + '</div>';

        $(".container1").append(inputControl);

        idCounter++;
    }
}


$(document).ready(function () {
    editValueInputs();
    var max_fields = 10;
    var wrapper = $(".container1");
    var add_button = $(".add_form_field");

    var x = 1;

    $(add_button).click(function (e) {
        e.preventDefault();
        idCounter++;
        if (x < max_fields) {
            x++;
            $(wrapper).append('<div><input id="answer_' + idCounter + '" type="text" name="mytext[]" /><a href="#" class="delete">Delete</a></div>'); //add input box
        }
        else {
            alert('You Reached the limits')
        }
    });

    $(wrapper).on("click", ".delete", "#answer_" + idCounter, function (e) {
        idCounter--;
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});

















var aOfCars = [];
aOfCars[0] = [];
aOfCars[0]["annee"] = "2006";
aOfCars[0]["marque"] = "Renault";
aOfCars[0]["modele"] = "Clio rs";
aOfCars[0]["motorisation"] = "2.0L 16S";
aOfCars[0]["cv"] = "200";

aOfCars[1] = [];
aOfCars[1]["annee"] = "2018";
aOfCars[1]["marque"] = "Bmw";
aOfCars[1]["modele"] = "i3";
aOfCars[1]["motorisation"] = "Electrique";
aOfCars[1]["cv"] = "150";

aOfCars[2] = [];
aOfCars[2]["annee"] = "2019";
aOfCars[2]["marque"] = "Porsche";
aOfCars[2]["modele"] = "911 Carrera S";
aOfCars[2]["motorisation"] = "3.0L V6";
aOfCars[2]["cv"] = "450";

aOfCars[3] = [];
aOfCars[3]["annee"] = "1979";
aOfCars[3]["marque"] = "Ford";
aOfCars[3]["modele"] = "Shelby GT500";
aOfCars[3]["motorisation"] = "5.2L V8";
aOfCars[3]["cv"] = "800";

aOfCars[4] = [];
aOfCars[4]["annee"] = "2019";
aOfCars[4]["marque"] = "Peugeot";
aOfCars[4]["modele"] = "308 GTI";
aOfCars[4]["motorisation"] = "2.0L 16s";
aOfCars[4]["cv"] = "210";

aOfCars[5] = [];
aOfCars[5]["annee"] = "1965";
aOfCars[5]["marque"] = "Citroen";
aOfCars[5]["modele"] = "2cv";
aOfCars[5]["motorisation"] = "1.2L";
aOfCars[5]["cv"] = "40";

aOfCars[6] = [];
aOfCars[6]["annee"] = "2016";
aOfCars[6]["marque"] = "Honda";
aOfCars[6]["modele"] = "Civic";
aOfCars[6]["motorisation"] = "Hybride";
aOfCars[6]["cv"] = "110";

aOfCars[7] = [];
aOfCars[7]["annee"] = "2015";
aOfCars[7]["marque"] = "Volkswagen";
aOfCars[7]["modele"] = "Golf";
aOfCars[7]["motorisation"] = "1.9Diesel";
aOfCars[7]["cv"] = "90";

aOfCars[8] = [];
aOfCars[8]["annee"] = "2020";
aOfCars[8]["marque"] = "Peugeot";
aOfCars[8]["modele"] = "208";
aOfCars[8]["motorisation"] = "Electrique";
aOfCars[8]["cv"] = "130";

aOfCars[9] = [];
aOfCars[9]["annee"] = "2020";
aOfCars[9]["marque"] = "Porsche";
aOfCars[9]["modele"] = "Taycan";
aOfCars[9]["motorisation"] = "Electrique";
aOfCars[9]["cv"] = "760";

aOfCars[10] = [];
aOfCars[10]["annee"] = "2020";
aOfCars[10]["marque"] = "Tesla";
aOfCars[10]["modele"] = "Model 3";
aOfCars[10]["motorisation"] = "Electrique";
aOfCars[10]["cv"] = "230";





const JEUX = [];

JEUX.push({ category: 'Sport', name: 'Beijing', Année: '2008', stocked: true, genre: 'DiversSports', age: '3+', console: 'Ps3' });
JEUX.push({ category: 'Sport', name: 'ShaunWhite', Année: '2010', stocked: true, genre: 'SkateBoard', age: '12+', console: 'Ps3' });
JEUX.push({ category: 'Sport', name: 'NBA2K010', Année: '2009', stocked: true, genre: 'Basket', age: '3+', console: 'Ps3' });
JEUX.push({ category: 'Sport', name: 'SSX', Année: '2012', stocked: true, genre: 'Snowboard', age: '3+', console: 'Ps3' });
JEUX.push({ category: 'Sport', name: 'Fifa09', Année: '2008', stocked: true, genre: 'Football', age: '3+', console: 'Ps3' });
JEUX.push({ category: 'Sport', name: 'Fifa13', Année: '2012', stocked: true, genre: 'Football', age: '3+', console: 'Ps3' });
JEUX.push({ category: 'Sport', name: 'FIFA20', Année: '2019', stocked: true, genre: 'Football', age: '3+', console: 'Ps4' });
JEUX.push({ category: 'Sport', name: 'FIFA18', Année: '2017', stocked: true, genre: 'Football', age: '3+', console: 'Ps4' });
JEUX.push({ category: 'Sport', name: 'FarmingSimulator17', Année: '2016', stocked: true, genre: 'Simulator', age: '3+', console: 'Ps4' });
JEUX.push({ category: 'Sport', name: 'SoccerBrawl', Année: '1991', stocked: true, genre: 'Arcade', age: '12+', console: 'NeoGeo' });
JEUX.push({ category: 'Sport', name: 'NeoTurfMaster', Année: '1996', stocked: true, genre: 'Arcade', age: '7+', console: 'NeoGeo' });
JEUX.push({ category: 'Sport', name: 'TopSpin3', Année: '2008', stocked: true, genre: 'Tennis', age: '3+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'TombRaider', Année: '2008', stocked: true, genre: 'Action', age: '18+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'DeadSpace3', Année: '2013', stocked: true, genre: 'Action', age: '18+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'RedDeadR', Année: '2010', stocked: true, genre: 'Action', age: '18+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'Uncharted3', Année: '2011', stocked: true, genre: 'Action', age: '16+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'Batman ArkamCity', Année: '2011', stocked: true, genre: 'Action', age: '16+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'Condemned2', Année: '2008', stocked: true, genre: 'Action', age: '18+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'DukeNukem ', Année: '2011', stocked: true, genre: 'Action', age: '18+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'Ratatouille', Année: '2007', stocked: true, genre: 'Action', age: '3+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'Sonic Unleashed', Année: '2008', stocked: true, genre: 'Action', age: '7+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'Lego Batman2', Année: '2012', stocked: true, genre: 'Action', age: '12+', console: 'Ps3' });
JEUX.push({ category: 'Aventure', name: 'Ratchet&Clank', Année: '2016', stocked: true, genre: 'Action', age: '3+', console: 'Ps4' });
JEUX.push({ category: 'Aventure', name: 'Fallout4', Année: '2015', stocked: true, genre: 'Action', age: '18+', console: 'Ps4' });
JEUX.push({ category: 'Aventure', name: 'HorizonZeroDawn', Année: '2017', stocked: true, genre: 'Action', age: '16+', console: 'Ps4' });
JEUX.push({ category: 'Aventure', name: 'Knack2', Année: '2017', stocked: true, genre: 'Action', age: '7+', console: 'Ps4' });
JEUX.push({ category: 'Aventure', name: 'Toki', Année: '1989', stocked: true, genre: 'Arcade', age: '3+', console: 'NeoGeo' });
JEUX.push({ category: 'Aventure', name: 'GoldenAxe', Année: '1995', stocked: true, genre: 'Arcade', age: '12+', console: 'NeoGeo' });
JEUX.push({ category: 'Aventure', name: 'Astérix', Année: '1996', stocked: true, genre: 'Arcade', age: '3+', console: 'NeoGeo' });
JEUX.push({ category: 'Course', name: 'DriveClub', Année: '2014', stocked: true, genre: 'Simulator', age: '3+', console: 'Ps4' });
JEUX.push({ category: 'Course', name: 'WipEoutOmega', Année: '2017', stocked: true, genre: 'Simulator', age: '7+', console: 'Ps4' });
JEUX.push({ category: 'Course', name: 'GranTurismo5', Année: '2010', stocked: true, genre: 'Simulator', age: '3+', console: 'Ps3' });
JEUX.push({ category: 'Course', name: 'DirtColinMcRae', Année: '2006', stocked: true, genre: 'rallye', age: '12+', console: 'Ps3' });
JEUX.push({ category: 'Course', name: 'MotorStorm', Année: '2006', stocked: true, genre: 'Crash', age: '12+', console: 'Ps3' });
JEUX.push({ category: 'Guerre', name: 'MetalSlug', Année: '1996', stocked: true, genre: 'Arcade', age: '12+', console: 'NeoGeo' });
JEUX.push({ category: 'Guerre', name: 'MetalSlug2', Année: '1998', stocked: true, genre: 'Arcade', age: '12+', console: 'NeoGeo' });
JEUX.push({ category: 'Guerre', name: 'MetalSlug3', Année: '2000', stocked: true, genre: 'Arcade', age: '12+', console: 'NeoGeo' });
JEUX.push({ category: 'Guerre', name: 'ShockTrooper2', Année: '1998', stocked: true, genre: 'Arcade', age: '7+', console: 'NeoGeo' });
JEUX.push({ category: 'Guerre', name: 'TimeCrisis RazingStorm', Année: '2005', stocked: true, genre: 'Action', age: '16+', console: 'Ps3' });
JEUX.push({ category: 'Combat', name: 'Doubledragon', Année: '1995', stocked: true, genre: 'Arcade', age: '7+', console: 'NeoGeo' });
JEUX.push({ category: 'Combat', name: 'FatalFury3', Année: '1995', stocked: true, genre: 'Arcade', age: '12+', console: 'NeoGeo' });
JEUX.push({ category: 'Combat', name: 'DragonballFighterZ', Année: '2018', stocked: true, genre: 'Manga', age: '12+', console: 'Ps4' });
JEUX.push({ category: 'Combat', name: 'Marvel-VS-Capcom', Année: '2011', stocked: true, genre: 'Manga', age: '12+', console: 'Ps3' });
