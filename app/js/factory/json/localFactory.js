PCIE.factory("LocalFactory", function ($http, $q) {
    return {
        menu: function () {
            var deffered = $q.defer();
            $http.get('data/menu.json').success(function (response) {
                deffered.resolve(response.menu);
            })
            return deffered.promise;
        }
    }
});