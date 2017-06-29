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
    vm.total = 0;
    vm.isLoading = true;

    activate();
    ////////////////////////

    function activate() {
      TransactionService.getTransactions()
        .then(transactions => {
            vm.isLoading = false;
            vm.transactions = transactions;
            vm.total = calculateTotal();
        });
    };

    function calculateTotal() {
      return _.reduce(vm.transactions, (sum, transaction) => {
        return sum + parseFloat(transaction.Amount);
      }, 0);
    }
  }
})();
