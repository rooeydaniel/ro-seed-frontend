'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('recipe organizer app', function() {

  beforeEach(function() {
    browser().navigateTo('public/index.html');
  });


  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/home");
  });


  describe('home', function() {

    beforeEach(function() {
      browser().navigateTo('#/home');
    });


    it('should render home when user navigates to /home', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for home/);
    });

  });
});
