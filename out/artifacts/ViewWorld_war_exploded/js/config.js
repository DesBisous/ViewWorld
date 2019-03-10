/**
 * Created by Benson on 2016/9/22.
 */
//处理点击回到顶部jQuery动画
{
    function toTop() {
        $().UItoTop({easingType: 'easeOutQuart'});
    }
}
//滚动条美化
{
    $("html").niceScroll({
        cursorcolor: "#14b9c8",
        cursoropacitymax: 1,
        touchbehavior: false,
        cursorwidth: "7.5px",
        cursorheight: "102px",
        cursorborder: "0",
        cursorborderradius: "5px"
    });
}
//首页轮转图
{
    function setKdui() {
        myFocus.set({
            id:'viewFocus',//焦点图盒子ID
            pattern:'mF_kdui',//风格应用的名称
            autoZoom:'true',
            time:3//切换时间间隔(秒)
        });
    }
    function setFancy() {
        myFocus.set({
            id:'imageFocus',//焦点图盒子ID
            pattern:'mF_fancy',//风格应用的名称
            autoZoom:'true',
            time:3//切换时间间隔(秒)
        });
    }
}
//影视论转图
{
    function setExpo() {
        myFocus.set({
            id:'moviesHomeFocus',//焦点图盒子ID
            pattern:'mF_expo2010',//风格应用的名称
            autoZoom:'true',
            time:3//切换时间间隔(秒)
        });
    }
    function setTvPlay() {
        myFocus.set({
            id:'moviesTvPlayFocus',//焦点图盒子ID
            pattern:'mF_luluJQ',//风格应用的名称
            autoZoom:'true',
            height:380,
            width:798,
            time:3//切换时间间隔(秒)
        });
    }
    function setFilm() {
        myFocus.set({
            id:'moviesFilmFocus',//焦点图盒子ID
            pattern:'mF_qiyi',//风格应用的名称
            autoZoom:'true',
            height:400,
            width:1070,
            time:3//切换时间间隔(秒)
        });
    }
    function setVariety() {
        myFocus.set({
            id:'moviesVarietyFocus',//焦点图盒子ID
            pattern:'mF_pithy_tb',//风格应用的名称
            autoZoom:'true',
            height:400,
            width:958,
            time:3//切换时间间隔(秒)
        });
    }
    function setAnimation() {
        myFocus.set({
            id:'moviesAnimationFocus',//焦点图盒子ID
            pattern:'mF_expo2010',//风格应用的名称
            autoZoom:'true',
            height:400,
            width:1070,
            time:3//切换时间间隔(秒)
        });
    }
    function setDance() {
        myFocus.set({
            id:'moviesDanceFocus',//焦点图盒子ID
            pattern:'mF_expo2010',//风格应用的名称
            autoZoom:'true',
            height:400,
            width:1070,
            time:3//切换时间间隔(秒)
        });
    }
}
//music
{
    var playlist = [{
        title:" 泰坦尼克号",
        artist:"Celine Dion",
        mp3:"../style/music/1.mp3"
    },{
        title:"There You Will Be",
        artist:"Faith Hil",
        mp3:"../style/music/2.mp3"
    },{
        title:"AOA - Moya",
        artist:"AOA",
        mp3: "../style/music/3.mp3"
    },{
        title:"Tell Me",
        artist:"俞永镇",
        mp3:"../style/music/4.mp3"
    },{
        title:"Lia-鸟之诗",
        artist:"HilLia",
        mp3:"../style/music/5.mp3"
    },{
        title:"See You Again",
        artist:"速度与激情",
        mp3:"../style/music/6.mp3"
    },{
        title:"我的天空",
        artist:"贝贝",
        mp3:"../style/music/7.mp3"
    },{
        title:"筷子兄弟-老男孩",
        artist:"老男孩",
        mp3:"../style/music/8.mp3"
    }, {
        title: "那英-雾里看花",
        artist: "那英",
        mp3: "../style/music/9.mp3"
    }];
    var cssSelector = {
        jPlayer: "#jquery_jplayer",
        cssSelectorAncestor: ".music-player"
    };

    var options = {
        swfPath: "Jplayer.swf",
        supplied: "ogv, m4v, oga, mp3"
    };
    // var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
}
