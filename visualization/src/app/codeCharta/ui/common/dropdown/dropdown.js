"use strict";

import "../../../core/module";
import {DropdownDirective} from "./dropdownDirective.js";
import {DropdownController} from "./dropdownController.js";

angular.module("app.codeCharta.ui.common.dropdown",["app.codeCharta.core"]);

angular.module("app.codeCharta.ui.common.dropdown").directive(
    "dropdownDirective",
    () => new DropdownDirective()
);

angular.module("app.codeCharta.ui.common.dropdown").controller(
    "dropdownController",
    DropdownController
);
