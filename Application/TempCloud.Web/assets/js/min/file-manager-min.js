$(function(){var n=$(".filemanager"),a=$(".breadcrumbs"),e=n.find(".data");$.get("scan.php",function(s){function t(a){if(a=decodeURIComponent(a).slice(1).split("="),a.length){var e="";"search"===a[0]?(n.addClass("searching"),e=l(p,a[1].toLowerCase()),e.length?(f=a[0],r(e)):r(e)):a[0].trim().length?(e=o(a[0]),e.length?(f=a[0],d=i(a[0]),r(e)):(f=a[0],d=i(a[0]),r(e))):(f=s.path,d.push(s.path),r(o(s.path)))}}function i(n){for(var a=n.split("/").slice(0),e=1;e<a.length;e++)a[e]=a[e-1]+"/"+a[e];return a}function o(n){for(var a=n.split("/"),e=p,s=0,t=0;t<a.length;t++)for(var i=0;i<e.length;i++)if(e[i].name===a[t]){s=1,e=e[i].items;break}return e=s?e:[]}function l(n,a){return n.forEach(function(n){"folder"===n.type?(l(n.items,a),n.name.toLowerCase().match(a)&&u.push(n)):"file"===n.type&&n.name.toLowerCase().match(a)&&g.push(n)}),{folders:u,files:g}}function r(s){var t=[],i=[];Array.isArray(s)?s.forEach(function(n){"folder"===n.type?t.push(n):"file"===n.type&&i.push(n)}):"object"==typeof s&&(t=s.folders,i=s.files),e.empty().hide(),t.length||i.length?n.find(".nothingfound").hide():n.find(".nothingfound").show(),t.length&&t.forEach(function(n){var a=n.items.length,s=h(n.name),t='<span class="icon folder"></span>';a&&(t='<span class="icon folder full"></span>'),1==a?a+=" item":a>1?a+=" items":a="Empty";var i=$('<li class="folders"><a href="'+n.path+'" title="'+n.path+'" class="folders">'+t+'<span class="name">'+s+'</span> <span class="details">'+a+"</span></a></li>");i.appendTo(e)}),i.length&&i.forEach(function(n){var a=c(n.size),s=h(n.name),t=s.split("."),i='<span class="icon file"></span>';t=t[t.length-1],i='<span class="icon file f-'+t+'">.'+t+"</span>";var o=$('<li class="files"><a href="'+n.path+'" title="'+n.path+'" class="files">'+i+'<span class="name">'+s+'</span> <span class="details">'+a+"</span></a></li>");o.appendTo(e)});var o="";n.hasClass("searching")?(o="<span>Search results: </span>",e.removeClass("animated")):(e.addClass("animated"),d.forEach(function(n,a){var e=n.split("/");o+=a!==d.length-1?'<a href="'+n+'"><span class="folderName">'+e[e.length-1]+'</span></a> <span class="arrow">→</span> ':'<span class="folderName">'+e[e.length-1]+"</span>"})),a.text("").append(o),e.animate({display:"inline-block"})}function h(n){return n.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;")}function c(n){var a=["Bytes","KB","MB","GB","TB"];if(0==n)return"0 Bytes";var e=parseInt(Math.floor(Math.log(n)/Math.log(1024)));return Math.round(n/Math.pow(1024,e),2)+" "+a[e]}var p=[s],f="",d=[],u=[],g=[];$(window).on("hashchange",function(){t(window.location.hash)}).trigger("hashchange"),n.find(".search").click(function(){var n=$(this);n.find("span").hide(),n.find("input[type=search]").show().focus()}),n.find("input").on("input",function(a){u=[],g=[];var e=this.value.trim();e.length?(n.addClass("searching"),window.location.hash="search="+e.trim()):(n.removeClass("searching"),window.location.hash=encodeURIComponent(f))}).on("keyup",function(n){var a=$(this);27==n.keyCode&&a.trigger("focusout")}).focusout(function(n){var a=$(this);a.val().trim().length||(window.location.hash=encodeURIComponent(f),a.hide(),a.parent().find("span").show())}),e.on("click","li.folders",function(a){a.preventDefault();var e=$(this).find("a.folders").attr("href");n.hasClass("searching")?(d=i(e),n.removeClass("searching"),n.find("input[type=search]").val("").hide(),n.find("span").show()):d.push(e),window.location.hash=encodeURIComponent(e),f=e}),a.on("click","a",function(n){n.preventDefault();var e=a.find("a").index($(this)),s=d[e];d.length=Number(e),window.location.hash=encodeURIComponent(s)})})});