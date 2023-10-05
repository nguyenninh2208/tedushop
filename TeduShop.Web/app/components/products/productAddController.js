(function (app) {
    app.controller('productAddController', productAddController);

    productAddController.$inject = ['$scope', 'apiService', '$location'];

    function productAddController($scope, apiService, $location) {
        $scope.AddProduct = AddProduct;
        $scope.categories = categories();
        function AddProduct() {
            var product = $scope.product ?? {};
            product.CreatedDate = new Date();
            product.CreateBy = "Admin";
            apiService.post('/api/product/create', product, function () {
                $location.path('/products');
            }, function () {
                $scope.product = {};
            });
        }

        function categories() {
            apiService.get('/api/productcategory/getallparents', null, function (result) {
                $scope.parentCategories = result.data;
            }, function () {
                console.log('Load productcategory failed.');
            });
        }
        categories();


    }
})(angular.module('tedushop.products'));