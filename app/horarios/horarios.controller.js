(function() {
    'use strict';

    angular
        .module('app')
        .controller('HorariosController', HorariosController);

    HorariosController.$inject = ['HorariosService', 'MateriasService', 'TutoresService'];

    function HorariosController(HorariosService, MateriasService, TutoresService) {
        console.log("Entró a HorariosController");
        var vm = this;

        //Declaraciones de variables públicas en orden alfabético.
        vm.dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        vm.horarios = [];
        vm.eliminar = eliminar;
        vm.guardar = guardar;
        vm.limpiar = limpiar;
        vm.materias = [];

        //Funciones, en orden alfabético
        function activate() {
            vm.limpiar();
            cargarHorarios();
            cargarMaterias();
            cargarTutores();
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
                    vm.tutores = response.data;
                    if (vm.tutores.length == 0) {
                        alertify.error('No se han registrado tutores.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function eliminar(registro) {
            alertify.confirm("¿Desea eliminar esta asesoría?",
                function() {
                    HorariosService.delete(registro)
                        .then(function(response) {
                            console.log(response);
                            activate();
                            alertify.success(response.data.mensaje);
                        })
                        .catch(function(error) {
                            console.log(error);
                            alertify.error(error.statusText);
                        });
                },
                function() {
                    //Si presiona Cancel.
                });

        }

        function guardar() {
            vm.horario.hora_inicio = $('#hora_inicio').val();
            vm.horario.hora_fin = $('#hora_fin').val();
            console.log(vm.horario);
            HorariosService.post(vm.horario)
                .then(function(response) {
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
            vm.horario = {};
        }

        activate();
    }
})();