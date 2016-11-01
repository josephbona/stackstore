admin.factory('OrderService', function($http) {
  return {
    findAll: function() {
      return $http.get('/api/orders')
        .then(function(result) {
          return result.data;
        }).catch(function(err) {
          console.log(err);
        });
    },
    findPending: function() {
      return $http.get('/api/orders?status=pending')
        .then(function(result) {
          return result.data;
        }).catch(function(err) {
          console.log(err);
        });
    },
    completeOrder: function(id) {
      return $http.get('/api/orders/complete/' + id).
        then(function(result) {
          return result.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
});