import './modals-templates/wizard.tpl.html';

import XLSX from 'xlsx';

/*@ngInject*/
function wizardCtrl($scope, $timeout, XlsParseService) {

  $scope.parsedData = $scope.$resolve.parsedData;

  $scope.stage = 1;

  $scope.finishStage = 2;

  $scope.rowColumnName = null;
  $scope.rowSkip = 0;
  $scope.headers = [];

  $scope.sheetsList = $scope.parsedData.map((sheet, i) => {
    console.log('i', i);
    return {name: sheet.name, ind: (i + '')};
  });

  if($scope.sheetsList.length) $scope.selectedSheetIndex = '0';

  console.log('$scope.sheetsList', $scope.sheetsList);

  $scope.rowSkipChange = function() {
    console.log('rowSkipChange', $scope.rowSkip)
  };

  $scope.nextHandler = function() {
    $scope.stage++;
    $scope.buildHeader()
  };

  $scope.finishHandler = function() {

    $scope.headers = $scope.headers.filter(h => h.selected);

    $scope.$close({
      selectedSheetIndex: parseInt($scope.selectedSheetIndex),
      rowColumnName: $scope.rowColumnName,
      rowSkip: parseInt($scope.rowSkip),
      headers: $scope.headers
    });
  };

  $scope.sheetChanged = function() {

    console.log('Sheet changed', $scope.selectedSheetIndex);

  };

  $scope.types = {
    b: 'Boolean',
    n: 'Number',
    e: 'error',
    s: 'String',
    d: 'Date',
    u: 'undefined'
  };

  $scope.buildHeader = function () {

    $scope.headers = [];

    $scope.allFields = true;

    $scope.headers = XlsParseService.buildHeaders($scope.parsedData[$scope.selectedSheetIndex], $scope.rowSkip, $scope.rowColumnName);

  };

  $scope.closeWizard = function() {
    $scope.$dismiss({reason:'canceled'});
  };

  $scope.toggleAll = function() {

    $scope.headers.forEach(h => { h.selected = $scope.allFields; });

  };

  $scope.checkAll = function(header) {

    if(!header.selected) {
      $scope.allFields = false;
      return;
    }

    if($scope.headers.every(h => h.selected)) {
      $scope.allFields = true;
      return;
    }

    $scope.allFields = false;

  }

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
