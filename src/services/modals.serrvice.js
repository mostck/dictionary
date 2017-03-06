import 'shared/modals/alert.tpl.html';
import 'shared/modals/confirm.tpl.html';

export class ModalsService {
  /*@ngInject*/
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  alert(options) {
    return this.$uibModal.open({
      templateUrl: require('shared/modals/alert.tpl.html'),
      size:  options.size ? options.size : 'md',
      controller: ['$scope', function ($scope) {
        Object.keys(options).forEach(key => {
          $scope[key] = options[key];
        });
      }]
    }).result;
  }

  confirm(options) {
    return this.$uibModal.open({
      templateUrl: require('shared/modals/confirm.tpl.html'),
      size:  options.size ? options.size : 'md',
      controller: ['$scope', function ($scope) {
        Object.keys(options).forEach(key => {
          $scope[key] = options[key];
        });
      }]
    }).result;
  }

  show(options) {
    return this.$uibModal.open({
      sieze: options.size || 'md',
      component: options.component
    }).result;
  }
}
