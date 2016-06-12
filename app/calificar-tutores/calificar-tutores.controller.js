(function() {
    'use strict';

    angular
        .module('app')
        .controller('CalificarTutoresController', CalificarTutoresController);

    CalificarTutoresController.$inject = ['TutoresService', 'CalificarTutoresService'];

    function CalificarTutoresController(TutoresService, CalificarTutoresService) {
        console.log("Entró a CalificarTutoresController");
        var vm = this;

        //Declaraciones de variables públicas en orden alfabético.
        vm.limpiar = limpiar;
        vm.programas = [];
        vm.tutores = [];

        //Funciones, en orden alfabético
        function activate() {
            vm.limpiar();
            cargarTutores();
        }

        function cargarProgramas() {
            CalificarTutoresService.getAll()
                .then(function(response) {
                    vm.programas = response.data.result;
                    if (vm.programas.length == 0) {
                        alertify.error(response.data.mensaje);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function cargarTutores() {
            TutoresService.getAll()
                .then(function(response) {
                    vm.tutores = response.data.result;
                    if (vm.tutores.length == 0) {
                        alertify.error('No hay registros.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function limpiar() {
            vm.tutor = {};
        }

        activate();
    }
})();