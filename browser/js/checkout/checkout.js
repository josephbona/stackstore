app.config(function ($stateProvider) {

    $stateProvider
    	.state('checkout', {
	        url: '/checkout',
	        controller: 'CartCtrl',
	        templateUrl: 'js/checkout/checkout.html' 
	    });
});

// For non-logged in users with a cart: 
// Click the checkout button in the cart. 
// If not logged in, go the the register state. 
// After new account info is submitted, 
//   if there are items in the local storage cart, save them in the cart factory and on the db. Then go to the checkout state. 
