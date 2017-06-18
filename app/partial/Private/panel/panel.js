angular.module('facebook').controller('PanelCtrl', function ($scope, User) {

    $scope.User = {};
    $scope.Services = {
        constructor: function () {
            this.getUser();
        },
        getUser: function () {
            User.getUserData().then(function (response) {
                $scope.User = response;
            });
        }
    };
    $scope.Services.constructor();

});
