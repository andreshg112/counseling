(function() {
    'use strict';

    angular
        .module('app')
        .controller('MateriasController', MateriasController);

    MateriasController.$inject = ['MateriasService', 'ProgramasService'];

    function MateriasController(MateriasService, ProgramasService) {
        console.log("Entró a MateriasController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        //Declaraciones de variables públicas en orden alfabético.
        vm.materias = [];
        vm.eliminar = eliminar;
        vm.guardar = guardar;
        vm.limpiar = limpiar;
        vm.programas = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').tipo_usuario != 'administrador') {
                location.href = '#/';
            } else {
                vm.limpiar();
                cargarMaterias();
                cargarProgramas();
            }
        }

        function cargarMaterias() {
            MateriasService.getAll()
                .then(function(response) {
                    vm.materias = response.data;
                    if (vm.materias.length == 0) {
                        alertify.error('No hay registros.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
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

        function eliminar(materia) {
            alertify.confirm("¿Desea eliminar la materia?",
                function() {
                    MateriasService.delete(materia)
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
            console.log(vm.materia);
            MateriasService.post(vm.materia)
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
            vm.materia = {};
        }

        activate();
    }
})();