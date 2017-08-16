import angular from 'angular';

import "./codeMap/module";
import "./core/module";
import "./ui/module";

import {codeCharta} from './codeCharta';

angular
  .module("app.codeCharta", ["app.codeCharta.codeMap", "app.codeCharta.core", "app.codeCharta.ui"])
  .component('codeCharta', codeCharta);
