admin.factory('ProductService', function($http) {
  var _product = {};

  return {

    findAll: function() {
      return $http.get('/api/products')
        .then(function(result) {
          return result.data;
        }).catch(function(err) {
          console.log(err);
        });
    },

    findById: function(id) {
      return $http.get('/api/products/' + id)
        .then(function(result) {
          angular.copy(result.data, _product);
          return result.data;
        });
    },

    create: function(product) {
      return $http.post('/api/products', product)
        .then(function(result) {
          angular.copy(result.data, _product);
          return _product;
        });
    },

    destroy: function(id) {
      return $http.delete('/api/products/' + id)
        .then(function() {
          angular.copy({}, _product);
        });
    },

    update: function(id) {
      return $http.put('/api/products/' + id)
        .then(function(result) {
          angular.copy(result.data, _product);
          return _product;
        });
    }

  };
});