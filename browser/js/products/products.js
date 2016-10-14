app.config(function ($stateProvider) {

    // Register our *products* state.
    $stateProvider.state('products', {
        resolve: {
        	products: function(ProductService){
        		return ProductService.findAll();
        	}, 
        }, 
        url: '/products',
        controller: 'ProductsController',
        templateUrl: 'js/products/products.html'
    });

});

app.controller('ProductsController', function ($scope) {


});
