app.controller("BandProCtrl", 
  ["$scope",
   "$routeParams",
  "$firebaseArray",
  "$firebaseObject",
  "Auth",
  "$firebase",
  "$http",
  "currentAuth",
  function($scope, $routeParams, $firebaseArray, $firebaseObject, Auth, $firebase, $http, currentAuth) {
    var ref = new Firebase("https://testcap.firebaseio.com/users");
    var authData = ref.getAuth();
    $scope.userDetails = {};
    $scope.users = $firebaseObject(ref);


    $scope.events = [[]];


    $scope.addEvent = function(){
      var baseRef = new Firebase("https://testcap.firebaseio.com/users");
      var authInfo = baseRef.getAuth();
      var fbId = authInfo.uid;
      $scope.events[0].push($scope.newEvent);
      var showsRef = new Firebase("https://testcap.firebaseio.com/shows/");
      $scope.newEvent.uid = fbId;
      showsRef.push($scope.newEvent);
      $scope.events = $firebaseArray(showsRef);
    };


    //Authenticates user to firebase data
    $scope.auth = Auth;

    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;

      // Populates the DOM with data from firebase
      $scope.updateUser();
    });

    $scope.previewFile = function(){

       var preview = document.querySelector('#preview'); //selects the query id
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       };

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
    }; 
    
  
    $scope.updateUser = function () {
      var baseRef = new Firebase("https://testcap.firebaseio.com/users");
      var authInfo = baseRef.getAuth();
      var fbId = authInfo.uid;

      var dataRef = new Firebase("https://testcap.firebaseio.com/users/" + fbId);
      var users = $firebaseObject(dataRef); 

      users.$bindTo($scope, "userDetails", function() {

      });

    };
    
    $scope.message = function () {
      console.log("Your profile has been saved");
    };
   
  }
]);