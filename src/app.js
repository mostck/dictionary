import angular from 'angular';

import 'angular-ui-grid';
import 'angular-ui-grid/ui-grid.css';

import 'angular-ui-bootstrap';

import 'modules/components';
import 'modules/directives';
import 'modules/services';
import 'modules/filters';

import './app.scss';

angular.module('dictionary', [
  'ui.grid',
  'ui.grid.edit',
  'ui.grid.resizeColumns',
  'ui.grid.moveColumns',
  'ui.grid.selection',
  'ui.bootstrap',
  'components',
  'directives',
  'filters',
  'services'])
.config(/*@ngInject*/ ($locationProvider, $qProvider) => {
  $qProvider.errorOnUnhandledRejections(false);
  $locationProvider.html5Mode(true);
});
