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



});

    // controller: function(CartService, $scope, ProductService, Session, $state){
    //   $scope.addToCart = function(productId){
    //     //if we don't have a user use the loggedOutCart function
    //     if(!Session.user){
    //       $scope.cart = CartService.loggedOutCart(productId);
    //       $state.go('cart');
    //     } 
    //     else 
    //     {
    //     //if we have a user create a line item
    //       return CartService.create(Session.user.id, productId)
    //       .then(function(cart){
    //         $scope.cart = cart;
    //       })
    //       .then(function(){
    //         $state.go('cart')
    //       })
    //       .catch(function(err){
    //         console.log(err);
    //       });
    //     }
    //   };
    // }
