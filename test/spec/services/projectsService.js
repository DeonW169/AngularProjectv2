'use strict';

describe('Service: projectsService', function () {

  // load the service's module
  beforeEach(module('myAppApp'));

  // instantiate service
  var projectsService, 
      cookies, 
      http, 
      PROJECT_SERVICE_BASE_URI, 
      scope;

  beforeEach(
    inject(
      function (_projectsService_, _$cookies_, _$httpBackend_, _PROJECT_SERVICE_BASE_URI_, $rootScope)
      {
        projectsService = _projectsService_;
        cookies = _$cookies_;
        http = _$httpBackend_;
        PROJECT_SERVICE_BASE_URI = _PROJECT_SERVICE_BASE_URI_;
        scope = $rootScope;
      }
    ));

  it('should refresh the list of projects', function (done) {
    var respond = [{
                'pk': 233,
                'title': 'Admin',
                'description': 'This is a Admin with a 1',
                'start_date': '2004-05-03',
                'end_date': '2016-05-22',
                'is_billable': false,
                'is_active': false,
                'task_set': [],
                'resource_set': []
            }];

    expect(projectsService.projects).toEqual([]);

    http.expect('GET', PROJECT_SERVICE_BASE_URI).respond(200, respond);

    projectsService.refreshProjects()
      .then(function (response) {
        expect(response).toEqual(respond);
      }, 
      function () 
      {
        fail();
      })
      .finally(done);

    http.flush();
  });

  it('should get a list of projects', function (done) {

    var respond = [{
                'pk': 233,
                'title': 'Admin',
                'description': 'This is a Admin with a 1',
                'start_date': '2004-05-03',
                'end_date': '2016-05-22',
                'is_billable': false,
                'is_active': false,
                'task_set': [],
                'resource_set': []
            }];
    http.expect('GET', PROJECT_SERVICE_BASE_URI).respond(200, respond);

    projectsService.getProjects()
    .then(function (response) 
    {
      expect(response).toEqual(respond);
    })
    .catch(function (response) 
    {
      fail();
    })
    .finally(done);

    http.flush();
  });

it('should get a project', function (done) {
    var respond = {
                'pk': 233,
                'title': 'Admin',
                'description': 'This is a Admin with a 1',
                'start_date': '2004-05-03',
                'end_date': '2016-05-22',
                'is_billable': false,
                'is_active': false,
                'task_set': [],
                'resource_set': []
            };

    http.expect('GET', PROJECT_SERVICE_BASE_URI + '1/').respond(200, respond);
    projectsService.getProject(1)
    .then(function (response) 
    {
      expect(response).toEqual(respond);
    })
    .catch(function (response) 
    {
      fail();
    })
    .finally(done);

    http.flush();
  });

it('should update a project from the list', function (done) {

    var respond = {
      pk: 1,
      title: 'new project',
      description: 'new project for testing',
    };

    http.expect('PUT', PROJECT_SERVICE_BASE_URI + '1/').respond(200, respond);

    projectsService.updateProject(1, {pk: 1, title: 'new project'})
      .then(function (response) 
      {
        expect(response).toEqual(respond);
      })
      .catch(function (){
        fail();
      })
      .finally(done);

    http.flush();
  });

it('should create a project', function (done) {

    var respond = {
      pk: 1,
      title: 'new test',
      description: 'new test desc'
    };

    http.expect('POST', PROJECT_SERVICE_BASE_URI).respond(200, respond);

    projectsService.createNewProject()
      .then(function(response, status, headers, config) 
      {
        expect(response).toEqual(respond);
      })
      .catch(function () {
        fail();
      })
      .finally(done);

    http.flush();
  });

it('should delete a project from the list', function (done) {

    http.expect('DELETE', PROJECT_SERVICE_BASE_URI + 1 + '/').respond(200);

    projectsService.deleteProject(1)
      .then(function(response, status, headers, config) 
      {
        expect(response).toBeUndefined();
      }, function(response, status, headers, config) 
      {
        fail();
      })
      .finally(done);

    http.flush();
  });

});
