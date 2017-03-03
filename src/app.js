import angular from 'angular';

import 'angular-ui-grid';
import 'angular-ui-grid/ui-grid.css';

import 'modules/components';
import 'modules/directives';
import 'modules/services';

import './app.scss';

angular.module('dictionary', [
  'ui.grid',
  'components',
  'directives',
  'services'])
.config(/*@ngInject*/ ($locationProvider) => {
  $locationProvider.html5Mode(true);
});
