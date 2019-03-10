/**
 * Created by Benson on 2016/10/22.
 */
app.directive("movies1Left", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            setExpo();
        }
    }
});
app.directive("tvPlay", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            setTvPlay();
        }
    }
});
app.directive("Film", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            setFilm();
        }
    }
});
app.directive("Variety", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            setVariety();
        }
    }
});
app.directive("Animation", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            setAnimation();
        }
    }
});
app.directive("Music", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            setAnimation();
        }
    }
});
app.directive("Dance", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            setDance();
        }
    }
});
app.directive("moviesState", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            el.find("li").removeClass("active");
            el.find("li:eq("+ parseInt(window.sessionStorage.getItem("moviesLocation")) +")").addClass("active");
        }
    }
});
/**
 * 更新页码
 * @param scope
 */
function updataPage(scope) {
    var Total_Page = parseInt(scope.TotalPage);
    var Current_Page = parseInt(scope.CurrentPage);
    var local = 0;
    var showPage = Total_Page >= 5 ? 5 : Total_Page;//显示的页码数
    var pageOffset = Math.floor(showPage/2);//取中间的前一个数
    var pageArr = [];

    var start = 1;
    var end = Total_Page;
    //如果总页数大于要显示的页数
    if(Total_Page>showPage){
        if(Current_Page>pageOffset){//这个是为了判断当前页是否为>2的数，因为这时当前页要显示在中间了。
            start = Current_Page - pageOffset;
            end = Total_Page>Current_Page + pageOffset?Current_Page + pageOffset:Total_Page;
        }else{//这时判断当前页为<=2的时候，
            start = 1;
            end = Total_Page>showPage?showPage:Total_Page;
        }
        if(Current_Page + pageOffset>Total_Page){//这时判断当前页是否为总页数的最后两页的位置
            start = start - (Current_Page + pageOffset - Total_Page);
        }
    }
    for(var i=start;i<=end;i++){
        pageArr.push(i);
    }
    pageArr.unshift("上一页");
    pageArr.unshift("首页");
    pageArr.push("下一页");
    pageArr.push("尾页");

    local = pageArr.indexOf(Current_Page);
    pageDOM( local , pageArr , Total_Page , scope );

}
/**
 * @param index     pageArr中当前页的索引
 * @param pageArr   存放着页码信息的数组
 * @param Total_Page    总页数
 * @param scope     无关数据，视情况而定
 */
function pageDOM(index , pageArr , Total_Page , scope) {
    $(".pagination").find("li").remove();
    $.each(pageArr,function (index,element) {
        $(".pagination").append('<li class="pagination-li"><a>'+element+'</a></li>');
    });
    $(".pagination").find("li:eq("+index+")").addClass("CurrentActive");
    $(".pagination").find("li").unbind("click");
    $(".pagination").find("li").on("click",function () {
        var currentClickText = $(this).find("a").text();
        var CurrentPageCopy = Number($(".pagination").find("li.CurrentActive a").text());
        if( currentClickText == "首页" ) CurrentPageCopy = 1;
        else if( currentClickText == "尾页" ) CurrentPageCopy = Total_Page;
        else if( currentClickText == "上一页" ) CurrentPageCopy = CurrentPageCopy - 1;
        else if( currentClickText == "下一页" ) CurrentPageCopy = CurrentPageCopy + 1;
        else CurrentPageCopy = currentClickText;
        if( CurrentPageCopy <= 0 ) CurrentPageCopy = 1;
        if( CurrentPageCopy >= Total_Page ) CurrentPageCopy = Total_Page;
        scope.goPost(CurrentPageCopy);
    });
}