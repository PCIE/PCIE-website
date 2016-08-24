/**
 * Created by P10-PCIE-MAF on 01/08/2016.
 */
PCIE.factory("utilisateurFactory", function(RestService, $q) {
    var rest = RestService.create('utilisateur');
    return {
        rechercherUtilisateur: function (idUtilisateur) {
            var deffered = $q.defer();
            rest.get(idUtilisateur).then(function (data) {
                deffered.resolve(data.plain());
            });
            return deffered.promise;
        },

        enregistrerUtilisateur: function (utilisateur) {
            var deffered = $q.defer();
            rest.all("add").post(utilisateur).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },
        mettreAJourUtilisateur: function (idUtilisateur, data ) {
            var deffered = $q.defer();
            rest.all("/update/" + idUtilisateur).post(data).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        rechercherOffresUtilisateur: function (idUtilisateur) {
            var deffered = $q.defer();
            rest.all("offres").get(idUtilisateur).then(function (data) {
                deffered.resolve(data.plain());
            });
            return deffered.promise;
        },

        mettreAJourOffreUtilisateur: function (idUtilisateur, idOffre, data ) {
            var deffered = $q.defer();
            rest.all("/offre/update/" + idUtilisateur + "/" + idOffre).post(data).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        mettreAJourCommentaireCandidat: function (idUtilisateur, idOffre, data ) {
            var deffered = $q.defer();
            rest.all("/candidat/update/" + idUtilisateur + "/" + idOffre).post(data).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        enregistrerOffreUtilisateur: function (idUtilisateur,idOffre,data) {
            var deffered = $q.defer();
            rest.all("/offre/add/" + idUtilisateur + "/" + idOffre).post(data).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        offreUtilisateurExist: function (idUtilisateur,idOffre) {
            var deffered = $q.defer();
            rest.all("offre/exist").get(idUtilisateur + "/" + idOffre).then(function (data) {
                deffered.resolve(data);
            });
            return deffered.promise;
        },

        rechercherOffresNonPostulees: function (idUtilisateur) {
            var deffered = $q.defer();
            rest.all("offre/nonPostulees").get(idUtilisateur).then(function (data) {
                deffered.resolve(data.plain());
            });
            return deffered.promise;
        }
    }
})
