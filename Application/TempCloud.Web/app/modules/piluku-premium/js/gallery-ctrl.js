$(document).ready(function(){
    $('#gallery').sliphover({
        duration: 400
    });

    $(function() {

        // make code pretty
        window.prettyPrint && prettyPrint();

        //call sliphover plugin
        $('.demo').sliphover();

    })
    var wall = new freewall("#freewall");
    wall.reset({
        selector: '.brick',
        animate: true,
        cellW: 200,
        cellH: 'auto',
        onResize: function() {
            wall.fitWidth();
        }
    });

    wall.container.find('.brick img').load(function() {
        wall.fitWidth();
    });

    //call sliphover
    $('#freewall').sliphover();
    
    $('#gallery_height').sliphover({
        height:'30%'
    });
    
    $('#gallery_reverse').sliphover({
        reverse: true
    });
});