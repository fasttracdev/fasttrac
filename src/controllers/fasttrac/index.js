const { validationResult } = require('express-validator/check');
const paginate = require("paginate-array");
const fasttracTablesDB = require('../../models/fasttrac');
const https = require('../../services/https');
const driversTrans = require('../../transformers/FasttracDriverTransformers');
const manageToken = require('../../services/manage-token');
const datas = { name: 'test1', score: 1, level: 'Z' }
var Iconv = require("iconv").Iconv;
var iconv = new Iconv('utf8', 'utf16le');

const columns = { name: '姓名', score: '分数' };
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


exports.ExportDriversReport = function (req, res, next) {
    const errors = validationResult(req);
    fasttracTablesDB.dowloadFromDB().then((success) => {       
        var header = "#" + "\t" + "Driver Id" + "\t" + "Driver Name" + "\t" + "Week" + "\t" + "Del Date" + "\t" + "Delling Terminal" + "\t" + "Dntrl" + "\t" + "Fsu" + "\t" + "Acct" + "\t" + "Customer" + "\t" + "Ref" + "\t" + "Inv Date" + "\t" + "Inv" + "\t" + "Hauling Terminal" + "\t" + "Chg Code" + "\t" + "Driver Terminal" + "\t" + "Amount Billed" + "\t" + "Dr" + "\t" + "Cust Type" + "\t" + "Line Haul" + "\t" + "Line Haul Pay" + "\t" + "Imputted Fuel" + "\t" + "Imputted Insurance" + "\t" + "Total Pay" + "\t" + "Selling Terminal Pay" + "\t" + "Shipper" + "\t" + "Pu City" + "\t" + "Pu State" + "\t" + "Consignee" + "\t" + "De City" + "\t" + "De State" + "\n"; 
            var content = header;        
            for (var i = 0, total = success.length; i < total; i++) {
                content += (i + 1) + "\t" + success[i].driver_id + "\t" + success[i].drivername + "\t" + success[i].week + "\t" + success[i].del_date + "\t" + success[i].selling_terminal + "\t" + success[i].cntrl + "\t" + success[i].fsu + "\t" + success[i].acct + "\t" + success[i].customer + "\t" + success[i].ref + "\t" + success[i].inv_date + "\t" + success[i].inv + "\t" + success[i].hauling_terminal + "\t" + success[i].chg_code + "\t" + success[i].driverterminal + "\t" + success[i].amount_billed + "\t" + success[i].dr + "\t" + success[i].cust_type + "\t" + success[i].line_haul + "\t" + success[i].line_haul_pay + "\t" + success[i].imputted_fuel + "\t" + success[i].imputted_insurance + "\t" + success[i].total_pay + "\t" + success[i].selling_terminal_pay + "\t" + success[i].shipper + "\t" + success[i].pu_city + "\t" + success[i].pu_state + "\t" + success[i].consignee + "\t" + success[i].de_city + "\t" + success[i].de_state + "\n"  
            }    
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Content-Disposition", 'attachment; filename=report.csv');
            res.write(new Buffer([0xff, 0xfe]));
            res.write(iconv.convert(content));
            res.end();
        return res.status(200).json({ data: { massage: "Report Downloaded"} });
    }, (err) => {
        return res.status(422).json({ errors: err });
    })
}
