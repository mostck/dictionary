import './modals-templates/wizard.tpl.html';

/*@ngInject*/
function wizardCtrl($scope) {

  $scope.stage = 1;

  $scope.finishStage = 2;

  $scope.sheetsList = $scope.parsedData.map((sheet, i) => {
    return {name: sheet.name, index: '' + i};
  });

  if($scope.sheetsList.length) $scope.selectedSheetIndex = '0';

  console.log('$scope.sheetsList', $scope.sheetsList);

  $scope.nextHandler = function() {
    $scope.stage++;
  };

  $scope.finishHandler = function() {
    $scope.$close({
      selectedSheetIndex: $scope.selectedSheetIndex
    });
  };

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
