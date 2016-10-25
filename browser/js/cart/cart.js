app.config(function ($stateProvider) {
  $stateProvider.state('cart', {
      url: '/cart',
      controller: 'CartCtrl',
      templateUrl: 'js/cart/cart.html',
      resolve: {
        cartUser: function(Session) {
          return  Session.user;
        },

        // Pats note: I think this is working as it should 
        // @TODO: Cant get this Session.user (which gets current logged in user) to work unles it's in the resolve -__-
        // lineItems: function(CartService, Session) {
        //   var user = Session.user;
        //   return CartService.findByUserId(user.id);
        // }
      }
  });
});

app.controller('CartCtrl', function ($scope, cartUser, CartService, ProductService, Session, localStorageService) {
  
  $scope.cart = CartService.cart; 

  $scope.lineItems = [];

  //if we have a logged in user get their cart
  if (cartUser){
    $scope.cartUser = cartUser.id;

    CartService.findByUserId($scope.cartUser)
      .then(function(cart) {
        if (cart){
          $scope.lineItems = cart.line_items;
        }
      })
      .catch(function(err) {
        console.error(err);
      });
  } 
  //if we don't have a logged in user we need to get their cart... and the line item info
  // so i need the Product Service
  else 
  {
      if(localStorageService.get('cart')){
        localStorageService.get('cart').forEach(function(item){ 
          return ProductService.findById(item)
            .then(function(product){
              $scope.lineItems.push({"product": product, "quantity": 1});
            });
        });
      }
  }

  $scope.getCartTotal = function() {
    var total = 0;
    for (var i = 0; i < $scope.lineItems.length; i++) {
      total += ($scope.lineItems[i].product.price*1) * ($scope.lineItems[i].quantity);
    }
    return total;
  };
});