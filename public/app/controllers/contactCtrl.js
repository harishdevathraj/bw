angular.module('contactCtrl',[])

.controller('conCtrl', function($http){
	
	this.conUser= function(conData){
		console.log('contact buttonnnnn');
		console.log(this.conData);
		$http.post('/api/contact', this.conData);
	}
});