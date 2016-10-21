app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: "/products/:id",
        controller: 'ProductController',
        templateUrl: 'js/product/product.html',
        resolve: {
    	   product: function(ProductService, $stateParams){
            console.log($stateParams.id);
              return ProductService.findById($stateParams.id);
             }
    	   }
        });
    });

app.controller('ProductController', function ($scope, product) {
	$scope.product = product;
	console.log("ProductController"	 )


});
