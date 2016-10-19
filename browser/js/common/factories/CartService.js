app.factory('CartService', function($http){

	var _cart = {}; 

	return {

		cart: _cart, 

		//no existing route for this
		findByUserId: function(userId){
			return $http.get('/api/line_items', userId)
			.then(function(result){
				angular.copy(result.data, _cart); 
				return cart; 
			})
		}, 

		//doesn't match the route (needs product and quantity)
		// create: function(productId, quantity){
		// 	return $http.post('/api/line_items')
		// 	.then(function(result){
		// 		angular.copy(result.data, _cart); 
		// 		return cart; 
		// 	})
		// }, 

		destroy: function(){

		}, 

		update: function(){

		}


	}

}) 