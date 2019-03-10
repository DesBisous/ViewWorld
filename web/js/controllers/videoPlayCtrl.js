/**
 * Created by Benson on 2017/3/6.
 */
app.controller('videoPlayCtrl', ['$scope','$state','$timeout','$sce','$window','dataService','Util', function($scope,$state,$timeout,$sce,$window,dataService,Util) {
    document.onselectstart = new Function('event.returnValue = false;');//取消选择图片，加上后不能选上图片了
    if( window.sessionStorage.getItem('reload') == 'Yes' ){
        window.sessionStorage.setItem('reload','No');
        $window.location.reload();
    }
    $scope.videoPlay = window.sessionStorage.getItem('videoPlay');
    $scope.videoId = null;//获取视频ID
    $scope.videoSetNumber = null;//播放第几个视频
    if( $scope.videoPlay == null ){
        $scope.videoId = 1;
        $scope.videoSetNumber = 0;
    }else{
        $scope.videoPlay = $scope.videoPlay.split("_");
        if( $scope.videoPlay.length >= 2 ){
            $scope.videoId = $scope.videoPlay[0];
            $scope.videoSetNumber = $scope.videoPlay[1];
        }else{
            $scope.videoId = $scope.videoPlay[0];
            $scope.videoSetNumber = 0;
        }
    }
    $scope.isMove = false;//是否查看更多
    $scope.showBarrage = false;//是否显示弹幕模式选择框
    $scope.opBarrage = true;//是否打开弹幕
    $scope.expansionVideo = false;//展开视频
    $scope.moveVideoNum = {
        selectedIndex: $scope.videoSetNumber,
        isMove: false,
        prev: false,
        next: false
    };
    $scope.barrageObject = {//弹幕参数对象
        barrage_font_size: '0',//默认字体为小字体[0,1]
        barrage_position: '1',//默认弹幕样式为顶端弹幕1，其余底端弹幕2，滚动弹幕0
        barrage_color: '#ffffff',//默认弹幕颜色为#ffffff
        barrage_text: '',//弹幕内容
        barrage_time: 1,//弹幕时间
        barrage_date: ''//弹幕发送本地时间
    };
    $scope.barrageConfigure = {
        left: 0, //区域的左边边界位置，相对于父div
        top: 0 , //区域的上边边界位置，相对于父div
        width: 680, //区域的宽度
        height: 408, //区域的高度
        zindex :4, //div的css样式zindex
        speed:18500, //弹幕速度，飞过区域的毫秒数
        sumtime:900 , //弹幕运行总时间
        danmuss: {}, //danmuss对象，运行时的弹幕内容
        default_font_color:"#000000", //弹幕默认字体颜色
        font_size_small:22, //小号弹幕的字体大小,注意此属性值只能是整数
        font_size_big:28, //大号弹幕的字体大小
        opacity:"0.9", //弹幕默认透明度
        top_botton_danmu_time:4000 //顶端底端弹幕持续时间
    };
    $scope.barrageCollection = {};//弹幕滚动所需数据集合
    $scope.barrageList = [];//右侧弹幕列表数据
    $scope.videoNum = [];//视频的集数
    $scope.videoInfo = null;
    $scope.bCanPreview = true; //是否可预览
    $scope.player = {
        firstPlay: true,//表示第一次播放
        isPlay:false,
        videoObj:null   //video视频播放器DOM
    };
    $scope.videoSrc = '';   //视频地址
    $scope.xmlSrc = '';     //弹幕地址

    $scope.CurrentPage = 1; //当前页
    $scope.TotalPage = 12;  //总页数
    $scope.pageSize = 6;    //每一页显示的记录数
    $scope.allRow = 1;    //总记录数
    $scope.goCurrentPage = ''; //跳转页码
    $scope.commentVideo = [];//评论父级
    $scope.commentVideoChild = [];//评论子级
    $scope.integer = 5;
    $scope.decimal = 5;
    $scope.integers = [
        {key:1,value:1},
        {key:2,value:2},
        {key:3,value:3},
        {key:4,value:4},
        {key:5,value:5},
        {key:6,value:6},
        {key:7,value:7},
        {key:8,value:8},
        {key:9,value:9},
        {key:10,value:10}
    ];
    $scope.decimals = [
        {key:1,value:1},
        {key:2,value:2},
        {key:3,value:3},
        {key:4,value:4},
        {key:5,value:5},
        {key:6,value:6},
        {key:7,value:7},
        {key:8,value:8},
        {key:9,value:9}
    ];
    $scope.showVideoScore = false;

    $scope.comment = {
        index: -1,
        text:'',
        beReplyId: null,
        beReplyName: null
    };
    $scope.toggleGroup = function(group,beReplyId,beReplyName) {
        if ($scope.isGroupShown(group)) {
            $scope.comment.index = -1;
        } else {
            $scope.comment.index = group;
            $scope.comment.beReplyId = beReplyId;
            $scope.comment.beReplyName = beReplyName;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.comment.index === group;
    };
    /**
     * set
     */
    $scope.opMoveDesc = function () {//打开查看更多介绍
        $scope.isMove = !$scope.isMove;
    };
    $scope.opShowBarrage = function () {//打开弹幕样式选择
        if( $(".colorpicker").css('display') == 'block' ){
            $('.colorpicker').fadeToggle("slow", "swing");
            $scope.bCanPreview = true;
        }
        $scope.showBarrage = !$scope.showBarrage;
    };
    $scope.setBarrage = function () {
        $scope.opBarrage = !$scope.opBarrage;
    };
    $scope.setExpansionVideo = function () {
        $scope.expansionVideo = !$scope.expansionVideo;
        if( $scope.expansionVideo ){
            $("#ascrail2001").find("div").css("background-color","transparent");
            $scope.opBarrage = false;//视频被展开后，隐藏弹幕
        }else{
            $("#ascrail2001").find("div").css("background-color","rgb(109,117,122)");
            $scope.opBarrage = true;//视频被展开后，隐藏弹幕
        }
    };
    $scope.setMoveVideoNum = function (content) {
        var moveLength = 200;
        var left = Math.abs(parseInt($("#moveVideoNumUl").css("left")));//已经移动的长度
        var totalLength = $scope.videoNum.length * 128;//总长度
        var currentLength = left + 836;//已经移动的长度加上可视长度
        var afterMovingLength = currentLength + moveLength;//移动后长度加上可视长度
        if( content == "prev" ){
            if( left > moveLength ){
                left = left - moveLength;
            }else{
                left = 0;
                $scope.moveVideoNum.prev = false;
            }
            $("#moveVideoNumUl").css("left",("-"+left+"px") );
            $scope.moveVideoNum.next = true;
        }else{
            if( afterMovingLength < totalLength ){
                left = left + moveLength;
            }else{
                left = left + ( totalLength - currentLength );
                $scope.moveVideoNum.next = false;
            }
            $("#moveVideoNumUl").css("left",("-"+left+"px") );
            $scope.moveVideoNum.prev = true;
        }
    };
    $scope.setSelectedIndex = function (index) {
        // 更换视频
        window.sessionStorage.setItem('videoPlay',$scope.videoId + "_" + index);
        $window.location.reload();
    };
    $scope.setShowVideoScore = function () {
        $scope.showVideoScore = !$scope.showVideoScore;
    };
    /**
     * add
     */
    $scope.addBarrageConfigure = function () {
        $('#barrageDom').danmu("add_danmu",{ "text":$scope.barrageObject.barrage_text , "color":$scope.barrageObject.barrage_color ,"size":$scope.barrageObject.barrage_font_size , "position":$scope.barrageObject.barrage_position , "time":$scope.barrageObject.barrage_time ,"isnew":" "});
    };
    $scope.addBarrageList = function () {
        var barrage_text = $scope.barrageObject.barrage_text;
        var barrage_time = $scope.barrageObject.barrage_time;
        var barrage_date = $scope.barrageObject.barrage_date;

        //处理time属性时间，将0.1秒单位转换为00:00格式
        barrage_time = $scope.barrageTime(barrage_time);
        var barrage_obj = { "time":barrage_time , "text":barrage_text , "date":barrage_date };
        $timeout(function () {
            $scope.barrageList.push(barrage_obj);
        },10);
    };
    /**
     * init
     */
    $scope.barrageTime = function (barrage_time) {
        //处理time属性时间，将0.1秒单位转换为00:00格式
        barrage_time = Math.floor(+barrage_time/10);//将分秒变成秒：100(分秒) = 10(秒)
        var minute = Math.floor(+barrage_time/60)<10 ? "0"+Math.floor(+barrage_time/60) : Math.floor(+barrage_time/60)+"";
        var sec = +barrage_time%60 <10 ? "0"+(+barrage_time%60) : +barrage_time%60+"";
        barrage_time = minute+":"+sec;
        return barrage_time;
    };
    $scope.initColorPicker = function () {
        $scope.bCanPreview = true; // can preview

        // create canvas and context objects
        var canvas = document.getElementById('picker');
        var ctx = canvas.getContext('2d');

        // drawing active image
        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
        };

        // select desired colorwheel
        var imageSrc = '../style/image/colorwheel.png';
        image.src = imageSrc;

        $('#picker').mousemove(function(e) { // mouse move handler
            if ($scope.bCanPreview) {
                // get coordinates of current position
                var canvasOffset = $(canvas).offset();
                var canvasX = Math.floor(e.pageX - canvasOffset.left);
                var canvasY = Math.floor(e.pageY - canvasOffset.top);

                // get current pixel
                var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
                var pixel = imageData.data;

                // update preview color
                var pixelColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
                $('.preview').css('backgroundColor', pixelColor);

                // update controls
                $('#rVal').val(pixel[0]);
                $('#gVal').val(pixel[1]);
                $('#bVal').val(pixel[2]);
                $('#rgbVal').val(pixel[0]+','+pixel[1]+','+pixel[2]);

                var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
                $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
            }
        });
        $('#picker').click(function(e) { // click event handler
            $scope.bCanPreview = !$scope.bCanPreview;
            $scope.barrageObject.barrage_color = $('#hexVal').val();
        });
        $('.foot-ico-color').click(function(e) { // preview click
            $timeout(function () {
                $scope.showBarrage = false;
            },1);
            $('.colorpicker').fadeToggle("slow", "swing");
            $scope.bCanPreview = true;
        });
    };
    $scope.initNiceScroll = function () {
        $(".right-bottom-ul").niceScroll({
            cursorcolor:"rgb(109,117,122)",
            cursoropacitymax:1,
            touchbehavior:false,
            cursorwidth:"6px",
            cursorborder:"0",
            cursorborderradius:"5px",
            autohidemode: "leave"
        });
    };
    $scope.initMoveVideoNum = function () {
        if( $scope.videoNum.length > 6 ){
            $scope.moveVideoNum.isMove = $scope.moveVideoNum.next = true;
        }
    };
    $scope.initBarrageDom = function () {
        $scope.barrageConfigure.danmuss = $scope.barrageCollection;
        $("#barrageDom").danmu($scope.barrageConfigure);
    };
    $scope.initBarrage = function () {
        $.ajax({
            url: $scope.xmlSrc,
            async: false,
            dataType: 'xml',
            success: function(data) {
                $scope.barrageCollection = {};//弹幕滚动所需数据集合
                $scope.barrageList = [];//右侧弹幕列表数据
                $scope.barrageConfigure.danmuss = {};
                var Barrage = $(data).find("Barrage");
                Barrage.each(function (i) {
                    $scope.initBarrageCollection($(this));
                    $scope.initBarrageList($(this));
                });
                $scope.initBarrageDom();
                $scope.initVideoEvent();
            },
            error:function(data){
                alert("系统异常！请稍后再试...");
            }
        });
    };
    $scope.initBarrageCollection = function (barrage) {
        var barrage_font_size = barrage.find("font_size").text();
        var barrage_position = barrage.find("barrage_position").text();
        var barrage_color = barrage.find("barrage_color").text();
        var barrage_text = barrage.find("barrage_text").text();
        var barrage_time = barrage.find("barrage_time").text();
        var barrage_date = barrage.find("barrage_date").text();

        var barrage_obj = { "text":barrage_text , "color":barrage_color ,"size":barrage_font_size , "position":barrage_position};

        if( $scope.barrageCollection.hasOwnProperty(barrage_time+"") ){//存在barrage_time时间的弹幕对象
            $scope.barrageCollection[barrage_time].push(barrage_obj);
        }else{//不存在barrage_time时间的弹幕对象
            var barrage_arr = [];
            barrage_arr.push(barrage_obj);
            $scope.barrageCollection[barrage_time+""] = barrage_arr;
        }
    };
    $scope.initBarrageList = function (barrage) {
        var barrage_text = barrage.find("barrage_text").text();
        var barrage_time = barrage.find("barrage_time").text();
        var barrage_date = barrage.find("barrage_date").text();

        //处理time属性时间，将0.1秒单位转换为00:00格式
        barrage_time = $scope.barrageTime(barrage_time);
        var barrage_obj = { "time":barrage_time , "text":barrage_text , "date":barrage_date };
        $scope.barrageList.push(barrage_obj);
    };
    $scope.initVideoEvent = function () {
        if( $scope.player.videoObj == null ) $scope.player.videoObj = videojs('video');
        // 开始或恢复播放
        $scope.player.videoObj.on('play', function() {
            if($scope.player.firstPlay){
                $('#barrageDom').danmu('danmu_start');
                $scope.player.firstPlay = false;
            }else{
                $('#barrageDom').danmu('danmu_resume');
            }
        });
        // 暂停播放
        $scope.player.videoObj.on('pause', function() {
            $('#barrageDom').danmu('danmu_pause');
        });
    };
    $scope.goPost = function (CurrentPage) {
        //这里的分页是给评论用的.
        $scope.commentVideo = [];//评论父级
        $scope.commentVideoChild = [];//评论子级
        //请求完数据后，调用更新页码方法
        var data = {
            "pageForm":{
                pageSize: $scope.pageSize,
                currentPage: CurrentPage
            },
            "commentVideoEntity": {
                videoId: $scope.videoId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getCommentVideoPageByVideoId(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == "S" ){
                $scope.CurrentPage = jsonObj["currentPage"]; //当前页
                $scope.TotalPage = jsonObj["totalPage"];  //总页数
                $scope.pageSize = jsonObj["pageSize"];    //每一页显示的记录数
                $scope.allRow = jsonObj["allRow"];    //总记录数
                $scope.goCurrentPage = jsonObj["currentPage"]; //当前页
                $scope.commentVideo = jsonObj["commentVideo"];//评论父级
                $scope.commentVideoChild = jsonObj["commentVideoChild"];//评论子级
                for( var i = 0 ; i < $scope.commentVideo.length ; i++ ){
                    //组装头像
                    if( $scope.commentVideo[i]["replyId"] == '-1' ){
                        $scope.commentVideo[i]["headImageSrc"] = '../style/image/commentHead.png';
                    }else{
                        $scope.commentVideo[i]["headImageSrc"] = "/resources/image/"+$scope.commentVideo[i]["replyId"]+"/Head_"+$scope.commentVideo[i]["replyId"]+".jpg"+"?r="+Math.random();
                    }
                    //时间格式转换
                    $scope.commentVideo[i]["createTime"] = Util.getNowFormatDate(new Date($scope.commentVideo[i]["createTime"]));
                    if( $scope.commentVideoChild[i] == null || $scope.commentVideoChild[i] == 'null' ){
                        $scope.commentVideoChild[i] = [];
                    }else{
                        for( var j = 0 ; j < $scope.commentVideoChild[i].length ; j++ ){
                            if( $scope.commentVideoChild[i][j]["replyId"] == '-1' ){
                                $scope.commentVideoChild[i][j]["headImageSrc"] = '../style/image/commentHead.png';
                            }else{
                                $scope.commentVideoChild[i][j]["headImageSrc"] = "/resources/image/"+$scope.commentVideoChild[i][j]["replyId"]+"/Head_"+$scope.commentVideoChild[i][j]["replyId"]+".jpg"+"?r="+Math.random();
                            }
                            $scope.commentVideoChild[i][j]["createTime"] = Util.getNowFormatDate(new Date($scope.commentVideoChild[i][j]["createTime"]));
                        }
                    }
                }
                updataPage($scope);
                // console.log($scope.commentVideo);
                // console.log($scope.commentVideoChild);
            }else{
                swal("",jsonObj.msg);
            }
        },function (data) {
            console.log(data);
        },param);
    };
    $scope.getVideoBaseInfo = function () {
        var data = {
            "videoEntity":{
                "videoId": $scope.videoId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.getVideoByVideoId(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == "S" ){
                $scope.videoInfo = jsonObj['videoPackageForm'];
                //组装视频图片地址
                $scope.videoInfo["pictureName"] = "/resources/video/"+$scope.videoInfo["userId"]+"/"+$scope.videoInfo["title"]+"/"+$scope.videoInfo["pictureName"]+"?r="+Math.random();
                //时间格式转换
                $scope.videoInfo["createTime"] = Util.getNowFormatDate(new Date($scope.videoInfo["createTime"]));
                //组装视频头像地址
                $scope.videoInfo["headImageSrc"] = "/resources/image/"+$scope.videoInfo["userId"]+"/Head_"+$scope.videoInfo["userId"]+".jpg";
                for( var i = 0 ; i < $scope.videoInfo["videoNames"].length ; i ++ ){
                    //组装视频地址
                    $scope.videoInfo["videoNames"][i] = "/resources/video/"+$scope.videoInfo["userId"]+"/"+$scope.videoInfo["title"]+"/"+$scope.videoInfo["videoNames"][i];
                    $scope.videoNum.push({videoTitle: $scope.videoInfo["title"]});
                }
                for( var i = 0 ; i < $scope.videoInfo["videoXMLNames"].length ; i ++ ){
                    //组装视频XML地址
                    $scope.videoInfo["videoXMLNames"][i] = "/resources/video/"+$scope.videoInfo["userId"]+"/"+$scope.videoInfo["title"]+"/"+$scope.videoInfo["videoXMLNames"][i];
                }
                if( $scope.videoInfo["videoNames"].length > 0 ){
                    $timeout(function () {
                        $scope.videoSrc = $scope.videoInfo["videoNames"][$scope.videoSetNumber];   //视频地址
                        $scope.player.videoObj.src($scope.videoSrc);//重置video的src
                        $scope.player.videoObj.load($scope.videoSrc);//使video重新加载
                    },10);
                }
                if( $scope.videoInfo["videoXMLNames"].length > 0 ){
                    $scope.xmlSrc = $scope.videoInfo["videoXMLNames"][$scope.videoSetNumber];     //弹幕地址
                }
                $scope.initBarrage();
            }else{
                console.log(jsonObj);
            }
        },function (data) {
            console.log("请求视频信息异常");
        },param);
    };
    $scope.updateXml = function () {
        var data = {
            "videoEntity":{
                "videoId": $scope.videoInfo['videoId'],
                "title": $scope.videoInfo["title"],
                "userId": $scope.videoInfo["userId"]
            },
            "barrageForm":{
                "barrageXmlName": $scope.xmlSrc.substr($scope.xmlSrc.lastIndexOf("/")+1) ,
                "barrage_font_size_str": $scope.barrageObject.barrage_font_size,
                "barrage_position_str": $scope.barrageObject.barrage_position,
                "barrage_color_str": $scope.barrageObject.barrage_color,
                "barrage_text_str": $scope.barrageObject.barrage_text,
                "barrage_time_str": $scope.barrageObject.barrage_time,
                "barrage_date_str": $scope.barrageObject.barrage_date
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.updateBarrage(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == "S" ){
                // console.log(jsonObj);
            }else{
                console.log(jsonObj);
            }
        },function (data) {
            console.log(data);
        },param);
    };
    /**
     * click
     */
    $scope.barrageFont = function (fontSize) {
        $scope.barrageObject.barrage_font_size = fontSize;
    };
    $scope.barragePosition = function (position) {
        $scope.barrageObject.barrage_position = position;
    };
    $scope.isCloseBarrage = function () {
        $scope.opBarrage = !$scope.opBarrage;
    };
    $scope.barrageClickEvent = function () {
        if( $scope.player.videoObj == null ) $scope.player.videoObj = videojs('video');
        if( !$scope.player.isPlay ){//表示暂停
            $scope.player.videoObj.play(); // 播放
            $scope.player.isPlay = true;
        }else{//表示播放
            $scope.player.videoObj.pause(); // 暂停
            $scope.player.isPlay = false;
        }
    };
    $scope.barrageSendOut = function () {
        //处理弹幕发送时间
        var date=new Date();
        var month = date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1+"";
        var day = date.getDate()<10 ? "0"+date.getDate() : date.getDate()+"";
        var hour = date.getHours()<10 ? "0"+date.getHours() : date.getHours()+"";
        var minute = date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes()+"";
        //处理弹幕对象
        var videoTime = $scope.player.videoObj.currentTime();
        $scope.barrageObject.barrage_time = Math.ceil((videoTime)*10);//获取的是秒速，但是弹幕的事件time是10*秒数
        $scope.barrageObject.barrage_date = month+"-"+day+" "+hour+":"+minute;
        //向弹幕div添加弹幕
        $scope.addBarrageConfigure();
        //向弹幕列表添加弹幕信息
        $scope.addBarrageList();
        //更新弹幕列表的弹幕数量统计
        $scope.videoInfo['barrageNum'] = (parseInt($scope.videoInfo['barrageNum']) + 1) + "";
        //更新弹幕XML
        $scope.updateXml();
    };
    $scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.goCurrentPage = $(".goCurrentPage").val();
            if( $scope.goCurrentPage.length <= 0 || $scope.goCurrentPage == '' ){
                $scope.goCurrentPage = $scope.CurrentPage;
            }
            $scope.goPost($scope.goCurrentPage);
        }
    };
    $scope.sendCommentsTop = function () {
        var data = {
            "commentVideoEntity": {
                videoId: $scope.videoId,
                videoName: $scope.videoInfo.title,
                content: $scope.comment.text
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.saveCommentVideo(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == "S" ){
                $scope.comment.text = '';
                $scope.goPost($scope.CurrentPage);
            }else{
                swal("",jsonObj.msg);
            }
        },function (data) {
            console.log(data);
        },param);
    };
    $scope.sendCommentsLower = function (parentId) {
        var data = {
            "commentVideoEntity": {
                videoId: $scope.videoId,
                videoName: $scope.videoInfo.title,
                parentId: parentId,
                beReplyId: $scope.comment.beReplyId,
                beReplyName: $scope.comment.beReplyName,
                content: $scope.comment.text
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.saveCommentVideo(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == "S" ){
                $scope.comment.text = '';
                $scope.comment.index = -1;
                $scope.goPost($scope.CurrentPage);
            }else{
                swal("",jsonObj.msg);
            }
        },function (data) {
            console.log(data);
        },param);
    };
    $scope.submitVideoScore = function () {
        $scope.showVideoScore = false;
        $scope.integer = parseInt($('.integer option:selected').val()) + 1;//选中的值
        $scope.decimal = parseInt($('.decimal option:selected').val()) + 1;//选中的值
        var data = {
            "videoScoreEntity": {
                score: parseFloat($scope.integer+'.'+$scope.decimal),
                userId: $scope.videoInfo.userId,
                videoId: $scope.videoInfo.videoId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.saveVideoScore(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == "S" ){

            }else{
                swal("",jsonObj.msg);
            }
        },function (data) {
            console.log(data);
        },param);
    };
    /**
     *  executive
     */
    $scope.initColorPicker();
    $scope.initNiceScroll();
    $scope.initMoveVideoNum();
    $scope.getVideoBaseInfo();
    $scope.goPost($scope.CurrentPage);
}]);
