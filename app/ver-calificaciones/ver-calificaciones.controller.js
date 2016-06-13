(function() {
    'use strict';

    angular
        .module('app')
        .controller('VerCalificacionesController', VerCalificacionesController);

    VerCalificacionesController.$inject = ['CalificarTutoresService'];

    function VerCalificacionesController(CalificarTutoresService) {
        console.log("Entró a VerCalificacionesController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);
        var user = {};

        //Declaraciones de variables públicas en orden alfabético.
        vm.calificaciones = [];
        vm.getClase = getClase;

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').tipo_usuario != 'tutor') {
                location.href = '#/';
            } else {
                user = basil.get('user');
                cargarCalificaciones();
            }
        }

        function cargarCalificaciones() {
            CalificarTutoresService.getByTutor(user.id)
                .then(function(response) {
                    vm.calificaciones = response.data.result;
                    if (vm.calificaciones.length == 0) {
                        alertify.error(response.data.mensaje);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function getClase(nota) {
            var clase = "";
            switch (nota) {
                case '1':
                    clase = "danger";
                    break;
                case '2':
                    clase = "danger";
                    break;
                case '3':
                    clase = "warning";
                    break;
                case '4':
                    clase = "info";
                    break;
                case '5':
                    clase = "success";
                    break;
                default:
                    clase = "default";
                    break;
            }
            return clase;
        }
        activate();
    }
})();