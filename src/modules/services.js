import angular from 'angular';

import { DictionaryService } from 'services/dictionary.service';
import { ModalsService } from 'services/modals.service';
import { WizardService } from 'services/wizard.service';
import { XlsParseService } from 'services/xlsParse.service';

angular.module('services', [])
  .service('DictionaryService', DictionaryService)
  .service('ModalsService', ModalsService)
  .service('XlsParseService', XlsParseService)
  .service('WizardService', WizardService);