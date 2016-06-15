describe('angular-alloyeditor', () => {

  var compiler, scope;

  beforeEach(module('alloyeditor'));

  beforeEach(inject(($compile, $rootScope) => {
    compiler = (html) => {
      var element = $compile(html)(scope);
      console.log('element',element);
      scope.$digest();
      console.log('element',element);
      return element;
    };
  }));

  beforeEach(inject(($rootScope) => {
    scope = $rootScope.$new();
  }));

  describe('create instance', () => {
    it('should be "id" required.',  () => {
      var htmlCompiler = () => {
        compiler('<alloy-editor></alloy-editor>');
      };
      expect(htmlCompiler).toThrowError('The alloy-editor element must have id attribute.');
    });

    it('should be "ng-model" required.',  () => {
      var htmlCompiler = () => {
        compiler('<alloy-editor id="my-editor"></alloy-editor>');
      };
      expect(htmlCompiler).toThrowError(/ngModel(.)*alloyEditor$/);
    });
  });
  
});
