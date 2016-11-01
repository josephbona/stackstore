admin.controller('ProductsTableCtrl', ProductsTableCtrl);
admin.controller('OrdersTableCtrl', OrdersTableCtrl);
admin.controller('CategoriesTableCtrl', CategoriesTableCtrl);
admin.controller('UsersTableCtrl', UsersTableCtrl);

function ProductsTableCtrl(DTOptionsBuilder, DTColumnBuilder, ProductService, $state) {
  var vm = this;
  vm.dtOptions = DTOptionsBuilder
    .fromFnPromise(function() {
      return ProductService.findAll();
    })
    .withPaginationType('simple_numbers')
    .withBootstrap();

  vm.dtColumns = [
    DTColumnBuilder.newColumn('id').withTitle('ID'),
    DTColumnBuilder.newColumn('name').withTitle('Name'),
    DTColumnBuilder.newColumn('price').withTitle('Price'),
    DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable()
    .renderWith(function(data, type, full, meta) {
      return '<button class="btn btn-default btn-xs btn-block icon-before" ng-click="edit(' + data.id + ')"><i class="fa fa-pencil"></i>Edit</button>';
    })
  ];
}

function CategoriesTableCtrl(DTOptionsBuilder, DTColumnBuilder, CategoryService, $state) {
  var vm = this;
  vm.dtOptions = DTOptionsBuilder
    .fromFnPromise(function() {
      return CategoryService.findAll();
    })
    .withPaginationType('simple_numbers')
    .withBootstrap();

  vm.dtColumns = [
    DTColumnBuilder.newColumn('id').withTitle('ID'),
    DTColumnBuilder.newColumn('name').withTitle('Name'),
    DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable()
    .renderWith(function(data, type, full, meta) {
      return '<button class="btn btn-default btn-xs btn-block icon-before" ng-click="edit(' + data.id + ')"><i class="fa fa-pencil"></i>Edit</button>';
    })
  ];
}

function OrdersTableCtrl(DTOptionsBuilder, DTColumnBuilder, OrderService, DTColumnDefBuilder, $compile, $scope) {
  var vm = this;
  vm.dtOptions = DTOptionsBuilder
    .fromFnPromise(function() {
      return OrderService.findAll();
    })
    .withOption('order', [0, 'desc'])
    .withOption('createdRow', function(row) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    })
    .withPaginationType('simple_numbers')
    .withBootstrap();

  function render(data) {
    if (data.status === 'cart') {
      return '';
    } else if (data.status === 'pending') {
      return '<button class="btn btn-success btn-xs btn-block icon-before" ng-click="completeOrder(' + data.id + ')"><i class="fa fa-truck"></i>Complete</button>';
    } else {
      return '<button class="btn btn-default btn-xs btn-block icon-before"><i class="fa fa-check"></i>Completed</button>';
    }
  }

  vm.dtColumns = [
    DTColumnBuilder.newColumn('id').withTitle('ID'),
    DTColumnBuilder.newColumn('status').withTitle('Status'),
    DTColumnBuilder.newColumn('userId').withTitle('User ID'),
    DTColumnBuilder.newColumn(null).withTitle('Action').notSortable()
    .renderWith(render)
  ];
}

function UsersTableCtrl(DTOptionsBuilder, DTColumnBuilder, UserService) {
  var vm = this;
  vm.dtOptions = DTOptionsBuilder
    .fromFnPromise(function() {
      return UserService.findAll();
    })
    .withPaginationType('simple_numbers')
    .withBootstrap();

  vm.dtColumns = [
    DTColumnBuilder.newColumn('id').withTitle('ID'),
    DTColumnBuilder.newColumn('name').withTitle('Name'),
    DTColumnBuilder.newColumn('email').withTitle('Email Address'),
    DTColumnBuilder.newColumn(null).withTitle('Action').notSortable()
    .renderWith(function(data, type, full, meta) {
      if (data.role === 'admin') {
        return '<button class="btn btn-default btn-xs btn-block icon-before" ng-click="removeAdmin(' + data.id + ')"><i class="fa fa-unlock-alt"></i>Remove Admin</button>';
      } else {
        return '<button class="btn btn-success btn-xs btn-block icon-before" ng-click="makeAdmin(' + data.id + ')"><i class="fa fa-lock"></i>Make Admin</button>';
      }
    })
  ];
}