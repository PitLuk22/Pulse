$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 700,
        pauseOnDotsHover: true,
        /* adaptiveHeight: true,  */
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.svg"></button>',
        responsive: [{
            breakpoint: 991,
            settings: {
                dots: true,
                arrows: false,
                dotsClass: 'dots-style'
            }
        }]
    });

    // Табы

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    
    function toggleSlide(item) {
        $(item).each( function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal 

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });
    /* $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
    }); */
    $('.button_mini').each(function(i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    //Вадидация форм

    /* $('#consultation-form').validate();
    $('#consultation form').validate({
        rules: {
            name: 'required',
            phone: 'required',
            email: {
                required: true,
                email:true
            }
        },
        messages: {
            name: "Пожалуйста, введите свое имя!",
            phone: "Пожалуйста, введите свой номер телефона!",
            email: {
              required: "Пожалуйста, введите свой e-mail",
              email: "Неправильно введен адрес почты"
            }
          }
    });
    $('#order form').validate(); */

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: 'required',
                email: {
                    required: true,
                    email:true
                }
            },
            messages: {
                name: { 
                    required: "Пожалуйста, введите свое имя!",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона!",
                email: {
                  required: "Пожалуйста, введите свой e-mail",
                  email: "Неправильно введен адрес почты"
                }
              }
        });
    }
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    //Mask

    $("input[name=phone]").mask("+7 (999) 999-9999");  

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    /* $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");

            $('form').trigger('reset');
        });
        return false;
    }); */


    //Smothscroll and pageup (Появление и исчезновение кнопки)

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // Плавный скролл

    $("a[href=#up]").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    // wow.js

    new WOW().init();
});