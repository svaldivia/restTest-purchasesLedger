'use strict';

describe('TransactionService', () => {
  var test;

  function setDefaults() {
    test.dataOneEntry = {
      "totalCount": 1,
      "page": 1,
      "transactions": [
        {
          "Date": "2013-12-22",
          "Ledger": "Phone & Internet Expense",
          "Amount": "-110.71",
          "Company": "SHAW CABLESYSTEMS CALGARY AB"
        }
      ]
    };

    test.dataMultipleEntries = {
      "totalCount": 20,
      "page": 1,
      "transactions": [
        {
          "Date": "2013-12-22",
          "Ledger": "Phone & Internet Expense",
          "Amount": "-110.71",
          "Company": "SHAW CABLESYSTEMS CALGARY AB"
        }
      ]
    };
  }

  beforeEach(() => {
    test = {};

    angular.mock.module('rt.transaction-api');

    inject((TransactionService, $http) => {
      test.service = TransactionService;
      test.$http = $http;
    });

    setDefaults();
  });

  afterEach(() => {
    test = null;
  });

  it('Should Exist', () => {
      expect(test.service).toBeDefined();
  });

  describe('.getTransactions', () => {
    it("Should Exist", () => {
      expect(test.service.getTransactions).toBeDefined();
    });

    it("Should call api with correct parameters", () => {
      spyOn(test.$http, 'get').and.returnValue({
        then: function(fn) {
          fn({data: test.dataOneEntry});
        }
      });

      test.service.getTransactions();

      expect(test.$http.get).toHaveBeenCalledWith('/api/transactions/1');
    });

    it("Should call api the correct number of times", () => {
      spyOn(test.$http, 'get').and.returnValue({
        then: function(fn) {
          fn({data: test.dataMultipleEntries});
        }
      });

      test.service.getTransactions();

      expect(test.$http.get).toHaveBeenCalledTimes(2);
    });

    it("Should not call api when there is only one page", () => {
      spyOn(test.$http, 'get').and.returnValue({
        then: function(fn) {
          fn({data: test.dataOneEntry});
        }
      });

      test.service.getTransactions();

      expect(test.$http.get).toHaveBeenCalledTimes(1);
    });

    it("Should return the correct data set", () => {
      spyOn(test.$http, 'get').and.returnValue({
        then: function(fn) {
          return fn({data: test.dataOneEntry});
        }
      });

      let transactions = test.service.getTransactions();

      expect(transactions).toEqual(test.dataOneEntry.transactions);
    });

    // TODO
    // it("Should handle errors on server", () => {
    //   spyOn(test.$http, 'get').and.returnValue({
    //     then: function(fn) {
    //       return fn({data: test.dataOneEntry});
    //     }
    //   });
    //
    //   let transactions = test.service.getTransactions();
    //
    //   expect(transactions).toEqual(test.dataOneEntry.transactions);
    // });
  });
});
