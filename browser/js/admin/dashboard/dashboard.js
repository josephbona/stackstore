admin.config(function($stateProvider) {
  $stateProvider.state('dashboard', {
    url: '/admin',
    // controller: 'DashboardCtrl',
    templateUrl: '../js/admin/dashboard/dashboard.html',
    resolve: {
      orders: function(OrderService) {
        return OrderService.findAll();
      }
    }
  });
});