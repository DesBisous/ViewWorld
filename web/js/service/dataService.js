/**
 * Created by 34279 on 2016/11/2.
 */
app.factory('dataService',['httpUtil',function(httpUtil) {
    return {
        register:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/user_userAction_register.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        login:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/user_userAction_login.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        findPasswordByAccount:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/user_userAction_findPasswordByAccount.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        existUserBySession:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/user_userAction_existUserBySession.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        exitUserBySession:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl = 'ViewWorld/user_userAction_exitUserBySession.action';
            option.data = param.data;
            option.callback = function (data) {
                return callback(data);
            };
            option.callbackError = function (data) {
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        modifyPassword:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/user_userAction_modifyPassword.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        modifyUserInfo:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/user_userAction_modifyUserInfo.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getUserByIdAction:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/user_userAction_getUserByIdAction.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        saveWebsiteSugAction:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/websiteSug_websiteSugAction_saveWebsiteSugAction.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        saveSuggestionBoxAction:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/suggestionBox_suggestionBoxAction_saveSuggestionBoxAction.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        findSugBoxByUserIdAndTypeAction:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/suggestionBox_suggestionBoxAction_findSugBoxByUserIdAndTypeAction.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getUserConcernByUserId:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/userConcern_userConcernAction_getUserConcernByUserId.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        saveAlbumAction:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/album_albumAction_saveAlbumAction.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        findAlbumByGoodLevel:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/album_albumAction_findAlbumByGoodLevel.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getAlbumAllByIdDesc:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/album_albumAction_getAlbumAllByIdDesc.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getAlbumPageByUserId:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/album_albumAction_getAlbumPageByUserId.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getAlbumPageByTitle:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/album_albumAction_getAlbumPageByTitle.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getAlbumInfoByAlbumId:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/album_albumAction_getAlbumInfoByAlbumId.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getAlbumPageByType:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/album_albumAction_getAlbumPageByType.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        setGood:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/album_albumAction_setGood.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        addUserConcern:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/userConcern_userConcernAction_addUserConcern.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        saveVideoAction:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_saveVideoAction.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getVideoAllByIdDesc:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_getVideoAllByIdDesc.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getVideoPageByUserId:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_getVideoPageByUserId.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getVideoPageByTitle:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_getVideoPageByTitle.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getHotList:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_getHotList.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getBarrageList:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_getBarrageList.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getVideoPageBySql:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_getVideoPageBySql.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError = function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getVideoByVideoId:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_getVideoByVideoId.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        updateBarrage:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/barrage_barrageAction_updateBarrage.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getCommentVideoPageByVideoId:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_getCommentVideoPageByVideoId.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        saveCommentVideo:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_saveCommentVideo.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        saveVideoScore:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_saveVideoScore.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
        getCommentVideo:function (callback,callbackError,param) {
            var option = {};
            option.serviceUrl ='ViewWorld/video_videoAction_getCommentVideo.action';
            option.data = param.data;
            option.callback =function(data){
                return callback(data);
            };
            option.callbackError =function(data){
                return callbackError(data);
            };
            httpUtil.http_Post(option);
        },
    }
}]);