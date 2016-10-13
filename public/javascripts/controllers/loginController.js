angular.module('app').controller('LoginController', ['$state', '$window', 'UserApi', 'UserManager', function($state, $window, UserApi, UserManager) {

    var self = this;

    init();

    function init() {
        self.input = {
            username: '',
            password: ''
        };
    }

    this.login = function() {
        UserApi.login(self.input, function(data) {
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
