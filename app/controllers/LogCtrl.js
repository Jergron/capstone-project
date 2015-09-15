app.controller("LogCtrl", 
  ["$scope",
  "$location",
   "$routeParams",
   "$firebaseAuth",
  "$firebaseArray",
  function($scope, $location, $routeParams, $firebaseAuth, $firebaseArray) {
    var refBands = new Firebase("https://testcap.firebaseio.com/bands");
    var refFans = new Firebase("https://testcap.firebaseio.com/fans");
    $scope.band = $firebaseArray(refBands);
    $scope.fan = $firebaseArray(refFans);

    $scope.user = {
      "email": "",
      "password": ""
    };


    //Radio button selected loads the page with fans data for authentication
    $scope.auth2 = function () {
      console.log("$scope.auth2");
      // Authenticates user to firebase data
      $scope.auth = $firebaseAuth(refFans);

      console.log("$scope.auth", $scope.auth);
      // Any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {
        
        console.log("authData", authData);

      });
      
      // Authorizes user by email/password
      $scope.login = function() {

        refFans.authWithPassword($scope.user, function(error, authData) {
            console.log("LogCtrl", authData.uid);
            if (error) {
              $location.path('#/');
              // console.log("Login Failed!", error);
            } else {

              storage.setUserId(authData.uid);
              console.log("Authenticated successfully with payload:", authData);

            }
          });
      };  
    }

    //Radio button selected loads the page with bands data for authentication
    $scope.auth1 = function () {
      console.log("$scope.auth1");
      // Authenticates user to firebase data
      $scope.auth = $firebaseAuth(refBands);

      console.log("$scope.auth", $scope.auth);

      // Any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {
        
        console.log("authData", authData);

      });

      // Authorizes user by email/password
      $scope.login = function() {

        refBands.authWithPassword($scope.user, function(error, authData) {
            console.log("LogCtrl", authData.uid);
            if (error) {
              $location.path('#/');
              // console.log("Login Failed!", error);
            } else {

              storage.setUserId(authData.uid);
              console.log("Authenticated successfully with payload:", authData);

            }
          });
      };
    
    }

  }
]);
