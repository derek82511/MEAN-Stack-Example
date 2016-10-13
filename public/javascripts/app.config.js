angular.module('app').config(['$stateProvider', '$httpProvider', function($stateProvider, $httpProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: ContextPath + '/public/templates/home.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: ContextPath + '/public/templates/register.html',
            controller: 'RegisterController',
            controllerAs: 'registerCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: ContextPath + '/public/templates/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        })
        .state('message', {
            url: '/message',
            templateUrl: ContextPath + '/public/templates/message.html',
            controller: 'MessageController',
            controllerAs: 'messageCtrl'
        })

    $httpProvider.interceptors.push('AuthInterceptor');

}]);
