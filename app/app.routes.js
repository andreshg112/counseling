(function() {
    'use strict';

    angular
        .module('app')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'app/cover/cover.html'
                    })
                    .when('/materias', {
                        templateUrl: 'app/materias/materias.html',
                        controller: 'MateriasController',
                        controllerAs: 'materiasVm'
                    })
                    .when('/horarios', {
                        templateUrl: 'app/horarios/horarios.html',
                        controller: 'HorariosController',
                        controllerAs: 'horariosVm'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ]);
})();