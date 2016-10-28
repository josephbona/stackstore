admin.config(function($stateProvider) {
  $stateProvider.state('categories', {
    url: '/admin/categories',
    controller: 'AdminCategoriesCtrl',
    templateUrl: '../js/admin/categories/categories.html',
    resolve: {
      categories: function(CategoryService) {
        return CategoryService.findAll();
      }
    }
  }).state('addCategory', {
    url: '/admin/categories/add',
    templateUrl: '../js/admin/categories/category.add.html',
    resolve: {
      categories: function(CategoryService) {
        return CategoryService.findAll();
      }
    },
    controller: 'AdminAddCategoryCtrl'
  }).state('editCategory', {
    url: '/admin/categories/:id/edit',
    template: 'edit',
    resolve: {
      category: function(CategoryService, $stateParams) {
        return CategoryService.findById($stateParams.id);
      }
    }
  })
});

admin.controller('AdminCategoriesCtrl', function($scope, categories) {
  $scope.categories = categories;
});

admin.controller('AdminAddCategoryCtrl', function($scope, categories, CategoryService, $state) {
  $scope.categories = categories;
  $scope.addCategory = function(category) {
    return CategoryService.create(category)
      .then(function() {
        $state.go('categories');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
})