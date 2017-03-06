import angular from 'angular';

import { DictionaryService } from 'services/dictionary.service';
import { ModalsService } from 'services/modals.service';
import { WizardService } from 'services/wizard.service';

angular.module('services', [])
  .service('DictionaryService', DictionaryService)
  .service('ModalsService', ModalsService)
  .service('WizardService', WizardService);