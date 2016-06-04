(function () {
    'use strict';

    angular
        .module('app')
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'app/materias/materias.html',
                        controller: 'MateriasController',
                        controllerAs: 'materiasVm'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }]);
})();