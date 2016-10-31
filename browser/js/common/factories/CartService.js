app.factory('CartService', function($state, $rootScope, $http, AuthService, Session, localStorageService){

	var _cart = { line_items: [] };	
	// _cart.line_items = localStorageService.get('cart');


	return {

		cart: _cart,

		loggedOutCart: function(product){		
			if (product){
				_cart.line_items.push(product);
			}
			// $rootScope.$broadcast('cartChange', _cart);
			return _cart; 
		},

		findByUserId: function(userId, stateChange){
			return $http.post('/api/users/' + userId + '/orders')
				.then(function(result){
					angular.copy(result.data, _cart);
					$rootScope.$broadcast('cartChange', result.data, stateChange);
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

		addLineItem: function(product, quantity){
			var that = this;
			return $http.post('/api/line_items/' + Session.user.id + '/order/' + _cart.id + '/line_items', { quantity: quantity, productId: product.id} )
				.then(function(result){
					return that.findByUserId(Session.user.id)
				});
		},

		destroy: function(lineItem, index){
			return $http.delete('/api/line_items/' + lineItem.id, { lineItemId: lineItem.id } )
			.then(function(){
				 _cart.line_items.splice(index,1);
				 $rootScope.$broadcast('cartChange', _cart);
				return _cart;	
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

		updateOrderStatus: function(orderId){
			return $http.put('/api/orders/' + orderId)
			.then(function(result){
				angular.copy(result.data, _cart); 
				return _cart; 
			});
		}


	};

})









