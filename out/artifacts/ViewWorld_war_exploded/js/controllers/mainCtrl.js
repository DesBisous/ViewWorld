/**
 * Created by Benson on 2016/9/23.
 */
app.controller('mainCtrl', ['$scope','$rootScope','$state','musicService','dataService','broadcastService', function($scope,$rootScope,$state,musicService,dataService,broadcastService) {
    $rootScope.user = {
        userInfo: null,
        headImageSrc: '../style/image/icon_2.png'
    };
    $scope.status = {
        loginOutShow: false,
        userExist: false
    };
    $scope.queryType = "picture";
    $scope.searchText = '';
    $scope.setQueryType = function (queryType) {
        $scope.queryType = queryType;
    };
    $scope.goToLogin = function () {
        if( $scope.status.userExist == true ){
            $scope.exitUserBySession();
        }else{
            $state.go('main.login');
        }
    };
    $scope.goToSearch = function () {
        sessionStorage.setItem("queryType",$scope.queryType);
        sessionStorage.setItem("searchText",$scope.searchText);
        if( $state.current.name == 'main.search' ){
            if( $scope.queryType == 'picture' ){
                broadcastService.searchReset();
            }else{
                broadcastService.searchVideoReset();
            }
        }else{
            if( $scope.queryType == 'picture' ){
                $state.go('main.searchImage');
            }else{
                $state.go('main.searchVideo');
            }
        }
    };
    $scope.goToPersonal = function () {
        if( $rootScope.user.userInfo == null ){
            $scope.goToLogin();
        }else{
            $state.go('main.personal',{data:{"userId":$rootScope.user.userInfo.userId}});
        }
    };
    $scope.goToSuggestionBox = function () {
        if( $rootScope.user.userInfo == null ){
            $scope.goToLogin();
        }else{
            $state.go('main.suggestionBox');
        }
    };
    $scope.goToMyService = function () {
        if( $rootScope.user.userInfo == null ){
            $scope.goToLogin();
        }else{
            $state.go('main.myService');
        }
    };
    $scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            sessionStorage.setItem("queryType",$scope.queryType);
            sessionStorage.setItem("searchText",$scope.searchText);
            if( $state.current.name == 'main.search' ){
                broadcastService.searchReset();
            }else{
                if( $scope.queryType == 'picture' ){
                    $state.go('main.searchImage');
                }else{
                    $state.go('main.searchVideo');
                }
            }
        }
    };
    $scope.hoverEventEnter = function () {
        if( $scope.status.userExist ){
            $scope.status.loginOutShow = true;
        }
    };
    $scope.hoverEventLeave = function () {
        if( $scope.status.userExist ){
            $scope.status.loginOutShow = false;
        }
    };
    $scope.existUserBySession = function () {//是否登录
        var param = {};
        dataService.existUserBySession($scope.existUserCallback,$scope.existUserCallbackError,param);
    };
    $scope.existUserCallback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            $scope.status.userExist = true;
            $rootScope.user.userInfo = jsonObj.user;
            $rootScope.user.headImageSrc = "/resources/image/"+$rootScope.user.userInfo.userId+"/Head_"+$rootScope.user.userInfo.userId+".jpg"+"?r="+Math.random();
        }else{
            $scope.status.userExist = false;
            $scope.status.loginOutShow = false;
            // swal("",jsonObj.msg);未登录
            $rootScope.user.userInfo = null;
            $rootScope.user.headImageSrc = '../style/image/icon_2.png';
        }
    };
    $scope.existUserCallbackError = function (data)  {
        var jsonObj = angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    $scope.exitUserBySession = function () {//退出登录
        var param = {};
        dataService.exitUserBySession($scope.exitUserCallback,$scope.exitUserCallbackError,param);
    };
    $scope.exitUserCallback = function (data) {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            $scope.existUserBySession();//再次判断是否已登录
        }
        console.log(jsonObj.status);
    };
    $scope.exitUserCallbackError = function (data) {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    $scope.$on('existUserByEmit',function(event,data){
        $scope.existUserBySession();
    });
    /**
     * 执行是否登录函数
     */
    $scope.existUserBySession();
}]);
