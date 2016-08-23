/**
 * Created by P10-PCIE-MAF on 22/08/2016.
 */
PCIE.controller('competenceCtrl', function( $scope, competenceService) {

    $scope.competences = [];
    $scope.competence = {};

    $scope.enregistrerCompetence = function(){
        competenceService.enregistrerCompetence(competence);
    };

    $scope.rechercherCompetences = function (){
        competenceService.rechercherCompetences().then(function(data){
            $scope.competences = data;
            console.log($scope.competences);
        });
    };

    $scope.editCompetence=function(competence){
        $scope.mettreAJour = 1;
        $scope.competence = competence;
    };

    $scope.ajouterCompetence=function(competence){
        $scope.mettreAJour = 0;
        $scope.competence = competence;
    };

    $scope.enregistrerCompetence = function(competence){
        if($scope.mettreAJour == 1){
            competenceService.mettreAJourCompetence(competence.idcompetence,competence);
        }else{
            console.log("enregistrer");
            console.log($scope.competence);
            competenceService.enregistrerCompetence(competence);
        }
    };

    $scope.mettreAJourCompetence = function (competence){
        competenceService.mettreAJourCompetence(competence.idcompetence,competence);
    };

    supprimerCompetence = function(idCompetence){
        competenceService.supprimerCompetence(idCompetence);
    };

    $scope.activerCompetence = function(idCompetence){
        competenceService.activerCompetence(idCompetence);
    };

    $scope.desactiverCompetence = function(idCompetence){
        competenceService.desactiverCompetence(idCompetence);
    };

});
