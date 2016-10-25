app.config(function ($stateProvider) {

    // Register our *user* state.
    $stateProvider.state('user', {
        url: '/user',
        controller: 'UserController',
        templateUrl: 'js/user/user.html',
        resolve: {
        		user: function(UserService, Session){ 
        			return UserService.findById(Session.user.id);
        		}
        }
    });

});

app.controller('UserController', function ($scope, UserService, user) {
	$scope.user = user;
});
