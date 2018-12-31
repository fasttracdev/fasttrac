const con = require('../../../connection');



/* check email */
exports.checkEmail = function (driverEmail) {
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let query = "select email from users WHERE 1=1 ";
        query += " AND email='" + driverEmail.email + "'";
        db.query(query, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        });
    });
}

/**
 * Check driver Id
 */
exports.checkDriverId = function (driverId) {
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let query = "select driver_id from users WHERE 1=1 ";
        query += " AND driver_id='" + driverId.driver_id + "'";
        db.query(query, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        });
    });
}

/* Create a new user into db */
exports.insertUserIntoDB = function(data){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let query = "insert into users(user_id, first_name, last_name, email, profile_image, user_meta, driver_id, address, city, phone) VALUES('" + data.user_id + "', '" + data.user_metadata.first_name + "','" + data.user_metadata.last_name + "','" + data.email + "','" + data.picture + "','" + JSON.stringify(data) + "', '" + data.user_metadata.driver_id + "', '" + data.user_metadata.address + "', '" + data.user_metadata.city + "', '" + data.user_metadata.phone+"')";
        db.query(query, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });       
    });
};



/* Update user into db */
exports.updateUserIntoDB = function(data){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let query = "update users set first_name='" +data.user_metadata.first_name+ "'";
        query += ",last_name='" +data.user_metadata.last_name+"'";
        query += ",user_meta='" +JSON.stringify(data)+"'";
        query += ",email='" +data.user_metadata.email+"'";
        query += ",address='" +data.user_metadata.address+"'";
        query += ",city='" + data.user_metadata.city+"'";
        query += ",phone='" + data.user_metadata.phone+"'";
        query += "where user_id='" +data.user_id+"'";
        db.query(query, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        });
    });
};

/* Delete user into db */
exports.deleteUserFromDB = function(userID){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        var query = "delete from users where user_id='" + userID + "'";
        db.query(query, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        });
    });
};

/* Check User */
exports.isUserExistIntoDB = function(userID){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let query = "select * from users WHERE 1=1 ";
        query += " AND user_id='" + userID + "'";
        db.query(query, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        });
    });
};

/* Get All Drivers*/
exports.getAllDriversFromDB = function(data){
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let orderField = ("order_field" in data) ? data.order_field : "id";
        let orderDir = ("order_dir" in data) ? data.order_dir : "desc";
        let query = "select * from users WHERE 1=1 ";
        if("driver_id" in data) {
            query += " AND driver_id like '%" + data.driver_id + "%'";
        }
        if ("email" in data) {
            query += " AND email like '%" + data.email + "%'";
        }
        if ("driver_name" in data) {
            query += "AND first_name like '%" + data.driver_name + "%'";
        }
        query += " ORDER BY "+ orderField + " " + orderDir;
        db.query(query, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        });
    });
};

/* Check Email */
exports.checkEmailInDB = function (data) {
    return new Promise(function (resolve, reject) {
        let db = con.connectionDB();
        let query = "select email from users WHERE 1=1 ";
        if ("email" in data) {
            query += " AND email=" + "'"+data.email+"'";
        }
        db.query(query, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        });
    });
};