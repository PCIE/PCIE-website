PCIE.factory("authFactory", function(RestService, $q) {
    var rest = RestService.create('auth');
    return {
        login: function (user) {
            var deffered = $q.defer();
            rest.post(user).then(function (data) {
                deffered.resolve(data.plain());
            });
            return deffered.promise;
        }
    }
});