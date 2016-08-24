/**
 * Created by P10-PCIE-MAF on 01/08/2016.
 */

PCIE.controller('utilisateurCtrl', function($q, $stateParams, $scope, $state, sessionService, utilisateurService, Upload, $http, offreService, FileSaver, Blob) {

    $scope.user = sessionService.getUser();
    console.log($scope.user);
    $scope.offresUtilisateur = [];
    $scope.offresNonPostulees = [];
    $scope.offreUtilisateur = {};
    $scope.utilisateur = {};
    $scope.newOffreUtilisateur;
    $scope.CV;
    $scope.LM;
    $scope.salaire;
    $scope.preavis;

    $scope.CVUploaded = false;
    $scope.LMUploaded = false;

    $scope.subjectRH ={};
    $scope.messageRH = {};

    var deferredCV = $q.defer();
    var deferredLM = $q.defer();

    $scope.initFormulaireCandidatOffre = function(){

        utilisateurService.offreUtilisateurExist($stateParams.idUtilisateur,$stateParams.idOffre).then(function(data){
            $scope.newOffreUtilisateur = data.numRows;
            console.log($scope.newOffreUtilisateur);
        })

        if($scope.newOffreUtilisateur!=1){

            $scope.offreUtilisateur.nom = $scope.user.nom;
            $scope.offreUtilisateur.prenom = $scope.user.prenom;
            $scope.offreUtilisateur.voie = $scope.user.voie;
            $scope.offreUtilisateur.code_postal = $scope.user.code_postal;
            $scope.offreUtilisateur.voie = $scope.user.voie;
            $scope.offreUtilisateur.ville = $scope.user.ville;
            $scope.offreUtilisateur.telephone_fixe = $scope.user.telephone_fixe;
            $scope.offreUtilisateur.telephone_portable = $scope.user.telephone_portable;
            $scope.offreUtilisateur.mail = $scope.user.mail;
            $scope.offreUtilisateur.hash = $scope.user.hash;
        }
    };

    $scope.submit = function() {

        console.log($scope.salaire_actuel);
        console.log($scope.salaire);
        console.log($scope.preavis);

        console.log($scope.CV);
        console.log($scope.LM);

        if($scope.newOffreUtilisateur==1){
            $scope.offreUtilisateur.salaire_actuel = $scope.salaire_actuel;
            $scope.offreUtilisateur.salaire = $scope.salaire;
            $scope.offreUtilisateur.preavis = $scope.preavis;
            console.log("mettreAJour");
            utilisateurService.mettreAJourOffreUtilisateur($stateParams.idUtilisateur,$stateParams.idOffre,$scope.offreUtilisateur);

        }else{
            $scope.offreUtilisateur.salaire_actuel = $scope.salaire_actuel;
            $scope.offreUtilisateur.salaire = $scope.salaire;
            $scope.offreUtilisateur.preavis = $scope.preavis;
            console.log("Enregistrer");
            utilisateurService.enregistrerOffreUtilisateur($stateParams.idUtilisateur,$stateParams.idOffre,$scope.offreUtilisateur);
        }

        if ($scope.utilisateurOffreForm.CV.$valid && $scope.CV && $scope.utilisateurOffreForm.LM.$valid && $scope.LM) {
            $scope.uploadCV($scope.CV).then(function(){
                console.log("CV upload successed");
                $scope.uploadLM($scope.LM).then(function(){
                        console.log("LM upload successed");
                        $scope.rechercherOffreUtilisateur();
                        sendMailCandidat();
                            console.log("mail candidat envoyé");
                        sendMailRH();
                            console.log("mail RH envoyé");
                    },function(){
                            console.log("LM upload failed");
                        },function(){
                            console.log("LM upload in progress");
                        }
                    )
            },function(){
                console.log("CV upload failed");
            },function(){
                console.log("CV upload in progress");
            })
        }

        console.log($scope.CV);
        console.log($scope.LM);

        $state.go('root.carriere.detailCandidatOffre',
                    {idUtilisateur : $stateParams.idUtilisateur,
                     idOffre : $stateParams.idOffre}
                )
    };

    function sendMailCandidat(){
        var subjectCandidat = "Réponse suite à votre candidature";
        var messageCandidat = "Bonjour,\n Nous vous remercions de l'intérêt que vous portez à notre entreprise, nous en sommes même très honorés!\n Conscient que vous avez très envie que nous vous répondions, nous profitons de ce mail automatique pour le faire et vous dire merci!";

        $http({method:'GET', url:'/send/', params: {to: $scope.offreUtilisateur.mail,subject: subjectCandidat, text: messageCandidat, RH : '2'} });
    }

    function sendMailRH(){
        var subjectRH = "Un nouveau candidat à postulé à l'offre: "+ $scope.offreUtilisateur.titre;

        var messageRH =
            "nom                 : " + $scope.offreUtilisateur.nom + "\n" +
            "prenom              : " + $scope.offreUtilisateur.prenom + "\n" +
            "voie                : " + $scope.offreUtilisateur.voie + "\n" +
            "code postal         : " + $scope.offreUtilisateur.code_postal + "\n" +
            "ville               : " + $scope.offreUtilisateur.ville + "\n" +
            "téléphone fixe      : " + $scope.offreUtilisateur.telephone_fixe + "\n" +
            "téléphone portable  : " + $scope.offreUtilisateur.telephone_portable + "\n" +
            "mail                : " + $scope.offreUtilisateur.mail + "\n" +
            "lettre de motivation: " + $scope.offreUtilisateur.lettre_de_motivation + "\n" +
            "curriculum vitae    : " + $scope.offreUtilisateur.curriculum_vitae + "\n" +
            "salaire souhaité    : " + $scope.offreUtilisateur.salaire + "\n" +
            "préavis             :   " + $scope.offreUtilisateur.preavis;

        $http({method:'GET', url:'/send/', params: {
            to: "julien.dalbin@gmail.com",
            subject: subjectRH,
            text: messageRH,
            curriculum_vitae: $scope.CV.name,
            lettre_de_motivation: $scope.LM.name,
            RH : '1'
        }
        });
    }

    $scope.downloadCV = function(){

        $http({method:'GET', url:'/download/', params: {name: $scope.offreUtilisateur.curriculum_vitae}}).then(function(succ,err) {

            console.log(succ);
            console.log(succ.data);
            //var blob = new Blob([succ.data]);
            var blob = new Blob([succ.data], {type: "application/pdf"});
  
            FileSaver.saveAs(blob, $scope.offreUtilisateur.curriculum_vitae);
        });
        /*success(function(data, status, headers, config) {
            console.log(data);
            var element = angular.element('<a/>');
            element.attr({
                href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
                target: '_blank',
                download: $scope.offreUtilisateur.curriculum_vitae
            })[0].click();
        }).
        error(function(data, status, headers, config) {
            console.log(data);
        });*/
    };

    $scope.downloadLM = function(){

        $http({method:'GET', url:'/download/', params: {name: $scope.offreUtilisateur.lettre_de_motivation}}).then(function(succ,err) {
            var blob = new Blob([succ.data], {type: "application/pdf"});
            FileSaver.saveAs(blob, $scope.offreUtilisateur.lettre_de_motivation);
        });

    };
    $scope.uploadCV = function (file) {

        return Upload.upload({
            url: '/upload/',
            data: {file: file, 'username': $scope.username, 'idUtilisateur': $stateParams.idUtilisateur, 'idOffre' : $stateParams.idOffre,'ref' : 'CV'},
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            deferredCV.resolve('Upload CV terminé');
            return deferredCV.promise;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            deferredCV.reject('Upload CV failed');
            return deferredCV.promise;
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            deferredCV.notify('Upload CV in progress : '+progressPercentage);
            return deferredCV.promise;
        });
    };

    $scope.uploadLM = function (file) {

        return Upload.upload({
            url: '/upload/',
            data: {file: file, 'username': $scope.username, 'idUtilisateur': $stateParams.idUtilisateur, 'idOffre' : $stateParams.idOffre,'ref' : 'LM'},
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            deferredLM.resolve('Upload LM terminé');
            return deferredLM.promise;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            deferredLM.reject('Upload LM failed');
            return deferredLM.promise;
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            deferredLM.notify('Upload LM in progress : '+progressPercentage);
            return deferredLM.promise;
        });
    };

    $scope.init = function(){
        console.log($stateParams);
        $stateParams = null;

    };

    $scope.enregistrerUtilisateur = function(){
        utilisateurService.enregistrerUtilisateur($scope.utilisateur);
    };

    $scope.rechercherOffresUtilisateur = function(){
        utilisateurService.rechercherOffresUtilisateur(sessionService.getUser().idUtilisateur).then(function(data){
            $scope.offresUtilisateur =  data;
        });

        $scope.user = sessionService.getUser();
    };

    $scope.rechercherOffreUtilisateur = function(){

        console.log($stateParams.idUtilisateur);
        console.log($stateParams.idOffre);

        utilisateurService.rechercherOffreUtilisateur($stateParams.idUtilisateur, $stateParams.idOffre).then(function(data){
            $scope.offreUtilisateur = data;
            console.log($scope.offreUtilisateur);
        });
    };

    $scope.mettreAJourCommentaireCandidat = function(){
        utilisateurService.mettreAJourCommentaireCandidat($stateParams.idUtilisateur, $stateParams.idOffre, $scope.offreUtilisateur);
    }

    $scope.rechercherOffresNonPostulees = function(){
        utilisateurService.rechercherOffresNonPostulees($scope.user.idUtilisateur).then(function(data){
            $scope.offresNonPostulees = data;
            console.log($scope.offresNonPostulees);
        });
    }

});