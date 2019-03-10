/**
 * Created by Benson on 2016/12/16.
 */
app.controller('editMyselfDataCtrl', ['$scope','$timeout',"$rootScope",'Util','dataService','FileUploader', function($scope,$timeout,$rootScope,Util,dataService,FileUploader) {
    $scope.days = [];
    $scope.months = [];
    $scope.years = [];
    $scope.sexs = [
        { value:'男',key:'男' },
        { value:'女',key:'女' },
        { value:'未知',key:'未知' }
    ];
    $scope.Countrys = [
        { value:'China',key:'中国' },
        { value:'Japan',key:'日本' },
        { value:'Korea',key:'韩国' },
        { value:'America',key:'美国' }
    ];
    $scope.userInfo = {
        img: '',
        name: '',
        birthday: {
            selDay: null,
            selMonths: null,
            selYears: null
        },
        selSex: null,
        selCountry: null,
        briefIntroduction: '',
        phone: ''
    };
    $scope.objUrl = null;
    $scope.isModifyImageing = false;
    $scope.canvas = {
        canvasTop : 0,
        canvasLeft : 0,
        canvasDown : 0,
        canvasRight : 0
    };
    $scope.modifyInfo = "需修图，请点击我哦~";
    $scope.editMyselfDataEvent = function () {
        if( !$scope.checkBirthday($scope.userInfo.birthday) ){
            $(".editBirthday").popover('show');
        }else{
            if( $scope.userInfo.phone.length > 0 && !Util.checkPhone($scope.userInfo.phone) ){
                $(".editPhone").popover('show');
            }else{
                var data = {
                    "userEntity":{
                        "phone": $scope.userInfo.phone,
                        "name": $scope.userInfo.name,
                        "birthday": $scope.assembleData($scope.userInfo.birthday) == null ? "" : $scope.assembleData($scope.userInfo.birthday),
                        "sex": $scope.userInfo.selSex == null ? "" : $scope.userInfo.selSex.value,
                        "nationality": $scope.userInfo.selCountry == null ? "" : $scope.userInfo.selCountry.value,
                        "userIntroduction": $scope.userInfo.briefIntroduction
                    }
                };
                var param = {
                    data:angular.toJson(data)
                };
                console.log(data);
                dataService.modifyUserInfo($scope.modifyUserInfoCallback,$scope.modifyUserInfoCallbackError,param);
            }
        }
    };
    $scope.modifyUserInfoCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            swal("",jsonObj.msg);
        }else{
            swal("",jsonObj.msg);
        }
        console.log(jsonObj.status);
    };
    $scope.modifyUserInfoCallbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    $scope.focusEvent = function (index) {
        if( index == 1 ){
            $(".editBirthday").popover('hide');
        }else{
            $(".editPhone").popover('hide');
        }
    };
    $scope.initYearAndMonth = function () {
        for( var i = Util.getNowYear() ; i > 1989 ; i --  ){
            $scope.years.push({ value: (i+"") ,year: (i+"") });
        }
        for( var j = 1 ; j < 13 ; j ++ ){
            $scope.months.push({ value: (j+""),month: (j+"") });
        }
    };
    $scope.yearAndMonthChange = function () {
        if( $scope.userInfo.birthday.selYears != null && $scope.userInfo.birthday.selMonths != null ){
            var days = Util.getDaysByYearAndMonth($scope.userInfo.birthday.selYears.value,+$scope.userInfo.birthday.selMonths.value);
            $scope.days = [];
            for( var k = 1 ; k < (+ days + 1) ; k ++ ){
                $scope.days.push({ value: (k+""),day: (k+"") });
            }
        }
    };
    //组装日期
    $scope.assembleData = function ( birthday ) {
        if( birthday.selYears == null || birthday.selMonths == null || birthday.selDay == null ){
            return null;
        }else{
            var year = birthday.selYears.value;
            var month = birthday.selMonths.value;
            var day = birthday.selDay.value;
            if( +day < 10 ){
                day = '0' + day;
            }
            if( month < 10 ){
                month = '0' + month;
            }
            return year + '-' + month + '-' + day;
        }
    };
    //检查日期是否全选了或者全没选，只有这两种情况可通过
    $scope.checkBirthday = function ( birthday ) {
        var year = birthday.selYears;
        var month = birthday.selMonths;
        var day = birthday.selDay;
        if( ( year == null && month == null && day == null ) || ( year != null && month != null && day != null ) ){
            return true;
        }else{
            return false;
        }
    };
    //页面加载完毕后，获取用户信息初始化页面
    $scope.getUserGoToInitData = function () {
        var param = {};
        dataService.existUserBySession($scope.initDataCallback,$scope.initDataCallbackError,param);
    };
    $scope.initDataCallback = function (data) {
        var jsonObj = angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            console.log(jsonObj.user);
            $scope.initAssembleUserInfo( jsonObj );
        }else{
            swal("",jsonObj.msg);
        }
        console.log(jsonObj.status);
    };
    $scope.initAssembleUserInfo = function ( jsonObj ) {
        $scope.userInfo.name = jsonObj.user.name;
        for( var i = 0 ; i < $scope.sexs.length ; i ++ ){
            if( $scope.sexs[i].value == jsonObj.user.sex ){
                $scope.userInfo.selSex = $scope.sexs[i]; break;
            }
        }
        for( var j = 0 ; j < $scope.Countrys.length ; j ++ ){
            if( $scope.Countrys[i].value == jsonObj.user.nationality ){
                $scope.userInfo.selCountry = $scope.Countrys[i]; break;
            }
        }
        var birthday = jsonObj.user.birthday.split("-");
        for( var k = 0 ; k < $scope.years.length ; k ++ ){
            if( parseInt($scope.years[k].value) == parseInt(birthday[0]) ){
                $scope.userInfo.birthday.selYears = $scope.years[k]; break;
            }
        }
        for( var z = 0 ; z < $scope.years.length ; z ++ ){
            if( parseInt($scope.months[z].value) == parseInt(birthday[1]) ){
                $scope.userInfo.birthday.selMonths = $scope.months[z]; break;
            }
        }
        $scope.yearAndMonthChange();
        for( var n = 0 ; n < $scope.days.length ; n ++ ){
            if( parseInt($scope.days[n].value) == parseInt(birthday[2]) ){
                $scope.userInfo.birthday.selDay = $scope.days[n]; break;
            }
        }
        $scope.userInfo.briefIntroduction = jsonObj.user.userIntroduction;
        $scope.userInfo.phone = jsonObj.user.phone;
    };
    $scope.initDataCallbackError = function (data) {
        var jsonObj = angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    $scope.initYearAndMonth();
    $scope.getUserGoToInitData();
    /**
     * 图片上传部分
     */
    $scope.opImageUploadInput = function () {
        $scope.uploader.clearQueue();
        $("#headImage").click();
    };
    $scope.uploader = new FileUploader({
        url: 'ViewWorld/upload_uploadImageAction_uploadHeadImagByUser.action',
        queueLimit: 1,     //文件个数
        removeAfterUpload: true,   //上传后删除文件
        method: 'post'
    });
    //回调函数
    $scope.uploader.onAfterAddingAll = function (addedItems) {
        for( var i = 0 ; i < addedItems.length ; i ++ ){
            var type = addedItems[i]._file.name.substr(addedItems[i]._file.name.lastIndexOf(".")).toUpperCase();
            var size =  addedItems[i]._file.size;
            if( type!=".BMP"&&type!=".PNG"&&type!=".GIF"&&type!=".JPG"&&type!=".JPEG" ){
                swal("","只能上传.BMP、.PNG、.GIF、.JPG、.JPEG这些格式图片");
                $scope.uploader.clearQueue();
                $(".headImageDom").attr("src","../style/image/icon_2.png");
                break;
            }else if( size > 4194304 ){
                swal("","只能上传4M以下的图片");
                $scope.uploader.clearQueue();
                $(".headImageDom").attr("src","../style/image/icon_2.png");
                break;
            }else{
                $scope.objUrl = getObjectURL(addedItems[i]._file) ;
                //文件对象是否存在
                if( $scope.objUrl ){
                    if( $scope.isModifyImageing ){
                        $(".img1").attr("src",$scope.objUrl);
                        $(".img2").attr("src",$scope.objUrl);
                        $(".img3").attr("src",$scope.objUrl);
                        $(".modifyImageDialog").modal('show');
                    }else{
                        $(".headImageDom").attr("src",$scope.objUrl);
                        // $scope.uploader.clearQueue();//上传完后会自动删除，这里为测试需要
                        $timeout(function () {
                            $scope.uploader.uploadAll();
                            // $scope.uploader.uploadItem(0);
                        },200);
                        $scope.modifyInfo = "头像不满意？请点击我哦~";
                    }
                }else{
                    swal("","文件不存在","");
                }
            }
        }
        console.log($scope.uploader.getNotUploadedItems());
    };
    $scope.uploader.onCompleteItem = function (item, response, status, headers) {
        // console.log(response);"{\"msg\":\"上传成功\",\"status\":\"S\"}"
        var responseObj = angular.fromJson(eval("("+response+")"));
        if( responseObj.status == "S" ){
            // $(".img-circle img").attr("src","../style/image/icon_211111.png");
            $timeout(function(){
                //清除img缓存重新加载
                $(".img-circle img").attr("src",$rootScope.user.headImageSrc+"?r="+Math.random());
            },10);
        }
    };
    $scope.opModifyImageDialog = function () {
        if( $scope.objUrl ){//存在
            $(".img1").attr("src",$scope.objUrl);
            $(".img2").attr("src",$scope.objUrl);
            $(".img3").attr("src",$scope.objUrl);
            $(".modifyImageDialog").modal('show');
        }else{
            $scope.uploader.clearQueue();
            $("#headImage").click();
        }
        $scope.isModifyImageing = true;
    };
    $scope.saveModifyImage = function () {
        //保存已修改后的图片并下载
        //文件对象是否存在
        if( $scope.objUrl ) {
            if ($scope.isModifyImageing) {
                //下载图片
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext('2d');
                var img = new Image;
                img.onload = function(){
                    var heightRatio = img.height / 360;
                    var widthRatio = img.width / 460;
                    var canvasTop = $scope.canvas.canvasTop * heightRatio;
                    var canvasDown = $scope.canvas.canvasDown *  heightRatio;
                    var canvasLeft = $scope.canvas.canvasLeft * widthRatio;
                    var canvasRight = $scope.canvas.canvasRight *  widthRatio;
                    canvas.height = ( canvasDown - canvasTop );
                    canvas.width = ( canvasRight - canvasLeft );
                    ctx.drawImage(img, canvasLeft, canvasTop, ( canvasRight - canvasLeft ), ( canvasDown - canvasTop ), 0, 0, ( canvasRight - canvasLeft ), ( canvasDown - canvasTop ));
                    var type = 'png';
                    var imgData = canvas.toDataURL(type); //重新生成图片
                    imgData = imgData.replace(_fixType(type),'image/octet-stream');
                    var filename = 'baidufe_' + (new Date()).getTime() + '.' + type;
                    saveFile(imgData,filename);
                };
                img.src = $scope.objUrl;
            }
        }
    };
    $scope.closeModifyImage = function () {
        $scope.objUrl = null;
        $scope.isModifyImageing = false;
    };
    $('.modifyImageDialog').on('hidden.bs.modal', function (e) {
        $scope.closeModifyImage();
    });
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
    // 加工image data，替换mime type
    var _fixType = function(type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    };
    //迫使游览器触发下载
    var saveFile = function(data, filename){
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
    };
    /**
     * 修改图片模态框相关函数
     */
    {
        var rightDiv = document.getElementsByClassName("right")[0];
        var upDiv = document.getElementsByClassName("up")[0];
        var leftDiv = document.getElementsByClassName("left")[0];
        var downDiv = document.getElementsByClassName("down")[0];
        var leftUpDiv= document.getElementsByClassName("left-up")[0];
        var rightUpDiv = document.getElementsByClassName("right-up")[0];
        var rightDownDiv = document.getElementsByClassName("right-down")[0];
        var leftDownDiv = document.getElementsByClassName("left-down")[0];
        var mainDiv = document.getElementsByClassName("main")[0];
        var ifKeyDown = false;  //数百按下状态
        var contact = "";//表示被按下的触点
        document.onselectstart = new Function('event.returnValue = false;');//取消选择图片，加上后不能选上图片了
        $( ".main" ).draggable({ containment:'parent',drag:function () {setChoice(mainDiv);setPreview(mainDiv);} });//drag当鼠标拖拽移动时，触发此事件。
        //鼠标鼠标按下事件
        rightDiv.onmousedown = function (e) {
            e.stopPropagation();
            ifKeyDown = true;
            contact = "right";
        };
        upDiv.onmousedown = function (e) {
            e.stopPropagation();
            ifKeyDown = true;
            contact = "up";
        };
        leftDiv.onmousedown = function (e) {
            e.stopPropagation();
            ifKeyDown = true;
            contact = "left";
        };
        downDiv.onmousedown = function (e) {
            e.stopPropagation();
            ifKeyDown = true;
            contact = "down"
        };
        leftUpDiv.onmousedown = function (e) {
            e.stopPropagation();
            ifKeyDown = true;
            contact = "left-up";
        };
        rightUpDiv.onmousedown = function (e) {
            e.stopPropagation();
            ifKeyDown = true;
            contact = "right-up";
        };
        rightDownDiv.onmousedown = function (e) {
            e.stopPropagation();
            ifKeyDown = true;
            contact = "right-down";
        };
        leftDownDiv.onmousedown = function (e) {
            e.stopPropagation();
            ifKeyDown = true;
            contact = "left-down"
        };
        //鼠标松开事件
        window.onmouseup = function (e) {
            e.stopPropagation();
            ifKeyDown = false;
        };
        //鼠标移动事件
        window.onmousemove = function (e) {
            if( ifKeyDown ){
                switch( contact ){
                    case "right": rightMove(e,mainDiv); break;
                    case "up": upMove(e,mainDiv); break;
                    case "left": leftMove(e,mainDiv); break;
                    case "down": downMove(e,mainDiv); break;
                    case "left-up": upMove(e,mainDiv); leftMove(e,mainDiv); break;
                    case "right-up": upMove(e,mainDiv); rightMove(e,mainDiv); break;
                    case "right-down": downMove(e,mainDiv); rightMove(e,mainDiv); break;
                    case "left-down": downMove(e,mainDiv); leftMove(e,mainDiv);  break;
                }
                setChoice(mainDiv);
                setPreview(mainDiv);
            }
        };
        //right移动
        function rightMove(e,mainDiv) {
            var x = e.clientX;//鼠标x坐标
            var widthBefore = mainDiv.offsetWidth - 2;//选取框对象的宽度(包含border) - 左右两边的边宽1
            // var widthBefore = mainDiv.clientWidth;//对象宽度（不含边线,即border）
            var addWidth = x - getPosition(mainDiv).left - widthBefore;//鼠标移动增加的宽度
            if( addWidth + widthBefore + mainDiv.offsetLeft + 1 <= 460 ){
                mainDiv.style.width = addWidth + widthBefore + "px";//选取框变化后的宽度
            }
        }
        //up移动
        function upMove(e,mainDiv) {
            var y = e.clientY;//鼠标y坐标
            var mainY = getPosition(mainDiv).top;//选取框原本的y坐标
            var addHeight = mainY - y;
            var heightBefore = mainDiv.offsetHeight - 2;
            if( y <=  heightBefore + addHeight + mainY ){
                if( mainDiv.offsetTop - addHeight >= 0 ){
                    mainDiv.style.top = mainDiv.offsetTop - addHeight + "px";
                    mainDiv.style.height = heightBefore + addHeight + "px";
                }
            }
        }
        //left移动
        function leftMove(e,mainDiv) {
            var x = e.clientX;//鼠标x坐标
            var mainX = getPosition(mainDiv).left;//选取框原本的y坐标
            var addWidth = mainX - x;//增加的宽度
            var widthBefore = mainDiv.offsetWidth - 2; //选取框原本的宽度
            if( x <= widthBefore + addWidth + mainX ){
                if( 0 <= mainDiv.offsetLeft - addWidth ){
                    mainDiv.style.left = mainDiv.offsetLeft - addWidth + "px";
                    mainDiv.style.width = widthBefore + addWidth + "px";
                }
            }
        }
        //down移动
        function downMove(e,mainDiv) {
            var y = e.clientY;//鼠标y坐标
            var mainY = getPosition(mainDiv).top;//选取框原本的y坐标
            var heightBefore = mainDiv.offsetHeight - 2;//原本选取框的高度
            var addHeight = mainY + heightBefore - y;//增加的高度
            if( mainDiv.offsetHeight - addHeight + mainDiv.offsetTop + 1 <= 360 ){
                mainDiv.style.height = mainDiv.offsetHeight - addHeight + "px";
            }
        }
        //设置选取区域高亮可见
        function setChoice(mainDiv) {
            var top = mainDiv.offsetTop;
            var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
            var left = mainDiv.offsetLeft;
            var down = mainDiv.offsetTop + mainDiv.offsetHeight;
            var img2 = document.getElementsByClassName("img2")[0];
            img2.style.clip = "rect("+top+"px,"+right+"px,"+down+"px,"+left+"px"+")";
        }
        //获取元素相对于屏幕左边的距离，利用offsetLeft
        function getPosition(node) {
            var left = node.offsetLeft; //获取相对于父元素的左边距
            var top = node.offsetTop;   //获取相对于父元素的上边距
            var parent = node.offsetParent; //获取最近的祖先定位元素，定位元素指的是元素的 CSS position 属性被设置为 relative、absolute 或 fixed 的元素
            while( parent != null ){
                left += parent.offsetLeft;  //获取parent元素相对于父元素的左边距
                top += parent.offsetTop;    //获取parent元素相对于父元素的上边距
                parent = parent.offsetParent;   //重新获取最近的祖先定位元素
            }
            //while遍历获取到了node当前元素的一层层距离父元素距离，然后叠加后，即可得到node元素距离最上层父元素的距离
            return {left:left,top:top};
        }
        //预览函数
        function setPreview(mainDiv) {
            var top = mainDiv.offsetTop;
            var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
            var left = mainDiv.offsetLeft;
            var down = mainDiv.offsetTop + mainDiv.offsetHeight;
            var img3 = document.getElementsByClassName("img3")[0];
            img3.style.top = - top + "px";
            img3.style.left = - left + "px";
            img3.style.clip = "rect("+top+"px,"+right+"px,"+down+"px,"+left+"px"+")";
            $scope.canvas.canvasTop = top;
            $scope.canvas.canvasLeft = left;
            $scope.canvas.canvasDown = down;
            $scope.canvas.canvasRight = right;
        }
    }
}]);
