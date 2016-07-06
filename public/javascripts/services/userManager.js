angular.module('app').factory('UserManager', ['UserApi', function (UserApi) {

    var service = {};

    service.loadUserData = function(){
        UserApi.getUser(function(data){
        	if(!data){
        		data = {
        			roles: ['anonymous']
        		};
        	}
            service.user = data;
        });
    };

    return service;
}]);