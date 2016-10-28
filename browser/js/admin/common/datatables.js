admin.controller('ProductsTableCtrl', ProductsTableCtrl);
admin.controller('OrdersTableCtrl', OrdersTableCtrl);

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
    vm.edit = function(id) {
      $state.go(editProduct({id: id}));
    }
}

function OrdersTableCtrl(DTOptionsBuilder, DTColumnBuilder, OrderService) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder
      .fromFnPromise(function() {
        return OrderService.findAll();
      })
      .withOption('order', [0, 'desc'])
      .withPaginationType('simple_numbers')
      .withBootstrap();

    vm.dtColumns = [
      DTColumnBuilder.newColumn('id').withTitle('ID'),
      DTColumnBuilder.newColumn('status').withTitle('Status'),
      DTColumnBuilder.newColumn('userId').withTitle('User ID'),
      DTColumnBuilder.newColumn(null).withTitle('Action').notSortable()
      .renderWith(function(data, type, full, meta) {
        if(data.status === 'cart' ) {
          return '<button class="btn btn-success btn-xs btn-block icon-before" ng-click="edit(' + data.id + ')"><i class="fa fa-truck"></i>Complete</button>';
        } else {
          return '<button class="btn btn-default btn-xs btn-block icon-before" ng-click="edit(' + data.id + ')"><i class="fa fa-check"></i>Completed</button>';
        }
      })
    ];
}
