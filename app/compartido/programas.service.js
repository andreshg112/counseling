(function() {
    'use strict';

    angular
        .module('app')
        .service('ProgramasService', ProgramasService);

    ProgramasService.$inject = ['$http'];

    function ProgramasService($http) {
        this.getAll = getAll;
        this.delete = dispose;
        this.post = post;

        ////////////////

        var uri = "api/public/programas";

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