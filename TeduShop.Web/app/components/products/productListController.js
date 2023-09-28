(function (app) {
    app.controller('productListController', productListController);


    //inject

    productListController.$inject = ['$scope', 'apiService'];


    function productListController($scope, apiService) {

        $scope.products = [];
        $scope.page = 0;
        $scope.pagesCount = 0;
        $scope.isLoading = false;

        $scope.getProducts = getProducts;
        function getProducts(page) {
            $scope.isLoading = true;
            page = page || 0;
            var params = {
                params: {
                    page: page,
                    pageSize: 5
                }
            }
            apiService.get('/api/product/getall', params, function (result) {
                $scope.products = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;

                $scope.isLoading = false;

            }, function () {
                console.log('Load products failed.');
                $scope.isLoading = false;
            });
        };

        //init
        $scope.getProducts();

    }
})(angular.module('tedushop.products'));