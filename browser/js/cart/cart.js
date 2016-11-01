app.config(function ($stateProvider) {
  $stateProvider.state('cart', {
      url: '/cart',
      controller: 'CartCtrl',
      templateUrl: 'js/cart/cart.html',
      resolve: {
        cartUser: function(Session) {
          return  Session.user;
        }
      }
  });
});

