angular.module('facebook', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate']);

angular.module('facebook').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

    $stateProvider.state('app', {
        url: '/',
        abstract: true,
        resolve: {
            Storage: function (User) {
                User.createUsers();
            }
        }
    });

    $stateProvider.state('app.login', {
        url: 'login',
        parent: 'app',
        views: {
            '@': {
                templateUrl: 'partial/Public/login//login.html'
            }
        }
    });

    $stateProvider.state('app.private', {
        url: '',
        parent: 'app',
        abstract: true,
        resolve: {
            UserData: function ($timeout, $state, User) {
                var userId = localStorage.getItem('userId');
                if (userId) {
                    var users = User.getUsers();
                    users.forEach(function (user) {
                        if (userId == user.id) {
                            return user;
                        }
                    });
                } else {
                    return $timeout(function () {
                        $state.go('app.login');
                    });
                }
            }
        },
        views: {
            '@': {
                templateUrl: 'partial/Private/layout//layout.html'
            },
            'header@app.private': {
                templateUrl: 'partial/Private/header//header.html'
            },
            'panel@app.private': {
                templateUrl: 'partial/Private/panel//panel.html'
            }
        }
    });

    $stateProvider.state('app.private.home', {
        url: '',
        parent: 'app.private',
        views: {
            'content@app.private': {
                templateUrl: 'partial/Private/home//home.html'
            },
            'aside@app.private': {
                templateUrl: 'partial/Private/ad//ad.html'
            }
        }
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

angular.module('facebook').run(function ($rootScope) {

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

angular.module('facebook').controller('MainCtrl', function ($scope) {


});
