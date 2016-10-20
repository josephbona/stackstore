app.config(function ($stateProvider) {
  $stateProvider.state('cart', {
      url: '/cart',
      controller: 'CartCtrl',
      templateUrl: 'js/cart/cart.html',
      resolve: {
        cartUser: function(Session) {
          return Session.user;
        },
        // @TODO: Cant get this Session.user (which gets current logged in user) to work unles it's in the resolve -__-
        // lineItems: function(CartService, Session) {
        //   var user = Session.user;
        //   return CartService.findByUserId(user.id);
        // }
      }
  });
});

app.controller('CartCtrl', function ($scope, cartUser, CartService) {
  $scope.cartUser = cartUser.id;
  CartService.findByUserId($scope.cartUser)
    .then(function(lineItems) {
      $scope.lineItems = lineItems;
    })
    .catch(function(err) {
      console.error(err);
    });
  $scope.getCartTotal = function() {
    var total = 0;
    for (var i = 0; i < $scope.lineItems.length; i++) {
      total += ($scope.lineItems[i].product.price*1) * ($scope.lineItems[i].quantity);
    }
    return total;
  }

});