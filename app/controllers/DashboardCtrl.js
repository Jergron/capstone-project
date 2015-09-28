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
      // return authData;
    });

    $scope.getFanBands = function() {
      var matchRef = new Firebase("https://testcap.firebaseio.com/matches").orderByChild("fanId").equalTo(fbId);
      var matchArray = $firebaseArray(matchRef);
    };

    
    $scope.addBand = function(bandId) {
      var bandRef = new Firebase("https://testcap.firebaseio.com/users/" + bandId);
      
      var matchRef = new Firebase("https://testcap.firebaseio.com/matches");
      if(bandId && fbId !== bandId && fbId){
        matchRef.push({
          bandId: bandId,
          fanId: fbId
        });
      }

      // $scope.userDetails.bandId ={uid: bandId};
    };

    // $scope.addFanToBand = function() {

    //   console.log("authData", authData.uid);
    //   // $scope.userDetails.fanId ={uid: user};

    // };

  }
]);