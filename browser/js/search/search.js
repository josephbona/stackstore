app.config(function ($stateProvider) {
    $stateProvider.state('searchResults', {
        url: '/search-results',
        templateUrl: 'js/search/search-results.html',
        controller: 'SearchCtrl',
        resolve: {
        	products: function(ProductService){
        		return ProductService.getSearchResults();
        	}
        }
    });
});

app.controller('SearchCtrl', function(products, $scope){
	$scope.products = products.data; 
	$scope.searchTerm = products.term;
});