app.config(function ($stateProvider) {

    // Register our *user* state.
    $stateProvider.state('user', {
        url: '/user',
        controller: 'UserController',
        templateUrl: 'js/user/user.html'
    });

});

app.controller('UserController', function ($scope) {


});
