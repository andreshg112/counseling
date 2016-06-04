(function () {
    'use strict';

    angular
            .module('app')
            .service('SalasService', SalasService);

    SalasService.$inject = [];
    function SalasService() {
        this.getSalas = getSalas;
        var salas = ["102I", "201I", "202I", "301I", "302I", "303I", "401I", "402I", "403I", "404I"];
        ////////////////

        function getSalas() {
            return salas.reverse();
        }
    }
})();