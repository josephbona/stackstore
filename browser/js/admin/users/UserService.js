admin.factory('UserService', function($http) {
  return {
    findAll: function() {
      return $http.get('/api/users')
        .then(function(result) {
          return result.data;
        }).catch(function(err) {
          console.log(err);
        });
    },
    makeAdmin: function(id) {
      return $http.put('/api/users/' + id, {role: 'admin'})
        .catch(function(err) {
          console.error(err);
        })
    },
    removeAdmin: function(id) {
      return $http.put('/api/users/' + id, {role: ''})
        .catch(function(err) {
          console.error(err);
        })
    }
  }
});