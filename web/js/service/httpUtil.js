/**
 * Created by Administrator on 2016/3/9 0009.
 */
app.factory('httpUtil',function($http){
    return{
        http_Get:function(options){
            $http({
                url:options.url,
                method:"get",
                data:options.data,
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                timeout:30000
            }).success(function(data){
                options.callback(data);
            }).error(function(data){
                if(options.callbackError){
                    options.callbackError(data);
                }
            })
        },
        http_Post:function(options){
            $http({
                url:options.serviceUrl,
                method:"post",
                data:options.data,
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                timeout:30000
            }).success(function(data){
                options.callback(data);
            }).error(function(data){
                if(options.callbackError){
                    options.callbackError(data);
                }
            })
        }
    }
});