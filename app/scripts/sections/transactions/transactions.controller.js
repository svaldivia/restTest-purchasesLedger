(() => {
  'use strict';
  angular
    .module('rt.transactions')
    .controller('TransactionsController', TransactionsController);

  TransactionsController.$inject = [
    'TransactionService'
  ];

  function TransactionsController (
    TransactionService
  ) {
    var vm = this;

    vm.transactions = [];

    activate();
    ////////////////////////

    function activate() {
      TransactionService.getTransactions()
        .then(transactions => {
            vm.transactions = transactions;
        });
    };
  }
})();
