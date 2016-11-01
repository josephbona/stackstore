app.directive('header', function($rootScope, AuthService, AUTH_EVENTS, $state, CartService, localStorageService, ProductService ) {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/common/directives/header/header.html',
    link: function(scope) {

      scope.user = null;

      scope.search = function(){
        return ProductService.search(scope.searchTerm)
          .then(function(results){
            console.log('results', results);
            $state.go('searchResults', { results: results });
          })
          .catch(function(err){
            console.log(err);
          });
      };

      scope.isLoggedIn = function() {
        return AuthService.isAuthenticated();
      };

      scope.logout = function() {
        AuthService.logout().then(function() {
          localStorageService.set('cart.line_items', [] );
          scope.lineItems = [];
          $state.go('home');
        });
      };


      $rootScope.$on('cartChange', function (event, Cart, StateChange){
        scope.lineItems =  Cart.line_items;
        // if (!StateChange){
        //   $state.go('cart');
        // }
      }); 

      var setUser = function() {
        AuthService.getLoggedInUser().then(function(user) {
          scope.user = user;
          if (scope.user){
            CartService.getLineItems(scope.user.id, false)
            .then(function(cart) {
              if (cart){
                $state.go('home');
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
