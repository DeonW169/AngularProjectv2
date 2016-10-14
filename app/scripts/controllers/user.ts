/// <reference path="../app.ts" />

'use strict';

module myAppApp {
  export interface IUserScope extends ng.IScope {
    awesomeThings: any[];
  }

  export class UserCtrl {

    constructor (private $scope: IUserScope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }
  }
}

angular.module('myAppApp')
  .controller('UserCtrl', myAppApp.UserCtrl);
