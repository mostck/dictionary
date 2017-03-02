import angular from 'angular';
import 'devextreme/dist/js/dx.all';

import './app.scss';

angular.module('dictionary', ['dx'])
.config(($locationProvider) => {
  $locationProvider.html5Mode(true);
});
