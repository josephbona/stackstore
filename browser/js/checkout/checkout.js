app.config(function ($stateProvider) {

    // Register our *checkout* state.
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutController',
        templateUrl: 'js/checkout/checkout.html'   

    });

});

app.controller('CheckoutController', function ($scope, UserService, Session, CartService) {

	console.log('session', Session);
	$scope.user = Session.user
	$scope.cart = CartService.cart; 

});
