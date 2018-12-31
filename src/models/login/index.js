const con = require('../../../connection');

/* Get user Data */ 
exports.getUserFromDB = function(userID){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        var query = 'SELECT * from users where 1=1';
        query += " AND user_id='" + userID +"'";
        db.query(query, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        });
    });
};