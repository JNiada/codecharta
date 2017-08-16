import angular from 'angular';

import {DataService} from './data/dataService';
import {DataValidatorService} from './data/dataValidatorService';
import {UrlService} from './url/urlService';
import {SettingsService} from './settings/settingsService';
import {ScenarioService} from './scenario/scenarioService';

angular
  .module("app.codeCharta.core", [])
  .service('dataService', DataService)
  .service('dataValidatorService', DataValidatorService)
  .service('urlService', UrlService)
  .service('settingsService', SettingsService)
  .service('scenarioService', ScenarioService);
