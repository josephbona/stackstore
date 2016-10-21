app.factory('ProductService', function($http){

	var _product = {};

	return {

		//product: _product,

		findAll: function(){
			return $http.get('/api/products')
			.then(function(result){
				return result.data;
			}).catch(function(err) {
				console.log(err);
			});
		},

		findById: function(id){
			console.log('using findById Factory')
			return $http.get('/api/products/' + id)
			.then(function(result){
				angular.copy(result.data, _product);
				return result.data;
			})

		},

		create: function(product){
			return $http.post('/api/products', product)
			.then(function(result){
				angular.copy(result.data, _product);
				return _product;
			});
		},

		destroy: function(product){
			return $http.delete('/api/products/' + product.id)
			.then(function(){
				angular.copy({}, _product);
			})
		},

		update: function(product){
			return $http.put('/api/products/' + product.id)
			.then(function(result){
				angular.copy(result.data, _product);
				return _product;
			})
		}


	};
})