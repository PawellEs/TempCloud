$(document).ready(function(){var e=$(".left-bar").niceScroll();$(".menu-bar").click(function(){$(".wrapper").toggleClass("mini-bar"),$(".left-bar").getNiceScroll().remove(),setTimeout(function(){$(".left-bar").niceScroll()},200)}),$("body").on("click",".menu-bar-mobile",function(e){$(".left-bar").getNiceScroll().remove(),$(".left-bar").toggleClass("menu_appear"),$(".overlay").toggleClass("show"),setTimeout(function(){$(".left-bar").niceScroll()},200)}),$("body").on("click",".overlay",function(){$(".left-bar").toggleClass("menu_appear"),$(this).removeClass("show")}),$("body").on("click",".right-bar-toggle",function(e){e.preventDefault(),$(".wrapper").toggleClass("right-bar-enabled")}),(new WOW).init(),$("body").on("click",".panel-close",function(e){e.preventDefault(),$(this).parent().parent().parent().parent().addClass(" animated fadeOutDown")}),$("body").on("click",".panel-minimize",function(e){e.preventDefault(),console.log("vj");var n=$(this).parent().parent().parent().next(".panel-body");n.is(":visible")?$("i",$(this)).removeClass("ti-angle-up").addClass("ti-angle-down"):$("i",$(this)).removeClass("ti-angle-down").addClass("ti-angle-up"),n.slideToggle()}),$("body").on("click",".panel-refresh",function(e){e.preventDefault();var n=$(this).closest(".panel-heading").next(".panel-body");n.mask('<i class="fa fa-refresh fa-spin"></i> Loading...'),setTimeout(function(){n.unmask(),console.log("ended")},1e3)}),$(".submenu li.active").closest(".submenu").addClass("current");var n=$(".submenu li.active").closest("ul").css("display","block")});