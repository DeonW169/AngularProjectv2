'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  	.controller('ProjectsCtrl', function ($scope, projectsService, $cookies, $location) 
  	{
    	$scope.projects = [];

    	$scope.getProjects = function () 
    	{
			projectsService.refreshProjects()
			.then(function(projects) 
			{
				$scope.projects = projects;
			}, 
			function (error) 
			{
				console.error(error);
			});
		};

	    $scope.checkScope = function()
	    {
            if($cookies.get('token') == undefined)
            {
              console.log('no defined cookies');
              $location.path('/index');
            }
            else
            {
                projectsService.getProjects().then(function (response) 
                {
                    $scope.projectsService = response.data;
                }, 
                function (error) 
                {
                    console.error(error);
                });              
            }  
      	}
          
      	// This has to be at the bottom of your controller
      	var init = function () 
      	{
         	$scope.checkScope();
      	};

      	init(); 
  	});	