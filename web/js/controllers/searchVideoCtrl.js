/**
 * Created by Benson on 2017/3/1.
 */
app.controller('searchVideoCtrl', ['$scope','$state','$http','$timeout','dataService','Util',function($scope,$state,$http,$timeout,dataService,Util) {
    $scope.loading = false;
    $scope.CurrentPage = 0; //当前页
    $scope.TotalPage = 12;  //总页数
    $scope.pageSize = 6;    //每一页显示的记录数
    $scope.allRow = 0;    //总记录数
    $scope.videoPackageForms = [];
    var queryType = "video";
    var searchText = '';
    var searchText = '';
    $scope.goToInsideVideo = function (index) {
        sessionStorage.setItem("videoPlay",$scope.videoPackageForms[index]['videoId']);
        $state.go("main.videoPlay");
    };
    $scope.goToVideo = function (index) {
        $state.go('main.video',{data:{"userId":$scope.videoPackageForms[index].userId}});
    };
    $scope.opMove = function (content) {
        $scope.loading = true;
        $scope.CurrentPage++;
        queryType = sessionStorage.getItem("queryType");
        searchText = sessionStorage.getItem("searchText");
        if( content != 'No_del' ){
            $scope.videoPackageForms = [];
        }
        if( queryType == "video" ){
            //搜索视频
            $scope.http_Album();
        }
    };
    $scope.http_Album = function () {
        var data = {
            "pageForm":{
                pageSize: $scope.pageSize,
                currentPage: $scope.CurrentPage
            },
            "videoEntity":{
                title: searchText
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getVideoPageByTitle($scope.videoPageCallback,$scope.videoPageCallbackError,param);
    };
    $scope.videoPageCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            $scope.CurrentPage = jsonObj["currentPage"]; //当前页
            $scope.TotalPage = jsonObj["totalPage"];  //总页数
            $scope.pageSize = jsonObj["pageSize"];    //每一页显示的记录数
            $scope.allRow = jsonObj["allRow"];    //总记录数
            for( var i = 0 ; i < jsonObj["videoPackageForms"].length ; i++ ){
                //组装视频图片地址
                jsonObj["videoPackageForms"][i]["pictureName"] = "/resources/video/"+jsonObj["videoPackageForms"][i]["userId"]+"/"+jsonObj["videoPackageForms"][i]["title"]+"/"+jsonObj["videoPackageForms"][i]["pictureName"]+"?r="+Math.random();
                //组装相册上传者头像
                jsonObj["videoPackageForms"][i]["headImageSrc"] = "/resources/image/"+jsonObj["videoPackageForms"][i]["userId"]+"/Head_"+jsonObj["videoPackageForms"][i]["userId"]+".jpg"+"?r="+Math.random();
                //时间格式转换
                jsonObj["videoPackageForms"][i]["createTime"] = Util.getNowFormatDate(new Date(jsonObj["videoPackageForms"][i]["createTime"]));
                $scope.videoPackageForms.push(jsonObj["videoPackageForms"][i]);
            }
            $timeout(function () {
                $scope.loading = false;
            },10);
            console.log($scope.videoPackageForms);
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.videoPageCallbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    $scope.$on('searchVideoReset',function(event,data){
        $scope.CurrentPage = 0; //当前页
        $scope.loading = false;
        $scope.opMove("del");
    });
    $scope.opMove("del");
}]);