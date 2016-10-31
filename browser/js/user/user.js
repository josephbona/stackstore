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

    $scope.save = function(){
        return UserService.update($scope.user)
            .then(function(success){
                $scope.saved = true;
            })
            .catch(function(err){
                $scope.error = true;
                console.log(err);
            });
    }; 

});
