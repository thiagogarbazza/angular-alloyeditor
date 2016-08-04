(function(global, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) define(['angular'], factory);
  else factory(angular);
})(this, function(angular) {
  'use strict';

  angular
    .module('alloyeditor', [])
    .controller('AlloyEditorController', AlloyEditorController)
    .directive('alloyEditor', alloyEditorDirective);

  alloyEditorDirective.$inject = ['$parse', '$timeout'];

  function alloyEditorDirective($parse, $timeout) {
    var directive = {
      compile: compile,
      controller: 'AlloyEditorController',
      controllerAs: 'alloyEditorCtrl',
      require: ['alloyEditor', 'ngModel'],
      restrict: 'E',
      template: '<div class="alloy-editor"></div>'
    };

    return directive;

    function compile(tElement, tAttrs) {
      if (!tAttrs.id) {
        throw Error('The alloy-editor element must have id attribute.');
      }
      return {
        post: postLink,
        pre: preLink
      };
    }

    function postLink($scope, $element, $attributes, $controllers) {
      var alloyEditorCtrl = $controllers[0];
      var ngModelCtrl = $controllers[1];

      // Initialize the editor content when it is ready.
      alloyEditorCtrl.ready().then(initialize);

      // Set editor data when view data change.
      ngModelCtrl.$render = syncEditor;

      function initialize() {
        // Sync view on specific events.
        ['change', 'blur'].forEach(function syncViewEvent(event) {
          alloyEditorCtrl.onEvent(event, function syncView() {
            ngModelCtrl.$setViewValue(alloyEditorCtrl.nativeEditor().getData() || '');
          });
        });

        $scope.$watch($attributes.readonly, readonlyWatch);

        alloyEditorCtrl.onEvent('focus', function syncTouched() {
          ngModelCtrl.$setTouched();
        });

        // Defer the ready handler calling to ensure that the editor is
        // completely ready and populated with data.
        $timeout(function() {
          $parse($attributes.onready)($scope);
        });
      }

      function readonlyWatch(newValue, oldValue) {
        if (newValue !== oldValue) {
          alloyEditorCtrl.nativeEditor().setReadOnly(Boolean(newValue));
        }
      }

      function syncEditor() {
        alloyEditorCtrl.ready().then(function() {
          alloyEditorCtrl.nativeEditor().setData(ngModelCtrl.$viewValue || '', {
            callback: function() {
              // Amends the top of the undo stack with the current DOM changes
              // ie: merge snapshot with the first empty one
              // http://docs.ckeditor.com/#!/api/CKEDITOR.editor-event-updateSnapshot
              alloyEditorCtrl.nativeEditor().fire('updateSnapshot');
            },
            noSnapshot: true
          });
        });
      }
    }

    function preLink($scope, $element, $attributes, $controllers) {
      var alloyEditorCtrl = $controllers[0];
      var editorElement = $element.find('div');
      editorElement.attr('id', $attributes.id + '-content');
      var config = $parse($attributes.config)($scope);
      alloyEditorCtrl.createInstance(editorElement.attr('id'), config);
    }
  }

  AlloyEditorController.$inject = ['$q', '$scope', '$timeout'];

  function AlloyEditorController($q, $scope, $timeout) {
    var vm = this;
    var readyDeferred = $q.defer();
    var instance;

    vm.createInstance = createInstance;
    vm.onEvent = onEvent;
    vm.ready = ready;
    vm.nativeEditor = nativeEditor;

    // Destroy editor when the scope is destroyed.
    $scope.$on('$destroy', function onDestroy() {
      // do not delete too fast or pending events will throw errors
      readyDeferred.promise.then(function() {
        instance.destroy();
      });
    });

    function ready() {
      return readyDeferred.promise;
    }

    function nativeEditor() {
      return instance.get('nativeEditor');
    }

    /**
     * Invoke create method on AlloyEditor passing the ID of the node you want to edit.
     *
     * @param {String} elementId Id of the node you want to edit.
     * @param {Object} config Configuration of this instance by AlloyEditor.
     *
     * @returns {Object} Instance of AlloyEditor.
     */
    function createInstance(elementId, config) {
      instance = AlloyEditor.editable(elementId, config);
      onEvent('instanceReady', function() {
        readyDeferred.resolve(true);
      });

      return instance;
    }

    /**
     * Listen on events of a given type.
     * This make all event asynchronous and wrapped in $scope.$apply.
     *
     * @param {String} event Type-name of event listener.
     * @param {Function} listener Exevute this function on listener.
     *
     * @returns {Function} Deregistration function for this listener.
     */
    function onEvent(event, listener) {
      nativeEditor().on(event, asyncListener);

      function asyncListener() {
        var args = arguments;
        $timeout(function() {
          applyListener.apply(null, args);
        });
      }

      function applyListener() {
        var args = arguments;
        $scope.$apply(function() {
          listener.apply(null, args);
        });
      }

      // Return the deregistration function
      return function $off() {
        nativeEditor().removeListener(event, applyListener);
      };
    }
  }
});
