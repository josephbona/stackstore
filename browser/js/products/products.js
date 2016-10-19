app.config(function ($stateProvider) {
    // Register our *products* state.
    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductsCtrl',
        templateUrl: '/js/products/products.html',
        resolve: {
    	   products: function(ProductService){
    		  return ProductService.findAll()
            }
    	}
    })
});


app.controller('ProductsCtrl', function ($scope, products) {

    $scope.products = products;

});
