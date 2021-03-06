"use strict";

import "./common/common.js";
import "./fabBar/fabBar.js";
import "./settingsPanel/index.js";
import "./revisionChooser/revisionChooser.js";
import "./legendPanel/legendPanel.js";
import "./fileChooser/fileChooser.js";
import "./detailPanel/detailPanel.js";
import "./scenarioButtons/scenarioButtons.js";

angular.module("app.codeCharta.ui", ["app.codeCharta.ui.common", "app.codeCharta.ui.fabBar", "app.codeCharta.ui.settingsPanel", "app.codeCharta.ui.revisionChooser", "app.codeCharta.ui.legendPanel", "app.codeCharta.ui.fileChooser", "app.codeCharta.ui.detailPanel", "app.codeCharta.ui.scenarioButtons"]);

