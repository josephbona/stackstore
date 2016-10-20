app.factory('CartService', function($http, AuthService){

	var _cart = {};

	return {

		cart: _cart,

		//no existing route for this
		findByUserId: function(userId){
			return $http.get('/api/line_items/' + userId)
			.then(function(result){
				return result.data;
			})
		},

		create: function(productId, quantity){
			return $http.post('/api/line_items/' )
			.then(function(result){
				angular.copy(result.data, _cart);
				return cart;
			})
		},

		destroy: function(lineItem){
			return $http.destroy('/api/line_items/' + lineItem.id)
			.then(function(){
				var idx = _cart.indexOf(lineItem);
				_cart.splice(idx,1);
				return _cart;
			})
		},

		update: function(lineItem){
			return $http.put('/api/line_items/' + lineItem.id, lineItem)
			.then(function(result){
				var idx = _cart.indexOf(lineItem);
				_cart.splice(idx, 1, result.data);
				return _cart;
			})
		}


	}

})
