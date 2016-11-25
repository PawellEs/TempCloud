$(document).ready(function () {

    // leftbar toggle for minbar
    var nice = $(".left-bar").niceScroll(); 
    $('.menu-bar').click(function(){                  
        $(".wrapper").toggleClass('mini-bar');        

        $(".left-bar").getNiceScroll().remove();
        setTimeout(function() {
            $(".left-bar").niceScroll();
        }, 200);
    }); 
    

    // mobile menu
    $('body').on('click', '.menu-bar-mobile', function (e) {        
        // $(this).addClass('menu_appear');
        $(".left-bar").getNiceScroll().remove();
        
        $( ".left-bar" ).toggleClass("menu_appear" );
        $( ".overlay" ).toggleClass("show" );
        setTimeout(function() {
          $(".left-bar").niceScroll();
        }, 200);
    });

    // orvelay hide menu
    $("body").on('click','.overlay', function(){
        $( ".left-bar" ).toggleClass("menu_appear" );
        $(this).removeClass("show");
    });

    // right side-bar toggle
    $('body').on('click','.right-bar-toggle', function(e){
        e.preventDefault();
        $('.wrapper').toggleClass('right-bar-enabled');
    });

    

    new WOW().init(); 

        // Panel Close
        $('body').on('click', '.panel-close', function(ev)
        {
            ev.preventDefault();
            $(this).parent().parent().parent().parent().addClass(' animated fadeOutDown');

        });


        $('body').on('click','.panel-minimize', function (e) 
        {
            e.preventDefault();
            console.log('vj');
            var $target = $(this).parent().parent().parent().next('.panel-body');
            if ($target.is(':visible')) {
                $('i', $(this)).removeClass('ti-angle-up').addClass('ti-angle-down');
            } else {
                $('i', $(this)).removeClass('ti-angle-down').addClass('ti-angle-up');
            }
            $target.slideToggle();
        });
        
        
        $('body').on('click', '.panel-refresh', function (e) 
        {
            e.preventDefault();
            // alert('vj');
            var $target = $(this).closest('.panel-heading').next('.panel-body');
            $target.mask('<i class="fa fa-refresh fa-spin"></i> Loading...');

            setTimeout(function () {
                $target.unmask();
                console.log('ended');
            },1000);
        });

        //Active menu item expand automatically on reload or fresh open
        $('.submenu li.active').closest('.submenu').addClass('current');
        var activeMenu = $('.submenu li.active').closest('ul').css('display','block');

});