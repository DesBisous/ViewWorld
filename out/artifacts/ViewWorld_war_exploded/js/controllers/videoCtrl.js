/**
 * Created by Benson on 2016/12/19.
 */
app.controller('videoCtrl', ['$scope','$state','$stateParams','dataService','Util', function($scope,$state,$stateParams,dataService,Util) {
    $scope.CurrentPage = 1; //当前页
    $scope.TotalPage = 12;  //总页数
    $scope.pageSize = 18;    //每一页显示的记录数
    $scope.allRow = 1;    //总记录数
    $scope.busy = true;    //一开始显示
    //这个页面需要传一个用户ID过来，这样才能找到显示在该页面的视频是谁的
    if( $stateParams.data != undefined && $stateParams.data.userId != undefined ){
        $scope.user = {
            userId:$stateParams.data.userId
        };
    }
    $scope.videoPackageForms = [];  //相册信息
    if( $scope.user.userId != undefined && $scope.user.userId != null && ($scope.user.userId+"").length > 0 ){
        sessionStorage.setItem("personalUserId",$scope.user.userId);
    }else{
        $scope.user.userId = sessionStorage.getItem("personalUserId");
    }
    $scope.goToVideoPlay = function (videoId,videoSetNumber) {
        window.sessionStorage.setItem('videoPlay',videoId + "_" + videoSetNumber);
        window.sessionStorage.setItem('reload','Yes');
        $state.go('main.videoPlay');
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
                userId: $scope.user.userId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getVideoPageByUserId($scope.callback,$scope.callbackError,param);
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
    if( $scope.user.userId != undefined && $scope.user.userId != null && ($scope.user.userId+"").length > 0 ){
        $scope.goPost($scope.CurrentPage);
    }else{
        $state.go("main.login");
    }








}]);