/**
 * Created by Benson on 2016/9/23.
 */
app.controller('homeCtrl', ['$scope','$state','dataService','galleryFactory','$timeout', function($scope,$state,dataService,galleryFactory,$timeout) {
    $scope.videoPromotion = [];
    $scope.videoHot = [];
    $scope.albumGoodLevel = [];
    $scope.commentVideo = [];
    $scope.videoEntityList = [];
    $scope.getBarrageList = function () {
        var data = {
            "limit": 4
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getBarrageList(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == 'S' ){
                if( jsonObj.videoPackageForms.length > 0 ){
                    $scope.videoPromotion = jsonObj.videoPackageForms;
                    for( var i = 0 ; i < $scope.videoPromotion.length ; i++ ){
                        //组装视频图片地址
                        $scope.videoPromotion[i]["pictureName"] = "/resources/video/"+$scope.videoPromotion[i]["userId"]+"/"+$scope.videoPromotion[i]["title"]+"/"+$scope.videoPromotion[i]["pictureName"]+"?r="+Math.random();
                    }
                }else{
                    $scope.videoPromotion = [];
                }
            }else{
                console.log("查询失败");
            }
        },function (data) {
            console.log(data);
        },param);
    };
    $scope.getHotList = function () {
        var data = {
            "videoEntity": {
                theme: ''
            },
            "limit": 8
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getHotList(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == 'S' ){
                if( jsonObj.videoPackageForms.length > 0 ){
                     $scope.videoHot = jsonObj.videoPackageForms;
                    for( var i = 0 ; i <  $scope.videoHot.length ; i++ ){
                        //组装视频图片地址
                        $scope.videoHot[i]["pictureName"] = "/resources/video/"+ $scope.videoHot[i]["userId"]+"/"+ $scope.videoHot[i]["title"]+"/"+ $scope.videoHot[i]["pictureName"]+"?r="+Math.random();
                        $scope.videoHot[i]["headImageSrc"] = "/resources/image/"+$scope.videoHot[i]["userId"]+"/Head_"+$scope.videoHot[i]["userId"]+".jpg"+"?r="+Math.random();
                    }
                }else{
                     $scope.videoHot = [];
                }
            }else{
                console.log("查询失败");
            }
        },function (data) {
            var jsonObj=angular.fromJson(eval("("+data+")"));
            console.log(jsonObj.status);
        },param);
    };
    $scope.getAlbumList = function () {
        if( !$scope.reddit ){
            $scope.reddit = galleryFactory.Reddit;
            $scope.reddit.init(100);
            $scope.reddit.nextPage();
        }
    };
    $scope.getAlbumGoodLevel = function () {
        dataService.findAlbumByGoodLevel(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == 'S' ){
                for( var i = 0 ; i < jsonObj.albumPackageForms.length ; i ++ ){
                    jsonObj.albumPackageForms[i]["pictureName"] = "/resources/image/"+jsonObj.albumPackageForms[i]["userId"]+"/"+jsonObj.albumPackageForms[i]["title"]+"/"+jsonObj.albumPackageForms[i]["pictureName"]+"?r="+Math.random();
                }
                $scope.albumGoodLevel = jsonObj.albumPackageForms;
            }else{
                console.log("查询失败");
            }
        },function (data) {
            console.log(data);
        },{});
    };
    $scope.getCommentVideoList = function () {
        dataService.getCommentVideo(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == 'S' ){
                for( var i = 0 ; i < jsonObj.commentVideo.length ; i ++ ){
                    jsonObj.commentVideo[i]["pictureName"] = "/resources/video/"+ jsonObj["videoEntityList"][i]["userId"]+"/"+ jsonObj.commentVideo[i]["videoName"]+"/"+ jsonObj.commentVideo[i]["videoName"]+".png?r="+Math.random();
                }
                $scope.commentVideo = jsonObj.commentVideo;
                $scope.videoEntityList = jsonObj["videoEntityList"];
            }else{
                console.log("查询失败");
            }
        },function (data) {
            console.log(data);
        },{});
    };
    $scope.goToInsideAlbum = function ( col , index ) {
        var list = [];
        if( col == "One" ) list =  $scope.reddit.imageItemOne;
        if( col == "Two" ) list =  $scope.reddit.imageItemTwo;
        if( col == "Three" ) list =  $scope.reddit.imageItemThree;
        sessionStorage.setItem("albumId", list[index].albumId);
        $state.go("main.insideAlbum");
    };
    $scope.goToInsideAlbumRight = function (albumId) {
        sessionStorage.setItem("albumId", albumId);
        $state.go("main.insideAlbum");
    };
    $scope.goToVideoPlay = function (videoId,videoSetNumber) {
        window.sessionStorage.setItem('videoPlay',videoId + "_" + videoSetNumber);
        window.sessionStorage.setItem('reload','Yes');
        $state.go('main.videoPlay');
    };
    $scope.Updata = function () {
        $scope.reddit.nextPage()
    };
    $scope.getBarrageList();
    $scope.getHotList();
    $scope.getAlbumList();
    $scope.getAlbumGoodLevel();
    $scope.getCommentVideoList();
    $timeout(function () {
        $("#viewFocus img").css("height","54%");
    },3000);

























}]);