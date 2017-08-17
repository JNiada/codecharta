import angular from "angular";

/**
 * Controls the FileChooser
 */
class FileChooserController {

    /* @ngInject */

    /**
     * @constructor
     * @param {Scope} $scope
     * @param {DataService} dataService
     */
    constructor($scope, dataService, $mdDialog){

        /**
         *
         * @type {Scope}
         */
        this.$scope = $scope;

        /**
         *
         * @type {DataService}
         */
        this.service = dataService;

        this.dialog = $mdDialog;
        this.element = angular.element(document.body);

    }

    /**
     * called when the selected file changed
     * @param {object} element dom input element
     */
    fileChanged(element) {
        let ctx = this;
        this.$scope.$apply(function() {
            var file = element.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                ctx.onNewFileLoaded(e.target.result);
            };
            reader.readAsText(file, "UTF-8");
        });
    }

    /**
     * called when the new file was loaded
     * @param {object} data fileData
     */
    onNewFileLoaded(data){

        try {
            data = JSON.parse(data);
        }
        catch (e) {
            this.showAlert("Error", "JSON parsing failed \n" + e, "ok");
            return;
        }

        this.setNewData(data);

    }

    /**
     * Sets the new data in dataService
     * @param {object} parsedData
     */
    setNewData(parsedData){
        let ctx = this;
        this.service.setFileData(parsedData).then(
            () => {
                if(!ctx.$scope.$$phase || !ctx.$scope.$root.$$phase) {
                    ctx.$scope.$digest();
                }
            },
            (r) => {
                ctx.printErrors(r);
            }
        );

    }

    /**
     * prints errors
     * @param {object} result
     */
    printErrors(result){
        let s = "";
        result.errors.forEach((e)=>{
            s += e.message + " @ " + e.dataPath;
        });
        this.showAlert("Error while setting file data", s, "ok");
    }

    showAlert(title, message, ok) {
      const ctx = this;
      this.dialog.show(
        ctx.dialog.alert()
          .parent(ctx.element)
          .clickOutsideToClose(true)
          .title(title)
          .textContent(message)
          .ariaLabel(title)
          .ok(ok)
          .targetEvent({})
      );
    }

}

export {FileChooserController};


