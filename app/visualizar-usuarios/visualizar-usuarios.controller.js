(function() {
    'use strict';

    angular
        .module('app')
        .controller('VisualizarUsuariosController', VisualizarUsuariosController);

    VisualizarUsuariosController.$inject = ['UsersService'];

    function VisualizarUsuariosController(UsersService) {
        console.log("Entró a VisualizarUsuariosController");
        var vm = this;

        //Declaraciones de variables públicas en orden alfabético.
        vm.usuarios = [];
        vm.limpiar = limpiar;
        vm.roles = ['alumno', 'tutor'];

        //Funciones, en orden alfabético
        function activate() {
            vm.limpiar();
            cargarUsuarios();
        }

        function cargarUsuarios() {
            UsersService.getAll()
                .then(function(response) {
                    vm.usuarios = response.data.result;
                    if (vm.usuarios.length == 0) {
                        alertify.error('No hay registros.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function limpiar() {
            vm.usuario = {};
        }

        activate();
    }
})();