angular.module('app').factory('MessageApi', ['$http', function($http) {

    var service = {};

    service.getMessages = function(userId, onSuccess) {
        $http.get('/message/user/' + userId).
        success(function(data, status, headers, config) {
            (onSuccess || angular.noop)(data);
        }).
        error(function(data, status, headers, config) {
            alert("Error - Data:" + data + " status:" + status);
        });
    };

    service.addMessage = function(message, onSuccess) {
        $http.post('/message', message).
        success(function(data, status, headers, config) {
            (onSuccess || angular.noop)(data);
        }).
        error(function(data, status, headers, config) {
            alert("Error - Data:" + data + " status:" + status);
        });
    };

    service.updateMessage = function(message, onSuccess) {
        $http.put('/message/' + message._id, message).
        success(function(data, status, headers, config) {
            (onSuccess || angular.noop)(data);
        }).
        error(function(data, status, headers, config) {
            alert("Error - Data:" + data + " status:" + status);
        });
    };

    service.deleteMessage = function(message, onSuccess) {
        $http.delete('/message/' + message._id).
        success(function(data, status, headers, config) {
            (onSuccess || angular.noop)(data);
        }).
        error(function(data, status, headers, config) {
            alert("Error - Data:" + data + " status:" + status);
        });
    };

    return service;
}]);
