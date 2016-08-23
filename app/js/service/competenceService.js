/**
 * Created by P10-PCIE-MAF on 19/08/2016.
 */
PCIE.service('competenceService', function(competenceFactory) {

    this.enregistrerCompetence = function (competence){
        competenceFactory.enregistrerCompetence(competence);
    };

    this.supprimerCompetence = function (idCompetence){
        competenceFactory.supprimerCompetence(idCompetence);
    };

    this.rechercherCompetences = function (){
        return competenceFactory.rechercherCompetences().then(function (data) {
            return data;
        });
    };

    this.mettreAJourCompetence = function (idCompetence,competence){
        competenceFactory.mettreAJourCompetence(idCompetence,competence);
    };

    this.activerCompetence = function(idCompetence){
        competenceFactory.activerCompetence(idCompetence);
    };

    this.desactiverCompetence = function(idCompetence){
        competenceFactory.desactiverCompetence(idCompetence);
    };

});