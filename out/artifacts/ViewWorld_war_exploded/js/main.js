/**
 * Created by Benson on 2016/9/22.
 */
var app = angular.module('Angular', ['ui.router','infinite-scroll','oc.lazyLoad','angularFileUpload']).config(["$provide","$compileProvider","$controllerProvider","$filterProvider",
    function($provide,$compileProvider,$controllerProvider,$filterProvider){//懒加载需要的
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.register;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service  =$provide.service;
        app.constant = $provide.constant;
    }]);