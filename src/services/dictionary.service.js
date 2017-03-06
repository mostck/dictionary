const dictionariesList = [
  {id: '1', title: 'First Dictionary'},
  {id: '2', title: 'Second Dictionary'},
  {id: '3', title: 'Third Dictionary'},
  {id: '4', title: 'Fourth Dictionary'},
];

const typesMap = {
  text: 'Text',
  uint: 'Unsigned Integer',
  float: 'Float Number',
  date: 'Date',
  timedate: 'Time and Date',
};

const fakeDictionaryData = {
  fields: [
    {
      id: '1',
      name: 'name',
      type: 'text',
    },
    {
      id: '2',
      name: 'age',
      type: 'uint',
    },
    {
      id: '3',
      name: 'registered',
      type: 'date',
    },
  ],
  rows: [
    {
      rowNumber: 2,
      cols: [
        { colNumber: 1, data: 'Alex', field: '1' },
        { colNumber: 2, data: '25', field: '2' },
        { colNumber: 3, data: '03/06/2017', field: '3' },
      ]
    },
    {
      rowNumber: 3,
      cols: [
        { colNumber: 1, data: 'John', field: '1' },
        { colNumber: 2, data: '32', field: '2' },
        { colNumber: 3, data: '03/06/2017', field: '3' },
      ]
    },
    {
      rowNumber: 4,
      cols: [
        { colNumber: 1, data: 'Peter', field: '1' },
        { colNumber: 2, data: '87', field: '2' },
        { colNumber: 3, data: '11/25/2007', field: '3' },
      ]
    },
  ]
};

export class DictionaryService {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  getDictionariesList() {

    return new Promise((resolve, reject) => {

      resolve(dictionariesList);

    });

  }

  getDictionaryData(dicId) {

    return new Promise((resolve, reject) => {

      resolve(fakeDictionaryData);

    });

  }

  getTypesMap() {

    return typesMap;

  }
}
