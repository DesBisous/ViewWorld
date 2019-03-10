/**
 * Created by Benson on 2016/12/6.
 */
app.controller('personalCtrl', ['$scope','$state','$stateParams','$timeout','dataService','Util', function($scope,$state,$stateParams,$timeout,dataService,Util) {
    //这个页面需要传一个用户ID过来，这样才能找到显示在该页面的用户资料是谁的
    $scope.user = {
        userId:''
    };
    $scope.headImageSrc = '../style/image/icon_2.png';
    $scope.user.userId = $stateParams.data.userId;
    $scope.sameUser = true;
    if( $scope.user.userId != undefined && $scope.user.userId != null && ($scope.user.userId+"").length > 0 ){
        sessionStorage.setItem("personalUserId",$scope.user.userId);
    }else{
        $scope.user.userId = sessionStorage.getItem("personalUserId");
    }
    $scope.userConcerns = [];
    $scope.albumNew = [];
    $scope.videoNew = [];
    $scope.goToAlbum = function () {
        $state.go('main.album');
    };
    $scope.goToVideo = function () {
        $state.go('main.video');
    };
    $scope.goToUploadAlbum = function () {
        $state.go('main.uploadAlbum');
    };
    $scope.goToUploadVideo = function () {
        $state.go('main.uploadVideo');
    };
    $scope.goToInsideAlbum = function ( index ) {
        sessionStorage.setItem("albumId",  $scope.albumNew[index].albumId);
        $state.go("main.insideAlbum");
    };
    $scope.goToPersonal = function ( index ) {
        $state.go('main.personal',{data:{"userId":$scope.userConcerns[index]["concernId"]}});
    };
    $scope.goToVideoPlay = function (videoId,videoSetNumber) {
        window.sessionStorage.setItem('videoPlay',videoId + "_" + videoSetNumber);
        window.sessionStorage.setItem('reload','Yes');
        $state.go('main.videoPlay');
    };
    /**
     * 获取用户信息
     */
    $scope.getUserInfoByUserId = function () {
        var data = {
            "userEntity":{
                userId: $scope.user.userId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getUserByIdAction($scope.getUserCallback,$scope.getUserCallbackError,param);
    };
    $scope.getUserCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            $scope.user = jsonObj.user;
            $scope.headImageSrc = "/resources/image/"+$scope.user.userId+"/Head_"+$scope.user.userId+".jpg";
            $timeout(function () {
                $(".header-left-avatar img").attr("src",$scope.headImageSrc+"?r="+Math.random());
            },10);
            $scope.sameUser = jsonObj.sameUser;
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.getUserCallbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    /**
     * 获取关注人信息
     */
    $scope.getUserConcernByUserId = function () {
        var data = {
            "userConcernEntity":{
                userId: $scope.user.userId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getUserConcernByUserId($scope.getUserConcernCallback,$scope.getUserConcernCallbackError,param);
    };
    $scope.getUserConcernCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            for( var i = 0 ; i < jsonObj.userConcerns.length ; i++ ){
                jsonObj.userConcerns[i].headImageSrc = "/resources/image/"+jsonObj.userConcerns[i]["concernId"]+"/Head_"+jsonObj.userConcerns[i]["concernId"]+".jpg";
            }
            $scope.userConcerns = jsonObj.userConcerns;
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.getUserConcernCallbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    /**
     * 获取相册信息
     */
    $scope.getAlbumAllByIdDesc = function () {
        var data = {
            "albumEntity":{
                userId: $scope.user.userId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getAlbumAllByIdDesc($scope.getAlbumAllCallback,$scope.getAlbumAllCallbackError,param);
    };
    $scope.getAlbumAllCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            for( var i = 0 ; i < jsonObj["albumPackageForms"].length ; i ++ ){
                $scope.albumNew.push(jsonObj["albumPackageForms"][i]);
                if( $scope.albumNew[i]["pictureNames"].length >= 10 ){
                    $scope.albumNew[i]["pictureNames"] = $scope.albumNew[i]["pictureNames"][Math.round(Math.random()*$scope.albumNew[i]["pictureNames"].length)];
                }else{
                    $scope.albumNew[i]["pictureNames"] = $scope.albumNew[i]["pictureNames"][0];
                }
                $scope.albumNew[i]["pictureNames"] = "/resources/image/"+$scope.albumNew[i]["userId"]+"/"+$scope.albumNew[i]["title"]+"/"+$scope.albumNew[i]["pictureNames"]+"?r="+Math.random();
                $scope.albumNew[i]["createTime"] = Util.getNowFormatDate(new Date($scope.albumNew[i]["createTime"]));
            }
        }else{
            // swal("",jsonObj.msg);
        }
    };
    $scope.getAlbumAllCallbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    /**
     * 获取视频信息
     */
    $scope.getVideoAllByIdDesc = function () {
        var data = {
            "videoEntity":{
                userId: $scope.user.userId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getVideoAllByIdDesc($scope.getVideoAllCallback,$scope.getVideoAllCallbackError,param);
    };
    $scope.getVideoAllCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            for( var i = 0 ; i < jsonObj["videoPackageForms"].length ; i ++ ){
                $scope.videoNew.push(jsonObj["videoPackageForms"][i]);
                $scope.videoNew[i]["pictureName"] = "/resources/video/"+$scope.videoNew[i]["userId"]+"/"+$scope.videoNew[i]["title"]+"/"+$scope.videoNew[i]["pictureName"]+"?r="+Math.random();
                $scope.videoNew[i]["createTime"] = Util.getNowFormatDate(new Date($scope.videoNew[i]["createTime"]));
            }
        }else{
            // swal("",jsonObj.msg);
        }
    };
    $scope.getVideoAllCallbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    if( $scope.user.userId != undefined && $scope.user.userId != null && ($scope.user.userId+"").length > 0 ){
        //获取页面需要显示的用户资料
        $scope.getUserInfoByUserId();
        //获取关注的人信息
        $scope.getUserConcernByUserId();
        //获取相册信息
        $scope.getAlbumAllByIdDesc();
        //获取视频信息
        $scope.getVideoAllByIdDesc();
    }else{
        $state.go("main.login");
    }
}]);