app.config(function ($stateProvider) {
  $stateProvider.state('product', {
    url: "/products/:id",
    controller: 'ProductController',
    templateUrl: 'js/product/product.html',
    resolve: {
      product: function(ProductService, $stateParams){
        return ProductService.findById($stateParams.id);
      },
      user: function(AuthService){
        return AuthService.getLoggedInUser();
      },
      avgRating: function(ReviewService, $stateParams){
        return ReviewService.findAverage($stateParams.id);
      }
    }
  });
});

app.controller('ProductController', function (user, avgRating, $scope, product, CartService, ProductService, Session, $state, ReviewService) {
	$scope.product = product;
  $scope.showReviewForm = false; 
  $scope.user = user;
  $scope.max = 5;
  $scope.submitted = false; 

    if (avgRating === 0){
      $scope.notEnoughReviews = true;
    } else {
      $scope.avgRating = avgRating; 
    }

    $scope.getNumber = function(n){
      return new Array(n);
    };


    $scope.addReview = function(product){
      return ReviewService.create($scope.review, $scope.rate, product.id, $scope.user.id)
        .then(function(review){
          $scope.submitted = true; 
          $scope.product.reviews.push(review);
          $scope.notEnoughReviews = false; 
        })
        .catch(function(err){
          console.log(err);
        });
    };

    $scope.addToCart = function(product){
      //if we don't have a user use the loggedOutCart function
      if(!Session.user){
        $scope.cart = CartService.loggedOutCart(product);
        $state.go('cart');
      }
      else
      {
        if (!$scope.quantity){
          $scope.quantity = 1;
        }
      //if we have a user create a line item
      return CartService.addLineItem(product, $scope.quantity)
        .then(function(lineItems){
          $scope.cart = {line_items: []};
          $scope.cart.line_items = lineItems
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

