const { validationResult } = require('express-validator/check');
const paginate = require("paginate-array");
const fasttracTablesDB = require('../../models/fasttrac');
const https = require('../../services/https');
const driversTrans = require('../../transformers/FasttracDriverTransformers');
const manageToken = require('../../services/manage-token');

exports.getDrivers = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var searchQuery;
    if(typeof req.query.search !== 'undefined' && req.query.search !== '' && req.query.search !== ' ') {
        if(isNaN(parseFloat(req.query.search))) {
            searchQuery = req.query.search.toString();
        }else {
            searchQuery = Number(req.query.search);
        }
    }

    if(typeof req.query.page === 'undefined' || req.query.page === '' || req.query.page === ' ') {
        req.query.page = 1;
    }

    if(typeof req.query.limit === 'undefined' || req.query.limit === '' || req.query.limit === ' ' || req.query.limit === 0) {
        req.query.limit = 10;
    }

    fasttracTablesDB.getDriversFromDB(searchQuery, typeof searchQuery).then((success)=> {
        var link = process.env.APP_BASE_URL + '/fasttrac/drivers';
        const paginateCollection = paginate(success, req.query.page, req.query.limit);
        return res.status(200).json(driversTrans.transformForPagination(paginateCollection, link));
    }, (err)=> {
         return res.status(422).json({ errors: "Records not updated" });
    });
};

exports.syncDrivers = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    https.getForExternalRequest(process.env.API_FASTTRAC_DRIVER_SYNC).then((success) => {
        if (success.data.length > 0) {
            fasttracTablesDB.insertDriverintoDB(success.data).then((success) => {
                return res.status(200).json({ data: { massage: "Sync Completed" }});
            }, (err) => {
                return res.status(422).json({ errors: err });
            })
        }else {
            return res.status(200).json({ data: { massage: "Sync Completed" }});
        }
    }, (err) => {
        return res.status(422).json({ errors: err });
    })
};

exports.syncDriverReport = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    https.getForExternalRequest(process.env.API_FASTTRAC_DRIVER_REPORT_SYNC).then((success) => {
        if (success.data.length > 0) {
            fasttracTablesDB.insertDriverReportintoDB(success.data).then((success) => {
                return res.status(200).json({ data: { massage: "Report Sync Completed" } });
            }, (err) => {
                return res.status(422).json({ errors: err });
            })
        } else {
            return res.status(200).json({ data: { massage: "Report Sync Completed" } });
        }
    }, (err) => {
        return res.status(422).json({ errors: err });
    })
};

exports.getAllDriversReport = function (req, res, next) {
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

    fasttracTablesDB.getAllDriversReportFromDB().then((success) => {
        var link = process.env.APP_BASE_URL + '/user/drivers-report';
        const paginateCollection = paginate(success, req.query.page, req.query.limit);
        return res.status(200).json(driversTrans.transformForPagination(paginateCollection, link));
    }, (err) => {
        return res.status(422).json({ errors: "Records not updated" });
    });
};

exports.getDriverReport = function (req, res, next) {
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
    var token = req.headers['authorization'];
    var splitTokenRes = token.split(" ");
    manageToken.validateToken(splitTokenRes[1]).then(function (success) {       
        fasttracTablesDB.getDriverReportFromDB(success.sub).then((success) => {
            var link = process.env.APP_BASE_URL + '/user/drivers-report';
            const paginateCollection = paginate(success, req.query.page, req.query.limit);
            return res.status(200).json(driversTrans.transformForPagination(paginateCollection, link));
        }, (err) => {
            return res.status(422).json({ errors: "Records not updated" });
        });
    }, function (err) {
        return res.status(422).json({ errors: "Records not updated" });
    });

};
