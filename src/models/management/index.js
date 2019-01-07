const con = require('../../../connection');

/* Get user Data */ 
exports.getTokenFromDB = function(userID){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = "select * from settings where meta_key='APP_TOKEN'";
        db.query(sql, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        });
    });
};

/* Get user Data */ 
exports.updateTokenInDB = function(token, date){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = "update settings set meta_value='"+token+"'";
        sql += ", meta_options='"+date+"'";
        sql += " where meta_key='APP_TOKEN'";
        db.query(sql, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        });
    });
};