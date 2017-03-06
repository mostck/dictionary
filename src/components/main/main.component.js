import './main.scss';

import XLSX from 'xlsx';

class MainCtrl {
  /*@ngInject*/
  constructor($scope, DictionaryService, WizardService, XlsParseService) {

    this.$scope = $scope;
    this.$scope.opts = {};
    this.WizardService = WizardService;
    this.DictionaryService = DictionaryService;

    $scope.dictionariesList = [];
    $scope.selectedDictionaryId = null;

    $scope.sheets = [];
    $scope.activeSheet = {
      name: null,
      data: null,
      header: null,
      onRegisterApi: gridApi => {
        // console.log('onRegisterApi', gridApi);
        let cellTemplate =  "<div class=\"ui-grid-row-header-cell ui-grid-disable-selection\"><div class=\"ui-grid-cell-contents\">{{row.entity['rowHeader']}}</div></div>";
        gridApi.core.addRowHeaderColumn({
          name: 'rowHeaderCol',
          displayName: '',
          width: 30,
          cellTemplate: cellTemplate
        });
      }
    };

    DictionaryService.getDictionariesList()
      .then(res => {

        $scope.dictionariesList = res;
        if(res.length) $scope.selectedDictionaryId = res[0].id;

      }).catch(err => {
        console.log('Error getting dictionaries', err);
      });

    $scope.readXls = this.readXls.bind(this);

    $scope.error = function (e) {
      console.log(e);
    }
  }

  readXls(workbook) {

    this.$scope.sheets = [];

    workbook.SheetNames.forEach(sheetName => {
      let ws = workbook.Sheets[sheetName];

      this.$scope.sheets.push({
        name: sheetName,
        ws: ws
      });

    });

    this.WizardService.show(this.$scope.sheets).then(res => {
      console.log('res', res);

      let jsonData;
      let headers = [];
      let columnDefs = [];

      res.headers.forEach(function (el) {
        headers.push(el.name);
        columnDefs.push({ field: el.name, name: el.name });
      });

      this.$scope.sheets = this.$scope.sheets.slice(res.selectedSheetIndex, res.selectedSheetIndex + 1);

      let ws = this.$scope.sheets[0].ws;
      let R = res.rowSkip || 0;

      jsonData = XLSX.utils.sheet_to_json(ws, {
        range: res.rowColumnName ? R + 1 : R,
        header: headers
      });

      jsonData.forEach((row, i) => {
        row.rowHeader = i + 1;
      });

      this.$scope.activeSheet = {
        name: this.$scope.sheets[0].name,
        columnDefs,
        data: jsonData
      };

    }).catch(err => {});

  }

  changeTab(sheet) {
    console.log('changeTab', sheet);
    this.$scope.activeSheet = sheet;
  }

  dictionaryChanged() {
    console.log('selectedDictionaryId', this.$scope.selectedDictionaryId);
  }
}

export const Main = {
  bindings: {
  },
  controller: MainCtrl,
  templateUrl: require('./main.html')
};
