angular.module('facebook').controller('HomeCtrl', function ($scope, Post, User) {

    $scope.Posts = [];
    $scope.User = {};
    $scope.Images = [];
    $scope.Filter = {
        type: ''
    };
    $scope.Form = {
        type: 'friends',
    };
    $scope.Valid = {
        statement: false
    };
    $scope.Loader = {
        post: false
    };

    $scope.Modal = {
        constructor: function () {
            this.closeWindow();
        },
        closeWindow: function () {
            var self = this;
            $('.Image__shadow').on('click', function () {
                self.close();
            });
            $('.Image__content').on('click', function (e) {
                e.stopPropagation();
            });
        },
        show: function (img) {
            $('#Image__modal').attr('src', img);
            $('#Image__modal').css({
                "max-width": $(window).width() - 90,
                "max-height": $(window).height() - 90
            });
            $('.Modal__image').fadeIn(100);
        },
        close: function () {
            $('.Modal__image').fadeOut(100);
        }
    };
    $scope.Modal.constructor();

    $scope.Image = {
        previewImage: function (input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $scope.$apply(function () {
                        $scope.Images[0] = e.target.result;
                    });
                };
                reader.readAsDataURL(input.files[0]);
            }
        },
        changeInput: function () {
            this.previewImage($("#Input__file")[0]);
        },
        cancelImage: function (index, List) {
            List.splice(index, 1);
        }
    };

    $scope.Events = {
        createPost: function (form) {
            if ($scope.Validate.createPost(form) && !$scope.Loader.post) {
                $scope.Loader.post = true;
                $scope.Services.createPost(form);
            }
        },
        editPost: function (post) {
            post.edit = true;
            post.editStatement = angular.copy(post.statement);
        },
        cancelEdit: function (post) {
            post.edit = false;
        },
        savePost: function (post) {
            if ($scope.Validate.savePost(post)) {
                $scope.Services.savePost(post);
            }
        },
        removePost: function (post, index, List) {
            swal({
                    title: "¿Eliminar publicacion?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Eliminar",
                    closeOnConfirm: false
                },
                function () {
                    $scope.Services.removePost(post, index, List);
                });
        }
    };

    $scope.Services = {
        constructor: function () {
            this.getPost();
            this.getUserData();
        },
        getUserData: function () {
            User.getUserData().then(function (response) {
                $scope.User = response;
            });
        },
        getPost: function () {
            Post.getPostByUser(User.getUserId()).then(function (response) {
                response.forEach(function (post) {
                    post.edit = false;
                    post.valid = {
                        statement: false
                    };
                    post.created = moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a");
                });
                response = response.reverse();
                $scope.Posts = response;
            });
        },
        createPost: function (form) {
            var post = {
                statement: form.statement,
                userId: User.getUserId(),
                createdAt: new Date(),
                type: form.type
            };
            if ($scope.Images.length > 0) {
                post.image = $scope.Images[0];
            }
            Post.create(post).then(function (response) {
                response.user = $scope.User;
                response.created = moment(response.createdAt).format("MMMM Do YYYY, h:mm:ss a");
                $scope.Posts.unshift(response);
                $scope.Loader.post = false;
                $scope.Form.statement = '';
                $scope.Valid.statement = false;
                $scope.Images = [];
            });
        },
        savePost: function (post) {
            Post.save(post.id, post.editStatement).then(function (response) {
                post.edit = false;
                post.statement = angular.copy(post.editStatement);
                swal("¡Publicacion actualizada!", "", "success");
            });
        },
        removePost: function (post, index, List) {
            Post.remove(post.id).then(function (response) {
                List.splice(index, 1);
                swal("¡Publicacion eliminada!", "", "success");
            });
        }
    };
    $scope.Services.constructor();

    $scope.Validate = {
        createPost: function (form) {
            $scope.Valid = {
                statement: (form.statement == '' || form.statement == undefined)
            };

            return (!$scope.Valid.statement);
        },
        savePost: function (post) {
            post.valid = {
                statement: (post.editStatement == '' || post.editStatement == undefined)
            };

            return (!post.valid.statement);
        }
    };

});
