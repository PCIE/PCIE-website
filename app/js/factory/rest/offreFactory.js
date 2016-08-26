/**
         * Created by P10-PCIE-MAF on 02/08/2016.
         */
        /**
         * Created by P10-PCIE-MAF on 01/08/2016.
         */
        PCIE.factory("offreFactory", function( RestService, $q) {
        var rest = RestService.create('/');
        return {
            rechercherOffre : function(idOffre) {
                var deferred = $q.defer();
                rest.get("api/offre/"+idOffre).then(function(data) {
                    deferred.resolve(data.plain());
                });
                return deferred.promise;
            },

            enregistrerOffre : function(Offre) {
                return rest.all("/api/offre/add").post(Offre);
            },

            mettreAJourOffre : function(idOffre,Offre) {
                var deferred = $q.defer();
                rest.all("api/offre/update/"+idOffre).post(Offre).then(function () {
                    deferred.resolve();
                });
                return deferred.promise;
            },

            rechercherOffres : function() {
                var deferred = $q.defer();
                rest.all("offre").getList().then(function (data) {
                    deferred.resolve(data.plain());
                });
                return deferred.promise;
            },

            rechercherUtilisateursOffre : function(idOffre) {
                var deferred = $q.defer();
                rest.all("api/offre/utilisateurs").get(idOffre).then(function (data) {
                    deferred.resolve(data.plain());
                });
                return deferred.promise;
            },

            rechercherCompetencesOffre : function(idOffre) {
                var deferred = $q.defer();
                rest.all("api/offre/competences").get(idOffre).then(function (data) {
                    deferred.resolve(data.plain());
                });
                return deferred.promise;
            },

            activerCompetence : function (idOffre) {
                var deffered = $q.defer();
                rest.get("api/offre/activer/"+idOffre).then(function () {
                    deffered.resolve();
                });
                return deffered.promise;
            },

            desactiverCompetence : function (idOffre) {
                var deffered = $q.defer();
                rest.get("api/offre/desactiver/"+idOffre).then(function () {
                    deffered.resolve();
                });
                return deffered.promise;
            }
    }
});