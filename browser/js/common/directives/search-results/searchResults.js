app.directive('searchResults', function(){
	return {
		restrict: 'E',
		scope: {
			products: '='
		},
		templateUrl: 'js/common/directives/search-results/search-results.html',
	};		
});