app.controller("FanProCtrl", 
  ["$scope",
   "$routeParams",
  "$firebaseArray",
  "$firebaseObject",
  "$firebaseAuth",
  function($scope, $routeParams, $firebaseArray, $firebaseObject, $firebaseAuth) {
    var refFans = new Firebase("https://testcap.firebaseio.com/fans");

    $scope.fan = $firebaseObject(refFans);

    //Authenticates user to firebase data
    $scope.auth = $firebaseAuth(refFans);

    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      console.log("authData", authData);
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

  $(function () 

    {
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

    cityfqcn = fqcn;

    if (cityfqcn) {

      $.getJSON("http://gd.geobytes.com/GetCityDetails?callback=?&fqcn="+cityfqcn,
        function (data) {
          $("#geobytesinternet").val(data.geobytesinternet);
          $("#geobytescountry").val(data.geobytescountry);
          $("#geobytesregionlocationcode").val(data.geobytesregionlocationcode);
          $("#geobytesregion").val(data.geobytesregion);
          $("#geobyteslocationcode").val(data.geobyteslocationcode);
          $("#geobytescity").val(data.geobytescity);
          $("#geobytescityid").val(data.geobytescityid);
          $("#geobytesfqcn").val(data.geobytesfqcn);
          $("#geobyteslatitude").val(data.geobyteslatitude);
          $("#geobyteslongitude").val(data.geobyteslongitude);
          $("#geobytescapital").val(data.geobytescapital);
          $("#geobytestimezone").val(data.geobytestimezone);
          $("#geobytesnationalitysingular").val(data.geobytesnationalitysingular);
          $("#geobytespopulation").val(data.geobytespopulation);
          $("#geobytesnationalityplural").val(data.geobytesnationalityplural);
          $("#geobytesmapreference").val(data.geobytesmapreference);
          $("#geobytescurrency").val(data.geobytescurrency);
          $("#geobytescurrencycode").val(data.geobytescurrencycode);
        }
      );
    }
  }


  
  }
]);