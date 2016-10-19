app.directive('header', function ($rootScope, AuthService, AUTH_EVENTS, $state, Session) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/header/header.html',
        controller: function() {
          $rootScope.currentUser = Session.user;
        }
    };

});
