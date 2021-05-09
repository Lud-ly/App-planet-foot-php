// var aOfQuestions = [];

// //To check that the questions fit into the table.
// console.log("aOfQuestions => ", aOfQuestions)

// function loadFaq() {
//     // showLoadingModal();
//     var datas = {
//         page: "faq_visible_liste",
//         bJSON: 1
//     }   
//     $.ajax({
//             type: "POST",
//             url: "route.php",
//             async: true,
//             data: datas,
//             dataType: "json",
//             cache: false,
//         })
//         .done(function (result) {
//             var id_questionfaq = 0;
//             for (var ligne in result) {
//                 aOfQuestions[id_questionfaq] = [];
//                 // aOfQuestions[id_questionfaq]["id_questionfaq"] = result[ligne]["id_questionfaq"];
//                 // aOfQuestions[id_questionfaq]["position_questionfaq"] = result[ligne]["position_questionfaq"];
//                 aOfQuestions[id_questionfaq]["label_questionfaq"] = result[ligne]["label_questionfaq"];
//                 aOfQuestions[id_questionfaq]["answer_questionfaq"] = result[ligne]["answer_questionfaq"];
//                 id_questionfaq++;
//             }
//             // INIT DATATABLE
//             // Si je souhaite avoir par défaut autre que les 10 résultats par défaut au chargement
//             // tables.page.len(10).draw();
//             constructQuestions();
//             // tables = $('#table_questions').DataTable(configuration);
//         })
//         .fail(function (err) {
//             alert('error : ' + err.status);
//         });
// }

// function constructQuestions() {

//     var sHTML = "";
   

//     for (var i = 0; i < aOfQuestions.length; i++) { 
//         sHTML += "<div>";
//         sHTML += "<div class='flip' onclick='toggleQuestion("+i+")'>" + aOfQuestions[i]["label_questionfaq"] + "<br><img class='justify-content-center'  src=\"assets/img/fleche.png\" alt=\"logo stylo pour éditer\" height=\"25px\"></div>";
//         sHTML += "<div class='panel' id='panel_"+i+"'>" + aOfQuestions[i]["answer_questionfaq"] + "</div>";
//         sHTML += "</div>";
//         sHTML += "</div>";
//         sHTML += "<br>";
       
//     }
//  $('#table_questions').html(sHTML);
    
// }

// function toggleQuestion(index) {

//     $("#panel_" + index).slideToggle("slow");

// } 

// //la fonction qui permet d'avoir les 10 premiers résultats
// $(document).ready(function() {
//     // constructQuestions();
//     loadFaq();
// });


