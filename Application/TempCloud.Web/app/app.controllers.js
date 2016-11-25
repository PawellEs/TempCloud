var myApp = angular.module('PilukuApp.controllers', ['ui.router', 'oc.lazyLoad','ngStorage','uiGmapgoogle-maps']);


myApp.controller('MainCtrl', ['$scope','cfpLoadingBar', '$localStorage','$ocLazyLoad', 'ASSETS', function ($scope, cfpLoadingBar, $localStorage,  $ocLazyLoad, ASSETS) {
    cfpLoadingBar.start();

    $scope.start = function() {
      cfpLoadingBar.start();
    };


    $scope.$storage = $localStorage.$default({
        miniSidebar: false
    });


    $scope.minibar = function (argument) {
    // $scope.$storage.miniSidebar = argument;
      console.log(argument);
    }
    
    $ocLazyLoad.load([
        ASSETS.js('dashboard','layout-main'),
    ]);
}])

.controller("leftSideBarCtrl", function($scope, $http){
  var leftSideBarCtrl = this;
  $('ul.menu-parent').accordion();
})



/* Dashboard Controller */
.controller("dashboardCtrl", function($scope, $http){
  var dashboardCtrl = this;
  
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

})

/* Tasks Controller */
.controller('horizontalMenuCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS, $http, $localStorage) {
  var dashboardCtrl = this;
  
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
}])

/* Tasks Controller */
.controller('collapsedCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS, $http, $localStorage) {
  var dashboardCtrl = this;
  
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
}])

/* Tasks Controller */
.controller('menuWithHeaderCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS, $http, $localStorage) {
  var dashboardCtrl = this;
  
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
}])

/* Tasks Controller */
.controller('rightSidebarCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS, $http, $localStorage) {
  var dashboardCtrl = this;
  
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
}])

/* Tasks Controller */
.controller('boxedLayoutCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS, $http, $localStorage) {
  var dashboardCtrl = this;
  
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
}])

/* Tasks Controller */
.controller('tasksCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS, $http, $localStorage) {
  $ocLazyLoad.load([
      ASSETS.js('piluku-premium','tasks'),
  ]);
}])

// Gallery Controller
.controller('galleryCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
        ASSETS.js('piluku-premium','gallery-ctrl'),
    ]);    
}])

// Sweet alerts Controller
.controller('sweetAlertCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
        ASSETS.js('alerts','sweet.custom'),
    ]);
}])

// notfications Controller
.controller('notificationsCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
        ASSETS.js('notifications','notification'),
    ]);
}])

// css3Animations Controller
.controller('css3AnimationsCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
        ASSETS.js('css3-animations','css3.animations'),
    ]);
}])

// sliders Controller
.controller('slidersCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
        ASSETS.js('sliders','sliders.custom'),
    ]);
}])

// nestableLists Controller
.controller('nestableListsCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
        ASSETS.js('nestable-lists','nestable.custom'),
    ]);
}])

// toolTips Controller
.controller('toolTipsCtrl', ['$scope', function ($scope) {
    $("a").tooltip();
        
    $("[data-toggle=popover]").popover();
}])

// Right Sidebar Controller
.controller('rightSidebarCtrl', ['$scope', function ($scope) {
  $('ul.tabs').tabs();        
}])

// Line area charts
.controller('lineAreaChartsCtrl', ['$scope', '$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    
    
    $ocLazyLoad.load([
      ASSETS.js('charts','chartist/line-area-chart'),
      ASSETS.js('charts','chartist/bipolar-line-area'),
      ASSETS.js('charts','chartist/smil-animations'),
      ASSETS.js('charts','chartist/line-area-animation'),
      ASSETS.js('charts','chartist/line-modify-drawings'),
      ASSETS.js('charts','chartist/line-interpolation'),
      ASSETS.js('charts','chartist/simple-svg-animation'),
    ]);

}])

