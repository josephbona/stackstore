admin.config(function ($stateProvider) {
    $stateProvider.state('users', {
        url: '/admin/users',
        controller: 'AdminUsersCtrl',
        templateUrl: '../js/admin/users/users.html',
        resolve: {
          users: function(UserService){
            return UserService.findAll();
          }
        }
    });
});

admin.controller('AdminUsersCtrl', function ($scope, users) {
  $scope.users = users;
});
