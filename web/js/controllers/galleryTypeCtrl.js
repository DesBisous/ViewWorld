/**
 * Created by Benson on 2016/9/29.
 */
app.controller('galleryTypeCtrl', ['$scope','$state','galleryFactory','$timeout','dataService',function($scope,$state,galleryFactory,$timeout,dataService) {
    if( !$scope.reddit ){
        $scope.reddit = galleryFactory.Reddit;
    }
    $scope.goToInsideAlbum = function ( col , index ) {
        var list = [];
        if( col == "One" ) list =  $scope.reddit.imageItemOne;
        if( col == "Two" ) list =  $scope.reddit.imageItemTwo;
        if( col == "Three" ) list =  $scope.reddit.imageItemThree;
        sessionStorage.setItem("albumId", list[index].albumId);
        $state.go("main.insideAlbum");
    };
    $scope.goToAlbum = function ( col , index ) {
        var list = [];
        if( col == "One" ) list =  $scope.reddit.imageItemOne;
        if( col == "Two" ) list =  $scope.reddit.imageItemTwo;
        if( col == "Three" ) list =  $scope.reddit.imageItemThree;
        $state.go('main.album',{data:{"userId":list[index].userId}});
    };
    $scope.addUserConcern = function ( col , index ) {
        var list = [];
        if( col == "One" ) list =  $scope.reddit.imageItemOne;
        if( col == "Two" ) list =  $scope.reddit.imageItemTwo;
        if( col == "Three" ) list =  $scope.reddit.imageItemThree;
        var data = {
            "userConcernEntity":{
                concernId: list[index].userId
            }
        };
        var param = {
            data:angular.toJson(data)
        };
        dataService.addUserConcern(function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            if( jsonObj.status == 'S' ){
                swal(jsonObj.msg,"","success");
            }else{
                if( jsonObj.msg == '未登录,请先登录' ){
                    swal({
                        title: "请先登录,才能进行关注",
                        text: "",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#AFDFEF",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        closeOnConfirm: true,
                        allowOutsideClick: true
                    }, function(){
                        $state.go("main.login");
                    });
                }else{
                    swal(jsonObj.msg,"","error");
                }
            }
        },function (data) {
            var jsonObj = angular.fromJson(eval("("+data+")"));
            console.log(jsonObj.status);
        },param);
    };
    $scope.$watch( function () {
        return $scope.typeIndex;
    },function ( newValue , oldValue ) {
        // console.log(oldValue + "=====" + newValue);
        if( newValue == -1 && oldValue == -1 ) {
            //不操作||//请求其他类别
            $scope.reddit.init(newValue);
        } else {
            if( newValue == -1 && oldValue != -1 ){
                //请求其他类别
            }else{
                if( newValue != -1 && oldValue != -1 ){
                    if( $state.current.name == "main.gallery.TypeOther" && newValue == 1 && oldValue == 1 ){
                        $state.go( "main.gallery.Type" );
                    }
                    $scope.reddit.init(newValue);
                    $scope.reddit.nextPage();
                }else{
                    $state.go( "main.gallery.Type" );
                }
            }
        }
    },false );
}]);
