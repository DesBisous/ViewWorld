/**
 * Created by Benson on 2016/12/19.
 */
app.controller('albumCtrl', ['$scope','$state','$rootScope','$timeout','$stateParams','dataService', function($scope,$state,$rootScope,$timeout,$stateParams,dataService) {
    $scope.CurrentPage = 1; //当前页
    $scope.TotalPage = 12;  //总页数
    $scope.pageSize = 4;    //每一页显示的记录数
    $scope.allRow = 1;    //总记录数
    $scope.busy = true;    //一开始显示
    //这个页面需要传一个用户ID过来，这样才能找到显示在该页面的相册是谁的
    $scope.user = {
        userId:$stateParams.data.userId
    };
    $scope.albumPackageForms = [];  //相册信息
    if( $scope.user.userId != undefined && $scope.user.userId != null && ($scope.user.userId+"").length > 0 ){
        sessionStorage.setItem("personalUserId",$scope.user.userId);
    }else{
        $scope.user.userId = sessionStorage.getItem("personalUserId");
    }
    $scope.goToInsideAlbum = function (index) {
        sessionStorage.setItem("albumId",$scope.albumPackageForms[index].albumId);
        $state.go("main.insideAlbum");
    };
    /**
     * 请求数据
     */
    $scope.goPost = function (CurrentPage) {
        $scope.busy = true;
        $scope.albumPackageForms = [];
        //请求完数据后，调用更新页码方法
        var data = {
            "pageForm":{
                pageSize: $scope.pageSize,
                currentPage: CurrentPage
            },
            "albumEntity": {
                userId: $scope.user.userId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getAlbumPageByUserId($scope.callback,$scope.callbackError,param);
    };
    $scope.callback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            $scope.CurrentPage = jsonObj["currentPage"]; //当前页
            $scope.TotalPage = jsonObj["totalPage"];  //总页数
            $scope.pageSize = jsonObj["pageSize"];    //每一页显示的记录数
            $scope.allRow = jsonObj["allRow"];    //总记录数
            $scope.albumPackageForms = jsonObj["albumPackageForms"];
            for( var i = 0 ; i < $scope.albumPackageForms.length ; i++ ){
                //组装相册图片地址
                $scope.albumPackageForms[i]["pictureName"] = "/resources/image/"+$scope.albumPackageForms[i]["userId"]+"/"+$scope.albumPackageForms[i]["title"]+"/"+$scope.albumPackageForms[i]["pictureName"]+"?r="+Math.random();
            }
            updataPage($scope)
            $scope.busy = false;
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.callbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    if( $scope.user.userId != undefined && $scope.user.userId != null && ($scope.user.userId+"").length > 0 ){
        $scope.goPost($scope.CurrentPage);
    }else{
        $state.go("main.login");
    }
}]);