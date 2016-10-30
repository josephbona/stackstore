app.factory('UserService', function($http){
  
  var _user = {};

  return {

	user: _user,

    create: function(user){
      return $http.post('/api/users', user)
      .then(function(result){
        angular.copy(result.data, _user); 
        return result.data;
      });
    },

    findById: function(id){
    	return $http.get('/api/users/' + id)
    	.then(function(result){
        angular.copy(result.data, _user);
    		// _user = result.data;
    		return _user;
    	});
    },

    update: function(userInfo){
      return  $http.put('/api/users/' + userInfo.id, userInfo)
        .then(function(result){
          _user = result.data;
          return _user; 
        });
    }
  };
});