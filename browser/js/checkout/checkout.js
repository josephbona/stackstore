app.config(function ($stateProvider) {

    $stateProvider
    	.state('checkout', {
	        url: '/checkout',
	        controller: 'CartCtrl',
	        templateUrl: 'js/checkout/checkout.html' 
	    });
});
