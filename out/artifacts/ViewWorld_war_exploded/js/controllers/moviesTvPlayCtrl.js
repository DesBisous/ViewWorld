/**
 * Created by Benson on 2016/10/25.
 */
app.controller('moviesTvPlayCtrl', ['$scope','$state','musicService','Util','dataService', function($scope,$state,musicService,Util,dataService) {
    $scope.CurrentPage = 1; //当前页
    $scope.TotalPage = 12;  //总页数
    $scope.pageSize = 12;    //每一页显示的记录数
    $scope.allRow = 1;    //总记录数
    $scope.busy = true;    //一开始显示
    $scope.hotTvList = [];
    $scope.videoPackageForms = [];
    $scope.theme = '电视剧';
    $scope.region = '';
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.region = null;
        } else {
            $scope.region = group;
            $scope.CurrentPage = 1; //当前页
            $scope.TotalPage = 12;  //总页数
            $scope.pageSize = 12;    //每一页显示的记录数
            $scope.allRow = 1;    //总记录数
            $scope.busy = true;    //一开始显示
            $scope.videoPackageForms = [];
            $scope.goPost($scope.CurrentPage);
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.region === group;
    };
    $scope.goToVideoPlay = function (videoId,videoSetNumber) {
        window.sessionStorage.setItem('videoPlay',videoId + "_" + videoSetNumber);
        window.sessionStorage.setItem('reload','Yes');
        $state.go('main.videoPlay');
    };
    /**
     * 获取热门
     */
    $scope.getHotList = function () {
        var data = {
            "videoEntity": {
                theme: $scope.theme
            },
            "limit": 4
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getHotList(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == 'S' ){
                if( jsonObj.videoPackageForms.length > 0 ){
                    $scope.hotTvList = jsonObj.videoPackageForms;
                    for( var i = 0 ; i < $scope.hotTvList.length ; i++ ){
                        //组装视频图片地址
                        $scope.hotTvList[i]["pictureName"] = "/resources/video/"+$scope.hotTvList[i]["userId"]+"/"+$scope.hotTvList[i]["title"]+"/"+$scope.hotTvList[i]["pictureName"]+"?r="+Math.random();
                    }
                }else{
                    $scope.hotTvList = [];
                }
            }else{
                console.log("查询失败");
            }
            console.log(jsonObj);
        },function (data) {
            var jsonObj=angular.fromJson(eval("("+data+")"));
            console.log(jsonObj.status);
        },param);
    };
    /**
     * 请求数据
     */
    $scope.goPost = function (CurrentPage) {
        $scope.busy = true;
        $scope.videoPackageForms = [];
        //请求完数据后，调用更新页码方法
        var data = {
            "pageForm":{
                pageSize: $scope.pageSize,
                currentPage: CurrentPage
            },
            "videoEntity": {
                theme: $scope.theme,
                region: ''
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getVideoPageBySql($scope.callback,$scope.callbackError,param);
    };
    $scope.callback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            $scope.CurrentPage = jsonObj["currentPage"]; //当前页
            $scope.TotalPage = jsonObj["totalPage"];  //总页数
            $scope.pageSize = jsonObj["pageSize"];    //每一页显示的记录数
            $scope.allRow = jsonObj["allRow"];    //总记录数
            $scope.videoPackageForms = jsonObj["videoPackageForms"];
            for( var i = 0 ; i < $scope.videoPackageForms.length ; i++ ){
                //组装视频图片地址
                $scope.videoPackageForms[i]["pictureName"] = "/resources/video/"+$scope.videoPackageForms[i]["userId"]+"/"+$scope.videoPackageForms[i]["title"]+"/"+$scope.videoPackageForms[i]["pictureName"]+"?r="+Math.random();
                //时间格式转换
                $scope.videoPackageForms[i]["createTime"] = Util.getNowFormatDate(new Date($scope.videoPackageForms[i]["createTime"]));
            }
            updataPage($scope);
            $scope.busy = false;
            console.log($scope.videoPackageForms);
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.callbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    $scope.getHotList();
    $scope.goPost($scope.CurrentPage);
}]);