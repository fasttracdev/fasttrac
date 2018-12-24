const con = require('../../../connection');

/*Fasttrac Dashboard content */
exports.getDashBoardContent = function () {
  return new Promise(function (resolve, reject) {
    let db = con.connectionDB();
    let sql = "";
    var count = [];
    try {
      sql = "SELECT distinct COUNT(id) as driver_count FROM users where role_id = 2";
      db.all(sql, function (err, row) {
        if (err) {
          reject(err);
          return
        }
        resolve(row);
      });
    } catch (e) {
    }
    db.close();
  });
};