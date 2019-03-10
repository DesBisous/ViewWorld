/**
 * Created by Benson on 2016/9/30.
 */
app.factory('galleryFactory',function(dataService,Util){
    return {
        Reddit:{
            items:[],
            busy:false,
            theme:'',
            CurrentPage: 1, //当前页
            TotalPage: 12,  //总页数
            pageSize: 6,    //每一页显示的记录数
            allRow: 1,    //总记录数
            imageItemOne:[],
            imageItemTwo:[],
            imageItemThree:[],
            imageLists:[],
            init:function (theme) {
                //切换主题
                switch(theme)
                {
                    case -1:this.theme = '其他' ; break;
                    case 1:this.theme = '节日' ; break;
                    case 2:this.theme = '美食' ; break;
                    case 3:this.theme = '时尚' ; break;
                    case 4:this.theme = '户外' ; break;
                    case 5:this.theme = '生活' ; break;
                    case 100:this.theme = '' ; break;//这是搜索所有类别
                    default:this.theme = '节日' ; break;
                };
                //清空数组进行初始化
                this.imageItemOne = [];
                this.imageItemTwo = [];
                this.imageItemThree = [];
                //初始化当前页
                this.CurrentPage = 0;
                this.TotalPage = 12;
                this.allRow = 1;
                //切换主题后，需要重新打开监听器
                this.busy = false;
            },
            nextPage:function () {
                if (this.busy) return;
                this.busy = true;
                console.log('加载中...');
                //开始请求数据
                var data = {
                    "pageForm":{
                        pageSize: this.pageSize,
                        currentPage: ++this.CurrentPage
                    },
                    "albumEntity":{
                        theme: this.theme
                    }
                };
                var param = {
                    data:angular.toJson(data)
                };
                dataService.getAlbumPageByType(function (data) {
                    var jsonObj = angular.fromJson(eval("("+data+")"));
                    if( jsonObj.status == "S" ) {
                        this.CurrentPage = jsonObj["currentPage"]; //当前页
                        this.TotalPage = jsonObj["totalPage"];  //总页数
                        this.pageSize = jsonObj["pageSize"];    //每一页显示的记录数
                        this.allRow = jsonObj["allRow"];    //总记录数
                        for (var i = 0; i < jsonObj["albumPackageForms"].length; i++) {
                            //组装相册图片地址
                            jsonObj["albumPackageForms"][i]["pictureName"] = "/resources/image/" + jsonObj["albumPackageForms"][i]["userId"] + "/" + jsonObj["albumPackageForms"][i]["title"] + "/" + jsonObj["albumPackageForms"][i]["pictureName"] + "?r=" + Math.random();
                            //组装相册上传者头像
                            jsonObj["albumPackageForms"][i]["headImageSrc"] = "/resources/image/" + jsonObj["albumPackageForms"][i]["userId"] + "/Head_" + jsonObj["albumPackageForms"][i]["userId"] + ".jpg" + "?r=" + Math.random();
                            //时间格式转换
                            jsonObj["albumPackageForms"][i]["createTime"] = Util.getNowFormatDate(new Date(jsonObj["albumPackageForms"][i]["createTime"]));
                        };
                        var groupNumber;    //计算组数
                        this.imageLists = []; //初始化存储查询结果的数组
                        if( this.theme == "其他" ){
                            groupNumber = Math.floor( jsonObj["albumPackageForms"].length / 1 );
                        }else{
                            groupNumber = Math.floor( jsonObj["albumPackageForms"].length / 3 );
                        }
                        if( groupNumber <= 0 ){
                            switch(jsonObj["albumPackageForms"].length)
                            {
                                case 0:{
                                    this.imageLists.push([]);
                                    this.imageLists.push([]);
                                    this.imageLists.push([]);
                                }; break;
                                case 1:{
                                    this.imageLists.push([jsonObj["albumPackageForms"][0]]);
                                    this.imageLists.push([]);
                                    this.imageLists.push([]);
                                }; break;
                                case 2:{
                                    this.imageLists.push([jsonObj["albumPackageForms"][0]]);
                                    this.imageLists.push([jsonObj["albumPackageForms"][1]]);
                                    this.imageLists.push([]);
                                }; break;
                                default: {
                                    this.imageLists.push(jsonObj["albumPackageForms"]);
                                    this.imageLists.push([]);
                                    this.imageLists.push([]);
                                }; break;
                            };
                        }else{
                            var i = 0,len;
                            for( i = 0,len = jsonObj["albumPackageForms"].length ; i < len ; i += groupNumber){
                                if( this.imageLists.length >= 3 ){
                                    this.imageLists.push(jsonObj["albumPackageForms"].slice(i,len));
                                    break;
                                }
                                this.imageLists.push(jsonObj["albumPackageForms"].slice(i,i + groupNumber));
                            }
                            if( this.imageLists.length > 3 ){
                                for( var j = 0 ; j < this.imageLists[this.imageLists.length - 1].length ; j++ ){
                                    this.imageLists[ j ].push( this.imageLists[this.imageLists.length - 1][j] );
                                }
                            }
                        }
                        this.imageItemOne = this.updata( 0 , this.imageItemOne , this.imageLists );
                        this.imageItemTwo = this.updata( 1 , this.imageItemTwo , this.imageLists );
                        this.imageItemThree = this.updata( 2 , this.imageItemThree , this.imageLists );

                        var crrLength =  this.imageItemOne.length + this.imageItemTwo.length + this.imageItemThree.length;

                        if( crrLength < this.allRow || this.CurrentPage < this.TotalPage ){
                            this.busy = false;
                        }else {
                            //已查找完所有数据，停止滚动加载的监听
                            this.busy = true;
                        }
                    }else{
                        console.log(jsonObj.ms);
                        //未查找到数据，停止滚动加载的监听
                        this.busy = true;
                    }
                }.bind(this),function (data) {
                    //出现异常时，停止滚动加载的监听
                    this.busy = true;
                }.bind(this),param);
            },
            updata:function ( index , itemSize , imageLists ) {
                if( imageLists[index] != undefined  ){
                    for( var j = 0 ; j < imageLists[index].length ; j++ ){
                        itemSize.push(imageLists[index][j]);
                    }
                }
                return itemSize;
            }
        }
    };
});