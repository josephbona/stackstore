admin.config(function($stateProvider) {
  $stateProvider.state('dashboard', {
    url: '/admin',
    controller: 'DashboardCtrl',
    templateUrl: '../js/admin/dashboard/dashboard.html',
    resolve: {
      orders: function(OrderService) {
        return OrderService.findAll();
      }
    }
  });
});

admin.controller('DashboardCtrl', function($scope, ProductService, UserService, OrderService) {
  ProductService.findAll().then(function(products) {
    $scope.productCount = products.length;
  });
  UserService.findAll().then(function(users) {
    $scope.userCount = users.length;
  });
  OrderService.findPending().then(function(orders) {
    $scope.pendingCount = orders.length;
  });
  $scope.completeOrder = function(id) {
    return OrderService.completeOrder(id);
  }
});