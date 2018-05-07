angular.module('checkoutCtrl',[])

.controller('checkoutCtrl', ['$scope','$http','$rootScope',function($scope,$http,$rootScope){
    var fname,id,review;
    id1=$rootScope.rid;
    $scope.id=id1;

    $scope.getuserdata= function(){
    $http.get('api/getuserdata').then(function(response){
        $scope.phone= response.data[0].phone;
        $scope.firstName=response.data[0].name;

    });
}


        $http.post('api/checkoutrecord/'+id1).then(function(response){
            console.log(response.data);
            $scope.data=response.data;
            fname=response.data.filename;
            review=response.data.review;
            payment=response.data.payment;

            $scope.data=response.data;
            $scope.amount1=response.data.fcost;
            $scope.email=response.data.email;
            $scope.quantity=response.data.quantity;
            $scope.project_name=response.data.project;
            $scope.cost_pregst=response.data.fcost*response.data.quantity;
            $scope.cgst= roundTo($scope.cost_pregst * 0.09 ,2);
            $scope.sgst= roundTo($scope.cost_pregst * 0.09 ,2);
            $scope.amount= roundTo($scope.cost_pregst+ 2*$scope.cgst, 2);
                
            function roundTo(n, digits) {
                if (digits === undefined) {
                    digits = 0;
                }
                var multiplicator = Math.pow(10, digits);
                n = parseFloat((n * multiplicator).toFixed(11));
                return (Math.round(n) / multiplicator).toFixed(2);
            }


            $(document).ready(function() {
        
                var navListItems = $('ul.setup-panel li a'),
                allWells = $('.setup-content');

                allWells.hide();

                navListItems.click(function(e)
                {
                    e.preventDefault();
                    var $target = $($(this).attr('href')),
                        $item = $(this).closest('li');
                    
                    if (!$item.hasClass('disabled')) {
                        navListItems.closest('li').removeClass('active');
                        $item.addClass('active');
                        allWells.hide();
                        $target.show();
                    }
                });
                
                if(review==true && payment==false){
                    $('ul.setup-panel li:eq(1)').removeClass('disabled');
                    $('ul.setup-panel li a[href="#step-2"]').trigger('click');
                    $('#activate-step-2').remove();
                   
                }else if(payment==true){
                    $('ul.setup-panel li:eq(1)').removeClass('disabled');
                    $('ul.setup-panel li a[href="#step-2"]').trigger('click');
                    $('#activate-step-2').remove();
                    $('div.alert-success').removeClass('invisible');
                    $('div.alert-danger').remove();
                    $('#activate-step-3').removeClass('invisible');

                }
                else{
                    $('ul.setup-panel li.active a').trigger('click');
                }
                
                
                $('#activate-step-2').on('click', function(e) {
                    $('ul.setup-panel li:eq(1)').removeClass('disabled');
                    $('ul.setup-panel li a[href="#step-2"]').trigger('click');
                    $(this).remove();
                })    

                $('#activate-step-3').on('click', function(e) {
                    $('ul.setup-panel li:eq(2)').removeClass('disabled');
                    $('ul.setup-panel li a[href="#step-3"]').trigger('click');
                    $(this).remove();
                })


                
            });
        });

/*
    document.getElementById('vs_iframe').onload=function(){   
    
        function load_local_file(f)
        {   console.log(f);
            document.getElementById('vs_iframe').contentWindow.postMessage({msg_type:'load', file:f}, '*');
        }

    }


    $http.get('/api/getfile', {params: {filename: fname}}).then(function(response){
                    console.log(response);
                    console.log(file);
                        document.getElementById('vs_iframe').contentWindow.postMessage({msg_type:'load', file:response}, '*');
                    


                    
                }, function(response){
                    console.log(response);
                });*/
        $scope.review = function() {
            $http.put('/api/review/'+id1).then(function(response){
                console.log(response);
            }, function(response){
                console.log(response);
            });
        }
    

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    $scope.mkey = 'qhi9iUTQ';
    $scope.productInfo = 'Verification order';
    $scope.service_provider = 'payu_paisa';
    $scope.txnid = makeid();
    $scope.hash = '';

    $scope.presubmit = function () {        
        var data = { preHashString: $scope.mkey + '|' + $scope.txnid + '|' + $scope.amount + '|' + $scope.productInfo + '|' + $scope.firstname + '|' + $scope.email + '|' + $scope.user.gst + '|'+ $scope.id +'|||||||||' };
        //+ $scope.user.address1 + '|' + $scope.user.city + '|' + $scope.user.state + '|' + $scope.user.country + '|' + $scope.user.zipcode + '|' + $scope.user.gst + '|'
        console.log($scope.user);
        console.log(data);
        $http.post('api/createHash', data).success(function (data, status) {
            console.log(status);
            if (status == 200) {
                document.getElementById('hash').value = data.hash;
                document.getElementById('paymentForm').submit();
            }
        });
    }

}]);