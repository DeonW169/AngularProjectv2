'use strict';

describe('Controller: ProjectsCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var ProjectsCtrl,
    scope,
    projectsService,
    http,
    PROJECT_SERVICE_BASE_URI,
    $q;

  // Initialize the controller and a mock scope
  beforeEach(
    inject(function ($controller, 
                    $rootScope,
                    _projectService_,
                    $httpBackend,
                    _PROJECT_SERVICE_BASE_URI_,
                    _$q_) {
    scope = $rootScope.$new();
    ProjectsCtrl = $controller('ProjectsCtrl', {
      $scope: scope
    });
    projectsService = _projectService_;
    http = $httpBackend;
    PROJECT_SERVICE_BASE_URI = _PROJECT_SERVICE_BASE_URI_;
    $q = _$q_;

  }));

  it('should update project if pk is available', function () {
    spyOn(scope, 'updateProject');

    scope.selectedProject = {
      pk: 123,
      title: 'Test',
      description: 'Test the project'
    };

    scope.saveProject();

    expect(scope.updateProject).toHaveBeenCalled();
  });

  it('should create a new project if pk is not available', function () {
    spyOn(scope, 'createNewProject');

    scope.selectedProject = {
      title: 'test',
      description: 'some test desc'
    };

    scope.saveProject();

    expect(scope.createNewProject).toHaveBeenCalled();
  });

  it('should delete a project and refresh the list of projects', function () {
    spyOn(scope, 'getProjects');

    var deferred = $q.defer();
    deferred.resolve(true);
    spyOn(projectsService, 'deleteProject').and.returnValue(deferred.promise);

    scope.deleteProject(1);

    scope.$digest();

    expect(projectsService.deleteProject).toHaveBeenCalled();

    expect(scope.getProjects).toHaveBeenCalled();
  });

  

});
