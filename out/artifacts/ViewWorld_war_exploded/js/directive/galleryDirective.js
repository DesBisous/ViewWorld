/**
 * Created by Benson on 2016/9/29.
 */
app.directive("galleryTabChange", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            el.on("click",function (event) {
                el.parent().find("li").removeClass("active");
                el.addClass("active");
            });
        }
    }
});