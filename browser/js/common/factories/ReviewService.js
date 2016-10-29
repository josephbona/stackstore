app.factory('ReviewService', function($http){
		return {
			create: function(review, rating, productId, userId){
				console.log(productId, userId);
				return $http.post('/api/reviews', { review: review, rating: rating, productId: productId, userId: userId })
					.then(function(result){
						return result.data;
					});
			}
		};
	});