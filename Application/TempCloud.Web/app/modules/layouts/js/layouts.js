"use strict"; 
  $(document).ready(function(){

  	// var nice = $(".left-bar").niceScroll(); 

      $('.menu-bar').click(function(e){                  
        e.preventDefault();
        $(".wrapper").toggleClass('mini-bar');        

        $(".left-bar").getNiceScroll().remove();
        setTimeout(function() {
          $(".left-bar").niceScroll();
        }, 200);
      }); 

  });