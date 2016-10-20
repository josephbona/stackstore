app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function($scope, $rootScope, AuthService, AUTH_EVENTS) {

          $scope.user = null;

          $scope.isLoggedIn = function() {
            return AuthService.isAuthenticated();
          };

          $scope.logout = function() {
            AuthService.logout().then(function() {
              $state.go('home');
            });
          };

          var setUser = function() {
            AuthService.getLoggedInUser().then(function(user) {
              $scope.user = user;
            });
          };

          var removeUser = function() {
            $scope.user = null;
          };

          setUser();

          $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
          $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
          $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }
    });
});
