var app = angular.module("capstone", ['ngRoute', 'ui.calendar', 'ui.date', 'firebase']);
app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });
}]);

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
        controller: 'FanProCtrl',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            
            return Auth.$waitForAuth();
          }]
        }
        
      })
      .when('/bandpro', {
        templateUrl: 'partials/bandprofile.html',
        controller: 'BandProCtrl',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            
            return Auth.$waitForAuth();
          }]
        }
        
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);