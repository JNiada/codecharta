"use strict";

import "../../core/module.js";
import {FileChooserDirective} from "./fileChooserDirective.js";
import {FileChooserController} from "./fileChooserController.js";

angular.module("app.codeCharta.ui.fileChooser",["app.codeCharta.core"]);

angular.module("app.codeCharta.ui.fileChooser").controller(
    "fileChooserController", FileChooserController
);

angular.module("app.codeCharta.ui.fileChooser").directive(
    "fileChooserDirective",
    () => new FileChooserDirective()
);
