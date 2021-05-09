$(document).ready(function() {
    $(window).width(function() {
        size_screen()
    })
});

$(window).resize(function() {
    size_screen()
})

function size_screen() {
    if (window.innerWidth >= 1000) {
        $('#footer_project_name').addClass('col-md-2')
        $('#footer_project_name').removeClass('col-md-3')
    }
    if (window.innerWidth < 1000) {
        $('#footer_project_name').addClass('col-md-3');
        $('#footer_project_name').removeClass('col-md-2');
    }
    if (window.innerWidth >= 1000) {
        $('#footer_desc_afpa').addClass('col-md-4')
        $('#footer_desc_afpa').removeClass('col-md-5')
    }
    if (window.innerWidth < 1000) {
        $('#footer_desc_afpa').addClass('col-md-5');
        $('#footer_desc_afpa').removeClass('col-md-4');
    }
    if (window.innerWidth >= 1000) {
        $('#footer_contact').addClass('col-md-2')
        $('#footer_contact').removeClass('col-md-4')
    }
    if (window.innerWidth < 1000) {
        $('#footer_contact').addClass('col-md-4');
        $('#footer_contact').removeClass('col-md-2');
    }
}