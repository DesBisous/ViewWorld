/**
 * Created by Benson on 2016/10/22.
 */
app.controller('moviesHomeCtrl', ['$scope','$state','musicService','Util','dataService','$timeout', function($scope,$state,musicService,Util,dataService,$timeout) {
    $scope.moviesTypeData = {
        hot:[],
        tvPlay:[],
        film:[],
        variety:[],
        animation:[],
        music:[],
        dance:[]
    };
    $scope.goToVideoPlay = function (videoId,videoSetNumber) {
        window.sessionStorage.setItem('videoPlay',videoId + "_" + videoSetNumber);
        window.sessionStorage.setItem('reload','Yes');
        $state.go('main.videoPlay');
    };
    $scope.initMoviesTypeData = function () {
        //获取评分最高的
        $scope.getHotList();
        //电视剧
        $scope.getTyPlay();
        //电影
        $scope.getFilm();
        //综艺
        $scope.getVariety();
        //动漫
        $scope.getAnimation();
        //音乐
        $scope.getMusic();
        //舞蹈
        $scope.getDance();
        $timeout(function () {
            console.log($scope.moviesTypeData);
        },5000);
    };
    $scope.getHotList = function () {
        var data = {
            "videoEntity": {
                theme: ''
            },
            "limit": 6
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getHotList(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == 'S' ){
                if( jsonObj.videoPackageForms.length > 0 ){
                    $scope.moviesTypeData.hot = jsonObj.videoPackageForms;
                    for( var i = 0 ; i < $scope.moviesTypeData.hot.length ; i++ ){
                        //组装视频图片地址
                        $scope.moviesTypeData.hot[i]["pictureName"] = "/resources/video/"+$scope.moviesTypeData.hot[i]["userId"]+"/"+$scope.moviesTypeData.hot[i]["title"]+"/"+$scope.moviesTypeData.hot[i]["pictureName"]+"?r="+Math.random();
                    }
                }else{
                    $scope.moviesTypeData.hot = [];
                }
            }else{
                console.log("查询失败");
            }
        },function (data) {
            var jsonObj=angular.fromJson(eval("("+data+")"));
            console.log(jsonObj.status);
        },param);
    };
    $scope.getTyPlay = function () {
        var data = {
            "videoEntity": {
                theme: '电视剧'
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
                    $scope.moviesTypeData.tvPlay = jsonObj.videoPackageForms;
                    for( var i = 0 ; i < $scope.moviesTypeData.tvPlay.length ; i++ ){
                        //组装视频图片地址
                        $scope.moviesTypeData.tvPlay[i]["pictureName"] = "/resources/video/"+$scope.moviesTypeData.tvPlay[i]["userId"]+"/"+$scope.moviesTypeData.tvPlay[i]["title"]+"/"+$scope.moviesTypeData.tvPlay[i]["pictureName"]+"?r="+Math.random();
                    }
                }else{
                    $scope.moviesTypeData.tvPlay = [];
                }
            }else{
                console.log("查询失败");
            }
        },function (data) {
            console.log(data);
        },param);
    };
    $scope.getFilm = function () {
        var data = {
            "videoEntity": {
                theme: '电影'
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
                    $scope.moviesTypeData.film = jsonObj.videoPackageForms;
                    for( var i = 0 ; i < $scope.moviesTypeData.film.length ; i++ ){
                        //组装视频图片地址
                        $scope.moviesTypeData.film[i]["pictureName"] = "/resources/video/"+$scope.moviesTypeData.film[i]["userId"]+"/"+$scope.moviesTypeData.film[i]["title"]+"/"+$scope.moviesTypeData.film[i]["pictureName"]+"?r="+Math.random();
                    }
                }else{
                    $scope.moviesTypeData.film = [];
                }
            }else{
                console.log("查询失败");
            }
        },function (data) {
            console.log(data);
        },param);
    };
    $scope.getVariety = function () {
        var data = {
            "videoEntity": {
                theme: '综艺'
            },
            "limit": 7
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getHotList(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == 'S' ){
                if( jsonObj.videoPackageForms.length > 0 ){
                    $scope.moviesTypeData.variety = jsonObj.videoPackageForms;
                    for( var i = 0 ; i < $scope.moviesTypeData.variety.length ; i++ ){
                        //组装视频图片地址
                        $scope.moviesTypeData.variety[i]["pictureName"] = "/resources/video/"+$scope.moviesTypeData.variety[i]["userId"]+"/"+$scope.moviesTypeData.variety[i]["title"]+"/"+$scope.moviesTypeData.variety[i]["pictureName"]+"?r="+Math.random();
                    }
                }else{
                    $scope.moviesTypeData.variety = [];
                }
            }else{
                console.log("查询失败");
            }
        },function (data) {
            console.log(data);
        },param);
    };
    $scope.getAnimation = function () {
        var data = {
            "videoEntity": {
                theme: '动漫'
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
                    $scope.moviesTypeData.animation = jsonObj.videoPackageForms;
                    for( var i = 0 ; i < $scope.moviesTypeData.animation.length ; i++ ){
                        //组装视频图片 地址
                        $scope.moviesTypeData.animation[i]["pictureName"] = "/resources/video/"+$scope.moviesTypeData.animation[i]["userId"]+"/"+$scope.moviesTypeData.animation[i]["title"]+"/"+$scope.moviesTypeData.animation[i]["pictureName"]+"?r="+Math.random();
                    }
                }else{
                    $scope.moviesTypeData.animation = [];
                }
            }else{
                console.log("查询失败");
            }
        },function (data) {
            console.log(data);
        },param);
    };
    $scope.getMusic = function () {
        var data = {
            "videoEntity": {
                theme: '音乐'
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
                    $scope.moviesTypeData.music = jsonObj.videoPackageForms;
                    for( var i = 0 ; i < $scope.moviesTypeData.music.length ; i++ ){
                        //组装视频图片 地址
                        $scope.moviesTypeData.music[i]["pictureName"] = "/resources/video/"+$scope.moviesTypeData.music[i]["userId"]+"/"+$scope.moviesTypeData.music[i]["title"]+"/"+$scope.moviesTypeData.music[i]["pictureName"]+"?r="+Math.random();
                    }
                }else{
                    $scope.moviesTypeData.music = [];
                }
            }else{
                console.log("查询失败");
            }
        },function (data) {
            console.log(data);
        },param);
    };
    $scope.getDance = function () {
        var data = {
            "videoEntity": {
                theme: '音乐'
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
                    $scope.moviesTypeData.dance = jsonObj.videoPackageForms;
                    for( var i = 0 ; i < $scope.moviesTypeData.dance.length ; i++ ){
                        //组装视频图片 地址
                        $scope.moviesTypeData.dance[i]["pictureName"] = "/resources/video/"+$scope.moviesTypeData.dance[i]["userId"]+"/"+$scope.moviesTypeData.dance[i]["title"]+"/"+$scope.moviesTypeData.dance[i]["pictureName"]+"?r="+Math.random();
                    }
                }else{
                    $scope.moviesTypeData.dance = [];
                }
            }else{
                console.log("查询失败");
            }
        },function (data) {
            console.log(data);
        },param);
    };
    $scope.initMoviesTypeData();
}]);