'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  	.factory('apiWebservice', function($http, $cookies, $q) {

	var webAPI = {};
    var deferred = $q.defer();

    webAPI.get = function(url) {
        return $http({
          method: 'GET',
          url: url,
          headers: {
                "Authorization": 'Token '+$cookies.get('token')
            }
        }).success(function (response, status, headers, config) {
            
              if (response) {
                  deferred.resolve(response);
              }
              deferred.resolve(response, status, headers, config);
          }).error(function (response, status, headers, config) {
              console.log("failed");
              deferred.reject(response, status, headers, config);
          });
    }
    return webAPI;
  });
