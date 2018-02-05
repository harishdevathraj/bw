angular.module('userApp', ['appRoutes', 'userControllers','contactCtrl','userServices', 'ngAnimate', 'mainController', 'authServices', 'emailController', 'managementController'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
