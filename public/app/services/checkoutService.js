angular.module('checkoutService', [])

.service('checkoutService', function() {
  var userData;
  this.setdata = function(obj) {
      console.log('IN checkoutService');
      console.log(obj);
      userData=obj;
  };

  this.getdata= function() {
      return userData;
  };
  
});