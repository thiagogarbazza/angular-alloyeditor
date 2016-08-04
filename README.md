# angular-alloyeditor #

[![Build Status](https://travis-ci.org/thiagogarbazza/angular-alloyeditor.svg?branch=master)](https://travis-ci.org/thiagogarbazza/angular-alloyeditor)
[![Coverage Status](https://coveralls.io/repos/github/thiagogarbazza/angular-alloyeditor/badge.svg?branch=master)](https://coveralls.io/github/thiagogarbazza/angular-alloyeditor?branch=master)

[![Dependency Status](https://david-dm.org/thiagogarbazza/angular-alloyeditor.svg?theme=shields.io)](https://david-dm.org/thiagogarbazza/angular-alloyeditor)
[![DevDependency Status](https://david-dm.org/thiagogarbazza/angular-alloyeditor/dev-status.svg?theme=shields.io)](https://david-dm.org/thiagogarbazza/angular-alloyeditor#info=devDependencies)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/thiagogarbazza/angular-alloyeditor/)

[AlloyEditor] directive for Angular.

## Install ##

### Using Bower ###

```sh
bower install --save angular-alloyeditor
```

### Using NPM ###

```sh
npm install --save angular-alloyeditor
```

## Usage ##

### Example ###

```html
<!-- Load files. -->
<script src="angular/angular.min.js"></script>
<script src="alloyeditor/dist/alloy-editor/alloy-editor-all-min.js"></script>
<script src="angular-alloyeditor.js"></script>

<div ng-controller="MyController">
  <alloy-editor id="myEditor" name="myEditor" ng-model="model.content"></alloy-editor>
</div>
```

JavaScript:

```js
angular
  .module('app', ['alloyeditor'])
  .controller('MyController', MyController);

function MyController()) {
  var vm = this;
  vm.model = {
    content : 'Yes, you can edit this content. <strong>Right here and right now</strong>.'
  };
}

```

## License ##

The `angular-alloyeditor` project is under MIT license.


[AlloyEditor]: https://alloyeditor.com/ "AlloyEditor a modern WYSIWYG editor built on top of CKEDITOR, designed to create modern and gorgeous web content"
