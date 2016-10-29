app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: "/products/:id",
        controller: 'ProductController',
        templateUrl: 'js/product/product.html',
        resolve: {
    	   product: function(ProductService, $stateParams){
            console.log($stateParams.id);
              return ProductService.findById($stateParams.id);
             }
    	   }
        });
    });

app.controller('ProductController', function ($scope, product, CartService, ProductService, Session, $state) {
	$scope.product = product;

    $scope.addToCart = function(product){
        //if we don't have a user use the loggedOutCart function
        if(!Session.user){
          console.log('product.js addTocart productId = ', product)
          $scope.cart = CartService.loggedOutCart(product);
          $state.go('cart');
        }
        else
        {
        //if we have a user create a line item
          return CartService.addLineItem(product)
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



});
