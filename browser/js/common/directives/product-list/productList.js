app.directive('productList', function() {
  return {
    restrict: 'E',
    scope: {
      products: '='
    },
    templateUrl: 'js/common/directives/product-list/product-list.html'
  }
});

app.directive('productArchiveItem', function() {
  return {
    restrict: 'E',
    scope: {
      product: '='
    },
    templateUrl: 'js/common/directives/product-list/product-archive-item.html',
    controller: function(AuthService, CartService, $scope, ProductService){
      // General thought process here:
      // get our logged in user and set it on scope
      AuthService.getLoggedInUser()
        .then(function(user){
          $scope.user = user;
        });

      //when we add to cart...
      $scope.addToCart = function(productId){
        //if we don't have a user use the loggedOutCart function
        if(!$scope.user){
          $scope.cart = CartService.loggedOutCart(productId);
          console.log($scope.cart);
        } 
        else 
        {
        //if we have a user create a line item
          return CartService.create($scope.user.id, productId)
          .then(function(cart){
            $scope.cart = cart;
          })
          .catch(function(err){
            console.log(err);
          });
        }
      };
    }
  };

});