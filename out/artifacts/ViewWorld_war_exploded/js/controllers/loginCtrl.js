/**
 * Created by Benson on 2016/11/17.
 */
app.controller('loginCtrl', ['$scope','$state','$timeout','dataService','broadcastService', function($scope,$state,$timeout,dataService,broadcastService) {
    $scope.userInfo = {
        account: window.sessionStorage.getItem("userAccount") == null ? '':window.sessionStorage.getItem("userAccount"),
        password: ''
    };
    $scope.popoverInfo = {
        content:''
    };
    $scope.loading = false;
    $scope.awesome = 'N';
    $scope.login = function () {
        if( $scope.userInfo.account.length <=0 ||  $scope.userInfo .password.length <= 0 ){
            if( $scope.userInfo.account.length <=0 ){
                $scope.popoverInfo.content = '请填写账户';
                $timeout(function () {
                    $(".popoverReg-1").popover('show');
                },100);
            }else{
                $scope.popoverInfo.content = '请填写密码';
                $timeout(function () {
                    $(".popoverReg-2").popover('show');
                },100);
            }
        }else{
            if( $scope.awesome == 'Y' ){
                window.sessionStorage.setItem("userAccount",$scope.userInfo.account);
            }
            $scope.loading = true;
            var data = {
                "userEntity":{
                    "account": $scope.userInfo.account,
                    "password": $scope.userInfo.password
                }
            };
            var param = {
                data:angular.toJson(data)
            };
            dataService.login($scope.callback,$scope.callbackError,param);
        }
    };
    $scope.initLogin = function () {
        var userLogined = window.sessionStorage.getItem("userInfo");
        if( userLogined != null ){
            $scope.userInfo = userLogined;
        }
    };
    $scope.callback = function (data)  {
        var jsonObj = angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            broadcastService.emitEventByeExistUser();
            $state.go('main.home');
        }else{
            swal("",jsonObj.msg);
        }
        $scope.loading = false;
    };
    $scope.callbackError = function (data)  {
        // console.log(data);
        swal("","服务器异常!","error");
        $scope.loading = false;
    };
    $scope.focusEvent = function (index) {
        $(".popoverReg-"+index+"").popover('hide');
    };
    $scope.initLogin();
}]);