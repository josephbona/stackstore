app.factory('UserService', function($http){
  return {
    create: function(user){
      return $http.post('/api/users', user)
      .then(function(result){
        return result.data;
      });
    }
  }
});