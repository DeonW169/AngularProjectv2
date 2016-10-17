'use strict';

/**
 * @ngdoc service
 * @name myAppApp.projectsService
 * @description
 * # projectsService
 * Service in the myAppApp.
 */
angular.module('myAppApp')
	.service('projectsService', function ( $q, $http, $cookies, PROJECT_SERVICE_BASE_URI) {

		let projectService = this;

		projectService.projects = [];

		projectService.refreshProjects = function () 
		{
			var deferred = $q.defer();

			projectService.getProjects()
				.then(function(response, status, headers, config) 
				{
					projectService.projects = response;
					deferred.resolve(projectService.projects);
				}, 
				function(response, status, headers, config) 
				{
					deferred.reject(response, status, headers, config);
				});

			return deferred.promise;
		};

		projectService.getProjects = function () 
		{
			var deferred = $q.defer();

			$http({
				method: 'GET',
				url: PROJECT_SERVICE_BASE_URI,
				headers:
				{
					Authorization: 'Token ' + $cookies.get('token')
				}
			})
			.success(function (response, status, headers, config) 
			{
				deferred.resolve(response, status, headers, config);
			})
			.error(function (response, status, headers, config) 
			{
				deferred.reject(response, status, headers, config);
			});

			return deferred.promise;
		};
	});