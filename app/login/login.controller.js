(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UsersService', 'ProgramasService'];

    function LoginController(UsersService, ProgramasService) {
        console.log("Entró a LoginController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        //Declaraciones de variables públicas en orden alfabético.
        vm.generos = ['masculino', 'femenino', 'otro'];
        vm.iniciarSesion = iniciarSesion;
        vm.limpiar = limpiar;
        vm.programas = [];
        vm.registrarse = registrarse;
        vm.roles = ['alumno', 'tutor'];
        vm.tipos_documentos = ['CC', 'CE', 'TI'];

        //Funciones, en orden alfabético
        function activate() {
            vm.limpiar();
            cargarProgramas();
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

        function registrarse() {
            UsersService.post(vm.usuarioRegistro).then(function(response) {
                    console.log(response);
                    if (response.data.result) {
                        basil.set('user', response.data.result);
                        alertify.success(response.data.mensaje);
                        alertify.success("Serás redirigido(a) al menú principal.", 4, function() {
                            location.href = '/counseling';
                        });
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

        function iniciarSesion() {
            UsersService.login(vm.usuarioInicioSesion).then(function(response) {
                    console.log(response);
                    if (response.data.result) {
                        basil.set('user', response.data.result);
                        alertify.success(response.data.mensaje);
                        alertify.success("Serás redirigido(a) al menú principal.", 4, function() {
                            location.href = '/counseling';
                        });
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
            vm.usuarioInicioSesion = {};
            vm.usuarioRegistro = {};
        }

        activate();
    }
})();