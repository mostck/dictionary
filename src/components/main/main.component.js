import './main.scss';

import XLSX from 'xlsx';

class MainCtrl {
  /*@ngInject*/
  constructor($scope, DictionaryService, WizardService, XlsParseService) {

    this.$scope = $scope;
    this.$scope.opts = {};
    this.WizardService = WizardService;
    this.DictionaryService = DictionaryService;
    this.XlsParseService = XlsParseService;

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

    let tempSheets = [];

    workbook.SheetNames.forEach(sheetName => {
      let ws = workbook.Sheets[sheetName];

      tempSheets.push({
        name: sheetName,
        ws: ws
      });

    });

    this.WizardService.show(tempSheets).then(res => {
      console.log('res', res);

      let jsonData;
      let headers = [];
      let columnDefs = [];

      res.headers.forEach(function (el) {
        headers.push(el.name);
        columnDefs.push({ field: el.name, name: el.name });
      });

      let selectedSheet = tempSheets[res.selectedSheetIndex];

      let ws = selectedSheet.ws;
      let R = res.rowSkip || 0;

      jsonData = XLSX.utils.sheet_to_json(ws, {
        range: res.rowColumnName ? R + 1 : R,
        header: headers
      });

      jsonData.forEach((row, i) => {
        row.rowHeader = i + 1;
      });

      let dataSheet = {
        name: selectedSheet.name,
        columnDefs,
        data: jsonData
      };

      this.$scope.sheets.push(dataSheet);

      let structureData = res.headers.map((h, i) => {
        return { __row_num__: i, rowHeader: (i + 1), A: h.name, B: this.XlsParseService.typesMap[h.type] };
      });

      let structureSheet = {
        name: 'Data Structure',
        columnDefs: [ { field: 'A', name: 'Field Name' }, { field: 'B', name: 'Data Type' }],
        data: structureData,
      };

      this.$scope.sheets.push(structureSheet);

      this.$scope.activeSheet = this.$scope.sheets[0];

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
