app.config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/register/register.html',
        controller: 'RegisterCtrl'
    });

});

app.controller('RegisterCtrl', function ($scope, $state, UserService) {

    $scope.newUser = {};
    $scope.error = null;

    $scope.registerUser = function (newUser) {

        $scope.error = null;

        UserService.create(newUser)
        .then(function() {
            // @TODO: send a message to display on login screen
            return $state.go('login', {message: 'Login with the account you created.'});
        })
        .catch(function (err) {
            $scope.error = err;
        });

    };

});
