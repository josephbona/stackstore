app.config(function ($stateProvider) {
  $stateProvider.state('cart', {
      url: '/cart',
      // controller: 'CartCtrl',
      templateUrl: 'js/cart/cart.html'
      // resolve: {
      //   cartUser: function(Session) {
      //     return  Session.user;
      //   },

      // }
  });
});

















// app.controller('CartCtrl', function ($scope, cartUser, CartService, ProductService, Session, localStorageService) {
//   console.log('cartuser', cartUser);
//   $scope.cart = CartService.cart; 

//   $scope.lineItems = [];

//   //if we have a logged in user get their cart
//   if (Session.user){

//     CartService.findByUserId(Session.user.id)
//       .then(function(cart) {
//         if (cart){
//           $scope.lineItems = cart.line_items;
//         }
//       })
//       .catch(function(err) {
//         console.error(err);
//       });
//   } 
//   //if we don't have a logged in user we need to get their cart... and the line item info
//   // so i need the Product Service
//   else 
//   {
//       console.log(Session.user);
//       console.log('F@#$@#$');
//       if(localStorageService.get('cart')){
//         localStorageService.get('cart').forEach(function(item){ 
//           return ProductService.findById(item.id)
//             .then(function(product){
//               $scope.lineItems.push({"product": product, "quantity": 1});
//             });
//         });
//       }
//   }

//   $scope.getCartTotal = function() {
//     var total = 0;
//     for (var i = 0; i < $scope.lineItems.length; i++) {
//       total += ($scope.lineItems[i].product.price*1) * ($scope.lineItems[i].quantity);
//     }
//     return total;
//   };
// });