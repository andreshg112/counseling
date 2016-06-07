(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService'];

    function LoginController(LoginService) {
        console.log("Entró a LoginController");
        var vm = this;

        //Declaraciones de variables públicas en orden alfabético.
        vm.iniciarSesion = iniciarSesion;
        vm.limpiar = limpiar;

        //Funciones, en orden alfabético
        function activate() {
            vm.limpiar();
        }

        function guardar() {
            vm.horario.hora_inicio = $('#hora_inicio').val();
            vm.horario.hora_fin = $('#hora_fin').val();
            console.log(vm.horario);
            LoginService.post(vm.horario).then(function(response) {
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

        function iniciarSesion() {
            LoginService.post(vm.usuarioInicioSesion).then(function(response) {
                    console.log(response);
                    if (response.data.result) {
                        alertify.success(response.data.mensaje);
                        alertify.success("Serás redirigido al menú principal.", 4, function() {
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