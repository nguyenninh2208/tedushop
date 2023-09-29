/// <reference path="../../../assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tedushop.product_categories', ['tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('product_categories', {
            url: "/product_categories",
            templateUrl: "/app/components/product_categories/productCategoryListView.html",
            controller: "productCategoryListController"
        });
        $stateProvider.state('add_product_categories', {
            url: "/add_product_categories",
            templateUrl: "/app/components/product_categories/productCategoryAddView.html",
            controller: "productCategoryAddController"
        });
        $stateProvider.state('edit_product_categories', {
            url: "/edit_product_categories/:id",
            templateUrl: "/app/components/product_categories/productCategoryEditView.html",
            controller: "productCategoryEditController"
        });
        $stateProvider.state('delete_product_categories', {
            url: "/delete_product_categories/:id",
            controller: "productCategoryDeleteController"
        });
    }
})();