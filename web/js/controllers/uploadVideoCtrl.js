/**
 * Created by Benson on 2016/12/26.
 */
app.controller('uploadVideoCtrl', ['$scope','$state','$timeout','$rootScope','FileUploader','dataService', function($scope,$state,$timeout,$rootScope,FileUploader,dataService) {
    /**
     * 图片上传
     */
    $scope.videoImgInfo = {
        previewImgSrc: '',//预览图片地址
        progress: 0,//图片上传进度
        progressStyObj: {
            'top': '100%'
        },
        uploaderImg: new FileUploader({
            url: 'ViewWorld/upload_uploadImageAction_uploadVideoImag.action',
            queueLimit: 5,     //文件个数
            removeAfterUpload: true,   //上传后删除文件
            method: 'post'
        })
    };
    //图片加入uploaderImg待上传队列后的回调函数
    $scope.videoImgInfo.uploaderImg.onAfterAddingAll = function (addedItems) {
        for( var i = 0 ; i < addedItems.length ; i ++ ){
            var type = addedItems[i]._file.name.substr(addedItems[i]._file.name.lastIndexOf(".")).toUpperCase();
            var size =  addedItems[i]._file.size;
            if( type!=".BMP"&&type!=".PNG"&&type!=".GIF"&&type!=".JPG"&&type!=".JPEG" ){
                swal("","只能上传.BMP、.PNG、.GIF、.JPG、.JPEG这些格式图片");
                $scope.videoImgInfo.uploaderImg.clearQueue();
                break;
            }else if( size > 4194304 ){
                swal("","只能上传4M以下的图片");
                $scope.videoImgInfo.uploaderImg.clearQueue();
                break;
            }else{
                var objUrl = getObjectURL(addedItems[i]._file) ;
                //文件对象是否存在
                if( objUrl ){
                    $scope.initFileUploader();
                    // $scope.uploader.clearQueue();//上传完后会自动删除，这里为测试需要
                    $scope.videoImgInfo.previewImgSrc = objUrl;
                }else{
                    swal("","文件不存在","");
                }
            }
        }
    };
    $scope.videoImgInfo.uploaderImg.onCompleteItem = function (item, response, status, headers) {
        // console.log(response);"{\"msg\":\"上传成功\",\"status\":\"S\"}"
        var responseObj = angular.fromJson(eval("("+response+")"));
        if( responseObj.status == "S" ){
            //重置
            $timeout(function () {
                $scope.videoImgInfo.uploaderImg.clearQueue();
            },50);
        }else{

        }
    };
    $scope.videoImgInfo.uploaderImg.onProgressItem = function (item, progress) {
        $timeout(function () {
            $scope.videoImgInfo.progress = progress;
            $scope.videoImgInfo.progressStyObj.top = ( 100 - progress ) +"%";
        },1);
    };
    $scope.opImageUploadInput = function () {
        $scope.videoImgInfo.uploaderImg.clearQueue();
        $("#videoImage").click();
    };
    /**
     * 视频上传
     */
    $scope.videoArrInfo = [];
    $scope.uploaderVideo = new FileUploader({
        url: 'ViewWorld/upload_uploadVideoAction_uploadVideo.action',
        queueLimit: 20,     //文件个数
        removeAfterUpload: true,   //上传后删除文件
        method: 'post'
    });
    $scope.uploaderVideo.onAfterAddingAll = function (addedItems) {
        for( var i = 0 ; i < addedItems.length ; i ++ ){
            var type = addedItems[i]._file.name.substr(addedItems[i]._file.name.lastIndexOf(".")).toUpperCase();
            var size =  addedItems[i]._file.size;
            if( type!=".MP4" ){
                swal("","只能上传.MP4格式视频");
                $scope.uploaderVideo.removeFromQueue(i);
                break;
            }else if( size > 1073741824 ){
                swal("","只能上传1G以下的视频");
                $scope.uploaderVideo.removeFromQueue(i);
                break;
            }else{
                $scope.initFileUploader();
                var videoArrInfoObj = {
                    starUpload: false,
                    name: addedItems[i]._file.name,
                    progress: 0,//视频上传进度
                    progressStyObj: {
                        'width': '0'
                    }
                };
                $scope.videoArrInfo.push(videoArrInfoObj);
            }
        }
    };
    $scope.uploaderVideo.onBeforeUploadItem = function (item) {
        var formData = [];
        var data = {
            fileName: item._file.name
        };
        formData.push(data);
        for( var i = 0 ; i < $scope.uploaderVideo.queue.length ; i ++ ){
            if( $scope.uploaderVideo.queue[i]._file.name == item._file.name ){
                $scope.uploaderVideo.queue[i].formData = formData;
                $scope.videoArrInfo[i].starUpload = true;
                break;
            }
        }
    };
    $scope.uploaderVideo.onCompleteItem = function (item, response, status, headers) {
        // console.log(response);"{\"msg\":\"上传成功\",\"status\":\"S\"}"
        if( response.length > 0 ){
            var responseObj = angular.fromJson(eval("("+response+")"));
            if( responseObj.status == "S" ){
                if( $scope.uploaderVideo.getNotUploadedItems().length <= 0 && $scope.videoImgInfo.uploaderImg.getNotUploadedItems().length <= 0  ){
                    $timeout(function () {
                        $scope.uploaderVideo.clearQueue();
                        $scope.videoImgInfo.uploaderImg.clearQueue();
                        swal("","上传完毕","success");
                    },1);
                }
            }else{
                swal("","上传失败","error");
            }
        }else{
        }

    };
    $scope.uploaderVideo.onProgressItem = function (item, progress) {
        $timeout(function () {
            for( var i = 0 ; i < $scope.videoArrInfo.length ; i++ ){
                if( $scope.videoArrInfo[i].name == item._file.name ){
                    $scope.videoArrInfo[i].progress = progress;
                    $scope.videoArrInfo[i].progressStyObj.width = progress + "%";
                    break;
                }
            }
        },1);
    };
    $scope.opVideoUploadInput = function () {
        $scope.initFileUploader();
        $("#videoData").click();
    };
    $scope.deleteVideo = function (index) {
        if( $scope.uploaderVideo.getNotUploadedItems().length <= 0 ){
            swal("","视频已上传完毕","success");
            $scope.initFileUploader();
        }else{
            if( $scope.videoArrInfo[index].starUpload ){
                $scope.uploaderVideo.cancelItem(index);//取消后不会删除上传列表
                $scope.videoArrInfo[index].starUpload = 'cancel';
            }else{
                $scope.uploaderVideo.removeFromQueue(index);
                $scope.videoArrInfo.splice(index, 1);
            }
        }
    };
    /**
     * 视频信息
     */
    $scope.videoInfo = {
        region:'',
        theme:'',
        title:'',
        label:'',
        introduction:'',
        videoNum:0
    };
    $scope.focusEvent = function () {
        $scope.initFileUploader();
    };
    $scope.setRegion = function (content) {
        $scope.initFileUploader();
        $scope.videoInfo.region = content;
    };
    $scope.setTheme = function (content) {
        $scope.initFileUploader();
        $scope.videoInfo.theme = content;
    };
    $scope.initFileUploader = function () {
        $timeout(function () {
            if( $scope.uploaderVideo.getNotUploadedItems().length <= 0  ){
                $scope.videoArrInfo = [];
            }
            if( $scope.videoImgInfo.uploaderImg.getNotUploadedItems().length <= 0  ){
                $scope.videoImgInfo.previewImgSrc = '';
            }
            $scope.videoImgInfo.progress = 0;
            $scope.videoImgInfo.progressStyObj.top = '100%';
        },1);
    };
    $scope.inspectTextData = function () {
        if( $scope.videoInfo.title.length <= 0
            || $scope.videoInfo.title.length > 80
            || $scope.videoInfo.label.length <= 0
            || $scope.videoInfo.label.length > 10
            || $scope.videoInfo.introduction.length <= 0
            || $scope.videoInfo.introduction.length > 800 ){
            return false;
        }else{
            return true;
        }
    };
    $scope.inspectOptionData = function () {
        if( $scope.videoInfo.region.length <= 0
            || $scope.videoInfo.theme.length <= 0 ){
            return false;
        }else{
            return true;
        }
    };
    $scope.submitWrp = function () {
        if( $scope.inspectOptionData() ){
            if( $scope.inspectTextData() ){
                if( $scope.videoImgInfo.uploaderImg.getNotUploadedItems().length > 0 ){
                    if( $scope.uploaderVideo.getNotUploadedItems().length > 0 ){
                        $scope.videoInfo.videoNum = $scope.uploaderVideo.getNotUploadedItems().length;
                        var data = {
                            "videoEntity":{
                                "region": $scope.videoInfo.region,
                                "theme": $scope.videoInfo.theme,
                                "title": $scope.videoInfo.title,
                                "label": $scope.videoInfo.label,
                                "videoIntroduction": $scope.videoInfo.introduction,
                                "videoNum": $scope.videoInfo.videoNum
                            }
                        };
                        var param = {
                            data:angular.toJson(data)
                        };
                        dataService.saveVideoAction($scope.videoInfoCallback,$scope.videoInfoCallbackError,param);
                    }else{
                        swal("","请选择待上传视频","");
                    }
                }else{
                    swal("","请选择视频专辑图片","");
                }
            }else{
                swal("","请根据上述错误重新填写信息","");
            }
        }else{
            swal("","请选择地区和分类","");
        }
    };
    $scope.videoInfoCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            //更改返回顶部的路由地址
            $("#toTop").attr("href","#/main/uploadVideo");
            $("#toTop").click();
            $timeout(function () {
                $scope.videoImgInfo.uploaderImg.uploadAll();
                $scope.uploaderVideo.uploadAll();
            },500);
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.videoInfoCallbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    if( $rootScope.user.userInfo == null ){
        $state.go('main.login');
    }
    //建立一個可存取到該file的url，对应不同游览器有不同获取方法
    function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
}]);