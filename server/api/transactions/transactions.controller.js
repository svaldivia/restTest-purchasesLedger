'use strict';

const request = require('request');

const STATUS_NOT_FOUND = 404;

function getTransactions(req, res) {
  let url = `http://resttest.bench.co/transactions/${req.params.page}.json`;

  return request(url, (error, response, data) => {
    if (response.statusCode === STATUS_NOT_FOUND) {
      return res.status(response.statusCode).send('Not Found');
    }
    return res.status(response.statusCode).send(JSON.parse(data));
  });
}

module.exports = {
  getTransactions: getTransactions
};
