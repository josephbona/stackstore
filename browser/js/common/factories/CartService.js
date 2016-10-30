app.factory('CartService', function($http, AuthService, Session, localStorageService){

	var _cart = [];

	return {

		cart: _cart,

		loggedOutCart: function(id){
			if (localStorageService.get('cart')){
					_cart = localStorageService.get('cart');
			}
			if (id){
				_cart.push(id);
			}
			return localStorageService.set('cart', _cart);
		},

		findByUserId: function(userId){
			return $http.post('/api/users/' + userId + '/orders')
				.then(function(result){
					angular.copy(result.data, _cart);
					return _cart;
				});
		},

		createOrder: function(userId){
			return $http.post('/api/orders', { userId: userId})
				.then(function(result){
					_cart = [];
					return result.data;	
				});
		},

		addLineItem: function(product){
			return $http.post('/api/line_items/' + Session.user.id + '/order/' + _cart.id + '/line_items', { quantity: 1, productId: product.id} )
				.then(function(result){
					_cart.push(result.data);
					return _cart;
				});
		},

		destroy: function(lineItem){
			return $http.destroy('/api/line_items/' + lineItem.id)
			.then(function(){
				var idx = _cart.indexOf(lineItem);
				_cart.splice(idx,1);
			});
		},

		update: function(lineItem){
			return $http.put('/api/line_items/' + lineItem.id)
			.then(function(result){
				var idx = _cart.indexOf(lineItem);
				_cart.splice(idx, 1, result.data);
				return _cart;
			});
		}, 

		


	};

})
.run(function(CartService, $rootScope, AUTH_EVENTS, Session){
	$rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
		CartService.findByUserId(Session.user.id);
	});
});







