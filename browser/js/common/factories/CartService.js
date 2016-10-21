app.factory('CartService', function($http, AuthService){

	var _cart = [];

	return {

		cart: _cart,

		findByUserId: function(userId){
			return $http.get('/api/line_items/' + userId)
			.then(function(result){
				_cart = []; 
				_cart.push(result.data); 
			})
		},

		create: function(userId, lineItem){
			return $http.post('/api/line_items/' 
				+ userId + '/' + lineItem.productId, lineItem)
			.then(function(result){
				_cart.push(result.data); 
			})
		},

		destroy: function(lineItem){
			return $http.destroy('/api/line_items/' + lineItem.id)
			.then(function(){
				var idx = _cart.indexOf(lineItem);
				_cart.splice(idx,1);
			})
		},

		update: function(lineItem){
			return $http.put('/api/line_items/' + lineItem.id)
			.then(function(result){
				var idx = _cart.indexOf(lineItem);
				_cart.splice(idx, 1, result.data);
			})
		}


	}

})
