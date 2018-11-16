const con = require('../../../connection');

/* Get user Data */ 
exports.getUserFromDB = function(userID){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = 'select * from users where user_id=?';
        db.all(sql, [
                userID
            ], function(err, row) {
            if (err) {
                reject(err);
                return;
            }
            
            resolve(row);
        });
        db.close();
    });
};