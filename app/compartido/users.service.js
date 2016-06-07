(function() {
    'use strict';

    angular
        .module('app')
        .service('UsersService', UsersService);

    UsersService.$inject = ['$http'];

    function UsersService($http) {
        this.delete = dispose;
        this.getAll = getAll;
        this.login = login;
        this.post = post;
        this.put = put;

        ////////////////

        var uri = "api/public/users";

        function dispose(registro) {
            console.log("delete");
            var req = $http.delete(uri + "/" + registro.id);
            return req;
        }

        function getAll() {
            console.log("get_all");
            var req = $http.get(uri);
            return req;
        }

        function login(registro) {
            console.log("login");
            var req = $http.post("api/public/login", registro);
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