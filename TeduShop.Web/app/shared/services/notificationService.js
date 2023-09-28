/// <reference path="../../../assets/admin/libs/angular/angular.js" />

(function (app) {
    app.factory('notificationService', notificationService);

    notificationService.$inject = ['$http'];

    function notificationService() {
        return {
            showError: showError,
            showSuccess: showSuccess,
            showWaring: showWaring
        }

        function showError(error) {
            toastr.error(error);
        }
        function showSuccess(msg) {
            toastr.success(msg);
        }
        function showWaring(msg) {
            toastr.warning(msg);
        }

      
    }
})(angular.module('tedushop.common'));