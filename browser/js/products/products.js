app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductsCtrl',
        templateUrl: '/js/products/products.html',
        resolve: {
    	   products: function(ProductService){
    		  return ProductService.findAll();
            }, 

            categories: function(CategoryService){
                return CategoryService.findAll();
            }
    	}
    });
});

app.controller('ProductsCtrl', function ($scope, products, categories, $state, ProductService) {

    $scope.products = products;

    $scope.categories = categories; 

    $scope.filterByCategory = function(categoryId){
        return ProductService.filterByCategory(categoryId)
        .then(function(products){
            $scope.products = products; 
        })
        .then(function(){
            $state.go('products');
        })
        .catch(function(err){
            console.log(err);
        });
    };
});
