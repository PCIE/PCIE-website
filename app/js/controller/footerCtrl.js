PCIE.controller('footerCtrl', function ($scope, LocalFactory, $location, anchorService) {
        "use strict";

        LocalFactory.menu().then(function (response) {
            $scope.footerMenu = response;
        });

    $scope.scrollTo = function (page, anchor) {
        $location.url(page);
        anchorService.setAnchor(anchor);
    };


    }
);
