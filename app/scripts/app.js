(() => {
  'use strict';

  angular.module('RestTestApp')

  .config(($urlRouterProvider, $locationProvider) => {
    $locationProvider.html5Mode(true);
  });
})();
