import angular from 'angular';

import {DataService} from './data/dataService';
import {DataValidatorService} from './data/dataValidatorService';
import {UrlService} from './url/urlService';
import {SettingsService} from './settings/settingsService';
import {ScenarioService} from './scenario/scenarioService';
import {TooltipService} from './tooltip/tooltipService';

angular
  .module("app.codeCharta.core", [])
  .service('dataService', DataService)
  .service('dataValidatorService', DataValidatorService)
  .service('urlService', UrlService)
  .service('settingsService', SettingsService)
  .service('tooltipService', TooltipService)
  .service('scenarioService', ScenarioService);
