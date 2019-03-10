/**
 * Created by Benson on 2016/9/23.
 */
app.directive("musicPlayer", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            el.on("click",function (event) {
                event.stopPropagation();
            });
            toTop();
        }
    }
});
app.directive("stateChange", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            if( window.sessionStorage.getItem("activeLocation") ){
                el.find("li").removeClass("active");
            }else{
                window.sessionStorage.setItem("activeLocation","0");
            }
            el.find("li:eq("+ parseInt(window.sessionStorage.getItem("activeLocation")) +")").addClass("active");
            el.find("li").on("click",function (event) {
                el.find("li").removeClass("active");
                $(this).addClass("active");
                window.sessionStorage.setItem("activeLocation", $(this).index());
                //更改返回顶部的路由地址
                $("#toTop").attr("href",$(this).find("a").attr("href"));
            });
        }
    }
});
app.directive("selectButton", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            el.find("li").on("click",function ($element) {
                el.parent().find("button").find("div").text($element.target.text.trim());
            });
        }
    }
});
