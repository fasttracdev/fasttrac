const con = require('../../../connection');

/* Get user Data */ 
exports.getTokenFromDB = function(userID){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = 'select * from settings where meta_key="APP_TOKEN"';
        db.all(sql, [], function(err, row) {
            if (err) {
                reject(err);
                return;
            }
            
            resolve(row);
        });
        db.close();
    });
};

/* Get user Data */ 
exports.updateTokenInDB = function(token, date){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = 'update settings set meta_value=?, meta_options=? where meta_key="APP_TOKEN"';
        db.all(sql, [
                token,
                date
            ], function(err, row) {
            if (err) {
                reject(err);
                return;
            }
            
            resolve();
        });
        db.close();
    });
};