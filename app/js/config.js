PCIE.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');


    $stateProvider
        .state('root', {
            url: '',
            abstract: true,
            views: {
                'footer': {
                    templateUrl: '../views/footer.html'
                },
                'header': {
                    templateUrl: '../views/header.html'
                }
            }
        })
        .state('root.accueil', {
            url: '/',
            views: {
                'container@': {
                    templateUrl: '../views/accueil.html'
                }
            }
        })
        .state('root.pcie', {
            url: '/pcie',
            views: {
                'container@': {
                    templateUrl: '../views/pcie/pcie.html',
                    controller: 'pcieCtrl'
                }
            }
        })
        .state('root.service', {
            url: '/service',
            views: {
                'container@': {
                    templateUrl: '../views/service/service.html',
                    controller: 'serviceCtrl'
                }
            }
        })
        .state('root.carriere', {
            url: '/carriere',
            views: {
                'container@': {
                    templateUrl: '../views/carriere/carriere.html',
                    controller: 'carriereCtrl'
                }
            }
        })
        .state('root.carriere.detailOffre', {
            url: '/detailOffre/:idOffre',
            views: {
                'container@': {
                    templateUrl: '../views/carriere/detailOffre.html',
                    controller: 'offreCtrl'
                }
            }
        })

        .state('root.carriere.detailCandidatOffre', {
            url: '/detailCandidatOffre/:idUtilisateur/:idOffre',
            views: {
                'container@': {
                    templateUrl: '../views/carriere/detailCandidatOffre.html',
                    controller: 'utilisateurCtrl'
                }
            }
        })

            .state('root.carriere.PostulantsOffre', {
            url: '/PostulantsOffre/:idOffre',
            views: {
                'container@': {
                    templateUrl: '../views/carriere/PostulantsOffre.html',
                    controller: 'offreCtrl'
                }
            }
        })

        .state('root.carriere.formulaireOffre', {
            url: '/formulaireOffre/:idOffre?',
            views: {
                'container@': {
                    templateUrl: '../views/carriere/formulaireOffre.html',
                    controller: 'offreCtrl'
                }
            }
        })

        .state('root.carriere.formulaireCandidat', {
            url: '/formulaireCandidat',
            views: {
                'container@': {
                    templateUrl: '../views/carriere/formulaireCandidat.html',
                    controller: 'utilisateurCtrl'
                }
            }
        })

        .state('root.carriere.formulaireCandidatOffre', {
            url: '/formulaireCandidatOffre/:idUtilisateur/:idOffre',
            views: {
                'container@': {
                    templateUrl: '../views/carriere/formulaireCandidatOffre.html',
                    controller: 'utilisateurCtrl'
                }
            }
        })

        .state('root.carriere.espaceCandidat', {
            url: '/espaceCandidat',
            views: {
                'container@': {
                    templateUrl: '../views/carriere/espaceCandidat.html',
                    controller: 'utilisateurCtrl'
                }
            }
        })

        .state('root.carriere.mentionsLegales', {
            url: '/mentionLegales/:idOffre',
            views: {
                'container@': {
                    templateUrl: '../views/carriere/mentionLegales.html',
                    controller: 'offreCtrl'
                }
            }
        })

        .state('root.carriere.espaceRH', {
            url: '/espaceRH',
            views: {
                'container@': {
                    templateUrl: '../views/carriere/espaceRH.html',
                    controller: 'offreCtrl'
                }
            }
        })

        .state('tiny', {
            url: '',
            abstract: true,
            views: {
                'footer': {
                    templateUrl: '../views/footer.html'
                },
                'header': {
                    templateUrl: '../views/tinyHeader.html'
                }
            }
        })
        .state('tiny.mentionsLegales', {
            url: '/mentionsLegales',
            views: {
                'container@': {
                    templateUrl: '../views/mentions-legales.html'
                }
            }
        })


});