app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
          products: function(ProductService){
            return ProductService.findAll();
          },
          categories: function(CategoryService){
            return CategoryService.findAll();
          }
        },
        controller: function($scope, $rootScope, AuthService, AUTH_EVENTS, products) {

          $scope.products = products;

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

app.controller('CarouselCtrl', function ($scope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [
    {
      id: 0,
      image: 'http://localhost:1337/images/slide1.jpg',
    },
    {
      id: 1,
      image: 'http://localhost:1337/images/slide2.jpg',
    }
  ];
});