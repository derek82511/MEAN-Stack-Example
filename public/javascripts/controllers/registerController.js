angular.module('app').controller('RegisterController', ['$state', '$window', 'UserApi', 'UserManager', function($state, $window, UserApi, UserManager) {

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

            $window.sessionStorage.token = data.token;

            UserManager.loadUserData();

            $state.go("home");
        });
    };

}]);
