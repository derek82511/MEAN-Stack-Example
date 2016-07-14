angular.module('app').controller('NavController', ['UserManager', function(UserManager) {

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


}]);
