import "./fabBar.css";
import $ from "jquery";
import "materialize-css";
import "materialize-css/dist/css/materialize.css";

/**
 * Renders the floating action button bar
 */
class FabBarDirective{

    /**
     * @constructor
     */
    constructor() {

        /**
         *
         * @type {string}
         */
        this.template = require("./fabBar.html");

        /**
         *
         * @type {string}
         */
        this.restrict = "E";

        /**
         *
         * @type {Scope}
         */
        this.scope = {};
    }

}

export {FabBarDirective};
