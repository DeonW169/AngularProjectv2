'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  	.controller('ProjectsCtrl', function ($scope, projects, $cookies, $location) 
  	{
    	this.awesomeThings = [
      	'HTML5 Boilerplate',
      	'AngularJS',
      	'Karma'
    	];

	    $scope.checkScope = function()
	    {
            if($cookies.get('token') == undefined)
            {
              console.log('has not been defined yet');
              $location.path('/index');
            }
            else
            {
                projects.getProjects().then(function (response) 
                {
                    $scope.projects = response.data;
                }, 
                function (error) {
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