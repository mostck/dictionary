import './grid.scss';

class GridCtrl {
  /*@ngInject*/
  constructor($scope) {

    this.$scope = $scope;

  }


}

export const Grid = {
  bindings: {
    gridData: '='
  },
  controller: GridCtrl,
  templateUrl: require('./grid.html')
};
