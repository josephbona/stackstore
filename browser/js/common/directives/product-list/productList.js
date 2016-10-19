app.directive('productList', function() {
  return {
    restrict: 'E',
    scope: {
      products: '='
    },
    templateUrl: 'js/common/directives/product-list/product-list.html'
  }
});

app.directive('productArchiveItem', function() {
  return {
    restrict: 'E',
    scope: {
      product: '='
    },
    templateUrl: 'js/common/directives/product-list/product-archive-item.html'
  }
});