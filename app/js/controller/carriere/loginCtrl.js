PCIE.controller("loginCtrl",function($window, $state, $rootScope, $scope, authFactory, sessionService) {

    var vm = this;
    // model du formulaire de login
    $scope.userData = {};
    $scope.loginError = '';

    $scope.login = function(){
        authFactory.login($scope.userData).then(function (data) {
            if(data.user) {
                sessionService.setUser(data.user[0]);
                console.log(sessionService.getUser());

                if(sessionService.getUser().idrang ==2){
                    $state.go('root.carriere.espaceCandidat');
                }
                if(sessionService.getUser().idrang == 4){
                    $state.go('root.carriere.espaceRH');
                }
            }
        });
    }
});