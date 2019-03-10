/**
 * Created by Benson on 2016/9/23.
 */
app.directive("focusbox", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            var myClass = "#viewFocus";
            var eachObject = "li";
            resizeSize(myClass,eachObject);
            setKdui();
            $(window).resize(function () {
                resizeSize(myClass,eachObject)
            });
            function resizeSize(parent,eachObject) {
                var size = 0;
                $( parent ).find( eachObject ).each(function() {
                    if( size < $(this).find("img").width() ) {
                        size = $(this).find("img").width();
                    }
                    if( size < 200 ) size = $(window).width();
                    $( parent ).height( size * 0.53571 );
                });
            }
        }
    }
});
app.directive("imageHighFocus", function() {
    return {
        restrict: 'C',
        link: function(scope, el, attrs, controller) {
            var myClass = "#imageFocus";
            var eachObject = ".pic li";
            resizeSize(myClass,eachObject);
            setFancy();
            $(window).resize(function () {
                resizeSize(myClass,eachObject)
            });
            function resizeSize(parent,eachObject) {
                var size = 0;
                $( parent ).find( eachObject ).each(function() {
                    if( size < $(this).find("img").width() ) {
                        size = $(this).find("img").width();
                    }
                    // if( size < 200 ) size = $(".image-high-focus").width();
                });
                $( parent ).height( size * 0.53371 );
            }
        }
    }
});