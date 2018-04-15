angular.module('checkoutCtrl',[])

.controller('checkoutCtrl', ['$scope','$http',function($scope,$http){
    var fname,id,review;
        $http.post('api/checkoutrecord/').then(function(response){
                console.log(response.data);
                $scope.data=response.data;
                fname=response.data.filename;
                review=response.data.review;
                id=response.data._id;
                console.log(id);
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
            
            if(review==true){
                $('ul.setup-panel li:eq(1)').removeClass('disabled');
                $('ul.setup-panel li a[href="#step-2"]').trigger('click');
                $('#activate-step-2').remove();
            }else{
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

}]);