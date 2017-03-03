import './main.scss';

class MainCtrl {
  /*@ngInject*/
  constructor($scope) {

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

export const Main = {
  bindings: {
  },
  controller: MainCtrl,
  templateUrl: require('./main.html')
};
