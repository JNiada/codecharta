import angular from "angular";

import "angularjs-slider";
import "../core/module";

import {SettingsPanelDirective} from "./settingsPanel/settingsPanelDirective";
import {SettingsPanelController} from "./settingsPanel/settingsPanelController";

angular.module("app.codeCharta.ui", ["app.codeCharta.core", "rzModule"])
  .controller("settingsPanelController", SettingsPanelController)
  .directive("settingsPanelDirective", [() => new SettingsPanelDirective()]);



