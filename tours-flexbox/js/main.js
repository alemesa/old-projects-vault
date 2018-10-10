'use strict';

// Avoid `console` errors in browsers that lack a console.

(function () {
    var method;
    var noop = function noop() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = window.console = window.console || {};

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
})();

// Place any jQuery/helper plugins in here.


////////////// MY JQUERY FUNCTIONS //////////////


////EVERYTHING IS INSIDE A FUNCTION 
$(function () {

    /// VARIABLE TOTAL FOR PRICE OF THE TOURS
    var total = 0;

    ///SOME DRY VARIABLES
    var arrow_up = "Hide Details" + "<i class='fa fa-arrow-up'></i>";
    var arrow_down = "Show Details " + "<i class='fa fa-arrow-down'></i>";

    ////STICKY CITIES NAVBAR
    //WHEN THE VIEWPORT GOES DOWN CERTAIN AMOUNT OF HEIGHT IN THIS CASE THE SUM OF THE HEADER AND THE BANNER
    var aboveHeight = $('header').outerHeight() + $('#banner').outerHeight();

    $(window).scroll(function () {
        //if you hard code, then use console
        //.log to determine when you want the 
        //nav bar to stick.  
        console.log($(window).scrollTop());
        if ($(window).scrollTop() > aboveHeight) {
            $('.cities').addClass('nav_fix');
        }
        if ($(window).scrollTop() < aboveHeight) {
            $('.cities').removeClass('nav_fix');
        }
    });

    //// HIDE THE EXTRA INFO CONTENT AS SOON AS THE DOM LOADS
    // IN CASE THAT JQUERY FAILS USER WILL BE AVAILABLE TO ACCESS THAT INFO
    $(".extra_info").hide();

    //// BURGER BUTTON  
    // WHEN YOU CLICK THE MENU ICON , THE MENU OPENS UP USING A CSS CLASS

    $(".burger").on("click", function () {

        $(this).siblings(".navbar").toggleClass('open');
    });

    ////SCROLL UP BUTTON EFFECT
    //HIDES THE EXTRA CONTENT


    $(".scroll_up").on("click", function () {

        //       DRY

        var show_details = $(this).parents(".extra_info").siblings(".main_buttons").children(".show_details");

        $(this).parents(".extra_info").hide('slow');

        show_details.toggleClass('hidedetails');

        if (show_details.hasClass('hidedetails')) {

            show_details.html(arrow_up);
        } else {

            show_details.html(arrow_down);
        }
    });

    ////SHOW DETAILS BUTTON
    //CHANGE THE APPARENCE OF THE BUTTON AND TOGGLE A CLASS


    $(".show_details").on("click", function () {

        $(this).toggleClass('hidedetails');

        if ($(this).hasClass('hidedetails')) {

            $(this).html(arrow_up);
        } else {

            $(this).html(arrow_down);
        }

        $(this).parents(".main_buttons").siblings(".extra_info").toggle("slow");
    });

    ////BUY BUTTON
    //ADD TO A TOTAL IF YOU CLICKED AND CHANGE THE LOOK OF THE BUTTON

    $(".buy").on("click", function () {

        $(this).toggleClass('selected');

        if ($(this).hasClass('selected')) {

            $(this).html("Remove <i class='fa fa-times'></i>");
            total = total + $(this).data("price");

            $('.checkout').html('Checkout: $' + total);
        } else {

            $(this).html("Add to Cart <i class='fa fa-cart-arrow-down'></i>");
            total = total - $(this).data("price");

            $('.checkout').html('Checkout: $' + total);
        }
    });

    ////HOVERING BUY BUTTON
    // WHAT TO DO WHEN MOUSEENTER OR MOUSELEAVE
    //MOUSEENTER SHOWS THE PRICE , THE PRICE IS ATTACH TO THE BUTTON OF EACH CITY AS DATA-PRICE CLASS
    //MOUSELEAVE RESTORE THE LOOK OF THE BUTTON

    $(".buy").hover(function (mouseenter) {
        $(this).html("$ " + $(this).data('price'));
    }, function (mouseleave) {
        if ($(this).hasClass('selected')) {

            $(this).html("Remove <i class='fa fa-times'></i>");
        } else {

            $(this).html("Add to Cart <i class='fa fa-cart-arrow-down'></i>");
        }
    });

    ////FAQ QUESTIONS
    //ALL THE QUESTIONS OPEN AT THE SAME TIME, BECAUSE A LOT OF FAQ QUESTIONS ON THE INTERNET DO THAT, MORE DESIGNED FOR WHEN THERE IS LOTS OF QUESTIONS BUT THIS IS JUST AN EXMAPLE


    $(".open_question").on("click", function () {

        $(".answer_faq").toggleClass('show_answer');
        $(".answer_faq").focus();

        $(".open_question").toggleClass('minus');

        //CHANGE THE LOOK OF THE + FOR - 
        if ($(".open_question").hasClass("minus")) {

            $(".open_question").html("<i class='fa fa-minus'></i>");
        } else {

            $(".open_question").html("<i class='fa fa-plus'></i>");
        }

        if ($(".answer_faq").hasClass('show_answer')) {

            $(".answer_faq p").show('300ms');
        } else {

            $(".answer_faq p").hide('300ms');
        }
    });
});
////END OF MY SCRIPTS

