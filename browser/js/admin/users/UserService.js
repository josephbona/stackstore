admin.factory('UserService', function($http) {
  return {
    findAll: function() {
      return $http.get('/api/users')
        .then(function(result) {
          return result.data;
        }).catch(function(err) {
          console.log(err);
        });
    }
  }
});