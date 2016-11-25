// PANELS
$(document).ready(function(){
  // panel close
$('.panel-close').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().parent().parent().addClass(' animated fadeOutDown');
});


$('.panel-minimize').on('click', function (e) 
{
    e.preventDefault();
    var $target = $(this).parent().parent().parent().next('.panel-body');
    if ($target.is(':visible')) {
        $('i', $(this)).removeClass('ti-angle-up').addClass('ti-angle-down');
    } else {
        $('i', $(this)).removeClass('ti-angle-down').addClass('ti-angle-up');
    }
    $target.slideToggle();
});


$('.panel-refresh').on('click', function (e) 
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