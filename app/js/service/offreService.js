PCIE.service('offreService', function(offreFactory) {

    this.rechercherOffre = function (idOffre){
        return offreFactory.rechercherOffre(idOffre).then(function (data) {
            return data[0];
        });
    };

    this.rechercherOffres = function (){
        return offreFactory.rechercherOffres().then(function (data) {
            return data;
        });
    };

    this.enregistrerOffre = function (offre){
        return offreFactory.enregistrerOffre(offre).then(function(data){
            return data;
        });
    };

    this.mettreAJourOffre = function (idOffre,offre){
        offreFactory.mettreAJourOffre(idOffre,offre);
    };

    this.rechercherUtilisateursOffre = function(idOffre){
        return offreFactory.rechercherUtilisateursOffre(idOffre).then(function (data) {
            return data;
        });
    };

    this.rechercherCompetencesOffre = function(idOffre){
        return offreFactory.rechercherCompetencesOffre(idOffre).then(function (data) {
            return data;
        });
    };

    this.activerOffre = function(idOffre){
        offreFactory.activerCompetence(idOffre);
    };

    this.desactiverOffre = function(idOffre){
        offreFactory.desactiverCompetence(idOffre);
    };

});