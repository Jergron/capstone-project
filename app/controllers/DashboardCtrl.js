app.controller("DashboardCtrl", 
  ["$scope",
   "$routeParams",
  "$firebaseArray",
  "$firebaseObject",
  "currentAuth",
  "Auth",
  function($scope, $routeParams, $firebaseArray, $firebaseObject, currentAuth, Auth) {
    var baseRef = new Firebase("https://testcap.firebaseio.com/users");
    var authData = baseRef.getAuth();
    var fbId = authData.uid;

    var dataRef = new Firebase("https://testcap.firebaseio.com/users/" + fbId);
    var users = $firebaseObject(dataRef); 
    $scope.userDetails = {};
    $scope.users = $firebaseObject(baseRef);

    users.$bindTo($scope, "userDetails", function() {

    });



    //Authenticates user to firebase data
    $scope.auth = Auth;

    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;

    });

     // Adds song to firebase 
    $scope.addBand = function(user) {
      console.log(user);
      $scope.userDetails.bandId ={uid: user};

    };

  }
]);