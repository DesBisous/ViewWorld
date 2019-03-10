/**
 * Created by Benson on 2016/12/26.
 */
app.controller('uploadAlbumCtrl', ['$scope','$state','$rootScope','$timeout','dataService','FileUploader', function($scope,$state,$rootScope,$timeout,dataService,FileUploader) {
    $scope.addAlbumType = 0;
    $scope.albumInfo = {
        type:'',
        title:'',
        introduce:'',
        albumNum:'0'
    };
    $scope.previewImgSrc = [];//预览图片地址数组
    $scope.progress = 0;//上传进度
    $scope.progressCopy = 0;//上传进度的临时变量
    $scope.uploadedItems = 0;
    $scope.progressShow = false;
    $scope.changeAlbumType = function () {
        if ( $scope.addAlbumType == 0 ){
            $scope.addAlbumType = 1;
        }else{
            $scope.addAlbumType = 0;
        }
    };
    $scope.setAlbumInfoType = function (type) {
        $scope.progressShow = false;
        $scope.progressStyObj = {
            "width" : "0%"
        };
        $scope.albumInfo.type = type;
    };
    $scope.submitWrp = function () {
        if( $scope.uploadedItems > 0 && $scope.uploader.getNotUploadedItems().length > 0 ){
            if($scope.albumInfo.type.length <= 0 ){
                swal("","请选择相册类型","");
            }else if( $scope.albumInfo.title.length <= 0 || $scope.albumInfo.title.length > 80 || $scope.albumInfo.introduce.length <= 0 || $scope.albumInfo.introduce.length > 800 ){
                swal("","请根据上述错误重新填写","");
            }else{
                $scope.progressShow = true;
                $scope.progress = 0;//上传进度
                $scope.progressCopy = 0;
                var data = {
                    "albumEntity":{
                        "theme": $scope.albumInfo.type,
                        "title": $scope.albumInfo.title,
                        "albumIntroduction": $scope.albumInfo.introduce,
                        "albumNum": $scope.uploadedItems
                    }
                };
                var param = {
                    data:angular.toJson(data)
                };
                dataService.saveAlbumAction($scope.albumInfoCallback,$scope.albumInfoCallbackError,param);
            }
            // console.log($scope.uploader.getNotUploadedItems());
            // console.log($scope.previewImgSrc);
            // console.log($scope.uploadedItems);
        }else{
            swal("","请选择待上传图片","");
        }
    };
    $scope.albumInfoCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            if( $scope.uploadedItems > 0 ){
                $scope.uploader.uploadItem(0);
            }
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.albumInfoCallbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    /**
     * 图片上传函数
     */
    $scope.uploader = new FileUploader({
        url: 'ViewWorld/upload_uploadImageAction_uploadAlbumImag.action',
        queueLimit: 20,     //文件个数
        removeAfterUpload: true,   //上传后删除文件
        method: 'post'
    });
    //回调函数
    $scope.uploader.onAfterAddingAll = function (addedItems) {
        console.log(addedItems.length);
        for( var i = 0 ; i < addedItems.length ; i ++ ){
            var type = addedItems[i]._file.name.substr(addedItems[i]._file.name.lastIndexOf(".")).toUpperCase();
            var size =  addedItems[i]._file.size;
            if( type!=".BMP"&&type!=".PNG"&&type!=".GIF"&&type!=".JPG"&&type!=".JPEG" ){
                swal("","只能上传.BMP、.PNG、.GIF、.JPG、.JPEG这些格式图片");
                $scope.uploader.clearQueue();
                break;
            }else if( size > 4194304 ){
                swal("","只能上传4M以下的图片");
                $scope.uploader.clearQueue();
                break;
            }else{
                var objUrl = getObjectURL(addedItems[i]._file) ;
                //文件对象是否存在
                if( objUrl ){
                    $scope.focusEvent();//选择图片之后，如果进度图存在则重置
                    console.log($scope.uploader);
                    // $scope.uploader.clearQueue();//上传完后会自动删除，这里为测试需要
                    $scope.previewImgSrc.push(objUrl);
                    $scope.uploadedItems = $scope.previewImgSrc.length;
                }else{
                    swal("","文件不存在","");
                }
            }
        }
    };
    $scope.uploader.onCompleteItem = function (item, response, status, headers) {
        // console.log(response);"{\"msg\":\"上传成功\",\"status\":\"S\"}"
        var responseObj = angular.fromJson(eval("("+response+")"));
        if( responseObj.status == "S" ){
            if( $scope.uploader.getNotUploadedItems().length > 0  ){
                $scope.progressCopy = 0;
                $scope.uploader.uploadItem(0);
            }else{
                //重置
                $timeout(function () {
                    $scope.previewImgSrc = [];//预览图片地址数组
                    $scope.uploadedItems = 0;
                },50);
                $timeout(function () {
                    swal("","图片上传完毕","success");
                },900);
            }
        }else{

        }
    };
    $scope.uploader.onProgressItem = function (item, progress) {
        $timeout(function () {
            $scope.progress = $scope.progress + ( ( progress - $scope.progressCopy ) * ( 1.0 / $scope.uploadedItems ) );
            $scope.progressCopy = progress;
            $scope.progressStyObj = {
                "width" : $scope.progress + "%"
            }
        },1);
    };
    $scope.uploader.onBeforeUploadItem = function (item) {
        var formData = [];
        var data = {
            fileName: item._file.name
        };
        formData.push(data);
        for( var i = 0 ; i < $scope.uploader.queue.length ; i ++ ){
            if( $scope.uploader.queue[i]._file.name == item._file.name ){
                $scope.uploader.queue[i].formData = formData;
                break;
            }
        }
    };
    $scope.opImageUploadInput = function () {
        $("#albumImage").click();
        console.log("打开");
    };
    $scope.focusEvent = function () {
        $scope.progressShow = false;
        $scope.progressStyObj = {
            "width" : "0%"
        }
    };
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
    
    
    if( $rootScope.user.userInfo == null ){
        $state.go('main.login');
    }
}]);