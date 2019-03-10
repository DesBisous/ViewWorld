/**
 * Created by Benson on 2016/11/25.
 */
app.controller('aboutWebCtrl', ['$scope','dataService', function($scope,dataService) {
    $scope.templateModel = 'WebInfo.html';
    $scope.sugShow = 'Option';
    $scope.backText = {
        radioText:'N',
        areaText:''
    };
    $scope.WebInfo = function () {
        $scope.sugShow = 'Option';
        $scope.templateModel = 'WebInfo.html';
    };
    $scope.WebDesc = function () {
        $scope.sugShow = 'Option';
        $scope.templateModel = 'WebDesc.html';
    };
    $scope.Author = function () {
        $scope.sugShow = 'Option';
        $scope.templateModel = 'Author.html';
    };
    $scope.LoginAndRegister = function () {
        $scope.sugShow = 'Option';
        $scope.templateModel = 'LoginAndRegister.html';
    };
    $scope.ImageAndVideo = function () {
        $scope.sugShow = 'Option';
        $scope.templateModel = 'ImageAndVideo.html';
    };
    $scope.UserKnow = function () {
        $scope.sugShow = 'Option';
        $scope.templateModel = 'UserKnow.html';
    };
    $scope.UserAuthority = function () {
        $scope.sugShow = 'Option';
        $scope.templateModel = 'UserAuthority.html';
    };
    $scope.getSugShow = function (content) {
        if( $scope.sugShow == content ){
            return true;
        }else{
            return false;
        }
    };
    $scope.setSugShow = function (content) {
        $scope.sugShow = content;
    };
    $scope.focusEvent = function (index) {
        $(".feedbackText-"+index+"").popover('hide');
    };
    /**
     * 提交用户意见
     */
    $scope.userBackSub = function () {
        console.log($scope.backText);
        if( $scope.backText.radioText == 'N' && $scope.backText.areaText.length <= 0 ){
            angular.element(".ErrorBack").css("display","inline");
        }else{
            if( $scope.backText.areaText.length > 200 ){
                $(".feedbackText-1").popover('show');
            }else{
                var data = {
                    "websiteSuggestionsEntity":{
                        "websiteSugBrief": $scope.backText.radioText,
                        "websiteSugDetails": $scope.backText.areaText,
                    }
                };
                var param = {
                    data:angular.toJson(data)
                };
                dataService.saveWebsiteSugAction($scope.callback,$scope.callbackError,param);
                $scope.setSugShow('Yes');
            }
        }
    };
    $scope.callback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            console.log(jsonObj.msg);
        }else{
            swal("",jsonObj.msg);
        }
    };
    $scope.callbackError = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        console.log(jsonObj.status);
    };
}]);