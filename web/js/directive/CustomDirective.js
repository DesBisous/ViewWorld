/**
 * Created by Benson on 2016/11/27.
 */
app.directive("accordion", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            $( ".accordion" ).accordion({
                header:'h4',
                heightStyle: "content",
                collapsible: true   //可以让所有部分都能折叠
            }).sortable({
                axis: "y",
                handle: "h4"
            });
        }
    }
});
app.directive("headerBtn", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            el.on("click",function () {
                if( $(this).find(".fa-plus").hasClass("plus-rotate") ){
                    $(".header-btn").find(".fa-plus").removeClass("plus-rotate");
                }else{
                    $(".header-btn").find(".fa-plus").removeClass("plus-rotate");
                    $(this).find(".fa-plus").addClass("plus-rotate");
                }
            });
        }
    }
});