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
    scope.model = {
      text: '<div id=Inner><h1>Lorem Ipsum</h1></div> baboseiras'
    };
    scope.editor = {
      isReadonly: false
    };
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

  describe('should be "readonly"', () => {
    function expectEditor() {
      return expect(_.find(CKEDITOR.instances).readOnly);
    }

    it('is true.',  () => {
      var element = compiler('<alloy-editor id="my-editor" ng-model="model.text" readonly="true"></alloy-editor>');
      expectEditor().to.be.true;
    });

    it('is false.',  () => {
      var element = compiler('<alloy-editor id="my-editor" ng-model="model.text" readonly="false"></alloy-editor>');
      expectEditor().to.be.false;
    });

    it('in scope is true.',  () => {
      scope.editor.isReadonly = true;
      var element = compiler('<alloy-editor id="my-editor" ng-model="model.text" readonly="editor.isReadonly"></alloy-editor>');
      expectEditor().to.be.true;
    });

    it('in scope is false.',  () => {
      scope.editor.isReadonly = false;
      var element = compiler('<alloy-editor id="my-editor" ng-model="model.text" readonly="editor.isReadonly"></alloy-editor>');
      expectEditor().to.be.false;
    });
  });


  // describe('model', () => {
  //   beforeEach(() => {
  //     scope.model = {
  //       text: '<div id=Inner><h1>Lorem Ipsum</h1></div> baboseiras'
  //     }
  //   });
  //
  //   it('should be ngModel required',  () => {
  //     var element = compiler('<alloy-editor id="my-editor" ng-model="model.text"></alloy-editor>');
  //     expect(element.html()).toEqual('');
  //   });
  // });

});
