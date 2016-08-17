/**
 * Created by P10-PCIE-MAF on 02/08/2016.
 */
/**
 * Created by P10-PCIE-MAF on 01/08/2016.
 */
PCIE.factory("offreFactory", function( RestService, $q) {
    var rest = RestService.create('offre');
    return {
        rechercherOffre : function(idOffre) {
            var deffered = $q.defer();
            rest.get(idOffre).then(function(data) {
                deffered.resolve(data.plain());
            });
            return deffered.promise;
        },

        enregistrerOffre : function(Offre) {
            var deffered = $q.defer();
            rest.all("add").post(Offre).then(function () {
                deffered.resolve();
            });
            return deffered.promise;
        },

        mettreAJourOffre : function(Offre) {
        var deffered = $q.defer();
        rest.all("update/"+Offre.idOffre).post(Offre).then(function () {
            deffered.resolve();
        });
        return deffered.promise;
    },

        rechercherOffres : function() {
            var deffered = $q.defer();
            rest.getList().then(function (data) {
                console.log('toto =' +data);
                deffered.resolve(data.plain());
            });
            return deffered.promise;
        },

        rechercherUtilisateursOffre : function(idOffre) {
            var deffered = $q.defer();
            rest.all("utilisateurs").get(idOffre).then(function (data) {
                console.log('toto =' +data);
                deffered.resolve(data.plain());
            });
            return deffered.promise;
        }
    }
});