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

    $(function () {
      $("#f_elem_city").autocomplete({
        source: function (request, response) {
          $.getJSON(
          "http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=US&template=<geobytes%20city>,%20<geobytes%20code>&q=" + request.term,
          function (data) {
           response(data);
          }
         );
        },
        minLength: 3,
        select: function (event, ui) {
         var selectedObj = ui.item;
         $("#f_elem_city").val(selectedObj.value);
        getcitydetails(selectedObj.value);
         return false;
        },
        open: function () {
         $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
         $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
      });
      $("#f_elem_city").autocomplete("option", "delay", 100);
    });

    function getcitydetails(fqcn) {
  

      fqcn = $("#f_elem_city").val();
      console.log("fqcn", fqcn);

      cityfqcn = fqcn;

      if (cityfqcn) {

        $.getJSON("http://gd.geobytes.com/GetCityDetails?callback=?&fqcn="+cityfqcn).then(
          function (data) {
            
            console.log("data", data);
            $("#geobytesregionlocationcode").val(data.geobytesregionlocationcode);
            $("#geobytesregion").val(data.geobytesregion);
            console.log("#geobytesreqionlocationcode", $("#geobytesregionlocationcode").val(data.geobytesregionlocationcode));
            $scope.userDetails.city = data.geobytescity;
            $scope.userDetails.state = data.geobytesregion;
    
          }
        );
      }
      
    }
  
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
      alert("Your profile has been saved");
    };
   
  }
]);