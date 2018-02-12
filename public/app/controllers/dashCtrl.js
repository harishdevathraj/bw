angular.module('dashCtrl',[])

/*.controller('dashCtrl', function($http){
	
	this.dashUser= function(dashData){
		$http.post('/api/quote', this.dashData);
		console.log('blahhhhh' + dashData);
	}
});


 userApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
            $scope.uploadFile = function(){
               var file = $scope.myFile;
               
               console.log('file is ' );
               console.dir(file);
               
               var uploadUrl = "/fileUpload";
               fileUpload.uploadFileToUrl(file, uploadUrl);
            };
         }]);*/

        .controller('dashCtrl',['$scope','$http', function($scope,$http){
            $scope.filesChanged=function(elm){
                $scope.files=elm.files
                $scope.$apply();
                
            }
            $scope.upload=function(){
                var fd= new FormData()
                angular.forEach($scope.files,function(file){
                    fd.append('file',file)
                })
                $http.post('api/quote',fd,
                {
                    transformRequest: angular.identity,
                    headers:{'Content-Type':undefined}
                })
                .success(function(d){
                    console.log(d)
                })
            }
            }
        ])