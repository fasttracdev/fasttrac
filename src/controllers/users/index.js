const { validationResult } = require('express-validator/check');
var generator = require('generate-password');
const paginate = require("paginate-array");
const usersTableDB = require('../../models/users');
const rules  = require('../../services/rules');
const https = require('../../services/https');
const driversTrans = require('../../transformers/AdminDriversTransformers');
const helper = require('../../services/helper.service');
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
            role: req.body.role,
            driver_id: req.body.driver_id ? req.body.driver_id : 0,
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone
        },
        email_verified: true
    };

    https.post('/api/v2/users', data).then(function(response) {
        usersTableDB.insertUserIntoDB(response.data).then((success)=> {
            var params = {
                email: req.body.email,
                connection: process.env.AUTH0_DB_NAME,
                client_id: process.env.AUTH0_CLIENT_ID
            }
            https.post('/dbconnections/change_password', params).then(function (resp) {
                return res.status(200).json({ data: response.data });
            }, function(err) {
                return res.status(422).json({ errors: err });
            })
        }, (err) => {
            return res.status(422).json({ errors: "Records not inserted" });
        });
    }, function(error) {
        if(error.response.data.statusCode === 409) {
            return res.status(422).json({ errors: 'E-mail already in use' });
        }else {
            return res.status(422).json({ errors: error.response.data });
        }
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
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone
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

    if (typeof req.query.page === 'undefined' || req.query.page === '' || req.query.page === ' ') {
        req.query.page = 1;
    }

    if (typeof req.query.limit === 'undefined' || req.query.limit === '' || req.query.limit === ' ' || req.query.limit === 0) {
        req.query.limit = 10;
    }

    usersTableDB.getAllDriversFromDB(req.query).then((success)=> {
        var link = process.env.APP_BASE_URL + '/user/drivers';
        const paginateCollection = paginate(success, req.query.page, req.query.limit);
        return res.status(200).json(driversTrans.transformForPagination(paginateCollection, link));
    }, (err)=> {

        return res.status(422).json({ errors: "Error in SQL query" });
    });
};

/**
 * Export Driver
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.exportDrivers = function (req, res, next) {
    const errors = validationResult(req);
    usersTableDB.getAllDriversFromDB({}).then((success) => {
        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=Report.csv'
        });
        res.end(helper.driverToCSV(success), "binary");
        return res.status(200).json({ data: { massage: "Report Downloaded" } });
    }, (err) => {
        return res.status(422).json({ errors: err });
    })
}