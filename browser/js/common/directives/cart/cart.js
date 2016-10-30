app.directive('cart', function(){
	return {
		templateUrl: 'js/common/directives/cart/cart.html', 
		controller: 'CartCtrl'
	}
}); 


//Master Controller 
app.controller('CartCtrl', function ($rootScope, $scope, CartService, ProductService, Session, localStorageService, AuthService, AUTH_EVENTS) {
  
  $scope.user = Session.user;
  
  $scope.placeOrder = function(cartId){
    console.log('cart id here', cartId);
  };


  $scope.cart = CartService.cart;
  $rootScope.lineItems = $scope.lineItems 
  $scope.lineItems = $scope.cart.line_items;

  $scope.destroyLineItem =  function (lineItem, index){ 
    CartService.destroy(lineItem.lineItem, index)
    .then(function(cart){
      localStorageService.get('cart', cart )
      $scope.lineItems = $scope.cart.line_items;
    })

  }

  //if we have a logged in user get their cart
 
  if (Session.user){
    // CartService.findByUserId(Session.user.id)
    //   .then(function(cart) {
    //     if (cart){
    //       $scope.lineItems = cart.line_items;
    //     }
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //   });
  } 
  //if we don't have a logged in user we need to get their cart... and the line item info
  // so i need the Product Service
  else 
  {
      if(localStorageService.get('cart')){
        // $scope.cart = { line_items: [] };
        // $scope.lineItems = [];
        localStorageService.get('cart').forEach(function(item){ 
          ProductService.findById(item.id)
            .then(function(product){
              $scope.cart.line_items.push({"product": product, "quantity": 2 , "id": item.id})
             
              // return $scope.cart.line_items;
            })
            .then(function (line_items){
              $scope.lineItems = line_items;
              return $scope.lineItems;
            })

        });
      }
  }


  $scope.getCartTotal = function() {
    var total = 0;
    for (var i = 0; i < $scope.lineItems.length; i++) {
       total += ($scope.lineItems[i].product.price*1) * ($scope.lineItems[i].quantity);
    }
    return total;
  }

  $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
      // console.log('in cart.js loginsuccess broadcast received ')
 
      });
    
  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
    // console.log('in cartjs logOUT broadcast received ')
    localStorageService.set('cart', []);
    $scope.lineItems = [];
  });

})






