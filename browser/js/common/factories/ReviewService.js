angular.module('app')
	.factory('ReviewService', function($http){
		return {
			create: function(review){
				return $http.post('/api/reviews', review)
					.then(function(result){
						return result.data
					});
			}
		};
	});