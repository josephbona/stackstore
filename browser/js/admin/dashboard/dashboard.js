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

admin.controller('DashboardCtrl', function($scope, ProductService, UserService) {
  ProductService.findAll().then(function(products) {
    $scope.productCount = products.length;
  });
  UserService.findAll().then(function(users) {
    $scope.userCount = users.length;
  })
});