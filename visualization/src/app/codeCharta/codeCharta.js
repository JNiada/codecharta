import "./codeCharta.css";
import $ from "jquery";

/**
 * This is the main controller of the CodeCharta application
 */
export class CodeChartaController {

  /* @ngInject */

  /**
   * @constructor
   * @param {UrlService} urlService
   * @param {DataService} dataService
   * @param {SettingsService} settingsService
   * @param {ScenarioService} scenarioService
   */
  constructor(dataService, urlService, settingsService, scenarioService) {
    this.initHandlers();
    this.loadFileOrSample(urlService, dataService, settingsService);
    this.scenarioService = scenarioService;
    this.version = require("../../../package.json").version;
    this.sample = require("./sample.json");
  }

  /**
   * Tries to load the file specified in the given url. Loads sample data if it fails.
   * @param {UrlService} urlService
   * @param {DataService} dataService
   * @param {SettingsService} settingsService
   */
  loadFileOrSample(urlService, dataService, settingsService) {

    let ctx = this;

    urlService.getFileDataFromQueryParam().then(

      //try loading from url param

      //successfully loaded
      (data) => {

        // set loaded data
        dataService.setFileData(data).then(
          () => {
            settingsService.updateSettingsFromUrl();
          },
          (r) => {ctx.printErrors(r);}
        );

      },

      //fail load sample
      () => {
        dataService.setFileData(ctx.sample).then(
          () => {
            ctx.loadingFinished();
            settingsService.updateSettingsFromUrl();
          },
          (r) => {ctx.printErrors(r);}
        )
      }

    );

  }

  /**
   * called after map loading finished. Applies the default scenario.
   */
  loadingFinished() {
    this.scenarioService.applyScenario(this.scenarioService.getDefaultScenario());
  }

  /**
   * initializes keypress handlers
   */
  initHandlers() {

    $(window).keyup(function(event){
      if (event.which === 116) {
        window.location.reload();
      }
    });

    $(window).keypress(function(event){
      if (event.which === 18 && (event.ctrlKey || event.metaKey)) {
        window.location.reload();
      }
    });

  }

  /**
   * Prints errors to the browser console and alerts the user
   * @param {Object} errors an errors object
   */
  printErrors(errors){
    window.alert("Wrong format. See console logs for details.");
    console.log(errors);
  }

}

export const codeCharta = {
  template: require('./codeCharta.html'),
  controller: CodeChartaController
};


