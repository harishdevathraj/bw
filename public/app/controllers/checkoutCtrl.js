angular.module('checkoutCtrl',[])

.controller('checkoutCtrl', ['$scope','$http','$rootScope',function($scope,$http,$rootScope){
    var fname,id,review;
    id=$rootScope.rid;
        $http.post('api/checkoutrecord/'+id).then(function(response){
                console.log(response.data);
                $scope.data=response.data;
                fname=response.data.filename;
                review=response.data.review;
                payment=response.data.payment;
                $scope.amount=response.data.fcost;
                $scope.email=response.data.email;
                
                console.log(id);


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
            console.log('under review function');
            $http.put('/api/review/'+id).then(function(response){
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

    $scope.message = 'Everyone come and see how good I look!';
    $scope.mkey = 'qhi9iUTQ';
    $scope.productInfo = 'Verification order';
    $scope.service_provider = 'payu_paisa';
    $scope.txnid = makeid();
    $scope.phone = 9999999999;
    $scope.lastName = 'test';
    $scope.firstName = 'fname';
    $scope.surl = "http://localhost:3000/PaymentStatus";
    $scope.hash = '';

    $scope.presubmit = function () {
        
        var data = { preHashString: $scope.mkey + '|' + $scope.txnid + '|' + $scope.amount + '|' + $scope.productInfo + '|' + $scope.firstName + '|' + $scope.email + '|' + $scope.user.gst + '||||||||||' };
        //+ $scope.user.address1 + '|' + $scope.user.city + '|' + $scope.user.state + '|' + $scope.user.country + '|' + $scope.user.zipcode + '|' + $scope.user.gst + '|'

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