'use strict';

/**
 * @ngdoc service
 * @name myAppApp.loginService
 * @description
 * # loginService
 * Service in the myAppApp.
 */
angular.module('myAppApp')
    .service('loginService', function ($q, $http, $cookies, AUTH_SERVICE_BASE_URI) 
    {
		let loginService = this;

		loginService.userlogin = function(username, password) 
		{
	        var deferred = $q.defer();
		    var url = AUTH_SERVICE_BASE_URI + 'api-token-auth/';

		    $http.post(url, {
		        username: username,
		        password: password
		    })
		    .success(function (response, status, headers, config) 
		    {
		        if (response.token) 
		        {
		            $cookies.put('token', response.token);
		        }
		        deferred.resolve(response, status, headers, config);
		    })
		    .error(function (response, status, headers, config) 
		    {
		        deferred.reject(response, status, headers, config);
		    });

		    return deferred.promise;
	    };
  	});