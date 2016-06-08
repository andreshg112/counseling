(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$location'];

    function IndexController($location) {
        console.log("Entró a IndexController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        vm.cerrarSesion = cerrarSesion;
        vm.getNombreCompletoUser = getNombreCompletoUser;
        vm.getTipoUsuario = getTipoUsuario;
        vm.user = {};

        function activate() {
            if (basil.get('user') == null) {
                location.href = 'login.html';
            } else {
                vm.user = basil.get('user');
            }
        }

        function cerrarSesion() {
            basil.remove('user');
            location.href = 'login.html';
        }

        function getTipoUsuario() {
            return vm.user.tipo_usuario;
        }

        function getNombreCompletoUser() {
            var nombreCompleto = vm.user.primer_nombre;
            nombreCompleto += vm.user.segundo_nombre != null && vm.user.segundo_nombre != "" ? " " + vm.user.segundo_nombre : "";
            nombreCompleto += " " + vm.user.primer_apellido;
            nombreCompleto += vm.user.segundo_apellido != null && vm.user.segundo_apellido != "" ? " " + vm.user.segundo_apellido : "";
            return nombreCompleto;
        }

        activate();

    }
})();