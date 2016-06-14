(function() {
    'use strict';

    angular
        .module('app')
        .controller('VerAsistenciasController', VerAsistenciasController);

    VerAsistenciasController.$inject = ['AsistenciasService', 'MateriasService'];

    function VerAsistenciasController(AsistenciasService, MateriasService) {
        console.log("Entró a VerAsistenciasController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);
        var user = {};

        //Declaraciones de variables públicas en orden alfabético.
        vm.asistencias = [];
        vm.getNombreCompletoUser = getNombreCompletoUser;
        vm.materias = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').tipo_usuario != 'tutor') {
                location.href = '#/';
            } else {
                user = basil.get('user');
                cargarAsistencias();
                cargarMaterias();
            }
        }

        function cargarAsistencias() {
            AsistenciasService.getByTutor(user.id)
                .then(function(response) {
                    vm.asistencias = response.data.result;
                    if (vm.asistencias.length == 0) {
                        alertify.error(response.data.mensaje);
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

        activate();
    }
})();