(function (app) {
    app.controller('productListController', productListController);

    //inject

    productListController.$inject = ['$scope', 'apiService', 'notificationService', '$location', '$filter'];

    function productListController($scope, apiService, notificationService, $location, $filter) {
        console.debug("productListController is invoked.");

        $scope.products = [];
        $scope.page = 0;
        $scope.pagesCount = 0;
        $scope.isLoading = false;

        $scope.getProducts = getProducts;

        $scope.keyword = "";
        $scope.search = search;
        function search() {
            getProducts();
        }

        function getProducts(page) {
            $scope.isLoading = true;
            page = page || 0;
            var params = {
                params: {
                    keyword: $scope.keyword || "",
                    page: page,
                    pageSize: 5
                }
            }
            apiService.get('/api/product/getall', params, function (result) {
                $scope.products = result.data.Items;
                if (result.data.TotalCount == 0) {
                    notificationService.showWaring('Not found');
                }
                else {
                    notificationService.showSuccess('Found ' + result.data.TotalCount + ' item');
                }
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