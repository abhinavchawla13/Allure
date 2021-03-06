﻿(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('allergicSaltsController', allergicSaltsController);

    // LoginController.$inject = ['$location', 'UserService'];
    function allergicSaltsController($timeout, $scope, $state, UserService, MedicineService, $rootScope, $ionicHistory, $ionicPlatform) {
        var vm = this;
        vm.probableAllergicSalts = MedicineService.probableAllergicSalts;
        vm.definiteAllergicSalts = MedicineService.definiteAllergicSalts;
        vm.newDefiniteSaltsAdded = MedicineService.newDefiniteSaltsAdded;
        vm.newProbableSaltsAdded = MedicineService.newProbableSaltsAdded;
        vm.previousView = MedicineService.previousView;
        vm.goHome = goHome;
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        var doCustomBack= function() {
          $state.go('app.welcome');
          // do something interesting here
        };
        // registerBackButtonAction() returns a function which can be used to deregister it
        var deregisterHardBack= $ionicPlatform.registerBackButtonAction(
            doCustomBack, 101
        );

        $scope.$on('$destroy', function() {
            deregisterHardBack();
        });

        $scope.data = {
         showDelete: false
       };

         vm.onProbableItemDelete = onProbableItemDelete;
         vm.onDefiniteItemDelete = onDefiniteItemDelete;

        return vm;

        function onProbableItemDelete(item){
          vm.probableAllergicSalts.splice(vm.probableAllergicSalts.indexOf(item), 1);
          UserService.setProbableSaltsOfUser(UserService.getPresentUser().username, MedicineService.probableAllergicSalts);
        }

        function onDefiniteItemDelete(item){
          vm.definiteAllergicSalts.splice(vm.definiteAllergicSalts.indexOf(item), 1);
          UserService.setDefinitiveSaltsOfUser(UserService.getPresentUser().username, MedicineService.definiteAllergicSalts);
        }

        function sendBackToSearch(){
          $ionicHistory.goBack();
        }

        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        function goHome(){
          $state.go('app.welcome');
        }
    }

})();
