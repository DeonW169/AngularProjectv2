'use strict';

/**
 * @ngdoc service
 * @name myAppApp.projectsService
 * @description
 * # projectsService
 * Service in the myAppApp.
 */
angular.module('myAppApp')
  .service('projectsService', function ( $cookies, PROJECT_SERVICE_BASE_URI, $q, $http, apiWebservice) {
    this.getProjects = function () {

         var deferred = $q.defer(),
             url = PROJECT_SERVICE_BASE_URI + 'projects/';
             apiWebservice.get(url)
             .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    console.error(error);
                    deferred.reject(error);
                }); 
            
        return deferred.promise;
      };
  
  })