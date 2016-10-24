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
      //if we have a user on the session lets find their order info and set their user on the scope 
      if( Session.user){
        CartService.findByUserId(Session.user.id)
        .then(function(user){
          $scope.user = user; 
          if ($scope.user[0].orders.length > 0){
            $scope.orderId = $scope.user[0].orders[0];
          }
        });
      }

      $scope.addToCart = function(productId){
        //if we don't have a user use the loggedOutCart function
        console.log('addtocart');
        if(!Session.user){
          $scope.cart = CartService.loggedOutCart(productId);
          $state.go('cart');
        } 
        else 
        {
          //if we don't have a user
          if (!$scope.orderId){
            //when we want to add to cart we have to first create an Order for that user
            return CartService.createOrder(Session.user.id)
            .then(function(order){
              $scope.orderId = order.id;
              return order;
            })
            //once we have that order we can add the line item they wish to add
            .then(function(order){
              return CartService.addLineItem(order.userId, order.id, productId)
              .then(function(cart){
                console.log(cart);
                $scope.cart = cart;
              })
              .catch(function(err){
                console.log(err);
              });
            })
            //redirect us to the cart
            .then(function(){
              $state.go('cart');
            })
            .catch(function(err){
              console.log(err);
            });
          } 
          else 
          {
            //console.log($scope.user.id, Session.user.id, $scope.order.id);
            return CartService.addLineItem(2, 4, productId)
            .then(function(cart){
              console.log($scope.order);
              $scope.cart = cart;
            })
            .then(function(){
              $state.go('cart');
            })
            .catch(function(err){
              console.log(err);
            });
          }

        }
      };
    }
  };

});