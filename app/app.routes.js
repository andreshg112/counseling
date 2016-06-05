(function() {
    'use strict';

    angular
        .module('app')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'app/materias/materias.html',
                        controller: 'MateriasController',
                        controllerAs: 'materiasVm'
                    })
                    .when('/materias', {
                        templateUrl: 'app/materias/materias.html',
                        controller: 'MateriasController',
                        controllerAs: 'materiasVm'
                    })
                    .when('/tutores', {
                        templateUrl: 'app/tutores/tutores.html',
                        controller: 'TutoresController',
                        controllerAs: 'tutoresVm'
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