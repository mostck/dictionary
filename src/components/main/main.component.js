import './main.scss';

import XLSX from 'xlsx';

class MainCtrl {
  /*@ngInject*/
  constructor($scope) {

    this.$scope = $scope;

    console.log('XLSX', XLSX);

    $scope.sheets = [];
    $scope.activeSheet = {name: null, data: null};

    $scope.readXls = this.readXls.bind(this);

    $scope.myData = [
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

    $scope.error = function (e) {
      console.log(e);
    }
  }

  readXls(workbook) {
    console.log('readXls');
    this.$scope.sheets = [];
    for (let sheetName in workbook.Sheets) {
      console.log('Sheet ' + sheetName);
      let jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      console.log(jsonData);

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
