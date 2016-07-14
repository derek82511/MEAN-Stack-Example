angular.module('app').controller('LoginController', ['$state', 'UserApi', 'UserManager', function($state, UserApi, UserManager) {

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

            UserManager.loadUserData();

            $state.go("home");
        });
    };

}]);
