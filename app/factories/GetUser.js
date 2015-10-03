app.factory("GetUser", [
  function() {
    var user;

    return {

      getUser: function () {
        return user;
      },

      setUser: function (Id) {
        console.log("Id", Id);
        user = Id;
      }
      
    };
  }
]);