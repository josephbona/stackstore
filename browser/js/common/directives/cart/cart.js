app.directive('cart', function(){
	return {
		templateUrl: 'js/common/directives/cart/cart.html', 
		controller: 'CartCtrl'
	}
}); 


app.controller('CartCtrl', function ($rootScope, $scope, CartService, ProductService, Session, localStorageService, AuthService, AUTH_EVENTS, $timeout, $state, UserService) {
  
  $scope.user = Session.user;
  
  //not complete
  $scope.updateShippingAddress = function(){
    console.log('update shipping');
    UserService.updateShippingAddress(address)
      .then(function(user){
        $scope.user.shipping_address = user.shipping_address;
      })
  };


  // not complete
  $scope.updateBillingAddress = function(){
    console.log('update billing')
  }; 

  $scope.updateOrderStatus = function(cartId){
    console.log('cart id here', cartId);
    CartService.updateOrderStatus(cartId)
      .then(function(order){
          $state.go('user');
      })
  };


  $scope.cart = CartService.cart;
  $rootScope.lineItems = $scope.lineItems 
  $scope.lineItems = $scope.cart.line_items;

  $scope.getCartTotal = function() {
    var total = 0;
    for (var i = 0; i < $scope.lineItems.length; i++) {
       total += ($scope.lineItems[i].product.price*1) * ($scope.lineItems[i].quantity);
    }
    return total;
  };

  $scope.destroyLineItem =  function (lineItem, index){ 

    console.log('lineItem.lineItem = ', lineItem) 
    CartService.destroy(lineItem.lineItem, index)
    .then(function(cart){
      console.log('cart = ', cart)
      localStorageService.get('cart', cart )
      $scope.lineItems = cart.line_items;
    })

  };



// console.log('loggedInUser = ', loggedInUser)
  if (Session.user){
    //Initialize localStorageService
    localStorageService.set('cart', {});
    console.log('cart.js: return stuff')
    CartService.getLineItems(Session.user.id)
    .then(function(cart){
      console.log('cart = ', cart)
      $scope.lineItems = cart.line_items;
    })
  } else {
    console.log('cart.js: return Different stuff')
     CartService.getLineItems()
    .then(function(cart){
      console.log('cart.js:  Cart =', cart)
      $scope.lineItems = cart.line_items;
    })
  }

  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
    console.log('in cartjs logOUT broadcast received ')
    localStorageService.set('cart', []);
    $scope.cart.line_items = [];
    $scope.lineItems = [];
    console.log('$scope.lineItems = ', $scope.lineItems)
    console.log('$scope.cart.line_items', $scope.cart.line_items)
    console.log('localStorageService.get = ', localStorageService.get)
  });
});
  

