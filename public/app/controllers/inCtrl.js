angular.module('inCtrl', [])

.controller('inCtrl', function ($scope,$http) {



    $http.post('api/payment_data').then(function(response){
        //data from payu's response status
        $scope.rate=response.data.amount;
        $scope.address= response.data.address1;
        $scope.city=response.data.city;
        $scope.state=response.data.address2;
        $scope.country=response.data.country;
        $scope.zipcode=response.data.zipcode;
        $scope.gst=response.data.udf1;
        $scope.objid=response.data.udf2;

        //data from Project db
        $http.post('api/checkoutrecord/'+$scope.objid).then(function(response){
            console.log('inCtrl' + response.data);
            $scope.amount1=response.data.fcost;
            $scope.quantity=response.data.quantity;
            $scope.project_name=response.data.project;
            $scope.cost_pregst=response.data.fcost*response.data.quantity;
            $scope.cgst= roundTo($scope.cost_pregst * 0.09 ,2);
            $scope.sgst= roundTo($scope.cost_pregst * 0.09 ,2);
            $scope.amountss= roundTo($scope.cost_pregst+ 2*$scope.cgst);
        });

        //data from User db
        $scope.getuserdata= function(){
            $http.get('api/getuserdata').then(function(response){
            $scope.phone= response.data[0].phone;
            $scope.firstName=response.data[0].name;


            });
        }
    $scope.inoviceno = $scope.inoviceno++;
    NumToWord($scope.amountss, 'divDisplayWords');
/*
$scope.amount = $scope.quantity*$scope.rate;   
$scope.quantity = 4;
    
    
    
    $scope.cgst= $scope.amount * 0.09;
    $scope.sgst= $scope.amount * 0.09;
    $scope.amounts = $scope.cgst+ $scope.sgst + $scope.amount;
    $scope.amountss = Math.floor($scope.amounts);
    NumToWord($scope.amountss, 'divDisplayWords');*/
    });

  

$scope.myFunction = function () {

     window.print();
    
    }

var today = new Date();

var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
$scope.date = dd+'/'+mm+'/'+yyyy;
//document.getElementById("date").innerHTML = today;

$(document).ready(function(){
    $('div.navbar').remove();
        //window.print();


    

    //var a= window.confirm("Save your Invoice Now");
    //if (a) {
        

    //NumToWord($scope.amountss, 'divDisplayWords');

})




        function onlyNumbers(evt) {
    var e = event || evt; // For trans-browser compatibility
    var charCode = e.which || e.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function NumToWord(inputNumber, outputControl) {
    var str = new String(inputNumber);
    var splt = str.split("");
    var rev = splt.reverse();
    var once = ['Zero', ' One', ' Two', ' Three', ' Four', ' Five', ' Six', ' Seven', ' Eight', ' Nine'];
    var twos = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
    var tens = ['', 'Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];

    numLength = rev.length;
    var word = new Array();
    var j = 0;

    for (i = 0; i < numLength; i++) {
        switch (i) {

            case 0:
                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
                    word[j] = '';
                }
                else {
                    word[j] = '' + once[rev[i]];
                }
                word[j] = word[j];
                break;

            case 1:
                aboveTens();
                break;

            case 2:
                if (rev[i] == 0) {
                    word[j] = '';
                }
                else if ((rev[i - 1] == 0) || (rev[i - 2] == 0)) {
                    word[j] = once[rev[i]] + " Hundred ";
                }
                else {
                    word[j] = once[rev[i]] + " Hundred and";
                }
                break;

            case 3:
                if (rev[i] == 0 || rev[i + 1] == 1) {
                    word[j] = '';
                }
                else {
                    word[j] = once[rev[i]];
                }
                if ((rev[i + 1] != 0) || (rev[i] > 0)) {
                    word[j] = word[j] + " Thousand";
                }
                break;

                
            case 4:
                aboveTens();
                break;

            case 5:
                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
                    word[j] = '';
                }
                else {
                    word[j] = once[rev[i]];
                }
                if (rev[i + 1] !== '0' || rev[i] > '0') {
                    word[j] = word[j] + " Lakh";
                }
                 
                break;

            case 6:
                aboveTens();
                break;

            case 7:
                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
                    word[j] = '';
                }
                else {
                    word[j] = once[rev[i]];
                }
                if (rev[i + 1] !== '0' || rev[i] > '0') {
                    word[j] = word[j] + " Crore";
                }                
                break;

            case 8:
                aboveTens();
                break;

            //            This is optional. 

            //            case 9:
            //                if ((rev[i] == 0) || (rev[i + 1] == 1)) {
            //                    word[j] = '';
            //                }
            //                else {
            //                    word[j] = once[rev[i]];
            //                }
            //                if (rev[i + 1] !== '0' || rev[i] > '0') {
            //                    word[j] = word[j] + " Arab";
            //                }
            //                break;

            //            case 10:
            //                aboveTens();
            //                break;

            default: break;
        }
        j++;
    }

    function aboveTens() {
        if (rev[i] == 0) { word[j] = ''; }
        else if (rev[i] == 1) { word[j] = twos[rev[i - 1]]; }
        else { word[j] = tens[rev[i]]; }
    }

    word.reverse();
    var finalOutput = '';
    for (i = 0; i < numLength; i++) {
        finalOutput = finalOutput + word[i];
    }
    document.getElementById(outputControl).innerHTML = finalOutput;
}
   



    });