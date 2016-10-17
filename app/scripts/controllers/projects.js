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
    	$scope.selectedProject = {};

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

		$scope.deleteProject = function (pk) 
		{
            projectsService.deleteProject(pk)
            .then(function(response, status, headers, config) 
            {
                $scope.getProjects();
            }, 
            function(response, status, headers ,config) 
            {
                window.alert('Could not delete the project');
			});
		};

		$scope.getProject = function (pk) 
		{
			$scope.clearProject();

			projectsService.getProject(pk)
			.then(function(response, status, headers, config) 
			{
				$scope.selectedProject = response;
			}, 
			function(response, status, headers, config) 
			{
				window.alert('Project not found');
			});

		};

		$scope.createNewProject = function () 
		{
			projectsService.createNewProject(this.selectedProject)
			.then(function(response, status, headers, config) 
			{
				$scope.getProjects();
			}, 
			function () 
			{
                window.alert('New project could not be created');
            });
        };

        $scope.updateProject = function (pk) 
        {
			projectsService.updateProject(pk, $scope.selectedProject)
			.then(function(response, status, headers, config) 
			{
				$scope.getProjects();
			}, 
			function(response, status, headers, config) 
			{
				window.alert(response);
			});
		};

		$scope.clearProject = function () 
		{
			$scope.selectedProject = {};
		};

		$scope.saveProject = function () 
		{
			if ($scope.selectedProject.pk) 
				$scope.updateProject($scope.selectedProject.pk);
			 else 
				$scope.createNewProject();
		};
  	});	