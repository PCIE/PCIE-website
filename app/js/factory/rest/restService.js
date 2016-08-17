PCIE.factory("RestService", [ "Restangular", "$rootScope", function(Restangular, $rootScope) {
	return {
		create : function(service) {

			return Restangular.all(service);
		}
	}
} ]);
