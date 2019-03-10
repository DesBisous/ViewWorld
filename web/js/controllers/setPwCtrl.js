/**
 * Created by Benson on 2016/11/17.
 */
app.controller('setPwCtrl', ['$scope','$timeout','dataService', function($scope,$timeout,dataService) {
    $scope.userInfo = {
        password: '',
        passwordConfirmation: ''
    };
    $scope.popoverInfo = {
        content:''
    };
    $scope.modifyPasswordEvent = function () {
        var adopt = true;
        var i = 0;
        for ( var key in $scope.userInfo ){
            i++;
            if(($scope.userInfo[key]+"").length <= 0  ) {
                $scope.popoverInfo.content = '信息不能为空';
                $timeout(function () {
                    $(".modifyPassword-"+i+"").popover('show');
                },100);
                adopt = false; break;
            }
        }
        if( adopt ){
            if( $scope.userInfo.password == $scope.userInfo.passwordConfirmation ){
                var data = {
                    "userEntity":{
                        "password": $scope.userInfo.password
                    }
                };
                var param = {
                    data:angular.toJson(data)
                };
                dataService.modifyPassword($scope.callback,$scope.callbackError,param);
            }else{
                $scope.popoverInfo.content = '两次输入的密码不一致';
                $timeout(function () {
                    $(".modifyPassword-2").popover('show');
                },100);
            }
        }
    };
    $scope.callback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            swal("",jsonObj.msg);
        }else{
            swal("",jsonObj.msg);
        }
        console.log(jsonObj.status);
    };
    $scope.callbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    $scope.focusEvent = function (index) {
        $(".modifyPassword-"+index+"").popover('hide');
    };
}]);