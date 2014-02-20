'use strict';

var roApp = angular.module('roApp', [
        'ngRoute',
        'restangular',
        'roApp.services',
        'roApp.controllers',
        'roApp.constants',
        'roApp.filters',
        'roApp.directives'
    ])
    .config(['$routeProvider', 'RestangularProvider', function($routeProvider, RestangularProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'partials/home.tpl.html',
                controller: 'HomeController',
                title: 'Home Page'
            })
            .otherwise({
                redirectTo: '/home'
            });

            RestangularProvider.setBaseUrl('http://localhost:8001');
    }])
    .run(['$location', '$rootScope', 'baseTitle', '$http', 'Restangular', function ($location, $rootScope, baseTitle, $http, RestangularProvider) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            // Check to see if the 'title' attribute exists on the route
            if (current.hasOwnProperty('$route')) {
                $rootScope.title = baseTitle + current.$route.title;
            } else {
                $rootScope.title = baseTitle.substring(0, baseTitle.length - 3);
            }

        /* The following is for $http and Restangular token auth */
        if (SessionService.isLoggedIn()) {
            var token = SessionService.getSession();
            $http.defaults.headers.common['Authorization'] = 'Token ' + token;
        }


        // add Auth Token to every Restangular request
        RestangularProvider.setFullRequestInterceptor(function(element, operation, route, url, headers, params) {
            if (SessionService.isLoggedIn()) {
                var token = SessionService.getSession();
                headers['Authorization'] = 'Token ' + token;
            }

            return { element: element, params: params, headers: headers }
            });
        });


    }]);