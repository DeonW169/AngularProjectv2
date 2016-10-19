'use strict';

/**
 * @ngdoc directive
 * @name myAppApp.directive:myDirective
 * @description
 * # myDirective
 */
angular.module('myAppApp')
  .directive('myDirective', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the myDirective directive');
      }
    };
  });
