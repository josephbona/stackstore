app.factory('CartService', function($state, $rootScope, $http, AuthService, Session, ProductService, localStorageService, $q){

	var _cart = { line_items: [] };	
	// _cart.line_items = localStorageService.get('cart');

	//console.log('CartService.  Here is the LoggedInUser: ', LoggedInUser)


	return {

		cart: _cart,

		loggedOutCart: function(product){		
			if (product){
				_cart.line_items.push(product);
			}
			// $rootScope.$broadcast('cartChange', _cart);
			return _cart; 
		},

		getLineItems: function(userId, stateChange){
			// Logged-in user:
			if (Session.user){
				return $http.post('/api/users/' + userId + '/orders')
				.then(function(result){
					angular.copy(result.data, _cart);
					$rootScope.$broadcast('cartChange', result.data, stateChange);
					return _cart;
				})
			
			// Unlogged user:	
			} else {
		        var tempArr = [];

			    
			    // Unlogged with something in local storage:
			    if (localStorageService.get('cart').length  > 0) {
	
			    	_cart = { line_items: [] };

			    	_cart.line_items = localStorageService.get('cart')

    				$rootScope.$broadcast('cartChange', _cart);
    				var deferred = $q.defer();
			    	deferred.resolve(_cart);
			    	return deferred.promise;
			    } else {

			    	//unlogged with nothing in local storage:
			    	var deferred = $q.defer();
			    	deferred.resolve(_cart);
			    	return deferred.promise;
			    }
  			}
		},

		createOrder: function(userId){
			return $http.post('/api/orders', { userId: userId})
				.then(function(result){
					_cart = [];
					return result.data;	
				});
		},

		addLineItem: function(product){
			// Logged-in User:
			if (Session.user){
				var that = this;
				return $http.post('/api/line_items/' + Session.user.id + '/order/' + _cart.id + '/line_items', { quantity: 1, productId: product.id} )
				.then(function(result){
					return that.getLineItems(Session.user.id)
				});
			} else {

				//Logged out user:

			    	if (product){
			    		// var that = this
			    		var temp;
			    		temp = localStorageService.get('cart');
			    		temp.push({"product": product, "quantity": 1 , "id": -1});
			    		
			    		localStorageService.set('cart', temp);
	

						//clear out cart as getLIneItems should repopulate
						_cart.line_items = localStorageService.get('cart');
						var deferred = $q.defer();
						deferred.resolve(_cart.line_items);
						return deferred.promise;

				}

			}
			
		},

		destroy: function(lineItem, index){
			if (Session.user){
				return $http.delete('/api/line_items/' + lineItem.id, { lineItemId: lineItem.id } )
				.then(function(){
					_cart.line_items.splice(index,1);
					console.log('_cart.line_items', _cart.line_items)
					$rootScope.$broadcast('cartChange', _cart);
					return _cart;	
				});
			} else {
				_cart.line_items.splice(index,1);
				console.log('_cart.line_items', _cart.line_items)
 				localStorageService.set('cart', _cart.line_items )
				$rootScope.$broadcast('cartChange', _cart);
				var deferred = $q.defer();
				deferred.resolve(_cart);
				return deferred.promise;

			}	
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









