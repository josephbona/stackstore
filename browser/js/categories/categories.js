// app.config(function ($stateProvider) {
//     $stateProvider.state('categories', {
//         url: '/categories',
//         controller: 'CategoriesCtrl',
//         templateUrl: 'js/categories/categories.html',
//         resolve: {
//     	   categories: function(CategoryService){
//                 return CategoryService.findAll();
//             }
//     	   }
//         });
//     });


// app.controller('CategoriesCtrl', function ($scope, categories, $state, ProductService) {

//     $scope.categories = categories; 

//     $scope.filterByCategory = function(categoryId){
//         $state.go('products/', {categoryId: categoryId})
//         .then(function($stateParams){
//             console.log($stateParams.categoryId)
//             return ProductService.filterByCategory(categoryId);
//         })
//         .then(function(products){
//             $scope.products = products; 
//         })
//         .then(function(){
//             $state.go('products');
//         })
//         .catch(function(err){
//             console.log(err);
//         });
//     };
// });