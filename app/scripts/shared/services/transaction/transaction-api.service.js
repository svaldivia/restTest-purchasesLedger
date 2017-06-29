(() => {
  'use strict';

   angular
    .module('rt.transaction-api')
    .factory('TransactionService', TransactionService);

  TransactionService.$inject = [
    '$http',
    '$q'
  ];

  function TransactionService (
    $http,
    $q
  ) {

    const PAGE_SIZE = 10;

    var service = {
      getTransactions: getTransactions,
    };

    return service;

    ////////////////////////

    function getTransactions() {
      return $http.get('/api/transactions/1')
        .then(response => {

          let pages = Math.ceil(response.data.totalCount / PAGE_SIZE);
          let pagePromises = [];

          if (pages === 1) {
            return response.data.transactions;
          }

          for (var i = 2; i <= pages; i++) {
            pagePromises.push(_getTransactionsPage(i));
          }

          return Promise.all(pagePromises)
            .then(pages => {
              return _.union(response.data.transactions, _.flatten(pages));
            });
        })
        .catch(error => {
          $q.reject(error);
        });
    }

    function _getTransactionsPage(page) {
      return new Promise((resolve,reject) => {
        $http.get(`/api/transactions/${page}`)
          .then(response => {
            //Check error and reject

            resolve(response.data.transactions);
          });
      });
    }
  }
})();
