angular.module('app').controller('RegisterController', ['$state', 'UserApi', 'UserManager', function($state, UserApi, UserManager) {

    var self = this;

    init();

    function init() {
        self.input = {
            username: '',
            password: '',
            password_repeat: '',
            firstName: '',
            lastName: '',
            email: ''
        };
    }

    this.register = function() {
        UserApi.register(self.input, function(data) {
            if (data.error) {
                self.error = data.error;
                return;
            }

            UserManager.loadUserData();

            $state.go("home");
        });
    };

}]);
