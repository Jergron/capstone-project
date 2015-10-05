app.controller("FanProCtrl", 
  ["$scope",
   "$routeParams",
  "$firebaseArray",
  "$firebaseObject",
  "Auth",
  "$firebase",
  "$http",
  "currentAuth",
  "GetUser",
  function($scope, $routeParams, $firebaseArray, $firebaseObject, Auth, $firebase, $http, currentAuth, GetUser) {
    var ref = new Firebase("https://testcap.firebaseio.com/users");
    var authData = ref.getAuth();
    var fbId = authData.uid;
    $scope.userDetails = {};
    $scope.fans = $firebaseObject(ref);


    //Authenticates user to firebase data
    $scope.auth = Auth;

    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;

      // Populates the DOM with data from firebase
      $scope.updateUser();
    });

  
    $scope.updateUser = function () {
      var baseRef = new Firebase("https://testcap.firebaseio.com/users");
      var authInfo = baseRef.getAuth();
      fbId = authInfo.uid;

      var dataRef = new Firebase("https://testcap.firebaseio.com/users/" + fbId);
      var fans = $firebaseObject(dataRef); 
      GetUser.setUser(fans); 

      fans.$bindTo($scope, "userDetails", function() {

      });

    };
    
    $scope.message = function () {
      alert("Your profile has been saved");
    };

    $scope.addFeedback = function(bandId) {

      var feedRef = new Firebase("https://testcap.firebaseio.com/feedback");
      if(bandId && fbId !== bandId && fbId){
        feedRef.push({
          bandId: bandId,
          fanId: fbId,
          text: $scope.userDetails.feedback
        });
      }
    };
   
  }
]);