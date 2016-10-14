app.factory('ProductService', function($http){

	var _product = {}; 

	return {

		product: _product, 

		findAll: function(){
			return $http.get('/api/products')
			.then(function(result){
				return result.data;
			});
		}, 

		findById: function(product){
			return $http.get('/api/products/' + product.id)
			.then(function(result){
				angular.copy(result.data, _product); 
				return _product; 
			})

		}, 

		create: function(product){
			return $http.post('/api/products', product)
			.then(function(result){
				angular.copy(result.data, _product); 
				return product; 
			}); 
		}, 

		destroy: function(product){
			$http.delete('/api/products/' + product.id)
			.then(function(){
				angular.copy({}, _product); 
			})
		}
	};
})