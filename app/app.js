var app = angular.module("capstone", ['ngRoute', 'firebase']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LogCtrl'
      }) 
      .when('/signup', {
        templateUrl: 'partials/signUp.html',
        controller: 'SignUpCtrl'
      })
      .when('/fanpro', {
        templateUrl: 'partials/fanprofile.html',
        controller: 'FanProCtrl'
      })
      // .when('/bandlog', {
      //   templateUrl: 'partials/bandlog.html',
      //   controller: 'LogBandCtrl'
      // })
      // .when('/fanlog', {
      //   templateUrl: 'partials/fanlog.html',
      //   controller: 'LogFanCtrl'
      // })
      .otherwise({
        redirectTo: '/'
      });
  }
]);