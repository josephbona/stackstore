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

    $scope.currentCategory = 'All Products'; 

    $scope.findAll = function(){
        $scope.currentCategory = 'All Products';
        return ProductService.findAll()
        .then(function(){
            $scope.products = products;
        })
        .then(function(){
            $state.go('products')
        })
        .catch(function(err){
            console.log(err)
        })
    }; 

    $scope.filterByCategory = function(category){
        $scope.currentCategory = category.name; 
        return ProductService.filterByCategory(category.id)
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

    $scope.filterByPrice = function(min,max){
        $scope.currentCategory = 'Products between $' + min + ' - $' + max; 
        return ProductService.filterByPrice(min,max) 
        .then(function(products){
            $scope.products = products; 
        })
        .then(function(){
            $state.go('products')
        })
        .catch(function(err){
            console.log(err)
        })
    }


});
