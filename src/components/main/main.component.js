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
      // data: null,
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
      },
      columnDefs: [
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
      ],
      data: [
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
      ]
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

      let types = this.XlsParseService.typesMap;

      res.headers.forEach(function (el) {
        headers.push(el.name);
        columnDefs.push({ field: el.name, name: el.name, type: types[el.type] });
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
        return { __row_num__: i, rowHeader: (i + 1), A: h.name, B: h.type };
      });

      let structureSheet = {
        name: 'Data Structure',
        columnDefs: [ { field: 'A', name: 'Field Name' },
          { field: 'B', name: 'Data Type',
            editableCellTemplate: 'ui-grid/dropdownEditor',
            width: '20%',
            cellFilter: 'typeFilter', editDropdownValueLabel: 'datatype', editDropdownOptionsArray:
            Object.keys(this.XlsParseService.typesMap).map(key => {
              return { id: key, datatype: this.XlsParseService.typesMap[key]};
            }),
          }],
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

  addRow() {
    this.$scope.activeSheet.data.push({});
  };

  removeLastRow() {
    this.$scope.activeSheet.data.splice(-1,1);
  };

  addColumn() {
    this.$scope.activeSheet.columnDefs.push({ field: String.fromCharCode('A'.charCodeAt() + this.$scope.activeSheet.columnDefs.length) });
  }

  removeLastColumn() {
    this.$scope.activeSheet.columnDefs.splice(-1, 1);
  }

}

export const Main = {
  bindings: {
  },
  controller: MainCtrl,
  templateUrl: require('./main.html')
};
