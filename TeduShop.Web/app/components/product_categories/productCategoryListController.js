(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$location'];

    function productCategoryListController($scope, apiService, notificationService, $location) {
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
                    notificationService.showSuccess('Found ' + result.data.TotalCount + ' item');
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



        $scope.deleteProductCategory = deleteProductCategory;

        $scope.currentDeletedId = 0;
        function deleteProductCategory(id) {

            if (confirm("Are you sure delete it?")) {
                apiService.del('/api/productcategory/delete/' + id, null, function () {
                    $location.path('/product_categories');
                    $scope.currentDeletedId = id;
                    console.log("$scope.currentDeletedId: ", $scope.currentDeletedId);
                }, function () {

                });
            }
        }





    }
})(angular.module('tedushop.product_categories'));