// Bar charts
.controller('barChartsCtrl', ['$scope', '$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    
    
    $ocLazyLoad.load([
      ASSETS.js('charts','chartist.min'),
      ASSETS.js('charts','chartist/bi-polar-bar-interpolated'),
      ASSETS.js('charts','chartist/overlapping-bars'),
      ASSETS.js('charts','chartist/peak-circle-bars'),
      ASSETS.js('charts','chartist/multiline-bar'),
      ASSETS.js('charts','chartist/stacked-bar'),
      ASSETS.js('charts','chartist/bar-horizontal'),
      ASSETS.js('charts','chartist/bar-extreme-responsive'),
    ]);

}])

// Pie charts
.controller('pieChartsCtrl', ['$scope', '$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    
    
    $ocLazyLoad.load([
      ASSETS.js('charts','nvd3/src/models/legend'),
      ASSETS.js('charts','nvd3/src/models/pie'),
      ASSETS.js('charts','nvd3/src/models/pieChart'),
      ASSETS.js('charts','nvd3/src/utils'),

      ASSETS.js('charts','charts/jquery.flot'),
      ASSETS.js('charts','charts/jquery.flot.resize'),
      ASSETS.js('charts','charts/jquery.flot.stack'),
      ASSETS.js('charts','charts/jquery.flot.pie.min'),
      ASSETS.js('charts','charts/jquery.flot.selection'),
      
      ASSETS.js('charts','jquery.easing.min'),
      ASSETS.js('charts','jquery.easypiechart.min'),
      ASSETS.js('charts','charts/pie-charts-custom'),
    ]);

}])

// NVD3 charts
.controller('nvd3ChartsCtrl', ['$scope', '$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    
    
    $ocLazyLoad.load([
      ASSETS.js('charts','nvd3/src/models/legend'),
      ASSETS.js('charts','nvd3/src/models/pie'),
      ASSETS.js('charts','nvd3/src/models/pieChart'),
      ASSETS.js('charts','nvd3/src/utils'),
      ASSETS.js('charts','nvd3/nvd3-custom'),
    ]);

}])

// NVD3 charts
.controller('basicMapsCtrl', ['$scope', '$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    $scope.options = {scrollwheel: false};

    $scope.map2 = {center: {latitude: 2, longitude: 2}, zoom: 6, bounds: {}};
    $scope.bounds =  {
        sw: {
            latitude: 0,
            longitude: 0
        },
        ne: {
            latitude: 4,
            longitude: 4
        }
    };

    $scope.map3 = {center: {latitude: 44, longitude: -108 }, zoom: 4 };
    $scope.circles = [
        {
            id: 1,
            center: {
                latitude: 44,
                longitude: -108
            },
            radius: 500000,
            stroke: {
                color: '#08B21F',
                weight: 2,
                opacity: 1
            },
            fill: {
                color: '#08B21F',
                opacity: 0.5
            },
            geodesic: true, // optional: defaults to false
            draggable: true, // optional: defaults to false
            clickable: true, // optional: defaults to true
            editable: true, // optional: defaults to false
            visible: true, // optional: defaults to true
            control: {}
        }
    ];



    $scope.map4 = {
      center: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      zoom: 4,
      bounds: {}
    };
    var createRandomMarker = function(i, bounds, idKey) {
      var lat_min = bounds.southwest.latitude,
        lat_range = bounds.northeast.latitude - lat_min,
        lng_min = bounds.southwest.longitude,
        lng_range = bounds.northeast.longitude - lng_min;

      if (idKey == null) {
        idKey = "id";
      }

      var latitude = lat_min + (Math.random() * lat_range);
      var longitude = lng_min + (Math.random() * lng_range);
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: 'm' + i
      };
      ret[idKey] = i;
      return ret;
    };
    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() {
      return $scope.map4.bounds;
    }, function(nv, ov) {
      // Only need to regenerate once
      if (!ov.southwest && nv.southwest) {
        var markers = [];
        for (var i = 0; i < 50; i++) {
          markers.push(createRandomMarker(i, $scope.map4.bounds))
        }
        $scope.randomMarkers = markers;
      }
    }, true);


    $scope.map5 = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {}};
    $scope.polygons = [
        {
            id: 1,
            path: [
                {
                    latitude: 50,
                    longitude: -80
                },
                {
                    latitude: 30,
                    longitude: -120
                },
                {
                    latitude: 20,
                    longitude: -95
                }
            ],
            stroke: {
                color: '#6060FB',
                weight: 3
            },
            editable: true,
            draggable: true,
            geodesic: false,
            visible: true,
            fill: {
                color: '#ff0000',
                opacity: 0.8
            }
        }
    ];


    $scope.map6 = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 }
    $scope.marker1 = {
        coords: {
            latitude: 40.1451,
            longitude: -99.6680
        },
        show: false,
        id: 0
    };

    $scope.windowOptions = {
        visible: false
    };

    $scope.onClick = function() {
        $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    $scope.closeClick = function() {
        $scope.windowOptions.visible = false;
    };

    $scope.title = "Window Title!";


    $scope.map7 = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {}};
    var createRandomMarker = function (i, bounds, idKey) {
        var lat_min = bounds.southwest.latitude,
            lat_range = bounds.northeast.latitude - lat_min,
            lng_min = bounds.southwest.longitude,
            lng_range = bounds.northeast.longitude - lng_min;

        if (idKey == null) {
            idKey = "id";
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);
        var ret = {
            latitude: latitude,
            longitude: longitude,
            title: 'm' + i,
            show: false
        };
        ret.onClick = function() {
            console.log("Clicked!");
            ret.show = !ret.show;
        };
        ret[idKey] = i;
        return ret;
    };
    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() { return $scope.map7.bounds; }, function(nv, ov) {
        // Only need to regenerate once
        if (!ov.southwest && nv.southwest) {
            var markers = [];
            for (var i = 0; i < 50; i++) {
                markers.push(createRandomMarker(i, $scope.map7.bounds))
            }
            $scope.randomMarkers = markers;
        }
    }, true);
}])

