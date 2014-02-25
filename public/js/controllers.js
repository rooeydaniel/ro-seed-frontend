'use strict';

/* Controllers */

angular.module('roApp.controllers', [])
    .controller('BaseController', ['$scope', '$window', 'brand', 'SessionService', function($scope, $window, brand, SessionService) {
        $scope.brand = brand;

        $scope.doLogout = function() {
            SessionService.removeSession();
            $window.location = '/';
        };
    }])
    .controller('HomeController', ['$scope', 'SessionService', function($scope, SessionService) {
        $scope.session = SessionService.getSession();

        $scope.user = {};

        $scope.$on('event:login-confirmed', function() {
            console.log('event has been broadcast to Home Controller');
            $scope.session = SessionService.getSession();
        });
    }])
    .controller('UserCreateController', ['$scope', '$window', 'Restangular', 'SessionService', function($scope, $window, Restangular, SessionService) {
        $scope.createUser = function(user) {
            console.log(JSON.stringify(user));

            Restangular.all('users/new').customPOST(user).then(function (data) {
                user.id = data.id;
                user.date_joined = data.date_joined;
                user.last_login = data.last_login;
                user.stats = 'Active';
                user.username = data.username;
                console.log('Token: ' + JSON.stringify(data));

                SessionService.saveSession(data.auth_token);

                console.log('User Created!');

                $window.location = '/';
            }, function (data) {
//                if (data.data.errors.hasOwnProperty('email')) {
//                    console.log(data.data.errors.email[0]);
//                }
                console.log(JSON.stringify(data));
            });
        }
    }]);