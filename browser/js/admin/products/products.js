admin.config(function($stateProvider) {
  $stateProvider.state('products', {
    url: '/admin/products',
    controller: 'AdminProductsCtrl',
    templateUrl: '../js/admin/products/products.html',
    resolve: {
      products: function(ProductService) {
        return ProductService.findAll();
      }
    }
  }).state('addProduct', {
    url: '/admin/products/add',
    templateUrl: '../js/admin/products/product.add.html',
    resolve: {
      categories: function(CategoryService) {
        return CategoryService.findAll();
      },
      creds: function(UploadService) {
        return UploadService.getCreds();
      }
    },
    controller: 'AdminAddProductCtrl'
  }).state('editProduct', {
    url: '/admin/product/:id/edit',
    template: 'edit',
    resolve: {
      product: function(ProductService, $stateParams) {
        return ProductService.findById($stateParams.id);
      }
    }
  })
});

admin.controller('AdminProductsCtrl', function($scope, products) {
  $scope.products = products;
});

admin.controller('AdminAddProductCtrl', function($scope, categories, creds, ProductService, $state, $q) {
  $scope.categories = categories;
  $scope.sizeLimit = 2117152; // 2MB in Bytes
  $scope.creds = creds;

  $scope.upload = function() {
    AWS.config.update({
      accessKeyId: $scope.creds.access_key,
      secretAccessKey: $scope.creds.secret_key
    });
    AWS.config.region = 'us-east-1';
    var bucket = new AWS.S3({
      params: {
        Bucket: $scope.creds.bucket
      }
    });

    if ($scope.file) {
      // Perform File Size Check First
      var fileSize = Math.round(parseInt($scope.file.size));
      if (fileSize > $scope.sizeLimit) {
        console.error('Sorry, your attachment is too big.', 'File Too Large');
        return false;
      }
      // Prepend Unique String To Prevent Overwrites
      var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;
      $scope.new.image = 'https://s3.amazonaws.com/' + $scope.creds.bucket + '/' + uniqueFileName;
      var params = {
        Key: uniqueFileName,
        ContentType: $scope.file.type,
        Body: $scope.file,
        ServerSideEncryption: 'AES256'
      };

      bucket.putObject(params, function(err, data) {
        if (err) {
          console.error(err.message, err.code);
          return false;
        } else {
          // Upload Successfully Finished
          console.log('File Uploaded Successfully', 'Done');
        }
      });
    } else {
      // No File Selected
      console.error('Please select a file to upload');
    }
  }

  $scope.uniqueString = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  $scope.addProduct = function(product) {
    $q.resolve($scope.upload())
      .then(function() {
        console.log(product);
        return ProductService.create(product);
      })
      .then(function() {
        $state.go('products');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
})