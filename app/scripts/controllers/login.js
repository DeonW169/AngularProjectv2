'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  	.controller('LoginCtrl', function ($cookies, $scope, loginService, $location ) 
  	{
	    $scope.checkCookies = function()
	    {
	 		if($cookies.get('token') === undefined )
	 		{
	 			console.log('no cookies yet');      
	 		}
 			else
 			{
 				console.log('has been defined');
 				$location.path('/projects');
 			}
	    };

	    $scope.validateUser = function()
	    {
	     	if ($scope.userName === undefined || $scope.userPassword === undefined)
	     	{
		    	window.alert("Invalid Username and Password Combination");
	     	}
	    	else
	    	{
	    		$scope.authenticate();
	    	}
	    };

	  	$scope.authenticate = function()
	  	{
	  		loginService.userlogin($scope.userName, $scope.userPassword).then(
  			function (response) 
	  		{
	  			console.log(response);
	  			$location.path('/projects');
          	}, 
          	function (error) 
          	{
        		console.error(error);
              	$scope.userName = '';
            });
	  	};
  	});