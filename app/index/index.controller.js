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
            storage: 'session'
        };
        var basil = new window.Basil(options);

        console.log(basil.get('user'), basil.get('user') == null);
        if (basil.get('user') == null) {
            location.href = 'login.html';
        }

    }
})();