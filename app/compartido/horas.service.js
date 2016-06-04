(function () {
    'use strict';

    angular
            .module('app')
            .service('HorasService', HorasService);

    HorasService.$inject = [];
    function HorasService() {
        var horas = range(6, 21, 2);
        this.getHoras = getHoras;

        ////////////////
        function compareHoras(hora1, hora2) {
            /* Compara dos objetos departamentos y retorna:
             -1, si el nombre de dep1 va antes del segundo.
             0, si son iguales.
             1, si el nombre de dep1 va después de dep2.
             Similar a la interface 'Comparable' en Java. */
            return hora1 - hora2;
        }
        function getHoras() {
            return horas.sort(compareHoras);
        }
    }
})();