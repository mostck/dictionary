import './main.scss';

import XLSX from 'xlsx';

class MainCtrl {
  /*@ngInject*/
  constructor($scope) {

    console.log('XLSX', XLSX)

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

    $scope.read = function (workbook) {
      for (var sheetName in workbook.Sheets) {
        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log(jsonData);
      }
    };

    $scope.error = function (e) {
      console.log(e);
    }
  }
}

export const Main = {
  bindings: {
  },
  controller: MainCtrl,
  templateUrl: require('./main.html')
};
