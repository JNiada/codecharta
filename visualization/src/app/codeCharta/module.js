import angular from 'angular';

import "angular-material";
import "../../../node_modules/angular-material/angular-material.min.css";

import "./codeMap/module";
import "./core/module";
import "./ui/module";

import {codeCharta} from './codeCharta';

angular
  .module("app.codeCharta", [ "ngMaterial", "app.codeCharta.codeMap", "app.codeCharta.core", "app.codeCharta.ui"])
  .component('codeCharta', codeCharta)
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('teal');
  });
