/**
 * Created by Benson on 2016/9/28.
 */
app.controller('galleryCtrl', ['$scope','$state','musicService','Util', function($scope,$state,musicService,Util) {
    $scope.typeIndex = 1;
    $scope.fixedTime = Util.getNowDate();
    $scope.setTypeIndex = function ( index ) {
        $scope.typeIndex = index;
    };
    $scope.goGalleryTypeOther = function (  ) {
        $scope.typeIndex = -1;
        $state.go('main.gallery.TypeOther');
    };
}]);