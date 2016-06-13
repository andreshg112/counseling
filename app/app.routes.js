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
                    .when('/buscar-horarios', {
                        templateUrl: 'app/buscar-horarios/buscar-horarios.html',
                        controller: 'BuscarHorariosController',
                        controllerAs: 'horariosVm'
                    })
                    .when('/visualizar-usuarios', {
                        templateUrl: 'app/visualizar-usuarios/visualizar-usuarios.html',
                        controller: 'VisualizarUsuariosController',
                        controllerAs: 'vm'
                    })
                    .when('/calificar-tutores', {
                        templateUrl: 'app/calificar-tutores/calificar-tutores.html',
                        controller: 'CalificarTutoresController',
                        controllerAs: 'calificarVm'
                    })
                    .when('/ver-calificaciones', {
                        templateUrl: 'app/ver-calificaciones/ver-calificaciones.html',
                        controller: 'VerCalificacionesController',
                        controllerAs: 'vm'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ]);
})();