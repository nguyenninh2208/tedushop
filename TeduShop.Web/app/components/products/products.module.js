/// <reference path="../../../assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('tedushop.products', ['tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        console.info("Configuring states...");

        $stateProvider.state('products', {
            url: "/products",
            templateUrl: "/app/components/products/productListView.html",
            controller: "productListController"
        });

        $stateProvider.state('add_products', {
            url: "/add_products",
            templateUrl: "/app/components/products/productAddView.html",
            controller: "productAddController"
        });

    }
})();