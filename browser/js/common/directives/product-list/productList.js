app.directive('productList', function() {
  return {
    restrict: 'E',
    scope: {
      products: '='
    },
    templateUrl: 'js/common/directives/product-list/product-list.html',
    controller: function(){
    }
  };
});

app.directive('productArchiveItem', function() {
  return {
    restrict: 'E',
    scope: {
      product: '='
    },
    templateUrl: 'js/common/directives/product-list/product-archive-item.html',
    controller: function(CartService, $scope, ProductService, Session, $state){

      $scope.addToCart = function(productId){
        //if we don't have a user use the loggedOutCart function
        if(!Session.user){
          $scope.cart = CartService.loggedOutCart(productId);
          $state.go('cart');
        } 
        else 
        {
          return CartService.addLineItem(Session.user.id, order.id, productId)
            .then(function(cart){
              console.log(cart);
              $scope.cart = cart;
            })
            .then(function(){
              $state.go('cart');
            })
            .catch(function(err){
              console.log(err);
            });
          } 
      };
    }
  };

});