(() => {
  'use strict';

  angular
    .module('RestTestApp')
    .provider('RestTestStateConfig', RestTestStateConfig);

  RestTestStateConfig.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    'appStates'
  ];

  function RestTestStateConfig(
    $stateProvider,
    $urlRouterProvider,
    appStates
  ) {

    this.$get = ['$state', $get];
    this.initialize = initialize;

    ////////////////////////////////

    function initialize() {
      addStates();

      $urlRouterProvider.otherwise(redirectTo404);
    }

    function addStates() {
      addState(appStates.REST_TEST,           appRootState(),            '');
      addState(appStates.TRANSACTIONS,        transactionState(),        '/');
      addState(appStates.FOUR_OH_FOUR,        fourOhFourState(),         '/404');
    }

    function $get($state) {
      return {
        getStates: $state.get
      }
    }

    function addState(stateName, stateConfig, url) {
      $stateProvider.state(stateName, _.extend({}, stateConfig, {url: url}));
    }

    // State definitions //

    function appRootState() {
      return {
        abstract: true,
        templateUrl: '/scripts/sections/app-container.html',
      };
    }

    function transactionState() {
      return {
        templateUrl: '/scripts/sections/transactions/transactions.html',
        controller: 'TransactionsController',
        controllerAs: 'vm',
        bindToController: true,
      };
    }

    function fourOhFourState() {
        return {
            templateUrl: '/scripts/sections/error/404.html',
        };
    }

    function redirectTo404($injector, $location) {
      var $state = $injector.get('$state');

      $state.go(appStates.FOUR_OH_FOUR, null, {location: false});

      return $location.path();
    }

  }
})();
