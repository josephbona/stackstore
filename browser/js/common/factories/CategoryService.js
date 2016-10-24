app.factory('CategoryService', function($http){

	return {

		findAll: function(){
			return $http.get('/api/categories')
			.then(function(result){
				return result.data; 
			})
		}
	}
	
})