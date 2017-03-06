import './modals-templates/wizard.tpl.html';

/*@ngInject*/
function wizardCtrl($scope) {
  $scope.test = 'It\'s working';
}


export class WizardService {
  /*@ngInject*/
  constructor($uibModal, $rootScope) {
    this.$uibModal = $uibModal;
    this.$rootScope = $rootScope;
  }


  show(parsedData) {
    let wizardScope  = this.$rootScope.$new();

    wizardScope.parsedData = parsedData;

    return this.$uibModal.open({
      templateUrl: require('./modals-templates/wizard.tpl.html'),
      size: 'lg',
      scope: wizardScope,
      controller: wizardCtrl
    }).result;
  }

}
