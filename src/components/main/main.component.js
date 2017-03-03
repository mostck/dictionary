import './main.scss';

import XLSX from 'xlsx';

class MainCtrl {
  /*@ngInject*/
  constructor($scope) {

    this.$scope = $scope;
    this.$scope.opts = {};

    this.$scope.opts.columnDefs = [
      {
        field: "firstName"
      },
      {
        field: "lastName"
      },
      {
        field: "company"
      },
      {
        field: "employed"
      },
    ];
    this.$scope.opts.data  = [
      {
        "firstName": "Cox",
        "lastName": "Carney",
        "company": "Enormo",
        "employed": true
      },
      {
        "firstName": "Lorraine",
        "lastName": "Wise",
        "company": "Comveyer",
        "employed": false
      },
      {
        "firstName": "Nancy",
        "lastName": "Waters",
        "company": "Fuelton",
        "employed": false
      }
    ];


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

    let jsonData = [];
    let headers = [];

    workbook.SheetNames.forEach(function (sheetName) {
      let ws = workbook.Sheets[sheetName];
      let range = XLSX.utils.decode_range(ws['!ref']);
      let R = 0;
      for(var C = range.s.c; C <= range.e.c; ++C) {
        let addr = XLSX.utils.encode_cell({r:R, c:C});
        let cell = workbook[addr];
        (cell && cell.v) ? headers.push(format_column_name(cell.v)) : headers.push("Column_" + C);
      }

      jsonData = XLSX.utils.sheet_to_json(ws, {
        range:0,
        header: headers
      });

    });

    let columnDefs = [];
    headers.forEach(function (h) {
      columnDefs.push({ field: h });
    });
    this.$scope.opts.columnDefs = columnDefs;
    this.$scope.opts.data = jsonData;


    this.$scope.sheets = [];
    for (let sheetName in workbook.Sheets) {
      console.log('Sheet ' + sheetName);

      this.$scope.sheets.push({ name: sheetName, data: jsonData});
    }

    if(this.$scope.sheets.length) {
      this.$scope.activeSheet.name = this.$scope.sheets[0].name;
      this.$scope.activeSheet.data =  this.$scope.sheets[0].data;
    }
    this.$scope.$apply();
  }

  changeTab(sheet) {
    console.log('changeTab', sheet);
    this.$scope.activeSheet.name = sheet.name;
  }
}

export const Main = {
  bindings: {
  },
  controller: MainCtrl,
  templateUrl: require('./main.html')
};
