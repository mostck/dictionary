import './modals-templates/wizard.tpl.html';

import XLSX from 'xlsx';

/*@ngInject*/
function wizardCtrl($scope, $timeout) {

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
    $scope.showHeaders()
  };

  $scope.finishHandler = function() {
    $scope.$close({
      selectedSheetIndex: parseInt($scope.selectedSheetIndex),
      rowColumnName: $scope.rowColumnName,
      rowSkip: parseInt($scope.rowSkip)
    });
  };

  $scope.sheetChanged = function() {

    console.log('Sheet changed', $scope.selectedSheetIndex);

  };


  function format_column_name(name) { return name.replace(/\s(.)/g, function($$,$1) { return $1.toUpperCase()}); }

  $scope.types = {
    b: 'Boolean',
    n: 'Number',
    e: 'error',
    s: 'String',
    d: 'Date'
  };

  function format_column_type(cell) {
    return cell ? $scope.types[cell.t] : 'undefined'
  }

  $scope.showHeaders = function () {

    $scope.headers = [];

    $scope.allFields = true;


    let ws = $scope.parsedData[$scope.selectedSheetIndex].ws;
    let range = XLSX.utils.decode_range(ws['!ref']);
    let R = $scope.rowSkip || 0;

    for(let C = range.s.c; C <= range.e.c; ++C) {
      let addr = XLSX.utils.encode_cell({r:R, c:C});
      let cell = ws[addr];

      let addrT = XLSX.utils.encode_cell({r:R+1, c:C});
      let cellT = ws[addrT];
      if(cell && cell.v && $scope.rowColumnName) {
        $scope.headers.push({name: format_column_name(cell.v), type: format_column_type(cellT), selected: true })
      } else {
        $scope.headers.push({name: String.fromCharCode('A'.charCodeAt() + C), type: format_column_type(cellT), selected: true });
      }
    }

    let jsonData;

    // jsonData = XLSX.utils.sheet_to_json(ws, {
    //   range: $scope.rowColumnName ? R + 1 : R,
    //   header: headers
    // });
  };

  $scope.closeWizard = function() {
    $scope.$dismiss({reason:'canceled'});
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
