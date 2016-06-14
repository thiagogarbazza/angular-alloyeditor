describe('angular-alloyeditor', () => {

  var compiler, scope;

  beforeEach(module('alloyeditor'));

  beforeEach(inject(($compile, $rootScope) => {
    compiler = (html) => {
      var element = $compile(html)(scope);
      scope.$digest();
      return element;
    };
  }));

  beforeEach(inject(($rootScope) => {
    scope = $rootScope.$new();
  }));

  describe('model', () => {
    it('should be ngModel required',  () => {
      var htmlCompiler = () => {
        compiler('<alloy-editor></alloy-editor>');
      };
      expect(htmlCompiler).toThrowError(/ngModel(.)*alloyEditor$/);
    });
  });

});
