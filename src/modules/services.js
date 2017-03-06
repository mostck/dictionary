import angular from 'angular';

import { DictionaryService } from 'services/dictionary.service'

angular.module('services', [])
  .service('DictionaryService', DictionaryService);