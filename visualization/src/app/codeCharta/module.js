import angular from 'angular';
import "./codeMap/codeMap";

import {codeCharta} from './codeCharta';

import {DataService} from './core/data/dataService';
import {DataValidatorService} from './core/data/dataValidatorService';
import {UrlService} from './core/url/urlService';
import {SettingsService} from './core/settings/settingsService';
import {ScenarioService} from './core/scenario/scenarioService';

angular
  .module("app.codeCharta", ["app.codeCharta.codeMap"])
  .service('dataService', DataService)
  .service('dataValidatorService', DataValidatorService)
  .service('urlService', UrlService)
  .service('settingsService', SettingsService)
  .service('scenarioService', ScenarioService)
  .component('codeCharta', codeCharta);
