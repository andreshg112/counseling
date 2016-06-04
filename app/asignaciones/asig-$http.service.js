(function () {
    'use strict';

    angular
            .module('gasolinaApp')
            .service('AsignacionesService', AsignacionesService);

    AsignacionesService.$inject = ['$http'];
    function AsignacionesService($http) {
        this.getAll = getAll;
        this.delete = dispose;
        this.post = post;

        ////////////////

        var uri = "http://localhost/assign-classroom-server/reservas";

        function getAll() {
            console.log("get_all");
            var req = $http.get(uri);
            return req;
        }

        function dispose(registro) {
            console.log("delete");
            var req = $http.delete(uri + "/" + registro.id);
            return req;
        }

        function post(registro) {
            console.log("post");
            var req = $http.post(uri, registro);
            return req;
        }
    }
})();