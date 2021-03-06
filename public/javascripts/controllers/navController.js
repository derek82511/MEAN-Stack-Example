angular.module('app').controller('NavController', ['$state', '$window', 'UserManager', function($state, $window, UserManager) {

    var self = this;

    init();

    function init() {
        var navContainer = document.getElementById('navContainer');
        navContainer.className = 'container-fluid';
    }

    this.isPermit = function(permitRole) {
        if (UserManager.user) {
            return UserManager.user.roles.indexOf(permitRole) > -1;
        }
        return false;
    };

    this.logout = function() {
        delete $window.sessionStorage.token;
        UserManager.loadUserData();

        $state.go('home');
    };

}]);
