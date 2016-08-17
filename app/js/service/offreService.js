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

    this.enregistrerOffre = function (Offre){
        offreFactory.enregistrerOffre(offre);
    };

    this.mettreAJourOffre = function (idOffre,Offre){
        offreFactory.mettreAJourOffre(offre);
    };

    this.rechercherUtilisateursOffre = function(idOffre){
        return offreFactory.rechercherUtilisateursOffre(idOffre).then(function (data) {
            return data;
        });
    };
});