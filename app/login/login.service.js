(function() {
    'use strict';

    angular
        .module('app')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$http'];

    function LoginService($http) {
        this.getAll = getAll;
        this.delete = dispose;
        this.post = post;
        this.put = put;

        ////////////////

        var uri = "api/public/login";

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

        function put(registro) {
            console.log("put");
            var req = $http.put(uri + "/" + registro.id, registro);
            return req;
        }
    }
})();