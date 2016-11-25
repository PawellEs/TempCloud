// Make sure to include the `ui.router` module as a dependency
angular.module('PilukuApp', [ 'ui.router', 'ngAnimate', 'PilukuApp.controllers', 'oc.lazyLoad', 'chieffancypants.loadingBar' ])

.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)

.constant('ASSETS', {
  'core' : 
  {
    'core' : 'assets/js/core.js',
    'liveTile' : 'assets/js/MetroJs.lt.js',
  },
  'bootstrap': {
    'css': 'js/bootstrap.min.js', // Some plugins which do not support angular needs this

    'js': appHelper.assetPath('js/bootstrap.js'),
  },
  'materialize' : appHelper.assetPath('js/materialize.js'),
  get : function(fileName)
  {
      return appHelper.assetPath(fileName);
  },
  js : function(moduleName,fileName)
  {
      return appHelper.componentsDir + '/' + moduleName + '/js/' + fileName + '.js';
  },
  css : function(moduleName,fileName)
  {
      return appHelper.componentsDir + '/' + moduleName + '/css/' + fileName + '.css';
  }
})







.config(
  [          '$stateProvider', '$urlRouterProvider','$ocLazyLoadProvider', 'ASSETS',
    function ($stateProvider,   $urlRouterProvider, $$ocLazyLoadProvider, ASSETS) {

      /********************************/
      /*** Redirects and Otherwise ****/
      /********************************/
      
      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/app/dashboard');


      /****************************/
      /*** State Configurations ***/
      /****************************/

      // Use $stateProvider to configure your states.
      $stateProvider


      /************* Basic Layout *************/
      .state("app", {
        abstract : true,
        url: "/app",
        templateUrl: appHelper.componentView('layouts','basic-layout'),
        resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.js('layouts','jquery.nicescroll.min'),
              ASSETS.js('layouts','layouts'),
              ASSETS.core.core,
            ]);
          },
        }
      })

      /************* Collapsed Sidebar *************/
      .state("collapsed-sidebar", {
        url: "/collapsed-sidebar",
        templateUrl: appHelper.componentView('layouts','collapsed-sidebar'),
        resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.css('dashboard','widgets'),

              ASSETS.js('layouts','jquery.nicescroll.min'),
              ASSETS.js('layouts','layouts'),
              ASSETS.js('dashboard','chartist.min'),
              ASSETS.js('dashboard','build/d3.min'),
              ASSETS.js('dashboard','build/nv.d3.min'),
              ASSETS.js('dashboard','bic_calendar'),
              ASSETS.core.core,
            ]);
          },
        }
      })

      /************* Horizontal Menu *************/
      .state("horizontal-menu", {
        url: "/horizontal-menu",
        templateUrl: appHelper.componentView('layouts','horizontal-menu'),
        resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.css('dashboard','widgets'),

              ASSETS.js('layouts','jquery.nicescroll.min'),
              ASSETS.js('layouts','layouts'),
              ASSETS.js('dashboard','chartist.min'),
              ASSETS.js('dashboard','build/d3.min'),
              ASSETS.js('dashboard','build/nv.d3.min'),
              ASSETS.js('dashboard','bic_calendar'),
              ASSETS.core.core,
            ]);
          },
        }
      })

      /************* Menu With Header *************/
      .state("menu-with-header", {
        url: "/menu-with-header",
        templateUrl: appHelper.componentView('layouts','menu-with-header'),
        resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.css('dashboard','widgets'),

              ASSETS.js('layouts','jquery.nicescroll.min'),
              ASSETS.js('layouts','layouts'),
              ASSETS.js('dashboard','chartist.min'),
              ASSETS.js('dashboard','build/d3.min'),
              ASSETS.js('dashboard','build/nv.d3.min'),
              ASSETS.js('dashboard','bic_calendar'),
              ASSETS.core.core,
            ]);
          },
        }
      })

      /************* Right Sidebar *************/
      .state("right-sidebar", {
        url: "/right-sidebar",
        templateUrl: appHelper.componentView('layouts','right-sidebar'),
        resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.css('dashboard','widgets'),

              ASSETS.js('layouts','jquery.nicescroll.min'),
              ASSETS.js('layouts','layouts'),
              ASSETS.js('dashboard','chartist.min'),
              ASSETS.js('dashboard','build/d3.min'),
              ASSETS.js('dashboard','build/nv.d3.min'),
              ASSETS.js('dashboard','bic_calendar'),
              ASSETS.core.core,
            ]);
          },
        }
      })

      /************* Boxed Layout *************/
      .state("boxed-layout", {
        url: "/boxed-layout",
        templateUrl: appHelper.componentView('layouts','boxed-layout'),
        resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.css('dashboard','widgets'),

              ASSETS.js('layouts','jquery.nicescroll.min'),
              ASSETS.js('layouts','layouts'),
              ASSETS.js('dashboard','chartist.min'),
              ASSETS.js('dashboard','build/d3.min'),
              ASSETS.js('dashboard','build/nv.d3.min'),
              ASSETS.js('dashboard','bic_calendar'),
              ASSETS.core.core,
            ]);
          },
        }
      })


      /************* Dashboard *************/
      .state("app.dashboard", {
        url: "/dashboard",
        templateUrl: appHelper.componentView('dashboard','index'),
        resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.css('dashboard','widgets'),

              ASSETS.core.liveTile,
              ASSETS.js('dashboard','dashboard'),
              ASSETS.js('dashboard','chartist.min'),
              ASSETS.js('dashboard','build/d3.min'),
              ASSETS.js('dashboard','build/nv.d3.min'),
              ASSETS.js('dashboard','weather'),
              // ASSETS.js('dashboard','sparkline'),
              ASSETS.js('dashboard','bic_calendar'),
            ]);
          },
        }

      })

  
      /************* Piluku Premium *************/
      .state("app.tasks", {
        url: "/tasks",
        templateUrl: appHelper.componentView('piluku-premium','tasks'),
       resolve: {
        resources: function($ocLazyLoad){
          return $ocLazyLoad.load([
            ASSETS.css('dashboard','widgets'),
          ]);
        },
      }
      })

      .state("app.mailbox", {
        url: "/mailbox",
        templateUrl: appHelper.componentView('piluku-premium','mailbox'),
       resolve: {
        resources: function($ocLazyLoad){
          return $ocLazyLoad.load([
            ASSETS.css('piluku-premium','mail'),
          ]);
        },
      }
      })

      .state("app.profile", {
        url: "/profile",
        templateUrl: appHelper.componentView('piluku-premium','profile'),
       resolve: {
        resources: function($ocLazyLoad){
          return $ocLazyLoad.load([
            ASSETS.css('piluku-premium','profile'),
          ]);
        },
      }
      })

      .state("app.invoice", {
        url: "/invoice",
        templateUrl: appHelper.componentView('piluku-premium','invoice'),
       resolve: {
        resources: function($ocLazyLoad){
          return $ocLazyLoad.load([
            ASSETS.css('piluku-premium','invoice'),
          ]);
        },
      }
      })

      .state("app.timeline", {
        url: "/timeline",
        templateUrl: appHelper.componentView('piluku-premium','timeline'),
       resolve: {
        resources: function($ocLazyLoad){
          return $ocLazyLoad.load([
            ASSETS.css('piluku-premium','timeline'),
          ]);
        },
      }
      })

      .state("app.timeline2", {
        url: "/timeline2",
        templateUrl: appHelper.componentView('piluku-premium','timeline2'),
       resolve: {
        resources: function($ocLazyLoad){
          return $ocLazyLoad.load([
            ASSETS.css('piluku-premium','timeline'),
          ]);
        },
      }
      })

      .state("app.pricing", {
        url: "/pricing",
        templateUrl: appHelper.componentView('piluku-premium','pricing'),
       resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.css('piluku-premium','pricing'),
            ]);
          },
        }

      })

      .state("app.gallery", {
        url: "/gallery",
        templateUrl: appHelper.componentView('piluku-premium','gallery'),
         resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.css('piluku-premium','gallery'),
              ASSETS.js('piluku-premium','jquery.sliphover.min'),
              ASSETS.js('piluku-premium','freewall'),
            ]);
          },
        }
      })



      .state("app.masonry-gallery", {
        url: "/masonry-gallery",
        templateUrl: appHelper.componentView('piluku-premium','masonry-gallery'),
         resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.css('piluku-premium','gallery'),
              ASSETS.css('piluku-premium','animated-masonry-gallery'),
              ASSETS.css('piluku-premium','rotated-gallery'),
              ASSETS.js('piluku-premium','gallery/animated-masonry-gallery'),
              ASSETS.js('piluku-premium','gallery/isotope.min'),
              ASSETS.js('piluku-premium','gallery/jquery.isotope.min'),
            ]);
          },
        }
      })

      .state("app.rotated-gallery", {
        url: "/rotated-gallery",
        templateUrl: appHelper.componentView('piluku-premium','rotated-gallery'),
         resolve: {
          resources: function($ocLazyLoad){
            return $ocLazyLoad.load([
              ASSETS.css('piluku-premium','gallery'),
              ASSETS.css('piluku-premium','animated-masonry-gallery'),
              ASSETS.css('piluku-premium','rotated-gallery'),
            ]);
          },
        }
      })

      .state("app.typography", {
        url: "/typography",
        templateUrl: appHelper.componentView('typography','index'),
      })

      .state("app.basic-alerts", {
        url: "/basic-alerts",
        templateUrl: appHelper.componentView('alerts','basic'),
      })

      .state("app.sweet-alerts", {
        url: "/sweet-alerts",
        templateUrl: appHelper.componentView('alerts','sweet'),
          resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('alerts','sweetalert'),    
                ASSETS.js('alerts','sweetalert.min'),
              ]);
            }
          }
      })

      .state("app.progress-bars", {
        url: "/progress-bars",
        templateUrl: appHelper.componentView('progress-bars','index'),
      })

      .state("app.dropdowns", {
        url: "/dropdowns",
        templateUrl: appHelper.componentView('dropdowns','index'),
      })

      .state("app.info-boxes", {
        url: "/info-boxes",
        templateUrl: appHelper.componentView('info-boxes','index'),
      })

      .state("app.notifications", {
        url: "/notifications",
        templateUrl: appHelper.componentView('notifications','index'),
          resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.js('notifications','jquery.gritter'),    
                ASSETS.js('notifications','jquery.noty'),
                ASSETS.js('notifications','layouts/bottom'),
                ASSETS.js('notifications','layouts/bottomCenter'),
                ASSETS.js('notifications','layouts/bottomLeft'),
                ASSETS.js('notifications','layouts/bottomRight'),
                ASSETS.js('notifications','layouts/center'),
                ASSETS.js('notifications','layouts/centerLeft'),
                ASSETS.js('notifications','layouts/centerRight'),
                ASSETS.js('notifications','layouts/inline'),
                ASSETS.js('notifications','layouts/top'),
                ASSETS.js('notifications','layouts/topCenter'),
                ASSETS.js('notifications','layouts/topLeft'),
                ASSETS.js('notifications','layouts/topRight'),
                ASSETS.js('notifications','layouts/default'),
                ASSETS.js('notifications','jquery.desknoty'),
              ]);
            }
          }
      })

      .state("app.buttons", {
        url: "/buttons",
        templateUrl: appHelper.componentView('buttons','index'),
      })

      .state("app.tree-view", {
        url: "/tree-view",
        templateUrl: appHelper.componentView('tree-view','index'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('tree-view','jtree'),    
                ASSETS.js('tree-view','tree'),
              ]);
            }
          }
      })

      .state("app.css3-animations", {
        url: "/css3-animations",
        templateUrl: appHelper.componentView('css3-animations','index'),
      })

      .state("app.sliders", {
        url: "/sliders",
        templateUrl: appHelper.componentView('sliders','index'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('sliders','pick-a-color-1.2.3.min'),    
                ASSETS.css('sliders','colpick'),    
                ASSETS.css('sliders','tinycolorpicker'),    
                ASSETS.css('sliders','jquery.datetimepicker'),    
                ASSETS.css('sliders','range-slider/ion.rangeSlider'),    
                ASSETS.css('sliders','range-slider/ion.rangeSlider.skinFlat'),    
                ASSETS.css('sliders','range-slider/normalize'),    
                ASSETS.js('sliders','range-slider/ion.rangeSlider'),
                ASSETS.js('sliders','pick-a-color/pick-a-color-1.2.3.min'),
                ASSETS.js('sliders','pick-a-color/tinycolor-0.9.15.min'),
                ASSETS.js('sliders','colpick/colpick'),
                ASSETS.js('sliders','tinycolorpicker/jquery.tinycolorpicker'),
                ASSETS.js('sliders','datetimepicker/jquery.datetimepicker'),
              ]);
            }
          }
      })

      .state("app.carousel", {
        url: "/carousel",
        templateUrl: appHelper.componentView('carousel','index'),
      })

      .state("app.portlets", {
        url: "/portlets",
        templateUrl: appHelper.componentView('portlets','index'),
      })

      .state("app.ion-icons", {
        url: "/ion-icons",
        templateUrl: appHelper.componentView('icons','ion-icons'),
      })

      .state("app.fontawesome-icons", {
        url: "/fontawesome-icons",
        templateUrl: appHelper.componentView('icons','fontawesome-icons'),
      })

      .state("app.themify-icons", {
        url: "/themify-icons",
        templateUrl: appHelper.componentView('icons','themify-icons'),
      })

      .state("app.tooltips", {
        url: "/tooltips",
        templateUrl: appHelper.componentView('tooltips','index'),
      })

      .state("app.labels-badges", {
        url: "/labels-badges",
        templateUrl: appHelper.componentView('labels-badges','index'),
      })

      .state("app.list-groups", {
        url: "/list-groups",
        templateUrl: appHelper.componentView('list-groups','index'),
      })

      .state("app.breadcrumbs", {
        url: "/breadcrumbs",
        templateUrl: appHelper.componentView('breadcrumbs','index'),
      })

      .state("app.tabs-accordions", {
        url: "/tabs-accordions",
        templateUrl: appHelper.componentView('tabs-accordions','index'),
      })

      .state("app.file-manager", {
        url: "/file-manager",
        templateUrl: appHelper.componentView('file-manager','index'),
       resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                // ASSETS.css('tree-view','jtree'),    
                ASSETS.css('file-manager','elfinder.min'),
                ASSETS.css('file-manager','elfinder.theme'),
                ASSETS.js('file-manager','snap'),
                // ASSETS.js('file-manager','file-manager'),
              ]);
            }
          }
      })

      .state("app.modals", {
        url: "/modals",
        templateUrl: appHelper.componentView('modals','index'),
      })

      .state("app.ajax-modal", {
        url: "/ajax-modal",
        templateUrl: appHelper.componentView('modals','ajax'),
      })

      .state("app.pagination", {
        url: "/pagination",
        templateUrl: appHelper.componentView('pagination','index'),
      })

      .state("app.basic-tables", {
        url: "/basic-tables",
        templateUrl: appHelper.componentView('tables','basic-tables'),
      })

      .state("app.dynamic-tables", {
        url: "/dynamic-tables",
        templateUrl: appHelper.componentView('tables','dynamic-tables'),
      })

      .state("app.editable-tables", {
        url: "/editable-tables",
        templateUrl: appHelper.componentView('tables','editable-tables'),
      })

      .state("app.users-table", {
        url: "/users-table",
        templateUrl: appHelper.componentView('tables','users-table'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.js('tables','jquery.dataTables.min'), 
                ASSETS.js('tables','bootstrap-datatables'), 
                ASSETS.js('tables','mindmup-editabletable'), 
                ASSETS.js('tables','numeric-input-example'), 
              ]);
            }
          }
      })

      .state("app.dropzone-file-upload", {
        url: "/dropzone-file-upload",
        templateUrl: appHelper.componentView('forms','dropzone-file-upload'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.js('forms','dropzone-file-upload/jquery.fileupload'), 
                ASSETS.js('forms','dropzone-file-upload/jquery.iframe-transport'),
                ASSETS.js('forms','dropzone-file-upload/jquery.knob'), 
              ]);
            }
          }
      })

      .state("app.form-validation", {
        url: "/form-validation",
        templateUrl: appHelper.componentView('forms','form-validation'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.js('forms','form-validation/bootstrap-filestyle'), 
                ASSETS.js('forms','form-validation/jquery.form-validator'),
              ]);
            }
          }
      })

      .state("app.form-wizard", {
        url: "/form-wizard",
        templateUrl: appHelper.componentView('forms','form-wizard'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('forms','prettify'), 
                ASSETS.js('forms','form-wizard/jquery.bootstrap.wizard'), 
                ASSETS.js('forms','form-wizard/prettify'),
              ]);
            }
          }
      })

      .state("app.input-groups", {
        url: "/input-groups",
        templateUrl: appHelper.componentView('forms','input-groups'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
              ]);
            }
          }
      })

      .state("signup-one", {
        url: "/signup-one",
        templateUrl: appHelper.componentView('utility','signup-one'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('utility','signup'), 
              ]);
            }
          }
      })

      .state("signup-two", {
        url: "/signup-two",
        templateUrl: appHelper.componentView('utility','signup-two'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('utility','signup2'), 
              ]);
            }
          }
      })

      .state("signin-one", {
        url: "/signin-one",
        templateUrl: appHelper.componentView('utility','signin-one'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('utility','signin'), 
              ]);
            }
          }
      })

      .state("signin-two", {
        url: "/signin-two",
        templateUrl: appHelper.componentView('utility','signin-two'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('utility','signin2'), 
              ]);
            }
          }
      })

      .state("forgot-password", {
        url: "/forgot-password",
        templateUrl: appHelper.componentView('utility','forgot-password'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('utility','signin'), 
              ]);
            }
          }
      })

      .state("lock-screen", {
        url: "/lock-screen",
        templateUrl: appHelper.componentView('utility','lock-screen'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('utility','lock'), 
              ]);
            }
          }
      })

      .state("lock-screen-two", {
        url: "/lock-screen-two",
        templateUrl: appHelper.componentView('utility','lock-screen-two'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('utility','lock-screen2'), 
              ]);
            }
          }
      })

      .state("app.faq", {
        url: "/faq",
        templateUrl: appHelper.componentView('utility','faq'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
              ]);
            }
          }
      })

      .state("404", {
        url: "/404",
        templateUrl: appHelper.componentView('utility','404'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('utility','error'),
              ]);
            }
          }
      })

      .state("505", {
        url: "/505",
        templateUrl: appHelper.componentView('utility','505'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('utility','error'),
              ]);
            }
          }
      })

      .state("app.form-elements", {
        url: "/form-elements",
        templateUrl: appHelper.componentView('forms','form-elements'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.js('forms','form-elements/select2'),
                ASSETS.js('forms','form-elements/jquery.multi-select'),
                ASSETS.js('forms','form-elements/bootstrap-filestyle'),
                ASSETS.js('forms','form-elements/bootstrap-datepicker'),
                ASSETS.js('forms','form-elements/bootstrap-colorpicker'),
                ASSETS.js('forms','form-elements/jquery.maskedinput'),
              ]);
            }
          }
      })

      .state("app.nestable-lists", {
        url: "/nestable-lists",
        templateUrl: appHelper.componentView('nestable-lists','index'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.css('nestable-lists','nestable'),    
                ASSETS.css('nestable-lists','sortable/app'),    
                ASSETS.css('nestable-lists','sortable/ply'),   
                ASSETS.js('nestable-lists','nestable-lists/jquery.nestable'), 
                ASSETS.js('nestable-lists','sortable/Sortable'), 
                ASSETS.js('nestable-lists','Ply.min'), 
                ASSETS.js('nestable-lists','sortable/ng-sortable'), 
                // ASSETS.js('nestable-lists','sortable/st/app'), 
              ]);
            }
          }
      })

      .state("app.line-area-charts", {
        url: "/line-area-charts",
        templateUrl: appHelper.componentView('charts','line-area-charts'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.js('charts','chartist.min'),
                
              ]);
            }
          }
      })

      .state("app.bar-charts", {
        url: "/bar-charts",
        templateUrl: appHelper.componentView('charts','bar-charts'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.js('charts','chartist.min'),
                
              ]);
            }
          }
      })

      .state("app.pie-charts", {
        url: "/pie-charts",
        templateUrl: appHelper.componentView('charts','pie-charts'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.js('charts','nvd3/lib/d3.v3'),
                ASSETS.js('charts','nvd3/nv.d3'),
                ASSETS.js('charts','charts/jquery.flot'),
              ]);
            }
          }
      })

      .state("app.nvd3-charts", {
        url: "/nvd3-charts",
        templateUrl: appHelper.componentView('charts','nvd3-charts'),
        resolve: {
            resources: function($ocLazyLoad){
              return $ocLazyLoad.load([
                ASSETS.js('charts','nvd3/lib/d3.v3'),
                ASSETS.js('charts','nvd3/nv.d3'),
              ]);
            }
          }
      })

      .state("app.basic-maps", {
        url: "/basic-maps",
        templateUrl: appHelper.componentView('maps','basic-maps'),
      })

      /************* Forms *************/
      .state("app.panels", {
        url: "/panels",
        templateUrl: appHelper.componentView('ui-elements','panels'),
      })

      /************* about *************/
      .state('about', {
        url: '/about',

        // Showing off how you could return a promise from templateProvider
        templateProvider: ['$timeout',
          function (        $timeout) {
            return $timeout(function () {
              return '<p class="lead">UI-Router Resources</p><ul>' +
                       '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
                       '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
                       '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                       '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                       '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                     '</ul>';
            }, 100);
          }]
      })
    }
  ]
);
