admin.config(function ($stateProvider) {
    $stateProvider.state('orders', {
        url: '/admin/orders',
        controller: 'AdminOrdersCtrl',
        templateUrl: '../js/admin/orders/orders.html',
        resolve: {
          orders: function(OrderService){
            return OrderService.findAll();
          }
        }
    });
});

admin.controller('AdminOrdersCtrl', function ($scope, orders) {
  $scope.orders = orders;
});
