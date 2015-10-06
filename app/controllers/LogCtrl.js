app.controller("LogCtrl", 
  ["$scope",
  "$location",
   "$routeParams",
  "$firebaseObject",
  function($scope, $location, $routeParams, $firebaseObject) {
    var ref = new Firebase("https://testcap.firebaseio.com/");

    $scope.login = function() {

      ref.authWithPassword($scope.user, function(error, authData) {
        console.log("LogCtrl", authData.uid);
   
        var user = $firebaseObject(ref.child("users").child(authData.uid));
        
        // Checks e-mail/password auth and sends user to their appropriate profile
        user.$loaded( function() {

          if (user.band) {
            $location.path("/bandpro");
          } 
          else if (user.fan) {
            $location.path("/fanpro");       
          }

        });

        if (error) {
          $location.path('#/');
          console.log("Login Failed!", error);
        } else {

          console.log("Authenticated successfully with payload:", authData);

        }
      });

    }; 

  }
]);
