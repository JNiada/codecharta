import angular from "angular";
import * as THREE from "three";

import {ThreeCameraService} from './threeViewer/threeCameraService';
import {ThreeOrbitControlsService} from './threeViewer/threeOrbitControlsService';
import {ThreeRendererService} from './threeViewer/threeRendererService';
import {ThreeSceneService} from './threeViewer/threeSceneService';
import {ThreeUpdateCycleService} from './threeViewer/threeUpdateCycleService';
import {ThreeViewerService} from './threeViewer/threeViewerService';

import {CodeMapDirective} from "./codeMapDirective.js";
import {CodeMapService} from "./codeMapService.js";
import {CodeMapAssetService} from "./codeMapAssetService.js";
import {CodeMapController} from "./codeMapController";

import {TreeMapService} from "./treemap/treeMapService";

angular.module("app.codeCharta.codeMap",[])
  .directive("codeMapDirective", ["threeViewerService", "codeMapService", (a, b) => new CodeMapDirective(a, b)])
  .service("codeMapService", CodeMapService)
  .service("codeMapAssetService", CodeMapAssetService)
  .controller("codeMapController", CodeMapController)
  .service('threeCameraService', ThreeCameraService)
  .service('threeOrbitControlsService', ThreeOrbitControlsService)
  .service('threeRendererService', ThreeRendererService)
  .service('threeSceneService', ThreeSceneService)
  .service('threeUpdateCycleService', ThreeUpdateCycleService)
  .service('threeViewerService', ThreeViewerService)
  .service('treeMapService', TreeMapService)
  .factory(
    "codeMapMaterialFactory",
    () => {return {
                    positive: () => {return new THREE.MeshLambertMaterial({color: 0x69AE40});},
                    neutral: () => {return new THREE.MeshLambertMaterial({color: 0xddcc00});},
                    negative: () => {return new THREE.MeshLambertMaterial({color: 0x820E0E});},
                    odd: () => {return new THREE.MeshLambertMaterial({color: 0x501A1C});},
                    even: () => {return new THREE.MeshLambertMaterial({color: 0xD1A9A9});},
                    selected: () => {return new THREE.MeshLambertMaterial({color: 0xEB8319});},
                    default: () => {return new THREE.MeshLambertMaterial({color: 0x89ACB4});},
                    positiveDelta: () => {return new THREE.MeshLambertMaterial({color: 0x69ff40});}, //building grew -> positive delta, the change may be negative for specific metrics
                    negativeDelta: () => {return new THREE.MeshLambertMaterial({color: 0xff0E0E});}
            };}

  );
