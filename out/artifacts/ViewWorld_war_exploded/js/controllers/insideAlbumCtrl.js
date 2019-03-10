/**
 * Created by Benson on 2016/12/21.
 */
app.controller('insideAlbumCtrl', ['$scope','albumFactory','dataService','Util', function($scope,albumFactory,dataService,Util) {
    $scope.albumId = sessionStorage.getItem("albumId");
    $scope.albumInfo = {};
    $scope.user = {};
    $scope.isGood = false;
    if( !$scope.reddit ){
        $scope.reddit = albumFactory.Reddit;
        $scope.reddit.imageList = [];
    }
    $scope.setGood = function () {
        if( $scope.isGood ){
            swal("","不能重复进行点赞");
        }else{
            var data = {
                "albumEntity": {
                    albumId: $scope.albumInfo.albumId
                }
            };
            var param = {
                data:angular.toJson(data)
            };
            dataService.setGood($scope.goodCallback,$scope.goodCallbackError,param);
        }
    };
    $scope.goodCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            if( jsonObj.msg == "点赞成功" ){
                $scope.albumInfo["good"] = jsonObj["existAlbumEntity"]["good"];
                $scope.isGood = true;
            }else{
                swal("",jsonObj.msg);
            }
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.goodCallbackError = function (data)  {
        console.log(data);
    };
    $scope.opGallery = function () {
        $(".lightgallery").remove();
        $(".inside-meddle").append('<div class="galleryContent lightgallery"></div>');
        var dynamicEl = [];
        for( var i = 0 ; i < $scope.reddit.imageList.length ; i++ ){
            var dynamicElObj = {
                "src": $scope.reddit.imageList[i],
                'thumb': $scope.reddit.imageList[i],
                'subHtml': ''
            };
            dynamicEl.push(dynamicElObj);
        }
        $('.lightgallery').lightGallery({
            mode:'lg-slide',
            closable:true,
            keyPress:true,
            enableDrag:true,
            enableTouch:true,
            escKey:true,
            thumbnail:true,
            dynamic:true,
            download:true,
            dynamicEl:dynamicEl
        });
    };
    $scope.getAlbumInfo = function () {
        var data = {
            "albumEntity": {
                albumId: $scope.albumId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getAlbumInfoByAlbumId($scope.callback,$scope.callbackError,param);
    };
    $scope.callback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            $scope.albumInfo = jsonObj["album"];
            $scope.albumInfo["createTime"] = Util.getNowFormatDate(new Date($scope.albumInfo["createTime"]));
            //组装图片地址数组
            for( var i = 0 ; i < $scope.albumInfo["pictureNames"].length ; i++ ){
                $scope.albumInfo["pictureNames"][i] = "/resources/image/"+$scope.albumInfo["userId"]+"/"+$scope.albumInfo["title"]+"/"+$scope.albumInfo["pictureNames"][i]+"?r="+Math.random();
            }
            $scope.reddit.imageLists = $scope.albumInfo["pictureNames"];
            $scope.reddit.busy = false;
            $scope.reddit.start = true;
            //获取用户信息
            $scope.getUserInfoByUserId();
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.callbackError = function (data)  {
        console.log(data);
    };
    /**
     * 获取用户信息
     */
    $scope.getUserInfoByUserId = function () {
        var data = {
            "userEntity":{
                userId: $scope.albumInfo.userId
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
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.getUserCallbackError = function (data)  {
        console.log(data);
    };
    if( $scope.albumId == undefined || $scope.albumId == null || $scope.albumId.length <= 0 ){
        swal({
                title: "未能找到相册数据",
                text: "",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定"
            },
            function(){
                window.history.back();  //返回上一页
            });
    }else{
    //    加载方法
        $scope.getAlbumInfo();
    }
}]);