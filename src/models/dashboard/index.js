const con = require('../../../connection');

/*Fasttrac Dashboard content */
exports.getDashBoardContent = function () {
  return new Promise(function (resolve, reject) {
    let db = con.connectionDB();
    var query = 'SELECT distinct COUNT(id) as driver_count FROM users where role_id = 2';
    db.query(query, function (err, res) {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.rows);
    });
  });
};