(function() {
    'use strict';

    angular
        .module('app')
        .controller('CalificarTutoresController', CalificarTutoresController);

    CalificarTutoresController.$inject = ['TutoresService', 'ProgramasService', 'CalificarTutoresService', 'ngDialog'];

    function CalificarTutoresController(TutoresService, ProgramasService, CalificarTutoresService, ngDialog) {
        console.log("Entró a CalificarTutoresController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        //Declaraciones de variables públicas en orden alfabético.
        vm.calificaciones = [1, 2, 3, 4, 5];
        vm.calificar = calificar;
        vm.cancelarCalificacion = cancelarCalificacion;
        vm.getNombreCompletoUser = getNombreCompletoUser;
        vm.guardar = guardar;
        vm.limpiar = limpiar;
        vm.programas = [];
        vm.tutores = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').tipo_usuario != 'alumno') {
                location.href = '#/';
            } else {
                vm.limpiar();
                cargarProgramas();
                cargarTutores();
            }
        }

        function calificar(tutor) {
            vm.tutorSeleccionado = tutor;
            $('#modal-calificar').modal('show');
        }

        function cancelarCalificacion() {
            $('#modal-calificar').modal('hide');
        }

        function cargarProgramas() {
            ProgramasService.getAll()
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

        function getNombreCompletoUser(user) {
            var nombreCompleto = "";
            if (user) {
                nombreCompleto = user.primer_nombre;
                nombreCompleto += user.segundo_nombre != null && user.segundo_nombre != "" ? " " + user.segundo_nombre : "";
                nombreCompleto += " " + user.primer_apellido;
                nombreCompleto += user.segundo_apellido != null && user.segundo_apellido != "" ? " " + user.segundo_apellido : "";
            }
            return nombreCompleto;
        }

        function guardar() {
            var calificacion = {
                'tutor_id': vm.tutorSeleccionado.id,
                'alumno_id': basil.get('user').id,
                'calificacion': vm.tutorSeleccionado.calificacion,
                'observaciones': vm.tutorSeleccionado.observaciones
            };
            CalificarTutoresService.post(calificacion).then(function(response) {
                    console.log(response);
                    if (response.data.result) {
                        alertify.success(response.data.mensaje);
                        activate();
                    } else if (response.data.validator) {
                        alertify.error(response.data.mensaje);
                        response.data.validator.forEach(function(element) {
                            alertify.error(element);
                        }, this);
                    } else {
                        alertify.error(response.data.mensaje);
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