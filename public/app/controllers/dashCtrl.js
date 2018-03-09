angular.module('dashCtrl',[])

    .controller('dashCtrl',['$scope','$http', function($scope,$http){

        var vm = this;
        vm.fields = [
            {label: 'Project Title', key: 'project'},
            {label: 'Description', key: 'description'},
            {label: 'File name', key: 'filename'},
            {label: 'Process', key: 'process'},
            {label: 'Material', key: 'material'}
            
        ];
        vm.record = {};
        vm.records = [];
        console.log('record details');
        console.log(vm.record);
        
    $scope.branches = [
      { id: 'FDM', name: 'FDM'},
      { id: 'SLS', name: 'SLS'},
      { id: 'SLA', name: 'SLA'},
      { id: 'FDM', name: 'Don\'t know'}
    ];

  $scope.locations = [
      { id: 1, branchId: 'FDM', name: 'PLA'},
      { id: 2, branchId: 'FDM', name: 'ABS'},
      { id: 3, branchId: 'SLS', name: 'PA 2200'},
      { id: 4, branchId: 'SLS', name: 'NYLON 12'},
      { id: 5, branchId: 'SLA', name: 'VISIJET'},
      { id: 6, branchId: 'SLA', name: 'Accura 25'},
      { id: 7, branchId: 'SLA', name: 'Accura 60'}
    ];

    $scope.loadLocations = function(branchId) {
      console.log('Selected BranchId: ' + branchId);
      vm.record.process= branchId; 
      vm.record.material= 'TEST';
    }

        $scope.filesChanged=function(elm){
            $scope.files=elm.files
            $scope.$apply();
        }
        $scope.upload=function(){
            var fd= new FormData()
            angular.forEach($scope.files,function(file){
                fd.append('file',file)
            })
            $http.post('api/upload',fd,
            {
                transformRequest: angular.identity,
                headers:{'Content-Type':undefined}
            })
            .success(function(d){
                console.log(d);
            })
        }

            vm.handleError = function(response) {
                console.log(response.status + " - " + response.statusText + " - " + response.data);
            }

            vm.getAllRecords = function() {

                $http.get('/api/records').then(function(response){
                    vm.records = response.data;
                }, function(response){
                    vm.handleError(response);
                });
            }

            vm.getAllRecords();

            vm.editMode = false;
            vm.saveRecord = function() {
                console.log(vm.record);

                if(vm.editMode) {
                    vm.updateRecord();
                } else {
                    vm.addRecord();
                }
            }

            vm.addRecord = function() {
                console.log(vm.record);
                $http.post('/api/records', vm.record).then(function(response){
                    console.log(response);
                    vm.record = {};
                    vm.getAllRecords();
                    
                }, function(response){
                    vm.handleError(response);
                });
            }

            vm.updateRecord = function() {
                $http.put('/api/records/' + vm.record._id, vm.record).then(function(response){
                    vm.record = {};
                    vm.getAllRecords();
                    vm.editMode = false;
                }, function(response){
                    vm.handleError(response);
                });
            }

            vm.editRecord = function(record) {
                vm.record = record;
                vm.editMode = true;
            }

            vm.deleteRecord = function(recordid) {
                $http.delete('/api/records/'+recordid).then(function(response){
                    console.log("Deleted");
                    vm.getAllRecords();
                }, function(response){
                    vm.handleError(response);
                })
            }

            vm.cancelEdit = function() {
                vm.editMode = false;
                vm.record = {};
                vm.getAllRecords();
            }
      
    }

])
