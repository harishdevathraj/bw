angular.module('checkoutCtrl',[])

.controller('checkoutCtrl', ['$scope','$http', 'checkoutService',function($scope,$http,checkoutService){


        var data= checkoutService.getdata();
        console.log('IN checkoutCtrl');
        console.log(data);
        var vm = this;
        vm.record={};
        vm.record.project=data.project;
        console.log(vm.record.project);

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
            
            $('ul.setup-panel li.active a').trigger('click');
            
            // DEMO ONLY //
            $('#activate-step-2').on('click', function(e) {
                $('ul.setup-panel li:eq(1)').removeClass('disabled');
                $('ul.setup-panel li a[href="#step-2"]').trigger('click');
                $(this).remove();
            })    
        });

}]);