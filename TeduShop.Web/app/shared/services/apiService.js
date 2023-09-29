/// <reference path="../../../assets/admin/libs/angular/angular.js" />

(function (app) {
    app.factory('apiService', apiService);

    apiService.$inject = ['$http', 'notificationService'];

    function apiService($http, notificationService) {
        return {
            get: get,
            post: post,
            put: put,
            del: del
        }

        function get(url, params, success, failure) {
            $http.get(url, params).then(function (result) {
                success(result);
            }, function (error) {
                failure(error);
            });
        }
        function post(url, params, success, failure) {
            $http.post(url, params).then(function (result) {
                notificationService.showSuccess('Insert succeed');
                success(result);
            }, function (error) {
                notificationService.showError(error);
                failure(error);
            });
        }
        function put(url, params, success, failure) {
            $http.put(url, params).then(function (result) {
                notificationService.showSuccess('Update succeed');
                success(result);
            }, function (error) {
                notificationService.showError(error);
                failure(error);
            });
        }
        function del(url, params, success, failure) {
            $http.delete(url, params).then(function (result) {
                notificationService.showSuccess('Delete succeed');
                success(result);
            }, function (error) {
                notificationService.showError(error);
                failure(error);
            });
        }
       
    }
})(angular.module('tedushop.common'));