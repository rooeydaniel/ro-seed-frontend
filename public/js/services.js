'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('roApp.services', ['angularLocalStorage'])
    .factory('SessionService', function ($http, storage) {
        return {
            saveSession: function (data) {
                storage.set('token', data);
            },
            getSession: function () {
                return storage.get('token');
            },
            removeSession: function () {
                storage.clearAll();
            },
            isLoggedIn: function () {
                return storage.get('token') != null;
            }
        };
    });