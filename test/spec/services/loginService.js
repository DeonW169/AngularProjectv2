'use strict';

describe('Service: loginService', function () {

  // load the service's module
  beforeEach(module('myAppApp'));

  // instantiate service
  var loginService,
      cookies,
      http,
      tokenUr,
      token;

  beforeEach(inject(function (_loginService_, _$cookies_, _$httpBackend_) {
    loginService = _loginService_;
    cookies = _$cookies_;
    http = _$httpBackend_;
    tokenUr = 'http://userservice.staging.tangentmicroservices.com:80/api-token-auth/';
    token = 'b7ec34e136bb6d28a4421e422e852b99cc834d17';
  }));

  it('should get a token, and log in with valid username and password', function () {
    http.expectPOST(tokenUr)
      .respond(200, {'token': token});

      loginService.userlogin('admin1', 'admin1')
      .then(function (response) {   
        expect(cookies.get('token')).toBe(token); 
      });

      http.flush();
  });

  it('should check that the fields are not blank when logging in', function(done) {
      http.expectPOST(tokenUr)
      .respond(400, {'username': 'username required','password': 'password required'});
      loginService.login('admin1')
        .then(function() {
          fail();
        })
        .catch(function(response) {
          expect(response).toEqual({'username': 'username required','password': 'password required'});
        })
        .finally(done);

      http.flush();
    });

    it('should save token to cookies', function(done) {
      http.expectPOST(tokenUr)
      .respond(200, {token: token});
      loginService.login('test', 'test')
        .then(function() {
          var cookie = $document[0].cookie;
          expect(cookie.indexOf(APP_COOKIE_NAME)).not.toEqual(-1);
        })
        .catch(function() {
          fail();
        })
        .finally(done);

      http.flush();
    });

});