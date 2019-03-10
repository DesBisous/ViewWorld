/**
 * Created by Benson on 2016/11/19.
 */
app.controller('registerCtrl', ['$scope','$http','$state','$timeout','Util','dataService','broadcastService',function($scope,$http,$state,$timeout,Util,dataService,broadcastService) {
    $scope.regInfo = {
        user:'',
        password:'',
        passwordConfirmation:'',
        phone:'',
        verifyCode:'',
        msgVerify:'',
        isSubmit:false
    };
    $scope.popoverInfo = {
        content:''
    };
    $scope.loading = false;
    $scope.awesome = 'N';
    $scope.verifyCodeBtnText = '获取验证码';
    $scope.getVerifyCode = function () {
        if( !Util.checkPhone($scope.regInfo.phone) ){
            $scope.popoverInfo.content = "手机不合法";
            $(".popoverReg-4").popover('show');
        }else{
            $scope.regInfo.msgVerify = getRandom();
            console.log($scope.regInfo.msgVerify);
            $scope.myPhonePost();
        }
    };
    $scope.myPhonePost = function () {
        var Account_Sid = '8ec924cd1d2ae715045a56a5950a75c2';
        var Auth_Token = '00228a9fe723c5a7216536b4c31f9987';
        var SoftVersion = '2014-06-30';
        var Accounts = 'Accounts';
        var serviceF = 'Messages';
        var operation = 'templateSMS';
        var msgVerify = $scope.regInfo.msgVerify;
        var Time = getDate(new Date());
        var sig = hex_md5(Account_Sid+Auth_Token+Time).toUpperCase().toString();
        var Authorization = BASE64.encoder(Account_Sid+":"+Time);
        var url = 'https://api.ucpaas.com/'+SoftVersion+'/'+Accounts+'/'+Account_Sid+'/'+serviceF+'/'+operation+'?sig='+sig;
        var activity = angular.toJson(
            {
                "templateSMS" : {
                    "appId": "6d00e87adbc647fb966d9a4fe5361ded",
                    "param": "ViewWorld,"+msgVerify+",5",
                    "templateId": "35626",
                    "to": $scope.regInfo.phone
                }
            });
        $http({
            method: "post",
            data: activity,
            url: url,
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=utf-8',
                'Authorization' : Authorization
            }
        }).success(function(data){
                var jsonObj = angular.fromJson(data);
                if( data.resp.respCode == "000000" ){
                    $scope.waitVerifyCode();
                }else{
                    swal({
                        title: "",
                        text: "验证码发送失败，请稍后再试..."
                    });
                }
            })
            .error(function(data){
                swal({
                    title: "",
                    text: "验证码发送失败，请稍后再试..."
                });
            });
    };
    $scope.waitVerifyCode = function () {
        var i = 60 ;
        $(".getVerifyCodeBtn").addClass("active");
        var interval = setInterval(function () {
            $scope.verifyCodeBtnText = '获取验证码 '+i;
            i--;
            if( i <= 0 ) {
                $scope.verifyCodeBtnText = '获取验证码';
                $(".getVerifyCodeBtn").removeClass("active");
                window.clearInterval(interval);
            }
            $scope.$digest($scope.verifyCodeBtnText);
        },1000);
    };
    $scope.register = function () {
        var adopt = true;
        var i = 0;
        for ( var key in $scope.regInfo ){
            i++;
            if( (key != 'msgVerify' )  && ($scope.regInfo[key]+"").length <= 0  ) {
                $scope.popoverInfo.content = '信息不能为空';
                $timeout(function () {
                    $(".popoverReg-"+i+"").popover('show');
                },100);
                adopt = false; break;
            }
        }
        if( adopt ){
            if( $scope.regInfo.password == $scope.regInfo.passwordConfirmation ){
                if( ($scope.regInfo.msgVerify + "") == $scope.regInfo.verifyCode ){
                    if( $scope.awesome == 'Y' ){
                        $scope.loading = true;
                        var data = {
                            "userEntity":{
                                "account": $scope.regInfo.user,
                                "password": $scope.regInfo.password,
                                "phone": $scope.regInfo.phone
                            }
                        };
                        var param = {
                            data:angular.toJson(data)
                        };
                        // alert("注册成功");
                        dataService.register($scope.callback,$scope.callbackError,param);
                    }else{
                        $scope.popoverInfo.content = '请同意用户协议';
                        $timeout(function () {
                            $(".popoverReg-6").popover('show');
                        },100);
                    }
                }else{
                    $scope.popoverInfo.content = '验证码错误';
                    $timeout(function () {
                        $(".popoverReg-5").popover('show');
                    },100);
                }
            }else{
                $scope.popoverInfo.content = '两次输入的密码不一致';
                $timeout(function () {
                    $(".popoverReg-3").popover('show');
                },100);
            }
        }
    };
    $scope.callback = function (data)  {
        var jsonObj=angular.fromJson(eval("("+data+")"));
        if( jsonObj.status == "S" ){
            broadcastService.emitEventByeExistUser();
            $state.go('main.home');
        }else{
            swal("",jsonObj.msg);
        }
        $scope.loading = false;
    };
    $scope.callbackError = function (data)  {
        // var jsonObj=angular.fromJson(eval("("+data+")"));
        // console.log(jsonObj.status);
        swal("","服务器异常！","error");
        $scope.loading = false;
    };
    $scope.focusEvent = function (index) {
        $(".popoverReg-"+index+"").popover('hide');
    };
    function getDate(date){
        var tYear = date.getFullYear();
        var tMonth = date.getMonth()+1;
        var tDate = date.getDate();
        var tHours = date.getHours();
        var tMinutes = date.getMinutes();
        var tSeconds = date.getSeconds();
        if(tMonth<10){
            tMonth="0"+tMonth;
        }
        if(tDate<10){
            tDate="0"+tDate;
        }
        if(tHours<10){
            tHours="0"+tHours;
        }
        if(tMinutes<10){
            tMinutes="0"+tMinutes;
        }
        if(tSeconds<10){
            tSeconds="0"+tSeconds;
        }
        return tYear+tMonth+tDate+tHours+tMinutes+tSeconds;
    }
    function getRandom() {
        var msgVerify = 1;
        while ( msgVerify < 1000  ) msgVerify = Math.floor(Math.random()*10000);
        return msgVerify;
    }
}]);