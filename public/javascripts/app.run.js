angular.module('app').run(['$state', 'UserManager', function ($state, UserManager){
	
	UserManager.loadUserData();

	$state.go("home");
	
}]);