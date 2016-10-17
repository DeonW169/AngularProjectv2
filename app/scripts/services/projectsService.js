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

		let service = this;

		this.projects = [];

		this.refreshProjects = function () 
		{
			var deferred = $q.defer();

			this.getProjects()
				.then(function(response, status, headers, config) 
				{
					service.projects = response;
					deferred.resolve(service.projects);
				}, 
				function(response, status, headers, config) 
				{
					deferred.reject(response, status, headers, config);
				});

			return deferred.promise;
		};

		this.getProjects = function () 
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