angular.module('contactCtrl',[])

.controller('conCtrl', function($http){
	
	this.conUser= function(conData){
		$http.post('/api/contact', this.conData);
	}
});