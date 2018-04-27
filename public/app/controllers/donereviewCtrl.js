angular.module('donereviewCtrl',[])

.controller('donereviewCtrl',['$scope','$http',function($scope,$http){
	
        var vm = this;
        vm.fields = [
            {label: 'Project Title', key: 'project'},
            {label: 'Description', key: 'description'},
            {label: 'File name', key: 'filename'},
            {label: 'Process', key: 'process'},
            {label: 'Material', key: 'material'},
            {label: 'Estimated Cost', key: 'cost'},
            {label: 'Final Cost', key: 'fcost'},
            {label: 'Quantity', key: 'quantity'},
            {label: 'Comment', key:'comment'},
            {label: 'Email', key: 'email'},
            {label: 'Review', key: 'review'},
              
        ];

        vm.record = {};
        vm.records = [];
        $scope.value=0;  
        
        vm.getAllRecords = function() {
        	$http.post('/api/getreviewdone').then(function(response){
                vm.records=response.data;
                console.log(response);
            }, function(response){
                console.log(response);
            });

        }

		vm.getAllRecords();

}
]);