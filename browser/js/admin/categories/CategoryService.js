admin.factory('CategoryService', function($http) {

  return {

    findAll: function() {
      return $http.get('/api/categories')
        .then(function(result) {
          return result.data;
        }).catch(function(err) {
          console.log(err);
        });
    },

    findById: function(id) {
      return $http.get('/api/categories/' + id)
        .then(function(result) {
          angular.copy(result.data, _category);
          return result.data;
        });
    },

    create: function(product) {
      return $http.post('/api/categories', product)
        .then(function(result) {
          angular.copy(result.data, _category);
          return _category;
        });
    },

    destroy: function(id) {
      return $http.delete('/api/categories/' + id)
        .then(function() {
          angular.copy({}, _category);
        });
    },

    update: function(id) {
      return $http.put('/api/categories/' + id)
        .then(function(result) {
          angular.copy(result.data, _category);
          return _category;
        });
    }


  };
});