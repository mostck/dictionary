import './main.scss';

import XLSX from 'xlsx';

class MainCtrl {
  /*@ngInject*/
  constructor($scope) {

    this.$scope = $scope;
    this.$scope.opts = {};

    $scope.sheets = [];
    $scope.activeSheet = {name: null, data: null, header: null};

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

      let columnDefs = [];
      headers.forEach( h => {
        columnDefs.push({ field: h });
      });

      this.$scope.sheets.push({ name: sheetName, columnDefs, data: jsonData});

    });


    if(this.$scope.sheets.length) {
      this.$scope.activeSheet.name = this.$scope.sheets[0].name;
      this.$scope.activeSheet.data =  this.$scope.sheets[0].data;
    }
    this.$scope.$apply();
  }

  changeTab(sheet) {
    console.log('changeTab', sheet);
    this.$scope.activeSheet = sheet;
  }
}

export const Main = {
  bindings: {
  },
  controller: MainCtrl,
  templateUrl: require('./main.html')
};
