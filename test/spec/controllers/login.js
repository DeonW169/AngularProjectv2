'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var LoginCtrl,
    loginService,
    scope,
    $location,
    $q;

  // Initialize the controller and a mock scope
  beforeEach(
    inject(function ($controller, 
                    _loginService_, 
                    $rootScope, 
                    _$location_, 
                    _$q_) {
      scope = $rootScope.$new();
      LoginCtrl = $controller('LoginCtrl', {
      loginService: _loginService_;
      $scope: scope;
      $location = _$location_;
      $q = _$q_;
      
      // place here mocked dependencies
    });
  }));

  it('should have a blank user field', function () {
    expect(scope.username).toBeNull();
  });

  it('should have a blank password field', function () {
    expect(scope.password).toBeNull();
  });

  it('should direct to projects page when logged in', function () {
      spyOn($location, 'path');

      var deferred = $q.defer();
      deferred.resolve();

      spyOn(loginService, 'login').and.returnValue(deferred.promise);

      scope.login();

      scope.$digest();

      expect(loginService.login).toHaveBeenCalled();
    });

});
