/**
 * Created by P10-PCIE-MAF on 19/08/2016.
 */
PCIE.factory("competenceFactory", function( RestService, $q) {
    var rest = RestService.create('/api/competence');
    return {

        enregistrerCompetence: function (competence) {
            var deffered = $q.defer();
            rest.all("add/").post(competence).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        mettreAJourCompetence: function (idCompetence,competence) {
            var deffered = $q.defer();
            rest.all("update/"+idCompetence).post(competence).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        rechercherCompetences : function() {
            var deferred = $q.defer();
            rest.getList().then(function (data) {
                deferred.resolve(data.plain());
            });
            return deferred.promise;
        },

        supprimerCompetence: function (idCompetence) {
            var deffered = $q.defer();
            rest.all("delete/").get(idCompetence).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        activerCompetence : function (idCompetence) {
            var deffered = $q.defer();
            rest.get("activer/"+idCompetence).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        desactiverCompetence : function (idCompetence) {
            var deffered = $q.defer();
            rest.get("desactiver/"+idCompetence).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        }
    }
});