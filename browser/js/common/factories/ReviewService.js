app.factory('ReviewService', function($http){

	var findAvgRating = function(reviews){
		var total = 0;

		reviews.forEach(function(review){
			total+= review.rating;
		});

		return Math.round(total / reviews.length).toFixed(1);
	};

	var calculateStars = function(avgRating){
		return Math.floor(avgRating);
	};

		return {
			create: function(review, rating, productId, userId){
				return $http.post('/api/reviews', { review: review, rating: rating, productId: productId, userId: userId })
					.then(function(result){
						return result.data;
					});
			},

			findAverage: function(productId){
				return $http.get('/api/reviews/' + productId)
					.then(function(result){
						if (result.data.length > 0){
							return calculateStars( findAvgRating(result.data) );
						}
						return 0;
					});
			}
		};
	});