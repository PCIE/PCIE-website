/**
 * Created by P10-PCIE-MAF on 01/08/2016.
 */

PCIE.controller('utilisateurCtrl', function($stateParams, $scope, sessionService, utilisateurService, Upload, $http, offreService) {

    $scope.offresUtilisateur;
    $scope.offreUtilisateur;
    $scope.utilisateur;
    $scope.CV;
    $scope.LM;
    $scope.salaire;
    $scope.preavis;
    $scope.subjectCandidat = "Réponse suite à votre candidature";
    $scope.messageCandidat = "Bonjour,\n Nous vous remercions de l'intérêt que vous portez à notre entreprise, nous en sommes même très honorés!\n Conscient que vous avez très envie que nous vous répondions, nous profitons de ce mail automatique pour le faire et vous dire merci!";

    $scope.CVUploaded = false;
    $scope.LMUploaded = false;

    $scope.subjectRH ={};
    $scope.messageRH = {};

    $scope.submit = function() {

        $scope.rechercherOffreUtilisateur();
        console.log($scope.salaire);
        console.log($scope.preavis);

        if($scope.offreUtilisateur!=null && $scope.offreUtilisateur!={}){
            $scope.offreUtilisateur.salaire = $scope.salaire;
            $scope.offreUtilisateur.preavis = $scope.preavis;
            console.log("mettreAJour");
            utilisateurService.mettreAJourOffreUtilisateur($stateParams.idUtilisateur,$stateParams.idOffre,$scope.offreUtilisateur);
        }else{
            console.log("Enregistrer");
            $scope.offreUtilisateur.salaire = $scope.salaire;
            $scope.offreUtilisateur.preavis = $scope.preavis;
            utilisateurService.enregistrerOffreUtilisateur($stateParams.idUtilisateur,$stateParams.idOffre,$scope.offreUtilisateur);
        }


        if ($scope.utilisateurOffreForm.CV.$valid && $scope.CV) {
            $scope.uploadCV($scope.CV);
        }
        if ($scope.utilisateurOffreForm.LM.$valid && $scope.LM) {
            $scope.uploadLM($scope.LM);
        }

        console.log($scope.CV);
        console.log($scope.LM);

        $http({method:'GET', url:'/send/', params: {to: $scope.offreUtilisateur.mail,subject: $scope.subjectCandidat, text: $scope.messageCandidat, RH : '2'} });

        $scope.rechercherOffreUtilisateur();

        $scope.subjectRH = "Un nouveau candidat à postulé à l'offre: "+ $scope.offreUtilisateur.titre;

        $scope.messageRH =
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

        console.log($scope.CV);
        console.log($scope.LM);

        $http({method:'GET', url:'/send/', params: {
                            to: "julien.dalbin@gmail.com",
                            subject: $scope.subjectRH,
                            text: $scope.messageRH,
                            curriculum_vitae: $scope.offreUtilisateur.curriculum_vitae,
                            lettre_de_motivation: $scope.offreUtilisateur.lettre_de_motivation,
                            RH : '1'
                        }
        });

    };

    $scope.downloadCV = function(){

        $http({method:'GET', url:'/download/', params: {name: $scope.offreUtilisateur.curriculum_vitae}}).
        success(function(data, status, headers, config) {
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
        });
    };

    $scope.downloadLM = function(){

        $http({method:'GET', url:'/download/', params: {name: $scope.offreUtilisateur.lettre_de_motivation}}).
        success(function(data, status, headers, config) {
            var element = angular.element('<a/>');
            element.attr({
                href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
                target: '_blank',
                download: $scope.offreUtilisateur.lettre_de_motivation
            })[0].click();
        }).
        error(function(data, status, headers, config) {
        });
    };

    $scope.uploadCV = function (file) {

        Upload.upload({
            url: '/upload/',
            data: {file: file, 'username': $scope.username, 'idUtilisateur': $stateParams.idUtilisateur, 'idOffre' : $stateParams.idOffre,'ref' : 'CV'},
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            return false;
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.uploadLM = function (file) {

        Upload.upload({
            url: '/upload/',
            data: {file: file, 'username': $scope.username, 'idUtilisateur': $stateParams.idUtilisateur, 'idOffre' : $stateParams.idOffre,'ref' : 'LM'},
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
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

});