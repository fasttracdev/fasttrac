const { validationResult } = require('express-validator/check');
var generator = require('generate-password');
const paginate = require("paginate-array");
const usersTableDB = require('../../models/users');
const rules  = require('../../services/rules');
const https = require('../../services/https');
const driversTrans = require('../../transformers/AdminDriversTransformers');

exports.createUser = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var data = {
        connection: process.env.AUTH0_DB_NAME,
        email: req.body.email,
        password: generator.generate(rules.passwordGeneratorRule),
        user_metadata: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role: req.body.role
        },
        email_verified: true
    };
    https.post('/api/v2/users', data).then(function(response) {
        usersTableDB.insertUserIntoDB(response.data).then((success)=> {
            return res.status(200).json({ data: response.data });
        }, (err) => {
            return res.status(422).json({ errors: "Records not inserted" });
        });
    }, function(error) {
        console.log(error);
        return res.status(422).json({ errors: error.response.data });
    })
};

exports.updateUser = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var data = {
        user_metadata: {
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }
    };

    https.patch('/api/v2/users/' + req.params.id, data)
    .then(function (response) {
        usersTableDB.updateUserIntoDB(response.data).then((success)=> {
            return res.status(200).json({ data: response.data });
        }, (err) => {
            return res.status(422).json({ errors: "Records not updated" });
        });
    }, function(error) {
        console.log(error);
        return res.status(422).json({ errors: error.response.data });
    });
};

exports.deleteUser = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    usersTableDB.isUserExistIntoDB(req.params.id).then((success) => {
        if(success && Number(success.length) > 0) {
            https.delete('/api/v2/users/' + req.params.id)
            .then(function (response) {
                usersTableDB.deleteUserFromDB(req.params.id).then((success)=> {
                    return res.status(200).json({ data: response.data });
                }, (err) => {
                    return res.status(422).json({ errors: "Records not updated" });
                });
            })
            .catch(function (error) {
                console.log(error);
                return res.status(422).json({ errors: error.response.data });
            });
        }else {
            return res.status(422).json({ errors: { message: "User not found" } });
        }
    }, (err) => {

    });
};

exports.getUserProfile = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    usersTableDB.isUserExistIntoDB(req.params.id).then((success)=> {
        return res.status(200).json({ data: JSON.parse(success[0].user_meta) });
    }, (err) => {
        return res.status(422).json({ errors: "Records not updated" });
    })
};

exports.getAllDrivers = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    usersTableDB.getAllDriversFromDB().then((success)=> {
        var link = process.env.APP_BASE_URL + '/user/drivers';
        const paginateCollection = paginate(success);
        return res.status(200).json(driversTrans.transformForPagination(paginateCollection, link));
    }, (err)=> {
         return res.status(422).json({ errors: "Records not updated" });
    });
};