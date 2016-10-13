angular.module('app').factory('AuthInterceptor', ['$q', '$window', '$location', '$timeout', function($q, $window, $location, $timeout) {
    return {
        request: function(config) {
            config.headers = config.headers || {};

            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }

            return config;
        },
        responseError: function(response) {
            if (response.status === 401) {
                delete $window.sessionStorage.token;

                alert('Authentication is expired. Please Login again.');

                $window.location.href = $location.absUrl().split('#')[0];
            }
            return response || $q.when(response);
        }
    };
}]);
