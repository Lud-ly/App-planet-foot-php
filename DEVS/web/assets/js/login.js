var aOfUsers = [];

//To check that the questions fit into the table.
// console.log("aOfText => ", aOfText)

function Simulate_users() {
    //showLoadingModal();
    var datas = {
        page: "login",
        front_user_password: $("#ulogin_password").val(),
        front_username: $("#username").val(),
        bJSON: 1

    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })
        .done(function (result) {

            $(location).attr("href", "index");
            // hideLoadingModal();

        })
        .fail(function (err) {
            alert('error : ' + err.status);


        })
}





$(document).ready(function () {

});
