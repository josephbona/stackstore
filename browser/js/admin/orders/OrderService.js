admin.factory('OrderService', function($http) {
  return {
    findAll: function() {
      return $http.get('/api/orders')
        .then(function(result) {
          return result.data;
        }).catch(function(err) {
          console.log(err);
        });
    }
  }
});