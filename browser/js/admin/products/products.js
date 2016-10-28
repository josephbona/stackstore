admin.config(function($stateProvider) {
  $stateProvider.state('products', {
    url: '/admin/products',
    controller: 'AdminProductsCtrl',
    templateUrl: '../js/admin/products/products.html',
    resolve: {
      products: function(ProductService) {
        return ProductService.findAll();
      }
    }
  }).state('addProduct', {
    url: '/admin/products/add',
    templateUrl: '../js/admin/products/product.add.html',
    resolve: {
      categories: function(CategoryService) {
        return CategoryService.findAll();
      }
    },
    controller: 'AdminAddProductCtrl'
  }).state('editProduct', {
    url: '/admin/product/:id/edit',
    template: 'edit',
    resolve: {
      product: function(ProductService, $stateParams) {
        return ProductService.findById($stateParams.id);
      }
    }
  })
});

admin.controller('AdminProductsCtrl', function($scope, products) {
  $scope.products = products;
});

admin.controller('AdminAddProductCtrl', function($scope, categories, ProductService, $state) {
  $scope.categories = categories;
  $scope.addProduct = function(product) {
    return ProductService.create(product)
      .then(function() {
        $state.go('products');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
})