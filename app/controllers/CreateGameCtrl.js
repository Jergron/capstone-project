app.controller("CreateGameCtrl", 
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
    $scope.assets = {};
    $scope.users = $firebaseObject(ref);


    //Authenticates user to firebase data
    $scope.auth = Auth;

    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;

      // Calls data from firebase
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
    
    
    $scope.creds = {
      bucket: 'fames/' + authData.uid,
      access_key: 'AKIAJVXOQ3LLGCXVK27Q',
      secret_key: '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'
    };
    
    // Uploades the image to amazon S3 and sends the url to firebase
    // role is the are
    $scope.upload = function(role) {

      var ref = new Firebase("https://testcap.firebaseio.com/users/" + authData.uid);
      $scope.band = $firebaseArray(ref);

      // Configure The S3 Object 
      AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
     
      var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
     
      if($scope.file) { 
        var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
     
        bucket.putObject(params, function(err, data) {
          if(err) {
            // There Was An Error With Your S3 Config
            sweetAlert(err.message);
            return false;
          }
          else {

            if(role === "enemy"){

              sweetAlert({   

                  title: "Oh NO!",   
                  text: "Your nemesis has arrived!",   
                  timer: 3000 

              });

            } else if (role === "player") {

              sweetAlert({   

                  title: "SWEET!",   
                  text: "Your player has been loaded into the matrix!",   
                  timer: 3000 

              });
            }
             else {

              sweetAlert({   

                  title: "Let's do this!",     
                  timer: 3000 

              });
             }
            // Success!
            console.log("role", role);
            var toFb = {};
            toFb[role] = 'https://s3.amazonaws.com/fames/' + authData.uid + '/' + $scope.file.name;
            ref.child("assets").update(toFb, 
              function(error) {
                if (error) {
                  console.log("Error:", error);
                } else {
                  console.log("Profile set successfully!");
                }
              });

          }
        })
        .on('httpUploadProgress',function(progress) {
              // Log Progress Information
              console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
            });
      }
      else {
        // No File Selected
        sweetAlert('No File Selected');
      }
    };
   
  }
]);