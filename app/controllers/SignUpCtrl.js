app.controller("SignUpCtrl", 
  ["$scope",
   "$routeParams",
  "$firebaseArray",
  function($scope, $routeParams, $firebaseArray) {
    var ref;

    // Grabs user input from DOM
    $scope.user = {
      email: "",
      password: "",
      type: ""
    };

      // Adds new user to firebase authentication via email/password
      $scope.createUser = function() {

        // console.log("user", user);

        if ($scope.user.type === "band") {
          $scope.createBand();
        }

        if ($scope.user.type === "fan") {
          $scope.createFan();
        }
      }; 

      // Adds specifically a new band to firebase authentication via email/password
      $scope.createBand = function () {
        ref = new Firebase("https://testcap.firebaseio.com/bands");
        var newUser = {
          "name":"",
          "userName": user.email,
          "email": "",
          "imageUrl":"",
          "city":"",
          "state": "",
          "bio":"",
          "fans":{
            "fanId": ""
          },
          "news": ""
        };

        console.log("ref", ref);
        console.log("newUser", newUser);

        console.log("createBand RUNNING");
        ref.createUser($scope.user, function(error, userData) {
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

            var list = $firebaseArray(ref);
            list.$add(newUser).then(function(ref) {
            var id = ref.key();
            console.log("added record with id " + id);
            list.$indexFor(id); // returns location in the array
            });
          }
        });
      };

      
      
      // Adds specifically a new fan to firebase authentication via email/password
      $scope.createFan = function () {
        var id;

        ref = new Firebase("https://testcap.firebaseio.com/fans");
        
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
                "name":"",
                "email": $scope.user.email,
                "imageUrl":"",
                "city":"",
                "state": "",
                "about":"",
                "topScore": "",
                "rating": "",
                "interests":"",
                "uid": userData.uid
              }
            );
            console.log("userData.uid", userData.uid);
            // var list = $firebaseArray(ref);
            // list.$add(newUser).then(function(ref) {
            // id = ref.key();
            // console.log("added record with id " + id);
            // list.$indexFor(id); // returns location in the array
            // });           
            
          }
        });
       
      };
 

  }
]);