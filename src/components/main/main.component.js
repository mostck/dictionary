import './main.scss';

import XLSX from 'xlsx';

class MainCtrl {
  /*@ngInject*/
  constructor($scope, DictionaryService) {

    this.$scope = $scope;
    this.$scope.opts = {};

    $scope.dictionariesList = [];
    $scope.selectedDictionaryId = null;

    $scope.sheets = [];
    $scope.activeSheet = {
      name: null,
      data: null,
      header: null,
      onRegisterApi: gridApi => {
        console.log('onRegisterApi', gridApi);
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
    console.log('readXls');

    function format_column_name(name) { return name.replace(/\s(.)/g, function($$,$1) { return $1.toUpperCase()}); }

    this.$scope.sheets = [];

    workbook.SheetNames.forEach(sheetName => {

      let jsonData = [];
      let headers = [];

      let ws = workbook.Sheets[sheetName];
      let range = XLSX.utils.decode_range(ws['!ref']);
      let R = 0;
      for(let C = range.s.c; C <= range.e.c; ++C) {
        let addr = XLSX.utils.encode_cell({r:R, c:C});
        let cell = workbook[addr];
        (cell && cell.v) ? headers.push(format_column_name(cell.v)) : headers.push("Column_" + C);
      }

      jsonData = XLSX.utils.sheet_to_json(ws, {
        range:0,
        header: headers
      });

      jsonData.forEach((row, i) => {
        row.rowHeader = i + 1;
      });

      console.log('jsonData', jsonData);

      let columnDefs = [];

      headers.forEach( (h, i) => {
        columnDefs.push({ field: h, name: String.fromCharCode('A'.charCodeAt() + i) });
      });

      console.log('columnDefs', columnDefs);

      this.$scope.sheets.push({
        name: sheetName,
        columnDefs,
        data: jsonData
      });

    });


    if(this.$scope.sheets.length) {
      this.$scope.activeSheet = this.$scope.sheets[0];
    }
    this.$scope.$apply();
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
