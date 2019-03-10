/**
 * Created by Benson on 2016/12/6.
 */
app.controller('myServiceCtrl', ['$scope','$rootScope','$timeout','$state','dataService','Util', function($scope,$rootScope,$timeout,$state,dataService,Util) {
    $scope.sugList = [];
    $scope.showSugList = false;
    var data = {
        "suggestionBoxEntity":{
            "type": '1'
        }
    };


    $scope.WebProblem = function () {
        data.suggestionBoxEntity.type = '1';
        var param = {
            data:angular.toJson(data)
        };
        dataService.findSugBoxByUserIdAndTypeAction($scope.callback,$scope.callbackError,param);
    };
    $scope.VideoPictureProblem = function () {
        data.suggestionBoxEntity.type = '2';
        var param = {
            data:angular.toJson(data)
        };
        dataService.findSugBoxByUserIdAndTypeAction($scope.callback,$scope.callbackError,param);
    };
    $scope.WebProposal = function () {
        data.suggestionBoxEntity.type = '3';
        var param = {
            data:angular.toJson(data)
        };
        dataService.findSugBoxByUserIdAndTypeAction($scope.callback,$scope.callbackError,param);
    };
    $scope.WebOther = function () {
        data.suggestionBoxEntity.type = '0';
        var param = {
            data:angular.toJson(data)
        };
        dataService.findSugBoxByUserIdAndTypeAction($scope.callback,$scope.callbackError,param);
    };
    $scope.callback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            for( var i = 0 ; i < jsonObj.sugList.length; i++ ){
                jsonObj.sugList[i]["createTime"] = Util.getNowFormatDate(new Date(jsonObj.sugList[i]["createTime"]));
                if( jsonObj.sugList[i]["csId"] != null ){
                    jsonObj.sugList[i]["csTime"] = Util.getNowFormatDate(new Date(jsonObj.sugList[i]["csTime"]));
                }
            }
            $scope.showSugList = false;
            $scope.sugList = jsonObj.sugList;
        }else{
            $scope.sugList = [];
            $scope.showSugList = true;
            // swal("",jsonObj.msg);
        }
    };
    $scope.callbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
    if( $rootScope.user.userInfo == null ){
        $state.go('main.login');
    }else{
        $timeout(function () {
            $scope.WebProblem();
        },10);
    }
}]);
