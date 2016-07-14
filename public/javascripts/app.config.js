angular.module('app').config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/templates/home.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: '/templates/register.html',
            controller: 'RegisterController',
            controllerAs: 'registerCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/templates/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        })
        .state('message', {
            url: '/message',
            templateUrl: '/templates/message.html',
            controller: 'MessageController',
            controllerAs: 'messageCtrl'
        })
}]);
