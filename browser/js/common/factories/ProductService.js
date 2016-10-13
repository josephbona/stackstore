app.factory('ProductService', function($http){
	return {
		findAll: function(){
			return $http.get('/api/products')
			.then(function(result){
				return result.data;
			});
		}
	};
})