describe('angular-alloyeditor', () => {
  beforeEach(module('alloyeditor'));

  var compile, scope;

  beforeEach(inject(($compile, $rootScope) => {
    compile = $compile;
    scope = $rootScope.$new();
  }));

  it('simple run test', () => {
    expect('test').toEqual('test');
  });

});
