app.config(function ($stateProvider) {

    // Register our *product* state.
    $stateProvider.state('product', {
        url: '/product',
        controller: 'ProductController',
        templateUrl: 'js/product/product.html'
    });

});

app.controller('ProductController', function ($scope) {


});
