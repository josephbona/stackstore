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

  $scope.ratingStates = [
    //{stateOn: 'fa-star', stateOff: 'fa-star-o'}
    ]; 

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
        //if we have a user create a line item
        return CartService.addLineItem(product, $scope.quantity)
        .then(function(cart){
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
  });
