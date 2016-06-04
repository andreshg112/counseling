(function () {
    'use strict';

    angular
            .module('gasolinaApp')
            .config(['$routeProvider',
                function ($routeProvider) {
                    $routeProvider
                            .when('/', {
                                templateUrl: 'app/asignaciones/registrar.html',
                                controller: 'RegistrarController',
                                controllerAs: 'regVm'
                            })
                            .otherwise({
                                redirectTo: '/'
                            });
                }]);
})();