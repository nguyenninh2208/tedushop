(function (app) {
    app.controller('productCategoryEditController', productCategoryEditController);

    productCategoryEditController.$inject = ['$scope', 'apiService', '$location', '$stateParams'];

    function productCategoryEditController($scope, apiService, $location, $stateParams) {
        $scope.UpdateProductCategory = UpdateProductCategory;
        $scope.parentCategories = parentCategories;

        function UpdateProductCategory() {
            var productCategory = $scope.productCategory ?? {};
            apiService.put('/api/productcategory/update', productCategory, function () {
                $location.path('/product_categories');
            }, function () {
                $scope.productCategory = {};
            });
        }
        function parentCategories() {
            apiService.get('/api/productcategory/getallparents', null, function (result) {
                $scope.parentCategories = result.data;
            }, function () {
                console.log('Load productcategory failed.');
            });
        }

        function loadProductCategoryDetail() {
            console.log('$stateParams.id:', $stateParams.id);

            apiService.get('/api/productcategory/getbyid/' + $stateParams.id, null, function (result) {
                $scope.productCategory = result.data;
            }, function () {
                console.log('Load productcategory failed.');
            });
        }

        parentCategories();
        loadProductCategoryDetail();
    }
})(angular.module('tedushop.product_categories'));