PCIE.controller('offreCtrl', function($stateParams, $scope, offreService, sessionService) {

    $scope.offre = {};
    $scope.offres = {};
    $scope.utilisateursOffre = {};
    $scope.offreUtilisateur = {};


    $scope.init = function(){
        $scope.offre = null;
        $stateParams = null;
    };

    $scope.rechercherOffre = function (){
        offreService.rechercherOffre($stateParams.idOffre).then(function(data){
            $scope.offre = data;
            $scope.user = sessionService.getUser();
        });
    };

    $scope.rechercherOffres = function (){
        offreService.rechercherOffres().then(function(data){
            $scope.offres = data;
        });
    };

    $scope.enregistrerOffre = function (){
        if($scope.Offre.idOffre){
            offreService.mettreAJourOffre($scope.Offre);
        }else {
            offreService.enregistrerOffre($scope.Offre);
        }
    };

    $scope.rechercherUtilisateursOffre = function(){
        offreService.rechercherUtilisateursOffre($stateParams.idOffre).then(function(data){
            $scope.utilisateursOffre = data;
        });
    };

});