/**
 * Created by Benson on 2016/9/22.
 */
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("","/main/home");
    // $urlRouterProvider.otherwise("/main/home");
    $stateProvider
        .state('main', {//这里的index是该状态的名称
            url: '/main',
            cache:false,
            views:{
                "":{
                    templateUrl: 'templats/main.html',
                    controller: 'mainCtrl',
                    controllerAs:"mainCtrl",
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('../js/controllers/mainCtrl.js');
                }]
            }
        })
        .state('main.home', {
            url: '/home',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/home.html',
                    controller: 'homeCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/homeCtrl.js');
                }]
            }
        })
        .state('main.login', {
            url: '/login',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/login.html',
                    controller: 'loginCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/loginCtrl.js');
                }]
            }
        })
        .state('main.findPw', {
            url: '/findPw',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/findPw.html',
                    controller: 'findPwCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/findPwCtrl.js');
                }]
            }
        })
        .state('main.register', {
            url: '/register',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/register.html',
                    controller: 'registerCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            files:[
                                '../js/controllers/registerCtrl.js',
                                '../js/extendlibs/md5.js',
                                '../js/extendlibs/Base64.js'
                            ]
                        }
                    );
                }]
            }
        })
        .state('main.gallery', {
            url: '/gallery',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/gallery.html',
                    controller: 'galleryCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/galleryCtrl.js');
                }]
            }
        }).state('main.gallery.Type', {
            url: '/Type',
            views: {
                'gallerycontent@main.gallery': {
                    templateUrl: 'demoPage/galleryType.html',
                    controller: 'galleryTypeCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/galleryTypeCtrl.js');
                }]
            }
        }).state('main.gallery.TypeOther', {
            url: '/TypeOther',
            views: {
                'gallerycontent@main.gallery': {
                    templateUrl: 'demoPage/galleryTypeOther.html',
                    controller: 'galleryTypeCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/galleryTypeCtrl.js');
                }]
            }
        }).state('main.movies', {
            url: '/movies',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/movies.html',
                    controller: 'moviesCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/moviesCtrl.js');
                }]
            }
        }).state('main.movies.moviesHome', {
            url: '/moviesHome',
            views: {
                'moviescontent@main.movies': {
                    templateUrl: 'demoPage/moviesHome.html',
                    controller: 'moviesHomeCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/moviesHomeCtrl.js');
                }]
            }
        }).state('main.movies.moviesTvPlay', {
            url: '/moviesTvPlay',
            views: {
                'moviescontent@main.movies': {
                    templateUrl: 'demoPage/moviesTvPlay.html',
                    controller: 'moviesTvPlayCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/moviesTvPlayCtrl.js');
                }]
            }
        }).state('main.movies.moviesFilm', {
            url: '/moviesFilm',
            views: {
                'moviescontent@main.movies': {
                    templateUrl: 'demoPage/moviesFilm.html',
                    controller: 'moviesFilmCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/moviesFilmCtrl.js');
                }]
             }
        }).state('main.movies.moviesVariety', {
            url: '/moviesVariety',
            views: {
                'moviescontent@main.movies': {
                    templateUrl: 'demoPage/moviesVariety.html',
                    controller: 'moviesVarietyCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/moviesVarietyCtrl.js');
                }]
            }
        }).state('main.movies.moviesAnimation', {
            url: '/moviesAnimation',
            views: {
                'moviescontent@main.movies': {
                    templateUrl: 'demoPage/moviesAnimation.html',
                    controller: 'moviesAnimationCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/moviesAnimationCtrl.js');
                }]
            }
        }).state('main.movies.moviesMusic', {
            url: '/moviesMusic',
            views: {
                'moviescontent@main.movies': {
                    templateUrl: 'demoPage/moviesMusic.html',
                    controller: 'moviesMusicCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/moviesMusicCtrl.js');
                }]
            }
        }).state('main.movies.moviesDance', {
            url: '/moviesDance',
            views: {
                'moviescontent@main.movies': {
                    templateUrl: 'demoPage/moviesDance.html',
                    controller: 'moviesDanceCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/moviesDanceCtrl.js');
                }]
            }
        }).state('main.aboutWeb', {
            url: '/aboutWeb',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/aboutWeb.html',
                    controller: 'aboutWebCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/aboutWebCtrl.js');
                }]
            }
        }).state('main.suggestionBox', {
            url: '/suggestionBox',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/suggestionBox.html',
                    controller: 'suggestionBoxCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/suggestionBoxCtrl.js');
                }]
            }
        }).state('main.myService', {
            url: '/myService',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/myService.html',
                    controller: 'myServiceCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/myServiceCtrl.js');
                }]
            }
        }).state('main.personal', {
            url: '/personal',
            params:{data:{}},
            views: {
                'content@main': {
                    templateUrl: 'demoPage/personal.html',
                    controller: 'personalCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/personalCtrl.js');
                }]
            }
        }).state('main.editMyselfData', {
            url: '/editMyselfData',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/editMyselfData.html',
                    controller: 'editMyselfDataCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/editMyselfDataCtrl.js');
                }]
            }
        }).state('main.setPw', {
            url: '/setPw',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/setPw.html',
                    controller: 'setPwCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/setPwCtrl.js');
                }]
            }
        }).state('main.album', {
            url: '/album',
            params:{data:{}},
            views: {
                'content@main': {
                    templateUrl: 'demoPage/album.html',
                    controller: 'albumCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/albumCtrl.js');
                }]
            }
        }).state('main.insideAlbum', {
            url: '/insideAlbum',
            cache:false,
            views: {
                'content@main': {
                    templateUrl: 'demoPage/insideAlbum.html',
                    controller: 'insideAlbumCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            files:[
                                '../js/controllers/insideAlbumCtrl.js',
                                '../js/extendlibs/picturefill.min.js',
                                '../js/extendlibs/lightgallery.min.js',
                                '../js/extendlibs/lg-fullscreen.min.js',
                                '../js/extendlibs/lg-thumbnail.min.js',
                                '../js/extendlibs/lg-autoplay.min.js',
                                '../js/extendlibs/lg-zoom.min.js',
                                '../js/extendlibs/lg-hash.min.js',
                                '../js/extendlibs/lg-pager.min.js',
                                '../js/extendlibs/jquery.mousewheel.min.js'
                            ]
                        }
                    );
                }]
            }
        }).state('main.video', {
            url: '/video',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/video.html',
                    controller: 'videoCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/videoCtrl.js');
                }]
            }
        }).state('main.uploadVideo', {
            url: '/uploadVideo',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/uploadVideo.html',
                    controller: 'uploadVideoCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/uploadVideoCtrl.js');
                }]
            }
        }).state('main.uploadAlbum', {
            url: '/uploadAlbum',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/uploadAlbum.html',
                    controller: 'uploadAlbumCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/uploadAlbumCtrl.js');
                }]
            }
        }).state('main.searchImage', {
            url: '/searchImage',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/searchImage.html',
                    controller: 'searchImageCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/searchImageCtrl.js');
                }]
            }
        }).state('main.searchVideo', {
            url: '/searchVideo',
            views: {
                'content@main': {
                    templateUrl: 'demoPage/searchVideo.html',
                    controller: 'searchVideoCtrl',
                    replace:true
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('../js/controllers/searchVideoCtrl.js');
                }]
            }
        }).state('main.videoPlay', {
        url: '/videoPlay',
        views: {
            'content@main': {
                templateUrl: 'demoPage/videoPlay.html',
                controller: 'videoPlayCtrl',
                replace:true
            }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('../js/controllers/videoPlayCtrl.js');
            }]
        }
    });
});