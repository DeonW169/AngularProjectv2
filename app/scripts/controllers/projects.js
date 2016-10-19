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
            .then(function() 
            {
                $scope.getProjects();
            }, 
            function() 
            {
                window.alert('Could not delete the project');
			});
		};

		$scope.getProject = function (pk) 
		{
			$scope.clearProject();

			projectsService.getProject(pk)
			.then(function(response) 
			{
				$scope.selectedProject = response;
			}, 
			function() 
			{
				window.alert('Project not found');
			});

		};

		$scope.createNewProject = function () 
		{
			projectsService.createNewProject($scope.selectedProject)
			.then(function() 
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
			.then(function() 
			{
				$scope.getProjects();
			}, 
			function(response) 
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
			debugger;
			if ($scope.selectedProject.pk)
			{
				$scope.updateProject($scope.selectedProject.pk);
			}
		 	else
		 	{
				$scope.createNewProject();
			}

			$scope.dismissModel();
		};

		$scope.dismissModel = function ()
		{
			$('#projectFormModal').modal('hide');
		};
  	});	