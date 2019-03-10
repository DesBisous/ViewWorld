/**
 * Created by Benson on 2017/1/17.
 */
app.controller('searchImageCtrl', ['$scope','$state','$http','$timeout','dataService',function($scope,$state,$http,$timeout,dataService) {
    $scope.loading = false;
    $scope.CurrentPage = 0; //当前页
    $scope.TotalPage = 12;  //总页数
    $scope.pageSize = 2;    //每一页显示的记录数
    $scope.allRow = 0;    //总记录数
    $scope.albumPackageForms = [];
    var queryType = "picture";
    var searchText = '';
    $scope.goToInsideAlbum = function (index) {
        sessionStorage.setItem("albumId",$scope.albumPackageForms[index].albumId);
        $state.go("main.insideAlbum");
    };
    $scope.goToAlbum = function (index) {
        $state.go('main.album',{data:{"userId":$scope.albumPackageForms[index].userId}});
    };
    $scope.opMove = function (content) {
        $scope.loading = true;
        $scope.CurrentPage++;
        queryType = sessionStorage.getItem("queryType");
        searchText = sessionStorage.getItem("searchText");
        if( content != 'No_del' ){
            $scope.albumPackageForms = [];
        }
        if( queryType == "picture" ){
            //搜索相册
            $scope.http_Album();
        }else{
            //搜索视频
        }
    };
    $scope.http_Album = function () {
        var data = {
            "pageForm":{
                pageSize: $scope.pageSize,
                currentPage: $scope.CurrentPage
            },
            "albumEntity":{
                title: searchText
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getAlbumPageByTitle($scope.albumPageCallback,$scope.albumPageCallbackError,param);
    };
    $scope.albumPageCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            $scope.CurrentPage = jsonObj["currentPage"]; //当前页
            $scope.TotalPage = jsonObj["totalPage"];  //总页数
            $scope.pageSize = jsonObj["pageSize"];    //每一页显示的记录数
            $scope.allRow = jsonObj["allRow"];    //总记录数
            for( var i = 0 ; i < jsonObj["albumPackageForms"].length ; i++ ){
                //组装相册图片地址
                jsonObj["albumPackageForms"][i]["pictureName"] = "/resources/image/"+jsonObj["albumPackageForms"][i]["userId"]+"/"+jsonObj["albumPackageForms"][i]["title"]+"/"+jsonObj["albumPackageForms"][i]["pictureName"]+"?r="+Math.random();
                //组装相册上传者头像
                jsonObj["albumPackageForms"][i]["headImageSrc"] = "/resources/image/"+jsonObj["albumPackageForms"][i]["userId"]+"/Head_"+jsonObj["albumPackageForms"][i]["userId"]+".jpg"+"?r="+Math.random();
                //组装相册标签
                jsonObj["albumPackageForms"][i]["tips"] = ["相册",jsonObj["albumPackageForms"][i]["theme"]];
                $scope.albumPackageForms.push(jsonObj["albumPackageForms"][i]);
            }
            $timeout(function () {
                $scope.loading = false;
            },10);
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.albumPageCallbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    $scope.$on('searchReset',function(event,data){
        $scope.CurrentPage = 0; //当前页
        $scope.loading = false;
        $scope.opMove("del");
    });
    $scope.opMove("del");
}]);