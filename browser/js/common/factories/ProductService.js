app.factory('ProductService', function($http){

	var _product = {};
	var searchResults = {};

	return {

		findAll: function(){
			return $http.get('/api/products')
			.then(function(result){
				return result.data;
			}).catch(function(err) {
				console.log(err);
			});
		},

		filterByCategory: function(categoryId){
			return $http.get('/api/categories/' + categoryId)
			.then(function(result){
				return result.data;
			});
		},

		filterByPrice: function(min, max){
			return $http.get('/api/products/' + min + '/' + max)
			.then(function(result){
				console.log('result.data', result.data);
				return result.data;
			});
		},

		search: function(term){
			return $http.post('/api/products/search', { term: term })
				.then(function(result){
					searchResults.data = result.data;
					searchResults.term = term;
					return searchResults;
				});
		},

		getSearchResults: function(){
			return searchResults;
		},

		findById: function(id){
			return $http.get('/api/products/' + id)
			.then(function(result){
				angular.copy(result.data, _product);
				return result.data;
			});

		},

		create: function(product){
			return $http.post('/api/products', product)
			.then(function(result){
				angular.copy(result.data, _product);
				return _product;
			});
		},

		destroy: function(id){
			return $http.delete('/api/products/' + id)
			.then(function(){
				angular.copy({}, _product);
			});
		},

		update: function(id){
			return $http.put('/api/products/' + id)
			.then(function(result){
				angular.copy(result.data, _product);
				return _product;
			});
		}


	};
});