const con = require('../../../connection');

/* Create a new user into db */ 
exports.insertUserIntoDB = function(data){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = 'insert into users(user_id, first_name, last_name, email, profile_image, user_meta) VALUES(?, ?, ?, ?, ?, ?)';
        db.run(sql, [
                data.user_id,
                data.user_metadata.first_name, 
                data.user_metadata.last_name,
                data.email,
                data.picture,
                JSON.stringify(data)
            ], function(err) {
            if (err) {
                reject(err);
                return
            }

            resolve();
        });
        db.close();
    });
};

/* Update user into db */
exports.updateUserIntoDB = function(data){
    console.log(data);
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = 'update users set first_name=?, last_name=?, user_meta=? where user_id=?';
        db.run(sql, [
                data.user_metadata.first_name, 
                data.user_metadata.last_name,
                JSON.stringify(data),
                data.user_id
            ], function(err) {
            if (err) {
                reject(err);
                return
            }

            resolve();
        });
        db.close();
    });
};

/* Delete user into db */
exports.deleteUserFromDB = function(userID){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = 'delete from users where user_id=?';
        db.run(sql, [
                userID
            ], function(err) {
            if (err) {
                reject(err);
                return
            }

            resolve();
        });
        db.close();
    });
};

/* Delete user into db */
exports.isUserExistIntoDB = function(userID){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = 'select * from users where user_id=?';
        db.all(sql, [
                userID
            ], function(err, row) {
            if (err) {
                reject(err);
                return
            }
            
            resolve(row);
        });
        db.close();
    });
};

/* Delete user into db */
exports.getAllDriversFromDB = function(){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = 'select * from users';
        db.all(sql, function(err, row) {
            if (err) {
                reject(err);
                return
            }
            
            resolve(row);
        });
        db.close();
    });
};