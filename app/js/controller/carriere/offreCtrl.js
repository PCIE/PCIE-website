PCIE.controller('offreCtrl', function($stateParams, $scope, offreService, sessionService, competenceService) {

    $scope.offre = {};
    $scope.offres = {};
    $scope.utilisateursOffre = {};
    $scope.offreUtilisateur = {};
    $scope.competences = [];
    $scope.idOffre = $stateParams.idOffre;
    var returnedIdOffre;
    $scope.user = sessionService.getUser();
    $scope.selectedCompetences = {};

    $scope.searchTerm;
    $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
    };


    $scope.init = function(){
        $scope.offre = null;
        $stateParams = null;
        competenceService.rechercherCompetences().then(function(data){
            $scope.competences = data;
            console.log($scope.competences);
        });
    };

    $scope.rechercherOffre = function (){
        offreService.rechercherOffre($stateParams.idOffre).then(function(data){
            $scope.offre = data;
            $scope.offre.description.replace('\n','<br>');
            console.log($scope.offre.description);

            competenceService.rechercherCompetences().then(function(data){
                $scope.competences = data;
                console.log($scope.competences);
            });
        });
    };

    $scope.rechercherOffres = function (){
        offreService.rechercherOffres().then(function(data){
            $scope.offres = data;
        });
    };

    $scope.enregistrerOffre = function (){
        if($stateParams != null){

            //case mettre à jour

            offreService.mettreAJourOffre($stateParams.idOffre,$scope.offre);

        }else {

            //case enregistrer

            offreService.enregistrerOffre($scope.offre).then(function(data){
                returnedIdOffre = data.insertId;
                console.log(returnedIdOffre);
            });
        }
    };

    $scope.supprimerCompetence = function(id){
        competenceService.supprimerCompetence(idCompetence)
    }

    $scope.rechercherUtilisateursOffre = function(){
        offreService.rechercherUtilisateursOffre($stateParams.idOffre).then(function(data){
            $scope.utilisateursOffre = data;
        });
    };

    $scope.activerOffre = function(idOffre){
        offreService.activerOffre(idOffre);
    };

    $scope.desactiverOffre = function(idOffre){
        offreService.desactiverOffre(idOffre);
    };

});