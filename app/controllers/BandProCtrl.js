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

    $scope.eventDetails = {
      times: $( "#datepicker" ).value(),
      venue: ""
    };

    $(function() {
      $( "#datepicker" ).datepicker();
     }); 


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

    $scope.previewFile();  
    
  
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
      var baseRef = new Firebase("https://testcap.firebaseio.com/users");
      var authInfo = baseRef.getAuth();
      var fbId = authInfo.uid;
      var dataEventRef = new Firebase("https://testcap.firebaseio.com/shows/" + fbId);
      var events = $firebaseObject(dataEventRef);
      console.log("Your profile has been saved");
      events.show = $scope.eventDetails;
      events.$save();
    };
   
  }
]);