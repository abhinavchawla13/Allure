﻿(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('LoginController', LoginController);

    // LoginController.$inject = ['$location', 'UserService'];
    function LoginController($timeout, $state, UserService) {
        var vm = this;

        vm.login = login;
        vm.error = '';

        function login() {

          var result = UserService.login(vm.username, vm.password);
          if (result.success){
            $timeout(function() {
               vm.error = '';
               $state.go('app.welcome');
             }, 0);
          }
          else{
            vm.error = result.error;
          }
        };
    }

})();
