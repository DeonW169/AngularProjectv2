'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  	.controller('ProjectsCtrl', function ($scope, projectsService) 
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
  	});	