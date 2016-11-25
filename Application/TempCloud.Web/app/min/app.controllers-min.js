var myApp=angular.module("PilukuApp.controllers",["ui.router","oc.lazyLoad","ngStorage"]);myApp.controller("MainCtrl",["$scope","cfpLoadingBar","$localStorage",function(e,t,o){t.start(),e.start=function(){t.start()},e.$storage=o.$default({miniSidebar:!1}),e.minibar=function(e){console.log(e)},$(document).ready(function(){$(".panel-close").on("click",function(e){e.preventDefault(),$(this).parent().parent().parent().parent().addClass(" animated fadeOutDown")}),$(".panel-minimize").on("click",function(e){e.preventDefault();var t=$(this).parent().parent().parent().next(".panel-body");t.is(":visible")?$("i",$(this)).removeClass("ti-angle-up").addClass("ti-angle-down"):$("i",$(this)).removeClass("ti-angle-down").addClass("ti-angle-up"),t.slideToggle()}),$(".panel-refresh").on("click",function(e){e.preventDefault();var t=$(this).closest(".panel-heading").next(".panel-body");t.mask('<i class="fa fa-refresh fa-spin"></i> Loading...'),setTimeout(function(){t.unmask(),console.log("ended")},1e3)}),$(".submenu li.active").closest(".submenu").addClass("current");var e=$(".submenu li.active").closest("ul").css("display","block")})}]).controller("leftSideBarCtrl",function(e,t){var o=this;$("ul.menu-parent").accordion()}).controller("dashboardCtrl",function(e,t){function o(e){var t=$(this);e=$.extend({},e||{},t.data("countToOptions")||{}),t.countTo(e)}function n(e,t){nv.addGraph(function(){var o=nv.models.sparklinePlus();return o.margin({left:30}).x(function(e,t){return t}).xTickFormat(function(e){return d3.time.format("%x")(new Date(t[e].x))}),d3.select(e).datum(t).transition().duration(250).call(o),o})}function a(){for(var e=[],t=+new Date,o=0;100>o;o++)e.push({x:t+1e3*o*60*60*24,y:Math.sin(o/10)});return e}function i(e,t,o){var n=[],a=+new Date;o=o||100;for(var i=1;o>i;i++){n.push({x:a+1e3*i*60*60*24,y:e});var r=Math.random(),l=2*t*r;l>t&&(l-=2*t),e+=e*l}return n}var r=this;$("ul.tabs").tabs(),$(".counter").each(o),$("#add_todo").bind("keypress",function(e){var t=$(".list-todo li").prevAll().length+1;13==e.keyCode&&(e.preventDefault(),$(".add-to-input").before('<li class="list-group-item"><div class="ms-hover"><input type="checkbox" class="mark-complete" id="todo'+t+'"><label for="todo'+t+'"><span></span>'+$(this).val()+"</label></div></li>"),$(this).val(""))}),$(document).on("change",".mark-complete",function(){$(this).prop("checked")?$(this).closest(".list-group-item").addClass("completed"):$(this).closest(".list-group-item").removeClass("completed")}),$(".mark-all").click(function(){$("input:checkbox").each(this.checked?function(){this.checked=!0,$("input:checkbox").prop("checked",this.checked),$(".todo_widget .list-group-item").addClass("completed")}:function(){this.checked=!1,$("input:checkbox").prop("checked",this.checked),$(".todo_widget .list-group-item").removeClass("completed")})});var l=new Chartist.Line("#main_chart",{labels:["1","2","3","4","5","6","7","8","9","10","11","12"],series:[[12,11,10,9,8,10,8,10,8,12,10,12,14],[2,5,7,4,6,4,6,7,6,8,6,8,6]]},{low:0}),c=0,s=40,u=200;l.on("created",function(){c=0}),l.on("draw",function(e){if(c++,"line"===e.type)e.element.animate({opacity:{begin:c*s+1e3,dur:u,from:0,to:1}});else if("label"===e.type&&"x"===e.axis)e.element.animate({y:{begin:c*s,dur:u,from:e.y+100,to:e.y,easing:"easeOutQuart"}});else if("label"===e.type&&"y"===e.axis)e.element.animate({x:{begin:c*s,dur:u,from:e.x-100,to:e.x,easing:"easeOutQuart"}});else if("point"===e.type)e.element.animate({x1:{begin:c*s,dur:u,from:e.x-10,to:e.x,easing:"easeOutQuart"},x2:{begin:c*s,dur:u,from:e.x-10,to:e.x,easing:"easeOutQuart"},opacity:{begin:c*s,dur:u,from:0,to:1,easing:"easeOutQuart"}});else if("grid"===e.type){var t={begin:c*s,dur:u,from:e[e.axis+"1"]-30,to:e[e.axis+"1"],easing:"easeOutQuart"},o={begin:c*s,dur:u,from:e[e.axis+"2"]-100,to:e[e.axis+"2"],easing:"easeOutQuart"},n={};n[e.axis+"1"]=t,n[e.axis+"2"]=o,n.opacity={begin:c*s,dur:u,from:0,to:1,easing:"easeOutQuart"},e.element.animate(n)}}),l.on("created",function(){window.__exampleAnimateTimeout&&(clearTimeout(window.__exampleAnimateTimeout),window.__exampleAnimateTimeout=null),window.__exampleAnimateTimeout=setTimeout(l.update.bind(l),102e3)}),new Chartist.Bar("#small_bar_chart",{labels:["jan","Feb","Mar","Aprl","June","July","Aug","Oct"],series:[[8e5,12e5,14e5,13e5,1e6,13e5,13e5],[2e5,4e5,5e5,3e5,1e6,13e5,13e5],[1e5,2e5,4e5,6e5,1e6,13e5,13e5]]},{stackBars:!0,axisY:{labelInterpolationFnc:function(e){return e/1e3+"k"}}}).on("draw",function(e){"bar"===e.type&&e.element.attr({style:"stroke-width: 6px"})});var d={series:[5,3,4]},m=function(e,t){return e+t};new Chartist.Pie("#small_pie_chart",d,{labelInterpolationFnc:function(e){return Math.round(e/d.series.reduce(m)*100)+"%"}}),mesos=["January","February","March","April","May","June","July","August","September","October","November","December"],dias=["MON","TUE","WED","THU","FRI","SAT","SUN"],$(".calendar-dashboard").bic_calendar({nombresMes:mesos,dias:dias,req_ajax:{type:"get"}}),n("#chart1",a()),n("#chart2",i(130,.02)),n("#chart3",i(25,.09,30))}).controller("tasksCtrl",function(e,t,o){var n=this;$("#add_todo").bind("keypress",function(e){var t=$(".list-todo li").prevAll().length+1;13==e.keyCode&&(e.preventDefault(),$(".add-to-input").before('<li class="list-group-item"><div class="ms-hover"><input type="checkbox" class="mark-complete" id="todo'+t+'"><label for="todo'+t+'"><span></span>'+$(this).val()+"</label></div></li>"),$(this).val(""))}),$(document).on("change",".mark-complete",function(){$(this).prop("checked")?$(this).closest(".list-group-item").addClass("completed"):$(this).closest(".list-group-item").removeClass("completed")}),$(".mark-all").click(function(){$("input:checkbox").each(this.checked?function(){this.checked=!0,$("input:checkbox").prop("checked",this.checked),$(".todo_widget .list-group-item").addClass("completed")}:function(){this.checked=!1,$("input:checkbox").prop("checked",this.checked),$(".todo_widget .list-group-item").removeClass("completed")})})}).controller("galleryCtrl",["$scope",function(e){$(document).ready(function(){$("#gallery").sliphover({duration:400}),$(function(){window.prettyPrint&&prettyPrint(),$(".demo").sliphover()});var e=new freewall("#freewall");e.reset({selector:".brick",animate:!0,cellW:200,cellH:"auto",onResize:function(){e.fitWidth()}}),e.container.find(".brick img").load(function(){e.fitWidth()}),$("#freewall").sliphover(),$("#gallery_height").sliphover({height:"30%"}),$("#gallery_reverse").sliphover({reverse:!0})})}]).controller("sweetAlertCtrl",["$scope",function(e){document.querySelector(".basic-sweet-1").onclick=function(){swal("Here's a basic warning message!")},document.querySelector(".basic-sweet-2").onclick=function(){swal("Here's a basic success message!")},document.querySelector(".basic-sweet-3").onclick=function(){swal("Here's a basic info message!")},document.querySelector(".basic-sweet-4").onclick=function(){swal("Here's a basic danger message!")},document.querySelector(".tagline-sweet-1").onclick=function(){swal({title:"An input!",text:"Write something interesting:",type:"input",showCancelButton:!0,closeOnConfirm:!1,animation:"slide-from-top"},function(e){return e===!1?!1:""===e?(swal.showInputError("You need to write something!"),!1):void swal("Nice!","You wrote: "+e,"success")})},document.querySelector(".tagline-sweet-2").onclick=function(){swal("Well done!","You successfully read this important alert message.")},document.querySelector(".tagline-sweet-3").onclick=function(){swal("Heads up!","This alert needs your attention, but it's not super important.")},document.querySelector(".tagline-sweet-4").onclick=function(){swal("Oh snap!","Change a few things up and try submitting again.")},document.querySelector(".icon-sweet-1").onclick=function(){swal("Good job!","You clicked the button!","success")},document.querySelector(".icon-sweet-2").onclick=function(){swal("Heads up!","This alert needs your attention, but it's not super important.","info")},document.querySelector(".icon-sweet-3").onclick=function(){swal("Oh snap!","Change a few things up and try submitting again.","error")},document.querySelector(".icon-sweet-4").onclick=function(){swal("Warning!","Best check yo self, you're not looking too good.","warning")},document.querySelector(".confirm-sweet-1").onclick=function(){swal({title:"Are you sure?",text:"You will not be able to recover this imaginary file!",type:"error",showCancelButton:!0,confirmButtonClass:"btn-danger",confirmButtonText:"Yes, delete it!",closeOnConfirm:!1},function(){swal("Deleted!","Your imaginary file has been deleted!","success")})},document.querySelector(".confirm-sweet-2").onclick=function(){swal({title:"You are Awesome",text:"Thankyou for viewing our template",type:"success",showCancelButton:!0,confirmButtonClass:"btn-success",confirmButtonText:"Welcome!",closeOnConfirm:!1},function(){swal("Thanks!","We are glad you clicked welcome!","success")})},document.querySelector(".confirm-sweet-3").onclick=function(){swal({title:"Cool Tip!",text:"You have to check every feature with patience",type:"info",showCancelButton:!0,confirmButtonClass:"btn-info",confirmButtonText:"Ok! got it",closeOnConfirm:!1},function(){swal("Good!","Thanks for clicking!","success")})},document.querySelector(".confirm-sweet-4").onclick=function(){swal({title:"Oops!",text:"I'am afraid you are missing something",type:"warning",showCancelButton:!0,confirmButtonClass:"btn-warning",confirmButtonText:"I will check it",closeOnConfirm:!1},function(){swal("Great!","Thanks for checking it!","success")})},document.querySelector(".advanced-sweet-1").onclick=function(){swal({title:"Are you sure?",text:"You will not be able to recover this imaginary file!",type:"warning",showCancelButton:!0,confirmButtonColor:"#6fd64b",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel plx!",closeOnConfirm:!1,closeOnCancel:!1},function(e){e?swal("Deleted!","Your imaginary file has been deleted!","success"):swal("Cancelled","Your imaginary file is safe :)","error")})},document.querySelector(".advanced-sweet-2").onclick=function(){swal({title:"Are you sure?",text:"You will not be able to recover this imaginary file!",type:"warning",showCancelButton:!0,confirmButtonColor:"#6cadd1",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel plx!",closeOnConfirm:!1,closeOnCancel:!1},function(e){e?swal("Deleted!","Your imaginary file has been deleted!","success"):swal("Cancelled","Your imaginary file is safe :)","error")})},document.querySelector(".advanced-sweet-3").onclick=function(){swal({title:"Are you sure?",text:"You will not be able to recover this imaginary file!",type:"warning",showCancelButton:!0,confirmButtonColor:"#fb5d5d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel plx!",closeOnConfirm:!1,closeOnCancel:!1},function(e){e?swal("Deleted!","Your imaginary file has been deleted!","success"):swal("Cancelled","Your imaginary file is safe :)","error")})},document.querySelector(".advanced-sweet-4").onclick=function(){swal({title:"Are you sure?",text:"You will not be able to recover this imaginary file!",type:"warning",showCancelButton:!0,confirmButtonColor:"#eac841",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel plx!",closeOnConfirm:!1,closeOnCancel:!1},function(e){e?swal("Deleted!","Your imaginary file has been deleted!","success"):swal("Cancelled","Your imaginary file is safe :)","error")})},document.querySelector(".custom-sweet-1").onclick=function(){swal({title:"Sweet!",text:"Here's a custom image.",imageUrl:"assets/images/avatar/ten.png"})},document.querySelector(".custom-sweet-2").onclick=function(){swal({title:"Sweet!",text:"Here's a custom image.",imageUrl:"assets/images/avatar/three.png"})},document.querySelector(".custom-sweet-3").onclick=function(){swal({title:"Sweet!",text:"Here's a custom image.",imageUrl:"assets/images/avatar/one.png"})},document.querySelector(".custom-sweet-4").onclick=function(){swal({title:"Sweet!",text:"Here's a custom image.",imageUrl:"assets/images/avatar/eight.png"})}}]).controller("notificationsCtrl",["$scope",function(e){function t(e,t){var o=noty({text:e,type:t,dismissQueue:!0,layout:e,theme:"defaultTheme"})}function o(e){var t=noty({text:"Do you want to continue?",type:"alert",dismissQueue:!0,layout:e,theme:"defaultTheme",buttons:[{addClass:"btn btn-primary",text:"Ok",onClick:function(t){t.close(),noty({dismissQueue:!0,force:!0,layout:e,theme:"defaultTheme",text:'You clicked "Ok" button',type:"success"})}},{addClass:"btn btn-danger",text:"Cancel",onClick:function(t){t.close(),noty({dismissQueue:!0,force:!0,layout:e,theme:"defaultTheme",text:'You clicked "Cancel" button',type:"error"})}}]})}function n(){t("top","alert"),t("topCenter","alert"),t("topLeft","alert"),t("topRight","alert"),t("center","alert"),t("centerLeft","alert"),t("centerRight","alert"),t("bottom","alert"),t("bottomCenter","alert"),t("bottomLeft","alert"),t("bottomRight","alert")}$(document).ready(function(){$("a[data-layout]").click(function(e){e.preventDefault();var n=$(this).attr("data-layout"),a=$(this).attr("data-type");"confirm"==a?o(n,a):t(n,a)}),$(".btn-launch-all").click(function(e){e.preventDefault(),n()})}),$(function(){$(".colorGritter").click(function(){return $.gritter.add({title:"Howdy!!",text:"Please check all the features and make sure you use search box to search your favourite pages.",image:"images/avatar.png",sticky:!0,class_name:$(this).data("color")}),!1}),$("#add-sticky").click(function(){var e=$.gritter.add({title:"This is a sticky notice!",text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',image:"images/avatar.png",sticky:!0,time:"",class_name:"my-sticky-class"});return!1}),$("#add-regular").click(function(){return $.gritter.add({title:"This is a regular notice!",text:'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',image:"images/avatar.png",sticky:!1,time:""}),!1}),$("#add-max").click(function(){return $.gritter.add({title:"This is a notice with a max of 3 on screen at one time!",text:'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',image:"images/avatar.png",sticky:!1,before_open:function(){return 3==$(".gritter-item-wrapper").length?!1:void 0}}),!1}),$("#add-without-image").click(function(){return $.gritter.add({title:"This is a notice without an image!",text:'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.'}),!1}),$("#add-gritter-light").click(function(){return $.gritter.add({title:"This is a light notification",text:'Just add a "gritter-light" class_name to your $.gritter.add or globally to $.gritter.options.class_name',class_name:"gritter-light"}),!1}),$("#add-with-callbacks").click(function(){return $.gritter.add({title:"This is a notice with callbacks!",text:"The callback is...",before_open:function(){alert("I am called before it opens")},after_open:function(e){alert("I am called after it opens: \nI am passed the jQuery object for the created Gritter element...\n"+e)},before_close:function(e,t){var o=t?'The "X" was clicked to close me!':"";alert("I am called before it closes: I am passed the jQuery object for the Gritter element... \n"+o)},after_close:function(e,t){var o=t?'The "X" was clicked to close me!':"";alert("I am called after it closes. "+o)}}),!1}),$("#add-sticky-with-callbacks").click(function(){return $.gritter.add({title:"This is a sticky notice with callbacks!",text:"Sticky sticky notice.. sticky sticky notice...",sticky:!0,before_open:function(){alert("I am a sticky called before it opens")},after_open:function(e){alert("I am a sticky called after it opens: \nI am passed the jQuery object for the created Gritter element...\n"+e)},before_close:function(e){alert("I am a sticky called before it closes: I am passed the jQuery object for the Gritter element... \n"+e)},after_close:function(){alert("I am a sticky called after it closes")}}),!1}),$("#remove-all").click(function(){return $.gritter.removeAll(),!1}),$("#remove-all-with-callbacks").click(function(){return $.gritter.removeAll({before_close:function(e){alert("I am called before all notifications are closed.  I am passed the jQuery object containing all  of Gritter notifications.\n"+e)},after_close:function(){alert("I am called after everything has been closed.")}}),!1})}),$(function(){$("button#noti").click(function(){$.desknoty({icon:"images/profiles/eleven.png",title:"Welcome to Cascade Admin Template",body:"Woooo this is awesome right? Check back all features"})})})}]).controller("css3AnimationsCtrl",["$scope",function(e){function t(e){$("#animateTest").removeClass().addClass(e+" animated");var t=window.setTimeout(function(){$("#animateTest").removeClass()},1300)}$(function(){$pos=$(".btn-animate").offset().top-0,$(window).on("scroll",function(){$(window).scrollTop()>=$pos?$(".btn-animate").addClass("fixed"):$(".btn-animate").removeClass("fixed")})}),$(document).ready(function(){$(".animate-list a").click(function(){$(".animate-list a").removeClass("active"),$(this).addClass("active");var e=$(this).attr("data-test");t(e)})})}]).controller("slidersCtrl",["$scope",function(e){$(".pick-a-color").pickAColor({showSpectrum:!0,showSavedColors:!0,saveColorsPerElement:!0,fadeMenuToggle:!0,showAdvanced:!0,showBasicColors:!0,showHexInput:!0,allowBlank:!0,inlineDropdown:!0});var t=$("#colorPicker");t.tinycolorpicker(),$("#picker").colpick({flat:!0,layout:"hex",submit:0}),$("#range_01").ionRangeSlider(),$("#range_02").ionRangeSlider({min:100,max:1e3,from:550}),$("#range_03").ionRangeSlider({type:"double",grid:!0,min:0,max:1e3,from:200,to:800,prefix:"$"}),$("#range_04").ionRangeSlider({type:"double",grid:!0,min:-1e3,max:1e3,from:-500,to:500}),$("#range_05").ionRangeSlider({type:"double",grid:!0,min:-12.8,max:12.8,from:-3.2,to:3.2,step:.1}),$("#range_06").ionRangeSlider({type:"double",grid:!0,from:1,to:5,values:[0,10,100,1e3,1e4,1e5,1e6]}),$("#range_07").ionRangeSlider({grid:!0,from:3,values:["January","February","March","April","May","June","July","August","September","October","November","December"]}),$("#range_08").ionRangeSlider({grid:!0,min:1e3,max:1e6,from:3e5,step:1e3,prettify_enabled:!0,prettify_separator:","}),$("#range_09").ionRangeSlider({type:"double",grid:!0,min:0,max:1e4,from:1e3,step:9e3,prefix:"$"}),$("#range_10").ionRangeSlider({grid:!0,min:18,max:70,from:30,prefix:"Age ",max_postfix:"+"}),$("#range_11").ionRangeSlider({type:"double",min:100,max:200,from:145,to:155,prefix:"Weight: ",postfix:" million pounds",decorate_both:!1,values_separator:" → "})}]).controller("nestableListsCtrl",["$scope",function(e){$(".dd").nestable({}),$("#nestable-menu").on("click",function(e){var t=$(e.target),o=t.data("action");"expand-all"===o&&$(".dd").nestable("expandAll"),"collapse-all"===o&&$(".dd").nestable("collapseAll")}),$("#nestable2").nestable({group:1});var t=function(e){return document.getElementById(e)},o=function(e,t){var o=[],n,a=0;for(n in e)o.push(n);!function i(){var n,r=o[a],l=document.createElement("script");l.type="text/javascript",l.src=e[o[a]],n=setInterval(function(){window[r]&&(clearTimeout(n),o[a++]=window[r],o[a]?i():t.apply(null,o))},30),document.getElementsByTagName("head")[0].appendChild(l)}()},n=window.console;n.log||(n.log=function(){alert([].join.apply(arguments," "))}),Sortable.create(t("foo"),{group:"words",animation:150,store:{get:function(e){var t=localStorage.getItem(e.options.group);return t?t.split("|"):[]},set:function(e){var t=e.toArray();localStorage.setItem(e.options.group,t.join("|"))}},onAdd:function(e){n.log("onAdd.foo:",[e.item,e.from])},onUpdate:function(e){n.log("onUpdate.foo:",[e.item,e.from])},onRemove:function(e){n.log("onRemove.foo:",[e.item,e.from])},onStart:function(e){n.log("onStart.foo:",[e.item,e.from])},onSort:function(e){n.log("onStart.foo:",[e.item,e.from])},onEnd:function(e){n.log("onEnd.foo:",[e.item,e.from])}}),Sortable.create(t("bar"),{group:"words",animation:150,onAdd:function(e){n.log("onAdd.bar:",e.item)},onUpdate:function(e){n.log("onUpdate.bar:",e.item)},onRemove:function(e){n.log("onRemove.bar:",e.item)},onStart:function(e){n.log("onStart.foo:",e.item)},onEnd:function(e){n.log("onEnd.foo:",e.item)}}),Sortable.create(t("multi"),{animation:150,draggable:".tile",handle:".tile__name"}),[].forEach.call(t("multi").getElementsByClassName("tile__list"),function(e){Sortable.create(e,{group:"photo",animation:150})});var a=Sortable.create(t("editable"),{animation:150,filter:".js-remove",onFilter:function(e){e.item.parentNode.removeChild(e.item)}});t("addUser").onclick=function(){Ply.dialog("prompt",{title:"Add",form:{name:"name"}}).done(function(e){var t=document.createElement("li");t.innerHTML=e.data.name+'<i class="js-remove">✖</i>',a.el.appendChild(t)})},[{name:"advanced",pull:!0,put:!0},{name:"advanced",pull:"clone",put:!1},{name:"advanced",pull:!1,put:!0}].forEach(function(e,o){Sortable.create(t("advanced-"+(o+1)),{sort:1!=o,group:e,animation:150})}),Sortable.create(t("handle-1"),{handle:".drag-handle",animation:150}),angular.module("todoApp",["ng-sortable"]).controller("TodoController",["$scope",function(e){e.todos=[{text:"learn angular",done:!0},{text:"build an angular app",done:!1}],e.addTodo=function(){e.todos.push({text:e.todoText,done:!1}),e.todoText=""},e.remaining=function(){var t=0;return angular.forEach(e.todos,function(e){t+=e.done?0:1}),t},e.archive=function(){var t=e.todos;e.todos=[],angular.forEach(t,function(t){t.done||e.todos.push(t)})}}]).controller("TodoControllerNext",["$scope",function(e){e.todos=[{text:"learn Sortable",done:!0},{text:"use ng-sortable",done:!1},{text:"Enjoy",done:!1}],e.remaining=function(){var t=0;return angular.forEach(e.todos,function(e){t+=e.done?0:1}),t},e.sortableConfig={group:"todo",animation:150},"Start End Add Update Remove Sort".split(" ").forEach(function(t){e.sortableConfig["on"+t]=n.log.bind(n,t)})}]),document.addEventListener("DOMContentLoaded",function(){function e(e,t,o,n){var a=document.createElement("canvas"),i=a.getContext("2d");a.width=t,a.height=o;for(var r=0;t>r;r++)for(var l=0;o>l;l++){var c=Math.floor(255*Math.random());i.fillStyle="rgba("+c+","+c+","+c+","+n+")",i.fillRect(r,l,1,1)}e.style.background="url("+a.toDataURL("image/png")+")"}e(document.getElementsByTagName("body")[0],50,50,.02)},!1)}]).controller("toolTipsCtrl",["$scope",function(e){$("a").tooltip(),$("[data-toggle=popover]").popover()}]).controller("rightSidebarCtrl",["$scope",function(e){$("ul.tabs").tabs()}]).controller("lineAreaChartsCtrl",["$scope","$ocLazyLoad","ASSETS",function(e,t,o){t.load([o.js("charts","chartist/line-area-chart"),o.js("charts","chartist/bipolar-line-area"),o.js("charts","chartist/smil-animations"),o.js("charts","chartist/line-area-animation"),o.js("charts","chartist/line-modify-drawings"),o.js("charts","chartist/line-interpolation"),o.js("charts","chartist/simple-svg-animation")])}]).controller("fileManagerCtrl",["$scope","$ocLazyLoad","ASSETS",function(e,t,o){t.load([o.js("file-manager","snap"),o.js("file-manager","file-manager")])}]).controller("dynamicTablesCtrl",["$scope",function(e){$("#example").dataTable({sPaginationType:"bootstrap"}),$("#mainTable").editableTableWidget().numericInputExample().find("td:first").focus(),$("#textAreaEditor").editableTableWidget({editor:$("<textarea>")})}]);