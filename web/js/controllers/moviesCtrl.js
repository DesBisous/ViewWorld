/**
 * Created by Benson on 2016/10/22.
 */
app.controller('moviesCtrl', ['$scope','$state','musicService','Util', function($scope,$state,musicService,Util) {
    $scope.fixedTime = Util.getNowDate();
    $scope.goMovies = function ( moviesName ) {
        switch (moviesName){
            case "home":$state.go("main.movies.moviesHome"); window.sessionStorage.setItem("moviesLocation","0");
                break;
            case "tvPlay":$state.go("main.movies.moviesTvPlay"); window.sessionStorage.setItem("moviesLocation","1");
                break;
            case "film":$state.go("main.movies.moviesFilm"); window.sessionStorage.setItem("moviesLocation","2");
                break;
            case "variety":$state.go("main.movies.moviesVariety"); window.sessionStorage.setItem("moviesLocation","3");
                break;
            case "Animation":$state.go("main.movies.moviesAnimation"); window.sessionStorage.setItem("moviesLocation","4");
                break;
            case "Music":$state.go("main.movies.moviesMusic"); window.sessionStorage.setItem("moviesLocation","5");
                break;
            case "Dance":$state.go("main.movies.moviesDance"); window.sessionStorage.setItem("moviesLocation","6");
                break;
        default: $state.go("main.movies.moviesHome"); window.sessionStorage.setItem("moviesLocation","0");
        }
    }
}]);