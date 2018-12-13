const con = require('../../../connection');



/* check email */
exports.checkEmail = function (driverEmail) {
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let query = 'select email from users where email=?';
        db.all(query, [
            driverEmail.email
        ], function (err, row) {
            if (err) {
                reject(err);
                return
            }
            resolve(row);
        });
        db.close();
    });
}

/**
 * Check driver Id
 */
exports.checkDriverId = function (driverId) {
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let query = 'select driver_id from users where driver_id=?';
        db.all(query, [
            driverId.driver_id
        ], function (err, row) {
            if (err) {
                reject(err);
                return
            }
            resolve(row);
        });
        db.close();
    });
}

/* Create a new user into db */
exports.insertUserIntoDB = function(data){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = 'insert into users(user_id, first_name, last_name, email, profile_image, user_meta, driver_id, address, city, phone) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        db.run(sql, [
                data.user_id,
                data.user_metadata.first_name,
                data.user_metadata.last_name,
                data.email,
                data.picture,
                JSON.stringify(data),
                data.user_metadata.driver_id,
                data.user_metadata.address,
                data.user_metadata.city,
                data.user_metadata.phone
            ], function(err) {
            if (err) {
                reject(err);
                return
            }
            resolve();
        });
    });
};



/* Update user into db */
exports.updateUserIntoDB = function(data){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = 'update users set first_name=?, last_name=?, user_meta=?, email=?, address=?, city=?, phone=? where user_id=?';
        db.run(sql, [
                data.user_metadata.first_name,
                data.user_metadata.last_name,
                JSON.stringify(data),
                data.user_metadata.email,
                data.user_metadata.address,
                data.user_metadata.city,
                data.user_metadata.phone,
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

/* Check User */
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

/* Get All Drivers*/
exports.getAllDriversFromDB = function(data){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let orderField = ("order_field" in data) ? data.order_field : "id";
        let orderDir = ("order_dir" in data) ? data.order_dir : "desc";
        let sql = "select * from users WHERE 1=1 ";
        if("driver_id" in data) {
            sql += " AND driver_id=" + data.driver_id;
        }
        if ("email" in data) {
            sql += " AND email like '%" + data.email + "%'";
        }
        if ("driver_name" in data) {
            sql += "AND first_name like '%" + data.driver_name + "%'";
        }
        sql += " ORDER BY "+ orderField + " " + orderDir;
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

/* Check Email */
exports.checkEmailInDB = function (data) {
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let sql = "select email from users WHERE 1=1 ";
        if ("email" in data) {
            sql += " AND email=" + "'"+data.email+"'";
        }
        db.all(sql, function (err, row) {
            if (err) {
                reject(err);
                return
            }
            resolve(row);
        });
        db.close();
    });
};