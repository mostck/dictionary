import './grid.scss';

class GridCtrl {
  /*@ngInject*/
  constructor($scope) {

    this.$scope = $scope;

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

  }


}

export const Grid = {
  bindings: {
    gridData: '='
  },
  controller: GridCtrl,
  templateUrl: require('./grid.html')
};
