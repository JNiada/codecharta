import angular from 'angular';
import 'angular-mocks';
import "./module";

xdescribe("app.codeCharta", function() {

  beforeEach(() => {
    angular.mock.module('app.codeCharta');
  });

  it('should render Codecharta', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<cc>Loading...</cc>')($rootScope);
    $rootScope.$digest();
    const h1 = element.find('h1');
    expect(h1.html()).toEqual('CodeCharta');
  }));

});
