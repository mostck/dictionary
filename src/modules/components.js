import angular from 'angular';
import { Main } from 'components/main/main.component';
import { Grid } from 'components/grid/grid.component';

let module = angular.module('components', []);

module
  .component('mainComponent', Main)
  .component('gridComponent', Grid);
