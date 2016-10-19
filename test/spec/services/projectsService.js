'use strict';

describe('Service: projectsService', function () {

  // load the service's module
  beforeEach(module('myAppApp'));

  // instantiate service
  var projectsService;
  var cookies;
  var http;
  var PROJECT_SERVICE_BASE_URI;
  var scope;

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

  projects = {
    getProjects: function () 
    {

    }
  };

  it('should do something', function () {
    expect(!!projectsService).toBe(true);
  });

  it('should get a list of projects', function () {
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


});