// masonry gallery
.controller('masonryCtrl', ['$scope', '$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    
    $ocLazyLoad.load([
        ASSETS.js('piluku-premium','gallery-masonry'),
    ]);

}])

// masonry gallery
.controller('rotatedGalleryCtrl', ['$scope', '$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    
    $ocLazyLoad.load([
        ASSETS.js('piluku-premium','gallery/rotated-gallery'),
    ]);

}])


// File Manager Controller
.controller('fileManagerCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
      ASSETS.js('file-manager','snap'),
      ASSETS.js('file-manager','file-manager'),
    ]);
}])

// dynamicTables Controller
.controller('dynamicTablesCtrl', ['$scope', function ($scope) {
    //data table
    $('#example').dataTable({
      "sPaginationType": "bootstrap"
    });
    $('#mainTable').editableTableWidget().numericInputExample().find('td:first').focus();
    $('#textAreaEditor').editableTableWidget({editor: $('<textarea>')});
}])

// dropzoneUpload Controller
.controller('dropzoneUploadCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {

  $ocLazyLoad.load([
      ASSETS.js('forms','dropzone-fileupload'),
  ]);
  
}])

// formValidation Controller
.controller('formValidationCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
        ASSETS.js('forms','form-validation'),
    ]);
}])

// formWizard Controller
.controller('formWizardCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
        ASSETS.js('forms','form-wizard'),
    ]);
}])

// formElements Controller
.controller('formElementsCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
        ASSETS.js('forms','form-elements'),
    ]);
}])

// usersTable Controller
.controller('usersTableCtrl', ['$scope', function ($scope) {
    $('.table-row').on('click', function(){
      // $('.table-row').removeClass('active');
      $(this).toggleClass('active');
    });
}])

// lock Controller
.controller('lockCtrl', ['$scope','$ocLazyLoad', 'ASSETS', function ($scope, $ocLazyLoad, ASSETS) {
    $ocLazyLoad.load([
        ASSETS.js('utility','lock'),
    ]);
}])

// lock2 Controller
.controller('lock2Ctrl', ['$scope', function ($scope) {
  $('.sign.btn').on('click', function(e){
      e.preventDefault();
      $('.flip-container .flipper,.load_pulse').addClass('flipped');
  });
}]);