var app = angular.module("capstone", ['ngRoute', 'ui.calendar', 'ui.date', 'firebase']);

app.run(["$rootScope", "$location", function($rootScope, $location) {

  // Allows access to Amazon S3 data storage 
  AWS.config.update( { 
    accessKeyId: "", 
    secretAccessKey: ""
  });

  // AWS.config.region = "us-west-2";

  var s3try = new AWS.S3();

  // Gets the specific object from Amazon S3 by the name of the bucket and the key inside the bucket
  s3try.getObject({Bucket: '', Key: 'assets/'}, function(err, data) {
    if (err) { 
      console.log(err);
    } else { 
      console.log(data);
    }
  });

  // Firebase router authentication
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $waitForAuth promise is rejected
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
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            
            return Auth.$waitForAuth();
          }]
        }
        
      })
      .when('/bandpro', {
        templateUrl: 'partials/bandprofile.html',
        controller: 'BandProCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            
            return Auth.$waitForAuth();
          }]
        }
        
      })
      .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
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