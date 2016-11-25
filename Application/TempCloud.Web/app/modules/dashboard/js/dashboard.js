
$('ul.tabs').tabs();

$('.counter').each(count);

 function count(options) 
    {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

  // Todo widget add list
  $('#add_todo').bind('keypress', function(e) {
    var len = $('.list-todo li').prevAll().length+1;
    if(e.keyCode==13){
      e.preventDefault();
      $('.add-to-input').before('<li class="list-group-item">' + 
        '<div class="ms-hover">' + 
        '<input type="checkbox" class="mark-complete" id="todo'+len+'">' + 
        '<label for="todo'+len+'"><span></span>' + $(this).val() + '</label>' + 
        '</div>' + 
        '</li>');
      $(this).val("");

    }
  });

  // Todo checkboc check event
  $(document).on('change', '.mark-complete', function(){
    if($(this).prop("checked"))
    {
      $(this).closest('.list-group-item').addClass('completed');
    }
    else
    {
      $(this).closest('.list-group-item').removeClass('completed'); 
    }
  });

  // Todo mark all list items
  $('.mark-all').click(function () {    
    if(this.checked) { // check select status
            $('input:checkbox').each(function() { //loop through each checkbox
                this.checked = true;  //select all checkboxes with class "checkbox"   
                $('input:checkbox').prop('checked', this.checked),$( '.todo_widget .list-group-item' ).addClass('completed');            
            });
        }else{
            $('input:checkbox').each(function() { //loop through each checkbox
                this.checked = false; //deselect all checkboxes with class "checkbox"  
                $('input:checkbox').prop('checked', this.checked),$( '.todo_widget .list-group-item' ).removeClass('completed');                     
            });         
        }
    // $('input:checkbox').prop('checked', this.checked),$( '.todo_widget .list-group-item' ).toggleClass('completed');
  });

////////////////////////////////////////////////////////////////////////////// chart js
  var chart = new Chartist.Line('#main_chart', {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    series: [
    [12, 11, 10, 9, 8, 10, 8, 10, 8, 12, 10, 12,14],
    [2, 5,7, 4, 6, 4, 6, 7, 6, 8, 6, 8, 6 ]
    ]
  }, {
    low: 0
  });

  // Let's put a sequence number aside so we can use it in the event callbacks
  var seq = 0,
  delays = 40,
  durations = 200;

  // Once the chart is fully created we reset the sequence
  chart.on('created', function() {
    seq = 0;
  });

  // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
  chart.on('draw', function(data) {
    seq++;

    if(data.type === 'line') {
      // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
      data.element.animate({
        opacity: {
          // The delay when we like to start the animation
          begin: seq * delays + 1000,
          // Duration of the animation
          dur: durations,
          // The value where the animation should start
          from: 0,
          // The value where it should end
          to: 1
      }
  });
  } else if(data.type === 'label' && data.axis === 'x') {
    data.element.animate({
      y: {
        begin: seq * delays,
        dur: durations,
        from: data.y + 100,
        to: data.y,
          // We can specify an easing function from Chartist.Svg.Easing
          easing: 'easeOutQuart'
      }
  });
  } else if(data.type === 'label' && data.axis === 'y') {
    data.element.animate({
      x: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 100,
        to: data.x,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'point') {
    data.element.animate({
      x1: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      x2: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      opacity: {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'grid') {
      // Using data.axis we get x or y which we can use to construct our animation definition objects
      var pos1Animation = {
        begin: seq * delays,
        dur: durations,
        from: data[data.axis + '1'] - 30,
        to: data[data.axis + '1'],
        easing: 'easeOutQuart'
      };

      var pos2Animation = {
        begin: seq * delays,
        dur: durations,
        from: data[data.axis + '2'] - 100,
        to: data[data.axis + '2'],
        easing: 'easeOutQuart'
      };

      var animations = {};
      animations[data.axis + '1'] = pos1Animation;
      animations[data.axis + '2'] = pos2Animation;
      animations['opacity'] = {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      };

      data.element.animate(animations);
  }
  });

  // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
  chart.on('created', function() {
    if(window.__exampleAnimateTimeout) {
      clearTimeout(window.__exampleAnimateTimeout);
      window.__exampleAnimateTimeout = null;
    }
    window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 102000);
  });


  // second chart


  new Chartist.Bar('#small_bar_chart', {
    labels: ['jan', 'Feb', 'Mar', 'Aprl','June','July','Aug', 'Oct'],
    series: [
      [800000, 1200000, 1400000, 1300000, 1000000,1300000,1300000],
      [200000, 400000, 500000, 300000, 1000000,1300000,1300000],
      [100000, 200000, 400000, 600000, 1000000,1300000,1300000]
    ]
  }, {
    stackBars: true,
    axisY: {
      labelInterpolationFnc: function(value) {
        return (value / 1000) + 'k';
      }
    }
  }).on('draw', function(data) {
    if(data.type === 'bar') {
      data.element.attr({
        style: 'stroke-width: 6px'
      });    
    }
  });


  // sine chart
  var data = {
    series: [5, 3, 4]
  };
  var sum = function(a, b) { return a + b };
  new Chartist.Pie('#small_pie_chart', data, {
    labelInterpolationFnc: function(value) {
      return Math.round(value / data.series.reduce(sum) * 100) + '%';
    }
  });

  // Calendar Widget
  mesos = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dias = [ "MON", "TUE", "WED", "THU", "FRI","SAT","SUN"];
  $('.calendar-dashboard').bic_calendar({
    nombresMes: mesos,
    dias: dias,
    req_ajax: {
      type: 'get'
    }
  });

  // Sparkline Charts 
  function defaultChartConfig(containerId, data) {
    nv.addGraph(function() {

        var chart = nv.models.sparklinePlus()
        chart.margin({left:30})
        .x(function(d,i) { return i })
        .xTickFormat(function(d) {
            return d3.time.format('%x')(new Date(data[d].x))
        });

        d3.select(containerId)
        .datum(data)
        .transition().duration(250)
        .call(chart);

        return chart;
    });
}

defaultChartConfig("#chart1",sine());
defaultChartConfig("#chart2", volatileChart(130.0, 0.02));
defaultChartConfig("#chart3", volatileChart(25.0, 0.09,30));

function sine() {
    var sin = [];
    var now =+new Date();

    for (var i = 0; i < 100; i++) {
        sin.push({x: now + i * 1000 * 60 * 60 * 24, y: Math.sin(i/10)});
    }

    return sin;
}

function volatileChart(startPrice, volatility, numPoints) {
    var rval =  [];
    var now =+new Date();
    numPoints = numPoints || 100;
    for(var i = 1; i < numPoints; i++) {

        rval.push({x: now + i * 1000 * 60 * 60 * 24, y: startPrice});
        var rnd = Math.random();
        var changePct = 2 * volatility * rnd;
        if ( changePct > volatility) {
            changePct -= (2*volatility);
        }
        startPrice = startPrice + startPrice * changePct;
    }
    return rval;
}