(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject = ['$scope', 'apiService', 'notificationService'];

    function productCategoryListController($scope, apiService, notificationService) {
        $scope.productCategories = [];
        $scope.page = 0;
        $scope.pagesCount = 0;
        $scope.getProductCagories = getProductCagories;
        $scope.keyword = "";
        $scope.search = search;
        function search() {
            getProductCagories();
        }
        function getProductCagories(page) {
            page = page || 0;
            var params = {
                params: {
                    keyword: $scope.keyword,
                    page: page,
                    pageSize: 10
                }
            }
            apiService.get('/api/productcategory/getall', params, function (result) {
                $scope.productCategories = result.data.Items;
                if (result.data.TotalCount == 0) {
                    notificationService.showWaring('Not found');
                }
                else {
                    notificationService.showSuccess('Found '+result.data.TotalCount+' item');
                }
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;
            }, function () {
                notificationService.showError('Load productcategory failed.');
                console.log('Load productcategory failed.');
            });
        }

        $scope.getProductCagories();
    }
})(angular.module('tedushop.product_categories'));