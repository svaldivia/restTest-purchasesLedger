'use strict';

describe('TransactionService', () => {
  var test;

  function setDefaults() {
    test.dataOneEntry = {
      data: {
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
      }
    };

    test.dataMultipleEntries = {
      data:{
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
      }
    };

    test.error = "error";
  }

  beforeEach(() => {
    test = {};

    angular.mock.module('rt.transaction-api');

    inject((TransactionService, $http, $q, $timeout) => {
      test.service = TransactionService;
      test.$http = $http;
      test.$q = $q;
      test.$timeout = $timeout;
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
      spyOn(test.$http, 'get').and.returnValue(test.$q.resolve(test.dataOneEntry));

      test.service.getTransactions();

      test.$timeout.flush();
      expect(test.$http.get).toHaveBeenCalledWith('/api/transactions/1');
    });

    it("Should call api the correct number of times", () => {
      spyOn(test.$http, 'get').and.returnValue(test.$q.resolve(test.dataMultipleEntries));

      test.service.getTransactions();

      test.$timeout.flush();
      expect(test.$http.get).toHaveBeenCalledTimes(2);
    });

    it("Should not call api more than once when there is only one page", () => {
      spyOn(test.$http, 'get').and.returnValue(test.$q.resolve(test.dataOneEntry));

      test.service.getTransactions();

      test.$timeout.flush();
      expect(test.$http.get).toHaveBeenCalledTimes(1);
    });

    it("Should return the correct data set", () => {
      spyOn(test.$http, 'get').and.returnValue(test.$q.resolve(test.dataOneEntry));

      let transactions = [];

      test.service.getTransactions()
        .then(response => {
          transactions = response;
        });

      test.$timeout.flush();
      expect(transactions).toEqual(test.dataOneEntry.data.transactions);
    });

    it("Should handle errors on server", () => {
      spyOn(test.$http, 'get').and.returnValue(test.$q.reject(test.error));

      let error = "";

      test.service.getTransactions()
        .catch(response => {
          error = response;
        });

      test.$timeout.flush();
      expect(error).toBe(test.error);
    });
  });
});
