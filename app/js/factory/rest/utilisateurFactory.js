/**
 * Created by P10-PCIE-MAF on 01/08/2016.
 */
PCIE.factory("utilisateurFactory", function(RestService, $q) {
    var rest = RestService.create('/');
    return {

        enregistrerPasswordUtilisateur: function (password,idUtilisateur) {
            var deffered = $q.defer();
            rest.get("savePasswordUtilisateur/"+password+"/"+idUtilisateur).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        rechercherUtilisateurByMail: function (mail) {
            var deffered = $q.defer();
            rest.get("utilisateurByMail/"+mail).then(function (data) {
                deffered.resolve(data);
        });
            return deffered.promise;
        },

        rechercherUtilisateur: function (idUtilisateur) {
            var deffered = $q.defer();
            rest.get("api/utilisateur/"+idUtilisateur).then(function (data) {
                deffered.resolve(data.plain());
            });
            return deffered.promise;
        },

        enregistrerUtilisateur: function (utilisateur) {
            var deffered = $q.defer();
            rest.all("api/utilisateur/add").post(utilisateur).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },
        mettreAJourUtilisateur: function (idUtilisateur, data ) {
            var deffered = $q.defer();
            rest.all("api/utilisateur/update/" + idUtilisateur).post(data).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        rechercherOffresUtilisateur: function (idUtilisateur) {
            var deffered = $q.defer();
            rest.all("api/utilisateur/offres").get(idUtilisateur).then(function (data) {
                deffered.resolve(data.plain());
            });
            return deffered.promise;
        },

        mettreAJourOffreUtilisateur: function (idUtilisateur, idOffre, data ) {
            var deffered = $q.defer();
            rest.all("api/utilisateur/offre/update/" + idUtilisateur + "/" + idOffre).post(data).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        mettreAJourCommentaireCandidat: function (idUtilisateur, data ) {
            var deffered = $q.defer();
            rest.all("api/utilisateur/candidat/update/" + idUtilisateur).post(data).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        enregistrerOffreUtilisateur: function (idUtilisateur,idOffre,data) {
            var deffered = $q.defer();
            rest.all("api/utilisateur/offre/add/" + idUtilisateur + "/" + idOffre).post(data).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        offreUtilisateurExist: function (idUtilisateur,idOffre) {
            var deffered = $q.defer();
            rest.all("api/utilisateur/offre/exist").get(idUtilisateur + "/" + idOffre).then(function (data) {
                deffered.resolve(data);
            });
            return deffered.promise;
        },

        rechercherOffresNonPostulees: function (idUtilisateur) {
            var deffered = $q.defer();
            rest.all("api/utilisateur/offre/nonPostulees").get(idUtilisateur).then(function (data) {
                deffered.resolve(data.plain());
            });
            return deffered.promise;
        },

        enregistrerCandidatureSpontanee: function (utilisateur) {
            var deffered = $q.defer();
            rest.all("api/utilisateur/candidatureSpontanee").post(utilisateur).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        }
    }
})
