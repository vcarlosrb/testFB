angular.module('facebook').factory('Post', function ($q, Generator, User) {

    var Posts = [];
    return {
        updatePosts: function (posts) {
            localStorage.setItem('Posts', JSON.stringify(posts));
        },
        list: function () {
            return JSON.parse(localStorage.getItem('Posts'));
        },
        create: function (post) {
            var deferred = $q.defer();
            var posts = this.list() || [];
            post.id = Generator.uniqueId();
            posts.push(post);
            this.updatePosts(posts);
            deferred.resolve(post);

            return deferred.promise;
        },
        getPostByUser: function (userId) {
            var deferred = $q.defer();
            var posts = this.list() || [];
            var response = [];
            var users = User.getUsers();
            posts.forEach(function (post) {
                if (post.userId == userId) {
                    var obj = post;
                    users.forEach(function (user) {
                        if (user.id == userId) {
                            obj.user = user;
                        }
                    });
                    response.push(post)
                }
            });

            deferred.resolve(response);

            return deferred.promise;
        },
        remove: function (postId) {
            var deferred = $q.defer();
            var posts = this.list() || [];
            posts.forEach(function (post, i, a) {
                if (post.id == postId) {
                    a.splice(i, 1);
                }
            });
            this.updatePosts(posts);
            deferred.resolve({status: 200});

            return deferred.promise;
        },
        save: function (postId, statement) {
            var deferred = $q.defer();
            var posts = this.list() || [];
            posts.forEach(function (post) {
                if (post.id == postId) {
                    post.statement = statement;
                }
            });
            this.updatePosts(posts);
            deferred.resolve({status: 200});

            return deferred.promise;
        }
    };
});
