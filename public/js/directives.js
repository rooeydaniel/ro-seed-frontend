'use strict';

/* Directives */
angular.module('roApp.directives', [])
    .directive('login', function ($http, $rootScope, SessionService) {
        return {
            restrict: 'A',
            templateUrl: 'partials/login.tpl.html',
            link: function (scope, elem, attrs) {
                elem.bind('submit', function () {
                    console.log('User: ' + scope.username);
                    console.log('Password: ' + scope.password);

                    var user_data = {
                        "username": scope.username,
                        "password": scope.password
                    };

                    //$http.post(constants.serverAddress + "api-token-auth", user_data)
                    $http.post("http://localhost:8001/api-token-auth/", user_data)
                        .success(function (response) {
                            $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
                            SessionService.saveSession(response.token);
                            $rootScope.$broadcast('event:login-confirmed');
                            elem.slideUp();
                        });

                });
            }
        }
    })
    .directive('loggedIn', ['$rootScope', 'SessionService', function ($rootScope, SessionService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                console.log('Checking if logged in...');
                var prevDisplay = element.css('display');
                var session = SessionService.getSession();
                $rootScope.$watch('session', function () {
                    console.log('session data has changed');
                    if (session == undefined || session == null) {
                        element.css('display', 'none');
                    } else {
                        element.css('display', prevDisplay);
                    }
                })
            }
        }
    }])
    .directive('loggedOut', ['$rootScope', 'SessionService', function ($rootScope, SessionService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var prevDisplay = element.css('display');
                var session = SessionService.getSession();
                $rootScope.$watch('session', function () {
                    if (session != undefined && session != null) {
                        element.css('display', 'none');
                    } else {
                        element.css('display', prevDisplay);
                    }
                })
            }
        }
    }]);