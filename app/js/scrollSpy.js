(function ($) {

    $(document).ready(function () {
        var sections = [];
        var id = false;

        $('a', $('.navbar-nav .sous-categorie')).each(function () {
            sections.push($($(this).attr('href')));
        });

        $('a', $('.subcategorie')).each(function () {
            sections.push($($(this).attr('href')));
        });

        $(window).scroll(function (e) {
            var scrollTop = $(this).scrollTop() + ($(window).height() / 2)
            var scrolled_id = false;
            for (var i in sections) {
                var section = sections[i];
                if (scrollTop > section.offset().top) {
                    scrolled_id = section.attr('id');
                }
            }
            if (scrolled_id !== id) {
                id = scrolled_id
                $('a', $('.navbar-nav .sous-categorie')).removeClass('active');
                $('a', $('.subcategorie')).removeClass('active');
                $('a[href="#' + id + '"]', $('.navbar-nav .sous-categorie')).addClass('active');
                $('a[href="#' + id + '"]', $('.subcategorie')).addClass('active');
            }
        });
    })

})(jQuery);