"use strict";

/**
 * Return tooltips containing descriptions
 */
class TooltipService {

    /* @ngInject */

    /**
     * @constructor
     * @param {Scope} $rootScope
     */
    constructor($rootScope){

        /**
         *
         * @type {Object}
         */
        this.tooltips = require("./tooltips.json");

        $rootScope.$broadcast("tooltips-changed", this.tooltips);

    }

    /**
     * returns the tooltip description related to the given key
     * @param {String} key
     * @returns {String} the description related to the given key
     */
    getTooltipTextByKey(key) {

        /**
         * This RegExp describes any set of zero or more
         * non-whitespace symbols between "_"
         * @type {RegExp}
         */
        const patt = new RegExp(/_\S*_/);

        if( this.tooltips[key] ){

            var res = this.tooltips[key];


            /**
             * Any value between "_" Symbols is substituted by its description
             */
            while ( patt.test(res) ) {
                res = res.replace(/_(.*?)_/, this.replaceString.bind(this));
            }
            return res;

        } else {
            return "no description";
        }

    }

    /**
     * Function used for recursiveness with getTooltipTexByKey
     * @param {String} match matched string
     * @param {String} p1 first regex group
     * @returns {String}
     */
    replaceString(match, p1) {
        return this.getTooltipTextByKey(p1);
    }

}

export {TooltipService};
