app.config(function ($stateProvider) {
  $stateProvider.state('cart', {
      url: '/cart',
      controller: 'CartCtrl',
      templateUrl: 'js/cart/cart.html',
      resolve: {
        cartUser: function(AuthService) {
          return AuthService.getLoggedInUser();
        },
        // @TODO: Cant get this Session.user (which gets current logged in user) to work unles it's in the resolve -__-
        // lineItems: function(CartService, Session) {
        //   var user = Session.user;
        //   return CartService.findByUserId(user.id);
        // }
      }
  });
});

app.controller('CartCtrl', function ($scope, cartUser, CartService, ProductService) {
  $scope.lineItems = [];

  //if we have a logged in user get their cart
  if (cartUser){
    $scope.cartUser = cartUser.id;

    CartService.findByUserId($scope.cartUser)
      .then(function(lineItems) {
        $scope.lineItems = lineItems[0];
      })
      .catch(function(err) {
        console.error(err);
      });
  } 
  //if we don't have a logged in user we need to get their cart... and the line item info
  // so i need the Product Service
  else 
  {
    CartService.cart.forEach(function(item){ 
      console.log(item);
      return ProductService.findById(item)
        .then(function(product){
          $scope.lineItems.push(product);
        });
    });
  }

  $scope.getCartTotal = function() {
    var total = 0;
    for (var i = 0; i < $scope.lineItems.length; i++) {
      total += ($scope.lineItems[i].product.price*1) * ($scope.lineItems[i].quantity);
    }
    return total;
  };

});