app.controller("SignUpCtrl", 
  ["$scope",
   "$routeParams",
  "$firebaseArray",
  function($scope, $routeParams, $firebaseArray) {
    var ref = new Firebase("https://testcap.firebaseio.com/users");

    // Grabs user input from DOM
    $scope.user = {
      email: "",
      password: "",
      zip: "",
      type: ""
    };

      // Adds new user to firebase authentication via email/password
      $scope.createUser = function() {

        console.log("user type", $scope.user.type);

        if ($scope.user.type === "band") {
          $scope.createBand();
        }

        if ($scope.user.type === "fan") {
          $scope.createFan();
        }
      }; 

      // Adds specifically a new band to firebase authentication via email/password
      $scope.createBand = function () {

        console.log("createBand RUNNING");
        console.log("ref", ref);

        ref.createUser({
          email: $scope.user.email,
          password: $scope.user.password
        }, function(error, userData) {

          if (error) {
            switch (error.code) {
              case "EMAIL_TAKEN":
                $scope.message = "The new user account cannot be created because the email is already in use.";
                break;
              case "INVALID_EMAIL":
                $scope.message = "The specified email is not a valid email.";
                break;
              default:
                alert("Error creating user:", error);
            }
          } else {
            alert("Successfully created user account with uid:", userData.uid);
            var bandReference = ref.child(userData.uid);
            bandReference.set(
            {
              "email": $scope.user.email,
              "band": true,
              "zip": $scope.user.zip,
              "uid": userData.uid
            });

          }
        });
      };

      
      
      // Adds specifically a new fan to firebase authentication via email/password
      $scope.createFan = function () {

        
        
        // console.log("this my shiney new id:", newChildRef.key());


        console.log("createFan RUNNING");

        ref.createUser({
          email: $scope.user.email,
          password: $scope.user.password
        }, function(error, userData) {
          if (error) {
            switch (error.code) {
              case "EMAIL_TAKEN":
                $scope.message = "The new user account cannot be created because the email is already in use.";
                break;
              case "INVALID_EMAIL":
                $scope.message = "The specified email is not a valid email.";
                break;
              default:
                alert("Error creating user:", error);
            }
          } else {
            alert("Successfully created user account with uid:", userData.uid);
            var fanReference = ref.child(userData.uid);
            fanReference.set(
              {
                "email": $scope.user.email,
                "band": false,
                "zip": $scope.user.zip,
                "uid": userData.uid
              }
            );
            console.log("userData.uid", userData.uid);          
            
          }
        });
       
      };
 

  }
]);