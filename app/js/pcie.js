(function ($) {
    'use strict';

    function gestionMenu() {
        if ($(window).width() > 769) {
            if ($(document).scrollTop() <= 50) {
                $('nav').removeClass('shrink');
                $('#fat').css('display', 'inline');
                $('#tiny').css('display', 'none');
                $('.categorie').css('display', 'inline');
                $('.sous-categorie').css('display', 'none', 'important').css('visibility', 'hidden', 'important');
                $('#secondNavBar').css('visibility', 'visible');
            } else {
                $('nav').addClass('shrink');
                $('#fat').css('display', 'none');
                $('#tiny').css('display', 'inline');
                $('.categorie').css('display', 'none');
                $('.sous-categorie').css('display', 'inline', 'important').css('visibility', 'visible', 'important');
                $('#secondNavBar').css('visibility', 'hidden');
            }
        } else {
            $('nav').removeClass('shrink');
            $('#fat').css('display', 'none');
            $('#tiny').css('display', 'inline');
            $('.sous-categorie').css('display', 'inline', 'important').css('visibility', 'visible', 'important');
            $('#secondNavBar').css('visibility', 'hidden');
        }
    }

    var resizeTimer;
    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(gestionMenu, 10);
    });

    var scrollTimer;
    $(window).scroll(function () {
        clearTimeout(scrollTimer);
        resizeTimer = setTimeout(gestionMenu, 10);
    });

    $(document).on({
        mouseenter: function () {
            if ($('nav').hasClass('shrink') && $(window).width() > 770) {
                $('nav').removeClass('shrink');
                $('.categorie').css('display', 'inline');
                $('#secondNavBar').css('visibility', 'visible');
                $('.sous-categorie').css('display', 'none', 'important').css('visibility', 'hidden', 'important');
                $('#fat').css('display', 'inline');
                $('#tiny').css('display', 'none');
            }
        },
        mouseleave: function () {
            if (!$('nav').hasClass('shrink') && $(document).scrollTop() > 50 && $(window).width() > 770) {
                $('nav').addClass('shrink');
                $('.categorie').css('display', 'none');
                $('#secondNavBar').css('visibility', 'hidden');
                $('.sous-categorie').css('display', 'inline', 'important').css('visibility', 'visible', 'important');
                $('#fat').css('display', 'none');
                $('#tiny').css('display', 'inline');
            }

        }
    }, '.navbar');
})(jQuery);