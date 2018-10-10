$(function () {

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus()
    })


//    var aboveHeight = $('nav').outerHeight() + $('.jumbotron').outerHeight();
//
//
//
//    $(window).scroll(function () {
//
//
//        console.log($(window).scrollTop());
//        if ($(window).scrollTop() > aboveHeight) {
//            $('.nav-pills').addClass('affix');
//        }
//        if ($(window).scrollTop() < aboveHeight) {
//            $('.nav-pills').removeClass('affix');
//        }
//    });




    $('[data-toggle="tooltip"]').tooltip()


});