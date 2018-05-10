angular.module('userApp', ['appRoutes', 'userControllers','contactCtrl','userServices', 'ngAnimate', 'mainController', 'authServices', 'emailController', 'managementController','dashCtrl','checkoutCtrl','reviewCtrl','donereviewCtrl','inCtrl','myordersCtrl'])


.directive('fileInput',['$parse',function($parse){
            return{
                restrict :'A',
                link:function(scope,elm,attrs){
                    elm.bind('change',function(){
                        $parse(attrs.fileInput)
                        .assign(scope,elm[0].files)
                        scope.$apply()
                    })
                }
            }
        }])


.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
