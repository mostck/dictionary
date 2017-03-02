import angular from 'angular';
import { Main } from 'components/main/main.component';

let module = angular.module('components', []);

module
  .component('mainComponent', Main);
