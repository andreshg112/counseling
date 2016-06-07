(function() {
    'use strict';

    angular
        .module('app')
        .controller('TutoresController', TutoresController);

    TutoresController.$inject = ['TutoresService'];

    function TutoresController(TutoresService) {
        console.log("Entró a TutoresController");
        var vm = this;

        //Declaraciones de variables públicas en orden alfabético.
        vm.tutores = [];
        vm.eliminar = eliminar;
        vm.guardar = guardar;
        vm.limpiar = limpiar;

        //Funciones, en orden alfabético
        function activate() {
            vm.limpiar();
            cargarTutores();
        }

        function cargarTutores() {
            TutoresService.getAll()
                .then(function(response) {
                    vm.tutores = response.data;
                    if (vm.tutores.length == 0) {
                        alertify.error('No hay registros.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function eliminar(tutor) {
            alertify.confirm("¿Desea borrar el tutor?",
                function() {
                    TutoresService.delete(tutor)
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
            console.log(vm.tutor);
            TutoresService.post(vm.tutor)
                .then(function(response) {
                    console.log(response);
                    activate();
                    if (response.data.result) {
                        alertify.success(response.data.mensaje);
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