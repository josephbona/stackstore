app.config(function ($stateProvider) {

    // Register our *checkout* state.
    $stateProvider.state('checkout', {
        url: '/checkout',
        // controller: 'CartCtrl',
        templateUrl: 'js/checkout/checkout.html'   

    });

});





// app.controller('CheckoutController', function ($scope, UserService, Session, CartService) {

// 	$scope.user = Session.user;
// 	$scope.cart = CartService.cart.line_items; 
// 	console.log(CartService.cart);
// 	console.log(CartService.cart.line_items[0])

// });
