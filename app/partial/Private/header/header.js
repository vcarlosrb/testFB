angular.module('facebook').controller('HeaderCtrl', function ($scope, $timeout, $state) {

    $scope.Events = {
        menu: false,
        init: function () {
            this.closeMenu();
        },
        closeMenu: function () {
            var self = this;
            $('body').on('click', function () {
                if (self.menu) {
                    var target = angular.element('#Menu');
                    target.css('display', 'none');
                    self.menu = false;
                }
            });
        },
        toggleMenu: function () {
            var target = angular.element('#Menu');
            var self = this;
            if (!self.menu) {
                target.css('display', 'block');
                $timeout(function () {
                    self.menu = true;
                }, 100);
            }
        }
    };
    $scope.Events.init();

    $scope.Services = {
        logout: function () {
            localStorage.removeItem('userId');
            $state.go('app.login');
        }
    };

});
