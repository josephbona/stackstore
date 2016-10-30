app.config(function ($stateProvider) {
  $stateProvider.state('cart', {
      url: '/cart',
      templateUrl: 'js/cart/cart.html'
      // resolve: {
      //   cartUser: function(Session) {
      //     return  Session.user;
      //   },
      // }
  });
});



     //   // Pats note: I think this is working as it should 
      //   // @TODO: Cant get this Session.user (which gets current logged in user) to work unles it's in the resolve -__-
      //   // lineItems: function(CartService, Session) {
      //   //   var user = Session.user;
      //   //   return CartService.findByUserId(user.id);
      //   // }




