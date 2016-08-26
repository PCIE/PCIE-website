/**
 * Created by P10-PCIE-MAF on 25/08/2016.
 */
function authInterceptor($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                console.log("not authorised");
                $state.go('root.carriere');
            }
            return $q.reject(rejection);
        }
    };
};

angular
    .module('PCIE')
    .factory('authInterceptor', authInterceptor);