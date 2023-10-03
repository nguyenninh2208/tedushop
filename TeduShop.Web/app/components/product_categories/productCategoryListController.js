(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$location', '$filter'];

    function productCategoryListController($scope, apiService, notificationService, $location, $filter) {
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

        $scope.selectAll = selectAll;

        $scope.isAll = false;
        $scope.deleteAll = deleteAll;

        function selectAll() {
            if ($scope.isAll === false) {
                angular.forEach($scope.productCategories, function (item) {
                    item.checked = true;
                })
                $scope.isAll = true;
            }
            else {
                angular.forEach($scope.productCategories, function (item) {
                    item.checked = false;
                })
                $scope.isAll = false;
            }
        }

        ///n : giá trị mới
        ///o: giá trị cũ
        // Watch for changes in the "productCategories" array
        $scope.$watch("productCategories", function (n, o) {
            //Có ý nghĩa là bạn đang sử dụng dịch vụ $filter trong AngularJS 
            //để lọc các phần tử trong mảng n dựa trên một điều kiện.Điều kiện này là { checked: true }.
            var checked = $filter("filter")(n, { checked: true });
            if (checked.length) {
                $scope.selected = checked;
                $('#btnDelete').prop('disabled', false); // Use .prop() to enable the button
            } else {
                $('#btnDelete').prop('disabled', true); // Use .prop() to disable the button
            }
            console.log($scope.selected);
        }, true); // The 'true' argument makes the $watch deep watch the array for changes

        function deleteProductCategory(id) {
            
            if (confirm("Are you sure delete it?")) {
                apiService.del('/api/productcategory/delete' + id, null, function () {
                    $location.path('/product_categories');
                    $scope.currentDeletedId = id;
                    console.log("$scope.currentDeletedId: ", $scope.currentDeletedId);
                }, function () {

                });
            }
        }

        function deleteAll() {
            var ids = [];
            $scope.selected.forEach(x => ids.push(x.ID));
            console.log(ids);

            if (confirm("Are you sure delete all of them?")) {

                var config = {
                    params: {
                        checkedProductCategories: JSON.stringify(ids)
                    }
                }
                console.log(config);

                apiService.del('/api/productcategory/deletemulti', config, function () {
                    $location.path('/product_categories');
                }, function () {

                });
            }
        }



    }
})(angular.module('tedushop.product_categories'));