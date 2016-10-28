// admin.config(function ($stateProvider) {
//     $stateProvider.state('products', {
//         url: '/admin/products',
//         controller: 'AdminProductsCtrl',
//         templateUrl: '../js/admin/products/products.html',
//         resolve: {
//     	   products: function(ProductService) {
//     		  return ProductService.findAll();
//             }
//     	}
//     }).state('addProduct', {
//         url: '/admin/products/add',
//         templateUrl: '../js/admin/products/product.add.html',
//         resolve: {
//             categories: function(CategoryService) {
//                 return CategoryService.findAll();
//             }
//         },
//         link: function(scope) {
//             scope.categories = categories;
//         }
//     }).state('editProduct', {
//         url: '/admin/product/:id/edit',
//         template: 'edit',
//         resolve: {
//             product: function(ProductService, $stateParams) {
//                 return ProductService.findById($stateParams.id);
//             }
//         }
//     })
// });

// admin.controller('AdminProductsCtrl', function ($scope, products) {
//     $scope.products = products;
// });
