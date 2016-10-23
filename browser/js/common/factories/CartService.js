app.factory('CartService', function($http, AuthService, Session, localStorageService){

	var _cart = [];

	return {

		cart: _cart,

		loggedOutCart: function(id){
			if (localStorageService.get('cart')){
					_cart = localStorageService.get('cart');
			}
			_cart.push(id);
			return localStorageService.set('cart', _cart);
		},

		findByUserId: function(userId){
			return $http.get('/api/line_items/' + userId)
			.then(function(result){
				console.log('result', result.data);
				_cart = []; 
				_cart.push(result.data);
				return _cart; 
			});
		},

		create: function(userId, lineItem){
			return $http.post('/api/line_items/' 
				+ userId + '/' + lineItem.productId, lineItem)
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
		}


	};

});
