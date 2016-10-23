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

    // I can't figure out why line 22 doesn't work! Lines 23-45 are copied&pasted from ProductController
    // controller: 'ProductController'
    controller: function(CartService, $scope, ProductService, Session, $state){
      $scope.addToCart = function(productId){
        //if we don't have a user use the loggedOutCart function
        if(!Session.user){
          $scope.cart = CartService.loggedOutCart(productId);
          $state.go('cart');
        } 
        else 
        {
        //if we have a user create a line item
          return CartService.create(Session.user.id, productId)
          .then(function(cart){
            $scope.cart = cart;
          })
          .then(function(){
            $state.go('cart')
          })
          .catch(function(err){
            console.log(err);
          });
        }
      };
    }
  };

});