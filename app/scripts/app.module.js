(() => {
  'use strict';

  angular
    .module('RestTestApp', [
      'ui.router',
      'rt.constants',
      'rt.transactions',
      'rt.transaction-api'
    ]);
})();
