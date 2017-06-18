angular.module('facebook').factory('User', function ($q) {

    var Users = [
        {
            "id": "5904e06beb0be6209369edee",
            "firstName": "Robles",
            "lastName": "Leach Mccormick",
            "age": 27,
            "gender": "male",
            "email": "roblesmccormick@insurety.com",
            "password": "Robles123"
        },
        {
            "id": "5904e06b1a37e719bf09ea5e",
            "firstName": "Hatfield",
            "lastName": "Mcfadden Parker",
            "age": 30,
            "gender": "male",
            "email": "hatfieldparker@insurety.com",
            "password": "Hatfield123"
        },
        {
            "id": "5904e06b3058dc7c17013243",
            "firstName": "Dona",
            "lastName": "Dixon Howell",
            "age": 31,
            "gender": "female",
            "email": "donahowell@insurety.com",
            "password": "Dona123"
        },
        {
            "id": "5904e06bed37e96fc6ab138c",
            "firstName": "Dejesus",
            "lastName": "Bonner Schroeder",
            "age": 37,
            "gender": "male",
            "email": "dejesusschroeder@insurety.com",
            "password": "Dejesus123"
        },
        {
            "id": "5904e06b01a6a55717366dfe",
            "firstName": "Moreno",
            "lastName": "Nolan Hutchinson",
            "age": 38,
            "gender": "male",
            "email": "morenohutchinson@insurety.com",
            "password": "Moreno123"
        },
        {
            "id": "5904e06be7c48bdcadd6aa7b",
            "firstName": "Holly",
            "lastName": "Parsons Patrick",
            "age": 33,
            "gender": "female",
            "email": "hollypatrick@insurety.com",
            "password": "Holly123"
        },
        {
            "id": "5904e06ba7439177a15554db",
            "firstName": "Kaitlin",
            "lastName": "Berry Christensen",
            "age": 39,
            "gender": "female",
            "email": "kaitlinchristensen@insurety.com",
            "password": "Kaitlin123"
        },
        {
            "id": "5904e06b5f1fd131d789e1e3",
            "firstName": "Ochoa",
            "lastName": "Johnston Bailey",
            "age": 20,
            "gender": "male",
            "email": "ochoabailey@insurety.com",
            "password": "Ochoa123"
        },
        {
            "id": "5904e06bfd1817a8618ba150",
            "firstName": "Kendra",
            "lastName": "Mercado Weaver",
            "age": 30,
            "gender": "female",
            "email": "kendraweaver@insurety.com",
            "password": "Kendra123"
        },
        {
            "id": "5904e06b6dfc263628eefef4",
            "firstName": "Melissa",
            "lastName": "Cooke Middleton",
            "age": 20,
            "gender": "female",
            "email": "melissamiddleton@insurety.com",
            "password": "Melissa123"
        },
        {
            "id": "5904e06bebe910929c9ba90b",
            "firstName": "Sears",
            "lastName": "Hull Howard",
            "age": 27,
            "gender": "male",
            "email": "searshoward@insurety.com",
            "password": "Sears123"
        },
        {
            "id": "5904e06b085f2244e985a6a0",
            "firstName": "Owen",
            "lastName": "Sweeney Sanford",
            "age": 21,
            "gender": "male",
            "email": "owensanford@insurety.com",
            "password": "Owen123"
        },
        {
            "id": "5904e06bb2a2e096cc8b4fb2",
            "firstName": "Sadie",
            "lastName": "Ball Herrera",
            "age": 37,
            "gender": "female",
            "email": "sadieherrera@insurety.com",
            "password": "Sadie123"
        },
        {
            "id": "5904e06bc0615c04e04355fc",
            "firstName": "Rita",
            "lastName": "Mcleod Whitehead",
            "age": 36,
            "gender": "female",
            "email": "ritawhitehead@insurety.com",
            "password": "Rita123"
        },
        {
            "id": "5904e06bdebdf6fe35f69568",
            "firstName": "Loretta",
            "lastName": "Ray Rowland",
            "age": 21,
            "gender": "female",
            "email": "lorettarowland@insurety.com",
            "password": "Loretta123"
        },
        {
            "id": "5904e06bc6adb13098ea0445",
            "firstName": "Mitchell",
            "lastName": "Miranda Malone",
            "age": 35,
            "gender": "male",
            "email": "mitchellmalone@insurety.com",
            "password": "Mitchell123"
        },
        {
            "id": "5904e06bfd9187f4222494b5",
            "firstName": "Emerson",
            "lastName": "Daniel Mann",
            "age": 25,
            "gender": "male",
            "email": "emersonmann@insurety.com",
            "password": "Emerson123"
        },
        {
            "id": "5904e06b08a7c048b983bf03",
            "firstName": "Crane",
            "lastName": "Bean Hodge",
            "age": 36,
            "gender": "male",
            "email": "cranehodge@insurety.com",
            "password": "Crane123"
        },
        {
            "id": "5904e06bcdfceca3cf4d33e7",
            "firstName": "Carson",
            "lastName": "Andrews Benjamin",
            "age": 22,
            "gender": "male",
            "email": "carsonbenjamin@insurety.com",
            "password": "Carson123"
        },
        {
            "id": "5904e06b7c9f5b938cb175c9",
            "firstName": "Sallie",
            "lastName": "Bruce Marsh",
            "age": 23,
            "gender": "female",
            "email": "salliemarsh@insurety.com",
            "password": "Sallie123"
        }
    ];
    return {
        createUsers: function () {
            localStorage.setItem('Users', JSON.stringify(Users));
        },
        getUsers: function () {
            return JSON.parse(localStorage.getItem('Users'));
        },
        setUserId: function (id) {
            localStorage.setItem('userId', id);
        },
        getUserId: function () {
            return localStorage.getItem('userId');
        },
        getUserData: function () {
            var deferred = $q.defer();
            var userId = localStorage.getItem('userId');
            Users.forEach(function (user) {
                if (user.id == userId) {
                    deferred.resolve(user);
                }
            });

            return deferred.promise;
        },
        login: function (form) {
            var deferred = $q.defer();
            var flag = false;
            var sendUser = {};
            var response = {};
            Users.forEach(function (user) {
                if (user.email == form.email) {
                    if (user.password == form.password) {
                        flag = true;
                        sendUser = user;
                    }
                }
            });
            if (flag) {
                response = {
                    status: 200,
                    user: sendUser
                };
                deferred.resolve(response);
            } else {
                response = {
                    status: 401,
                    message: 'EL usuario no se encuentra registrado.'
                };
                deferred.reject(response);
            }
            return deferred.promise;
        }
    }

});
