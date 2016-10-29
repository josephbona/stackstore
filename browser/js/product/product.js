app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: "/products/:id",
        controller: 'ProductController',
        templateUrl: 'js/product/product.html',
        resolve: {
    	   product: function(ProductService, $stateParams){
            console.log($stateParams.id);
              return ProductService.findById($stateParams.id);
             },
          user: function(AuthService){
            return AuthService.getLoggedInUser();
          }
    	   }
        });
    });

app.controller('ProductController', function (user, $scope, product, CartService, ProductService, Session, $state, ReviewService) {
	$scope.product = product;
  $scope.showReviewForm = false; 
  $scope.user = user;
  $scope.max = 5;

  $scope.ratingStates = [
    //{stateOn: 'fa-star', stateOff: 'fa-star-o'}
  ]; 

  $scope.getNumber = function(n){
    return new Array(n);
  };

  $scope.addReview = function(product){
    console.log($scope.review);
    return ReviewService.create($scope.review, $scope.rate, product.id, $scope.user.id);
  };

    $scope.addToCart = function(productId){
        //if we don't have a user use the loggedOutCart function
        if(!Session.user){
          $scope.cart = CartService.loggedOutCart(productId);
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
