admin.controller('DataTablesCtrl', DataTablesCtrl);

function DataTablesCtrl(DTOptionsBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder
      .newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(2)
      .withBootstrap();
}
