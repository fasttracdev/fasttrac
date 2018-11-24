const { validationResult } = require('express-validator/check');
const paginate = require("paginate-array");
const fasttracTablesDB = require('../../models/fasttrac');
const https = require('../../services/https');

exports.getDrivers = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var searchQuery = 7;
    fasttracTablesDB.getDriversFromDB(searchQuery).then((success)=> {
        console.log(success);
        // var link = process.env.APP_BASE_URL + '/user/drivers';
        // const paginateCollection = paginate(success);
        // return res.status(200).json(driversTrans.transformForPagination(paginateCollection, link));
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