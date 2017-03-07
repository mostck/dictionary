import angular from 'angular';

/*ngInject*/
function typeFilter(XlsParseService) {

  return function(input) {
    if (!input){
      return '';
    } else {
      return XlsParseService.typesMap[input];
    }
  };

}

angular.module('filters', [])
  .filter('typeFilter', typeFilter);