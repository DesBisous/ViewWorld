/**
 * Created by Benson on 2016/11/17.
 */
app.controller('findPwCtrl', ['$scope','$http','$timeout','dataService', function($scope,$http,$timeout,dataService) {
    $scope.showPw = false;
    $scope.userInfo = {
        account: '',
        password: ''
    };
    $scope.popoverInfo = {
        content:''
    };
    $scope.findPwEvent = function () {
        if( $scope.userInfo.account.length <= 0 ){
            $scope.popoverInfo.content = '请填写账户';
            $timeout(function () {
                $(".popoverReg-1").popover('show');
            },100);
        }else{
            var data = {
                "userEntity":{
                    "account": $scope.userInfo.account
                }
            };
            var param = {
                data:angular.toJson(data)
            };
            dataService.findPasswordByAccount($scope.callback,$scope.callbackError,param);
        }
        
    };
    $scope.callback = function (data)  {
        var jsonObj = angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            $scope.userInfo.password = jsonObj.user.password;
            $scope.showPw = true;
        }else{
            $scope.popoverInfo.content = jsonObj.msg;
            $timeout(function () {
                $(".popoverReg-1").popover('show');
            },100);
        }
        console.log(jsonObj.status);
    };
    $scope.callbackError = function (data)  {
        var jsonObj = angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    $scope.focusEvent = function (index) {
        $(".popoverReg-"+index+"").popover('hide');
    };
}]);