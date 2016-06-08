(function() {
    'use strict';

    angular
        .module('app')
        .controller('BuscarHorariosController', BuscarHorariosController);

    BuscarHorariosController.$inject = ['HorariosService', 'MateriasService', 'TutoresService'];

    function BuscarHorariosController(HorariosService, MateriasService, TutoresService) {
        console.log("Entró a BuscarHorariosController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        //Declaraciones de variables públicas en orden alfabético.
        vm.dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        vm.getNombreCompletoTutor = getNombreCompletoTutor;
        vm.horarios = [];
        vm.limpiar = limpiar;
        vm.materias = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').tipo_usuario != 'alumno') {
                location.href = '#/';
            } else {
                vm.estaModificando = false;
                vm.limpiar();
                cargarHorarios();
                cargarMaterias();
                cargarTutores();
            }
        }

        function cargarHorarios() {
            HorariosService.getAll()
                .then(function(response) {
                    vm.horarios = response.data;
                    if (vm.horarios.length == 0) {
                        alertify.error('No hay registros.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function cargarMaterias() {
            MateriasService.getAll()
                .then(function(response) {
                    vm.materias = response.data;
                    if (vm.materias.length == 0) {
                        alertify.error('No se han registrado materias.');
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
                        alertify.error('No se han registrado tutores.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function getNombreCompletoTutor(tutor) {
            return tutor.primer_nombre + ' ' + tutor.segundo_nombre + ' ' + tutor.primer_apellido + ' ' + tutor.segundo_apellido;
        }

        function limpiar() {
            vm.horario = {};
        }

        activate();
    }
})();