import './modals-templates/wizard.tpl.html';

/*@ngInject*/
function wizardCtrl($scope, $timeout) {

  $scope.parsedData = $scope.$resolve.parsedData;

  $scope.stage = 1;

  $scope.finishStage = 2;


  $scope.sheetsList = $scope.parsedData.map((sheet, i) => {
    console.log('i', i);
    return {name: sheet.name, ind: (i + '')};
  });

  if($scope.sheetsList.length) $scope.selectedSheetIndex = '0';

  $scope.nextHandler = function() {
    $scope.stage++;
  };

  $scope.finishHandler = function() {
    $scope.$close({
      selectedSheetIndex: parseInt($scope.selectedSheetIndex)
    });
  };

  $scope.sheetChanged = function() {

    console.log('Sheet changed', $scope.selectedSheetIndex);

  };

}


export class WizardService {
  /*@ngInject*/
  constructor($uibModal, $rootScope) {
    this.$uibModal = $uibModal;
    this.$rootScope = $rootScope;
  }


  show(parsedData) {

    return this.$uibModal.open({
      templateUrl: require('./modals-templates/wizard.tpl.html'),
      size: 'lg',
      backdrop: 'static',
      resolve: {
        parsedData: () => parsedData
      },
      controller: wizardCtrl,
    }).result;
  }

}
