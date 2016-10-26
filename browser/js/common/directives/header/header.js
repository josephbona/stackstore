app.directive('header', function($rootScope, AuthService, AUTH_EVENTS, $state, CartService, localStorageService ) {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/common/directives/header/header.html',
    link: function(scope) {

      scope.user = null;

      if (!scope.user){
        console.log(CartService.cart);
      }

      scope.isLoggedIn = function() {
        return AuthService.isAuthenticated();
      };

      scope.logout = function() {
        AuthService.logout().then(function() {
          $state.go('home');
        });
      };

      var setUser = function() {
        AuthService.getLoggedInUser().then(function(user) {
          scope.user = user;
          if (scope.user){
            CartService.findByUserId(scope.user.id)
            .then(function(cart) {
              if (cart){
                scope.lineItems = cart.line_items;
              }
            })
            .catch(function(err) {
              console.error(err);
            });
          }
        })
      };

      var removeUser = function() {
        scope.user = null;
      };

      setUser();

      $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
      $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
      $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
    }
  };

});
