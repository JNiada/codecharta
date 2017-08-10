"use strict";

import * as d3 from "d3";

/**
 * Calculates the deltas between given maps and modifies the data structure
 */
export class DeltaCalculatorService {

    /* @ngInject */
    constructor(){
    }

    decorateMapsWithDeltas(firstMap, secondMap) {

        let ctx = this;

        return new Promise(
            (resolve, reject)=>{

                if(firstMap.root && secondMap.root) {
                    let firstRoot = d3.hierarchy(firstMap.root);
                    let firstLeaves = firstRoot.leaves();
                    let secondRoot = d3.hierarchy(secondMap.root);
                    let secondLeaves = secondRoot.leaves();

                    for (var j = 0; j < firstLeaves.length; j++) {
                        for (var k = 0; k < secondLeaves.length; k++) {
                            if (firstLeaves[j].data.name === secondLeaves[k].data.name) {
                                //calculate delta for those nodes attributes and push it to the second leave
                                let firstDeltas = ctx.calculateAttributeListDelta(secondLeaves[k].data.attributes, firstLeaves[j].data.attributes);
                                let secondDeltas = ctx.calculateAttributeListDelta(firstLeaves[j].data.attributes, secondLeaves[k].data.attributes);

                                firstLeaves[j].data.deltas = firstDeltas;
                                secondLeaves[k].data.deltas = secondDeltas;

                            }
                        }
                    }
                    resolve();
                } else {
                    console.log("cant calculate deltas with 1 or less root");
                    reject();
                }


            }
        );

    }

    /**
     * Calculates deltas between two attribute lists
     * @param {Object[]} first attributes list
     * @param {Object[]} second attributes list
     * @returns {Object[]} delta between first and second
     */
    calculateAttributeListDelta(first, second){
        let deltas = {};
        for (var key in second) {
            if(key) {
                let firstValue = first[key] ? first[key] : 0; //assume zero if no value in first
                let secondValue = second[key];
                let delta = secondValue - firstValue;
                deltas[key] = delta;
            }
        }
        return deltas;
    }

}