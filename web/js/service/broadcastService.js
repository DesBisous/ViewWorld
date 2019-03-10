/**
 * Created by Benson on 2017/2/12.
 */
app.factory('broadcastService',['$rootScope',function($rootScope) {
    return {
        emitEventByeExistUser: function() {
            $rootScope.$broadcast('existUserByEmit');
        },
        searchReset: function() {
            $rootScope.$broadcast('searchReset');
        },
        searchVideoReset: function() {
            $rootScope.$broadcast('searchVideoReset');
        }
    }
}]);