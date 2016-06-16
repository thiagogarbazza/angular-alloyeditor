describe('angular-alloyeditor', () => {

  var $q, compiler, scope;

  beforeEach(module('alloyeditor'));

  beforeEach(inject(($rootScope, _$q_, _$timeout_) => {
    scope = $rootScope.$new();
    $q = _$q_;
     $timeout = _$timeout_;
    scope.model = {
      text: ''
    };
    scope.editor = {
      isReadonly: false
    };
  }));

  beforeEach(inject(($compile) => {
    compiler = (html) => {
      var element = $compile(html)(scope);
      // scope.$digest();
      return element;
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

    // it('should be "html" default.',  () => {
    //   var element = compiler('<alloy-editor id="my-editor" ng-model="model.text"></alloy-editor>');
    //   expect(element.html()).toContain('id="my-editor-content"');
    //   expect(element.html()).toContain('class="alloy-editor cke_editable cke_editable_inline cke_contents_ltr ae-editable ae-placeholder"');
    //   expect(element.html()).toContain('contenteditable="true"');
    // });

  });

  // describe('should be "readonly"', () => {
  //   function expectEditor() {
  //     return expect(_.find(CKEDITOR.instances).readOnly);
  //   }
  //
  //   it('should be true in line.',  () => {
  //     var element = compiler('<alloy-editor id="my-editor" ng-model="model.text" readonly="true"></alloy-editor>');
  //     expectEditor().to.be.true;
  //   });
  //
  //   it('should be false in line.',  () => {
  //     var element = compiler('<alloy-editor id="my-editor" ng-model="model.text" readonly="false"></alloy-editor>');
  //     expectEditor().to.be.false;
  //   });
  //
  //   it('should be true in scope.',  () => {
  //     scope.editor.isReadonly = true;
  //     var element = compiler('<alloy-editor id="my-editor" ng-model="model.text" readonly="editor.isReadonly"></alloy-editor>');
  //     expectEditor().to.be.true;
  //   });
  //
  //   it('should be false in scope.',  () => {
  //     scope.editor.isReadonly = false;
  //     var element = compiler('<alloy-editor id="my-editor" ng-model="model.text" readonly="editor.isReadonly"></alloy-editor>');
  //     expectEditor().to.be.false;
  //   });
  // });


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
