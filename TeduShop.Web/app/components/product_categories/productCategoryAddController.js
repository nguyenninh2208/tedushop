(function (app) {
    app.controller('productCategoryAddController', productCategoryAddController);

    productCategoryAddController.$inject = ['$scope', 'apiService', '$location'];

    function productCategoryAddController($scope, apiService, $location) {
        
        $scope.AddProductCategory = AddProductCategory;
        $scope.parentCategories = parentCategories;
        function AddProductCategory() {
            var productCategory = $scope.productCategory ?? {};
            productCategory.CreatedDate = new Date();
            productCategory.CreateBy = "Admin";
            apiService.post('/api/productcategory/create', productCategory, function () {
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
        parentCategories();
    }
})(angular.module('tedushop.product_categories'));