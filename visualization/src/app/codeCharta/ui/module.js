import angular from "angular";

import "angularjs-slider";
import "../core/module";
import "../codeMap/module";
import "./common/module";

import "./fileChooser/fileChooser";

import {SettingsPanelDirective} from "./settingsPanel/settingsPanelDirective";
import {SettingsPanelController} from "./settingsPanel/settingsPanelController";

import {ScenarioButtonsDirective} from "./scenarioButtons/scenarioButtonsDirective";
import {ScenarioButtonsController} from "./scenarioButtons/scenarioButtonsController";

import {RevisionChooserDirective} from "./revisionChooser/revisionChooserDirective";
import {RevisionChooserController} from "./revisionChooser/revisionChooserController";

import {LegendPanelDirective} from "./legendPanel/legendPanelDirective";
import {LegendPanelController} from "./legendPanel/legendPanelController";

import {DetailPanelDirective} from "./detailPanel/detailPanelDirective";
import {DetailPanelController} from "./detailPanel/detailPanelController";

angular.module("app.codeCharta.ui", ["app.codeCharta.core", "app.codeCharta.codeMap","rzModule", "app.codeCharta.ui.fileChooser"])
  .controller("detailPanelController", DetailPanelController)
  .directive("detailPanelDirective", [() => new DetailPanelDirective()])
  .controller("legendPanelController", LegendPanelController)
  .directive("legendPanelDirective", [() => new LegendPanelDirective()])
  .controller("settingsPanelController", SettingsPanelController)
  .directive("settingsPanelDirective", [() => new SettingsPanelDirective()])
  .controller("revisionChooserController", RevisionChooserController)
  .directive("revisionChooserDirective", [() => new RevisionChooserDirective()])
  .controller("scenarioButtonsController", ScenarioButtonsController)
  .directive("scenarioButtonsDirective", [() => new ScenarioButtonsDirective()]);



