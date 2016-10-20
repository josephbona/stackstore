app.factory('CartService', function($http){

	var _cart = []; 

	return {

		cart: _cart, 

		findByUserId: function(user){
			return $http.get('/api/line_items/' + user.id)
			.then(function(result){
				angular.copy(result.data, _cart); 
				return cart; 
			})
		}, 

		create: function(lineItem){
			return $http.post('/api/line_items/' + lineItem.userId + '/' + lineItem.productId, lineItem)
			.then(function(result){
				_cart.push(result.data);  
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

