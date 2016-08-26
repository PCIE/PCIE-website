PCIE.controller("loginCtrl",function($window, $state, $rootScope, $scope, authFactory, sessionService,utilisateurService,$http) {

    var vm = this;
    // model du formulaire de login
    $scope.userData = {};
    $scope.loginError = '';
    $scope.utilisateur;
    $scope.mail;

    $scope.login = function(){
        authFactory.login($scope.userData).then(function (data) {
            if(data.user) {
                sessionService.setUser(data.user);
                $window.sessionStorage.token = data.user.token;
                console.log(sessionService.getUser());

                if(sessionService.getUser().idrang ==2){
                    $state.go('root.carriere.espaceCandidat');
                }
                if(sessionService.getUser().idrang == 4){
                    $state.go('root.carriere.espaceRH');
                }
            }
        });
    }

    $scope.resendMail = function (mail){

        console.log(mail);

        utilisateurService.rechercherUtilisateurByMail(mail).then(function(data){
            console.log(data);
            $scope.utilisateur = data;

            console.log($scope.utilisateur.idUtilisateur);

            var nouveauPassword = passwordAleatoire();

            console.log(nouveauPassword);

            utilisateurService.enregistrerPasswordUtilisateur(nouveauPassword,$scope.utilisateur.idUtilisateur);

            var subject = "Nouveau mot de passe :  ";
            var message =
                "Votre nouveau mot de passe est "+ nouveauPassword;

            $http({method:'GET', url:'/sendNewPassword/', params: {
                to: "julien.dalbin@gmail.com",
                subject: subject,
                text: message
            }
            });
        });
    }

    passwordAleatoire = function() {
        var ListeCar = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9");
        var Chaine ='';
        for(i = 0; i < 8; i++)
        {
            Chaine = Chaine + ListeCar[Math.floor(Math.random()*ListeCar.length)];
        }
        return Chaine;
    }
});