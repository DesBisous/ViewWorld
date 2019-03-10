/**
 * Created by Benson on 2016/11/25.
 */
app.controller('suggestionBoxCtrl', ['$scope','$rootScope','$state','dataService', function($scope,$rootScope,$state,dataService) {
    $scope.backText = {
        radioText:'N',
        inputText:'',
        areaText:''
    };
    $scope.ErrorBack = 'hide';
    $scope.getErrorBack = function (content) {
        if( $scope.sugShow == content ){
            return true;
        }else{
            return false;
        }
    };
    $scope.setErrorBack = function (content) {
        $scope.sugShow = content;
    };
    $scope.sugSub = function () {
        if( $scope.backText.radioText == 'N' || $scope.backText.inputText.length <= 0 || $scope.backText.areaText.length <=0 ){
            $scope.setErrorBack('show');
            console.log($scope.backText);
        }else{
            var data = {
                "suggestionBoxEntity":{
                    "type": $scope.backText.radioText,
                    "title": $scope.backText.inputText,
                    "sugContent": $scope.backText.areaText
                }
            };
            var param = {
                data:angular.toJson(data)
            };
            $scope.setErrorBack('hide');
            dataService.saveSuggestionBoxAction($scope.callback,$scope.callbackError,param);
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
    if( $rootScope.user.userInfo == null ){
        $state.go('main.login');
    }
}]);