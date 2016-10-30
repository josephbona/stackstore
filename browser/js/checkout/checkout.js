app.config(function ($stateProvider) {

    $stateProvider
    	.state('checkout', {
	        url: '/checkout',
	        controller: 'CartCtrl',
	        templateUrl: 'js/checkout/checkout.html' 
	    });
});





// app.controller('CheckoutCtrl', function ($scope, user, UserService, Session, CartService) {

// 	// $scope.user = AuthService.getLoggedInUser();
// 	// console.log($scope.user);
// 	$scope.user = user;
// 	console.log($scope.user);

// 	// $scope.cart = CartService.cart.line_items; 
// 	// console.log(CartService.cart);
// 	// console.log(CartService.cart.line_items[0])

// });
