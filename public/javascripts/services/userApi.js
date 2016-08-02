angular.module('app').factory('UserApi', ['$http', function($http) {

    var service = {};

    service.getUser = function(onSuccess) {
        $http.get(ContextPath + '/user').
        success(function(data, status, headers, config) {
            (onSuccess || angular.noop)(data);
        }).
        error(function(data, status, headers, config) {
            alert("Error - Data:" + data + " status:" + status);
        });
    };

    service.register = function(user, onSuccess) {
        $http.post(ContextPath + '/user/register', user).
        success(function(data, status, headers, config) {
            (onSuccess || angular.noop)(data);
        }).
        error(function(data, status, headers, config) {
            alert("Error - Data:" + data + " status:" + status);
        });
    };

    service.login = function(loginForm, onSuccess) {
        $http.post(ContextPath + '/user/login', loginForm).
        success(function(data, status, headers, config) {
            (onSuccess || angular.noop)(data);
        }).
        error(function(data, status, headers, config) {
            alert("Error - Data:" + data + " status:" + status);
        });
    };

    return service;
}]);
