import angular from 'angular';

import fileInputJsXlsx  from 'directives/file-input-js-xlsx/file-input-js-xlsx.directive';

let module = angular.module('directives', []);
fileInputJsXlsx(module);