(function () {
    'use strict';

    angular
            .module('gasolinaApp')
            .controller('RegistrarController', RegistrarController);

    RegistrarController.$inject = ['AsignacionesService', 'SalasService'];
    function RegistrarController(AsignacionesService, SalasService) {
        console.log("Entró a RegistrarController");
        var vm = this;

        //Declaraciones de variables públicas en orden alfabético.
        vm.asignaciones = [];
        vm.cancelarAsignacion = cancelarAsignacion;
        vm.guardar = guardar;
        vm.limpiar = limpiar;
        vm.salas = SalasService.getSalas();

        //Funciones, en orden alfabético
        function activate() {
            vm.limpiar();
            cargarAsignaciones();
        }

        function cargarAsignaciones() {
            AsignacionesService.getAll()
                    .then(function (response) {
                        vm.asignaciones = response.data.result;
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert(error.statusText);
                    });
        }

        function cancelarAsignacion(asignacion) {
            alertify.confirm("¿Desea cancelar la reserva de la sala?",
                    function () {
                        AsignacionesService.delete(asignacion)
                                .then(function (response) {
                                    console.log(response);
                                    activate();
                                    alertify.success(response.data.mensaje);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    alertify.error(error.statusText);
                                });
                    },
                    function () {
                        //Si presiona Cancel.
                    });

        }

        function guardar() {
            vm.asignacion.fecha = $('#datepicker').val();
            vm.asignacion.hora_inicio = $('#hora_inicio').val();
            vm.asignacion.hora_fin = $('#hora_fin').val();
            console.log(vm.asignacion);
            AsignacionesService.post(vm.asignacion)
                    .then(function (response) {
                        console.log(response);
                        activate();
                        alertify.success(response.data.mensaje);
                    })
                    .catch(function (error) {
                        console.log(error);
                        alertify.error(error.statusText);
                    });
        }

        function limpiar() {
            vm.asignacion = {};
            $('#hora_inicio').val("");
            $('#hora_fin').val("");
        }
        activate();
    }
})();