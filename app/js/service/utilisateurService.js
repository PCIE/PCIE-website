/**
 * Created by P10-PCIE-MAF on 09/08/2016.
 */

PCIE.service('utilisateurService', function(utilisateurFactory) {

    this.rechercherUtilisateur = function (idUtilisateur){
        return utilisateurFactory.rechercherUtilisateur(idUtilisateur).then( function (data) {
            return data;
        });
    };

    this.enregistrerUtilisateur = function(Utilisateur){
        utilisateurFactory.enregistrerUtilisateur(Utilisateur);
    };

    this.rechercherOffresUtilisateur = function(idUtilisateur){
        return utilisateurFactory.rechercherOffresUtilisateur(idUtilisateur).then(function (data) {
            return data;
        });

    };

    this.rechercherOffreUtilisateur = function(idUtilisateur,idOffre){

        return this.rechercherOffresUtilisateur(idUtilisateur).then(function (data) {

            var retour;
            var offresUtilisateur = data;

            offresUtilisateur.forEach(function(offreUtilisateur){
                if (idOffre == offreUtilisateur.idOffre) {
                    retour = offreUtilisateur;
                }
            })
            return retour;
        });
    };

    this.enregistrerOffreUtilisateur = function(idUtilisateur,idOffre,offreUtilisateur){
        utilisateurFactory.enregistrerOffreUtilisateur(idUtilisateur,idOffre,offreUtilisateur);
    };

    this.mettreAJourOffreUtilisateur = function(idUtilisateur,idOffre,offreUtilisateur){
        utilisateurFactory.mettreAJourOffreUtilisateur(idUtilisateur,idOffre,offreUtilisateur);
    };

});