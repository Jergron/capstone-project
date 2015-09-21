app.controller("FanProCtrl", 
  ["$scope",
   "$routeParams",
  "$firebaseArray",
  "$firebaseObject",
  "$firebaseAuth",
  "$firebase",
  "$http",
  function($scope, $routeParams, $firebaseArray, $firebaseObject, $firebaseAuth, $firebase, $http) {
    var refFans = new Firebase("https://testcap.firebaseio.com/fans");
    var authData = refFans.getAuth();
    $scope.userDetails = {};
    console.log("authData", authData);

    $scope.fans = $firebaseObject(refFans);
    // $scope.fan = $firebaseObject(refFans.child($routeParams.fanId));

    //Authenticates user to firebase data
    $scope.auth = $firebaseAuth(refFans);

    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      // console.log("authData", authData);
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
      var baseRef = new Firebase("https://testcap.firebaseio.com/fans");
      var authInfo = baseRef.getAuth();
      var fbId = authInfo.uid;

      var dataRef = new Firebase("https://testcap.firebaseio.com/fans/" + fbId);
      var fans = $firebaseObject(dataRef);  

      fans.$bindTo($scope, "userDetails", function() {

      });

      console.log('fans', fans);
      console.log('dataRef', dataRef);


      // $scope.ID.$save(newUser).then(function() {
      //   alert('Profile saved!');
      // }).catch(function(error) {
      //   alert('Error!');
      // });
      // console.log("refFans.child()", refFans.child());
    };
   $scope.updateUser();
  }
]);