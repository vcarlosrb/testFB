angular.module('facebook').controller('LoginCtrl', function ($scope, Validate, User, $state) {

    $scope.Form = {};
    $scope.Valid = {
        email: false,
        regex: false,
        password: false
    };
    $scope.Loader = {
        login: false
    };

    $scope.Events = {
        login: function (form) {
            if ($scope.Validate.login(form) && !$scope.Loader.login) {
                $scope.Loader.login = true;
                $scope.Services.login(form);
            }
        }
    };

    $scope.Services = {
        login: function (form) {
            User.login(form).then(function (response) {
                User.setUserId(response.user.id);
                $state.go('app.private.home');
                $scope.Loader.login = false;
            }, function (err) {
                swal("Error!", err.message, "error");
                $scope.Loader.login = false;
            });
        }
    };

    $scope.Validate = {
        login: function (form) {
            $scope.Valid = {
                email: (form.email == '' || form.email == undefined),
                password: (form.password == '' || form.password == undefined)
            };

            if (!$scope.Valid.email) {
                $scope.Valid.regex = !Validate.Email(form.email);
            }

            return (!$scope.Valid.email && !$scope.Valid.password && !$scope.Valid.regex);
        }
    };

});
